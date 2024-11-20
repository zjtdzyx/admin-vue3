<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { defineOptions, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'ProductInfo',
})

// 定义接口的数据结构
interface User {
  product_number?: bigint
  name: string
  grade?: string
  origin?: string
  cost_price?: number
  packaging?: string
  inbound_date: Date
  quantity: number
}

// 表单数据
const form = ref<User>({
  name: '',
  grade: '',
  origin: '',
  cost_price: null,
  packaging: '',
  inbound_date: new Date(),
  quantity: 0,
})

// 响应式表格数据
const tableData = ref<User[]>([])

// 动态表格高度
const tableHeight = ref<number>(0)

// 控制弹窗的显隐
const dialogVisible = ref(false)

// 动态调整表格高度
function updateTableHeight() {
  const windowHeight = window.innerHeight
  tableHeight.value = windowHeight - 200 // 适配窗口高度
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

// 提交表单，保存数据到数据库
async function onSubmit() {
  try {
    if (form.value.product_number) {
      // 编辑产品
      await axios.put(`/api/products/${form.value.product_number}`, form.value)
    }
    else {
      // 添加产品
      await axios.post('/api/products', form.value)
    }
    fetchTableData() // 刷新表格数据
    dialogVisible.value = false // 关闭弹窗
  }
  catch (error) {
    console.error('保存数据失败:', error)
  }
}

// 编辑产品
function onEditProduct(Product: User) {
  form.value = { ...Product }
  dialogVisible.value = true
}

// 删除产品
async function onDeleteProduct(id: number) {
  try {
    await axios.delete(`/api/products/${id}`)
    fetchTableData() // 刷新表格数据
  }
  catch (error) {
    console.error('删除产品失败:', error)
  }
}

// 控制对话框是否显示
const showDialog = ref(false)
// 输入框内容
const inputName = ref('')
// 表格数据
const tableData1 = ref([]) // 修改后的表格数据变量名

// 获取产品信息
async function fetchProductInfo() {
  if (!inputName.value.trim()) {
    ElMessage.error('请输入产品名称')
    return
  }

  try {
    // 调用接口获取产品信息
    const response = await axios.get('/api/products', {
      params: { name: inputName.value },
    })

    // 更新表格数据
    tableData1.value = response.data

    // 如果没有匹配的数据
    if (!tableData1.value.length) {
      ElMessage.warning('未找到匹配的产品信息')
    }

    // 关闭对话框
    showDialog.value = false
  }
  catch (error) {
    console.error(error)
    ElMessage.error('查询失败，请稍后再试')
  }
}

// 重置对话框
function resetDialog() {
  showDialog.value = false
  inputName.value = ''
}
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="product-info">
      <h2>产品信息管理</h2>

      <div class="mb-4">
        <el-button type="primary" plain @click="dialogVisible = true">
          添加产品
        </el-button>
        <el-button type="success" plain :disabled="!selectedProduct" @click="onEditProduct(selectedProduct)">
          编辑产品
        </el-button>
        <el-button type="warning" plain :disabled="!selectedProduct" @click="onDeleteProduct(selectedProduct.product_number)">
          删除产品
        </el-button>
        <el-button type="danger" plain @click="showDialog = true">
          查询产品
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
      <el-table-column property="grade" label="产品等级" width="120" align="center" />
      <el-table-column property="origin" label="产地" width="150" align="center" show-overflow-tooltip />
      <el-table-column
        property="cost_price"
        label="进价"
        width="120"
        align="center"
        :formatter="formatCurrency"
      />
      <el-table-column property="packaging" label="包装材料" width="120" align="center" show-overflow-tooltip />
      <el-table-column
        property="inbound_date"
        label="入库日期"
        width="180"
        align="center"
        :formatter="formatDate"
      />
      <el-table-column property="quantity" label="总量" width="100" align="center" />
    </el-table>

    <!-- 弹出添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="产品信息"
      :width="600"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="产品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="产品等级">
          <el-input v-model="form.grade" />
        </el-form-item>
        <el-form-item label="产地">
          <el-input v-model="form.origin" />
        </el-form-item>
        <el-form-item label="进价">
          <el-input v-model="form.cost_price" />
        </el-form-item>
        <el-form-item label="包装材料">
          <el-input v-model="form.packaging" />
        </el-form-item>
        <el-form-item label="入库日期">
          <el-input v-model="form.inbound_date" />
        </el-form-item>
        <el-form-item label="总量">
          <el-input v-model="form.quantity" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 弹出搜索对话框 -->
    <el-dialog
      v-model="showDialog"
      title="查询产品信息"
      width="400px"
      :close-on-click-modal="false"
    >
      <!-- 搜索输入框 -->
      <div class="mb-4 flex gap-4">
        <el-input
          v-model="inputName"
          style="width: 240px;"
          placeholder="请输入产品名称"
          :prefix-icon="Search"
        />
      </div>

      <!-- 按钮操作 -->
      <div class="button-container mb-4">
        <el-button type="success" plain @click="fetchProductInfo">
          确定
        </el-button>
        <el-button type="danger" plain @click="resetDialog">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  margin-left: 20px; /* 将容器右移 */
}
</style>
