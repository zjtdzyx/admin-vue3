<script setup lang="ts">
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const api = axios.create({

baseURL:

 import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true'

  ? '/proxy/'

  : import.meta.env.VITE_APP_API_BASEURL,

timeout: 1000 * 60,

responseType: 'json',

})
interface Product {
  product_number: bigint
  name: string
  auditedCount?: number
  systemCount?: number
  difference?: number
  last_inbound_date?: string
}

// 表单数据
const form = ref({
  auditedCount: 0,
  systemCount: 0,
  difference: 0,
  inbound_date: new Date(),
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
    const response = await api.get('/api/products') // 修改为实际接口地址
    tableData.value = response.data
  }
  catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 点击按钮，打开盘存弹窗
function handleAddStock() {
  if (selectedProduct.value) {
    form.value.auditedCount = selectedProduct.value.auditedCount || 0
    form.value.systemCount = selectedProduct.value.systemCount || 0
    form.value.difference = 0 // 初始化差异
    form.value.inbound_date = new Date() // 默认设置为当前日期
    dialogVisible.value = true
  }
}

// 提交盘存信息
async function onSubmit() {
  if (selectedProduct.value) {
    // 动态计算数量差异
    form.value.difference
      = (form.value.systemCount || 0) - (form.value.auditedCount || 0)

    try {
      // 更新数据库
      await api.put(`/api/products/${selectedProduct.value.product_number}`, {
        auditedCount: form.value.auditedCount,
        systemCount: form.value.systemCount,
        difference: form.value.difference,
        last_inbound_date: form.value.inbound_date,
      })

      // 更新前端数据
      Object.assign(selectedProduct.value, {
        auditedCount: form.value.auditedCount,
        systemCount: form.value.systemCount,
        difference: form.value.difference,
        last_inbound_date: form.value.inbound_date,
      })

      fetchTableData() // 重新获取数据
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
      <h2>产品盘存</h2>

      <div class="mb-4">
        <el-button
          type="primary"
          plain
          :disabled="!selectedProduct"
          @click="handleAddStock"
        >
          盘点结果录入（先点击勾选产品）
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
        property="last_inbound_date"
        label="最后入库日期"
        width="180"
        align="center"
      />
      <el-table-column
        property="auditedCount"
        label="更新前数量"
        width="100"
        align="center"
      />      <el-table-column
        property="systemCount"
        label="更新后数量"
        width="100"
        align="center"
      />      <el-table-column
        property="difference"
        label="'数量变化差异"
        width="120"
        align="center"
      />
    </el-table>

    <!-- 盘存弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="盘存结果录入"
      width="400px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="最后入库日期">
          <el-date-picker
            v-model="form.inbound_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />

          <el-form-item label="更新前数量">
            <el-input v-model.number="form.auditedCount" type="number" min="1" />
          </el-form-item>

          <el-form-item label="更新后数量">
            <el-input v-model.number="form.systemCount" type="number" min="1" />
          </el-form-item>

          <el-form-item label="数量变化差异">
            <el-input v-model.number="form.difference" type="number" min="1" />
          </el-form-item>
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
