<script setup lang="ts">
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Product {
  product_number: bigint
  name: string
  quantity: number
  last_inbound_date: string
}

// 表单数据
const form = ref({
  inboundQuantity: 0,
  inbound_date: '',
})

// 响应式表格数据
const tableData = ref<Product[]>([])

// 动态表格高度
const tableHeight = ref<number>(0)

// 控制弹窗的显隐
const dialogVisible = ref(false)

// 当前选中的产品
const selectedProduct = ref<Product | null>(null)

// 动态调整表格高度
function updateTableHeight() {
  const windowHeight = window.innerHeight
  tableHeight.value = windowHeight - 200
}

// 添加监听器，动态调整表格高度
onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
  fetchTableData()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})

// 获取数据的函数
async function fetchTableData() {
  try {
    const response = await axios.get('/api/products') // 修改为实际接口地址
    tableData.value = response.data
  }
  catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 点击按钮，打开入库弹窗
function handleAddStock() {
  if (selectedProduct.value) {
    form.value.inboundQuantity = 0 // 清空入库数量
    form.value.inbound_date = '' // 清空入库日期
    dialogVisible.value = true
  }
}

// 提交入库信息
async function onSubmit() {
  if (
    selectedProduct.value
    && form.value.inboundQuantity > 0
    && form.value.inbound_date
  ) {
    try {
      const updatedQuantity
        = selectedProduct.value.quantity + form.value.inboundQuantity

      // 更新数据库
      await axios.put(`/api/products/${selectedProduct.value.product_number}`, {
        quantity: updatedQuantity,
        last_inbound_date: form.value.inbound_date,
      })

      // 更新前端数据
      selectedProduct.value.quantity = updatedQuantity
      selectedProduct.value.last_inbound_date = form.value.inbound_date
      fetchTableData()

      dialogVisible.value = false
    }
    catch (error) {
      console.error('更新数据失败:', error)
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="product-info">
      <h2>产品入库</h2>

      <div class="mb-4">
        <el-button
          type="primary"
          plain
          :disabled="!selectedProduct"
          @click="handleAddStock"
        >
          入库（先点击勾选产品）
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 100%;"
      @row-click="row => selectedProduct = row"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="产品编号" width="100" align="center">
        <template #default="scope">
          {{ scope.row.product_number }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="产品名称" width="120" align="center" />
      <el-table-column
        property="quantity"
        label="总量"
        width="100"
        align="center"
      />
      <el-table-column
        property="last_inbound_date"
        label="最后入库日期"
        width="180"
        align="center"
      />
    </el-table>

    <!-- 入库弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="入库操作"
      width="400px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="入库数量">
          <el-input v-model.number="form.inboundQuantity" type="number" min="1" />
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="form.inbound_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  margin-left: 20px; /* 将容器右移 */
}
</style>
