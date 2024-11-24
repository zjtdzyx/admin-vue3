<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import { onBeforeUnmount, onMounted, ref } from 'vue'

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

  // 生成10组死数据
  const initialData: Product[] = [
    { product_number: 1n, name: '产品1', auditedCount: 10, systemCount: 15, difference: 5, last_inbound_date: '2023-01-01' },
    { product_number: 2n, name: '产品2', auditedCount: 20, systemCount: 25, difference: 5, last_inbound_date: '2023-02-01' },
    { product_number: 3n, name: '产品3', auditedCount: 30, systemCount: 35, difference: 5, last_inbound_date: '2023-03-01' },
    { product_number: 4n, name: '产品4', auditedCount: 40, systemCount: 45, difference: 5, last_inbound_date: '2023-04-01' },
    { product_number: 5n, name: '产品5', auditedCount: 50, systemCount: 55, difference: 5, last_inbound_date: '2023-05-01' },
    { product_number: 6n, name: '产品6', auditedCount: 60, systemCount: 65, difference: 5, last_inbound_date: '2023-06-01' },
    { product_number: 7n, name: '产品7', auditedCount: 70, systemCount: 75, difference: 5, last_inbound_date: '2023-07-01' },
    { product_number: 8n, name: '产品8', auditedCount: 80, systemCount: 85, difference: 5, last_inbound_date: '2023-08-01' },
    { product_number: 9n, name: '产品9', auditedCount: 90, systemCount: 95, difference: 5, last_inbound_date: '2023-09-01' },
    { product_number: 10n, name: '产品10', auditedCount: 100, systemCount: 105, difference: 5, last_inbound_date: '2023-10-01' },
  ]

  // 本地存储数据
  function saveToLocalStorage(data: Product[]) {
    localStorage.setItem('products', JSON.stringify(data))
  }

  // 从本地存储获取数据
  function loadFromLocalStorage(): Product[] {
    const data = localStorage.getItem('products')
    return data ? JSON.parse(data) : initialData
  }

  // 获取数据的函数
  function fetchTableData() {
    tableData.value = loadFromLocalStorage()
  }

  // 提交盘存信息
  function onSubmit() {
    if (selectedProduct.value) {
      // 动态计算数量差异
      form.value.difference = (form.value.systemCount || 0) - (form.value.auditedCount || 0)

      // 更新数据
      const index = tableData.value.findIndex(product => product.product_number === selectedProduct.value?.product_number)
      if (index !== -1) {
        tableData.value[index] = { ...selectedProduct.value, ...form.value }
        saveToLocalStorage(tableData.value)
        fetchTableData() // 重新获取数据
        dialogVisible.value = false
        ElMessage.success('盘存结果录入成功')
      }
    }
  }

  // 打开盘存弹窗
  function handleAddStock() {
    if (selectedProduct.value) {
      form.value.auditedCount = selectedProduct.value.auditedCount || 0
      form.value.systemCount = selectedProduct.value.systemCount || 0
      form.value.difference = 0 // 初始化差异
      form.value.inbound_date = new Date() // 默认设置为当前日期
      dialogVisible.value = true
    }
  }

  // 还原数据
  function resetData() {
    saveToLocalStorage(initialData)
    fetchTableData()
  }
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="product-info">
      <div class="mb-4">
        <el-button type="primary" plain :disabled="!selectedProduct" @click="handleAddStock">
          盘点结果录入（先点击勾选产品）
        </el-button>
        <el-button type="warning" plain @click="resetData">
          还原数据
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" :height="tableHeight" border style="width: 100%;"
      @row-click="row => selectedProduct = row">
      <el-table-column type="selection" width="55" />
      <el-table-column label="产品编号" width="100" align="center">
        <template #default="scope">
          {{ scope.row.product_number }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="产品名称" width="120" align="center" />
      <el-table-column property="last_inbound_date" label="最后入库日期" width="180" align="center" />
      <el-table-column property="auditedCount" label="更新前数量" width="100" align="center" />
      <el-table-column property="systemCount" label="更新后数量" width="100" align="center" />
      <el-table-column property="difference" label="数量变化差异" width="120" align="center" />
    </el-table>

    <!-- 盘存弹窗 -->
    <el-dialog v-model="dialogVisible" title="盘存结果录入" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="最后入库日期">
          <el-date-picker v-model="form.inbound_date" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="更新前数量">
          <el-input v-model.number="form.auditedCount" type="number" min="1" />
        </el-form-item>
        <el-form-item label="更新后数量">
          <el-input v-model.number="form.systemCount" type="number" min="1" />
        </el-form-item>
        <el-form-item label="数量变化差异">
          <el-input v-model.number="form.difference" type="number" min="1" />
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
    margin: 20px;
  }

  .product-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mb-4 {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
  }

  .dialog-footer {
    text-align: right;
  }
</style>