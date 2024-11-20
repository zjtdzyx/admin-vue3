<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 定义组件名称
defineOptions({
  name: 'SalesManagement',
})

// 定义销售单接口数据结构
interface Order {
  id?: number // 销售单编号
  customer_name: string // 客户姓名
  order_date: string // 订购日期
  product_name: string // 产品名称
  product_quantity: number // 订购数量
  total_amount: number // 订单金额
  status: string // 状态
  remark: string // 备注
}

// 表单数据，初始化为空
const form = ref<Order>({
  customer_name: '',
  order_date: new Date().toISOString().split('T')[0], // 默认当前日期
  product_name: '',
  product_quantity: 0,
  total_amount: 0,
  status: 'pending', // 默认状态为“待处理”
  remark: '',
})

// 响应式表格数据
const tableData = ref<Order[]>([])

// 控制表格高度
const tableHeight = ref<number>(0)

// 控制添加/编辑弹窗显示
const dialogVisible = ref(false)

// 动态调整表格高度
function updateTableHeight() {
  const windowHeight = window.innerHeight
  tableHeight.value = windowHeight - 200 // 留出顶部按钮和底部空间
}

// 页面加载时获取数据和监听窗口变化
onMounted(() => {
  updateTableHeight()
  window.addEventListener('resize', updateTableHeight)
  fetchTableData() // 获取初始数据
})

// 页面卸载时移除监听器
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTableHeight)
})

// 获取销售单数据
async function fetchTableData() {
  try {
    const response = await axios.get('/api/customers') // 修改为实际接口地址
    tableData.value = response.data
  }
  catch (error) {
    console.error('获取销售单数据失败:', error)
    ElMessage.error('数据加载失败，请稍后重试')
  }
}

// 提交表单（保存新增或编辑的数据）
// async function onSubmit() {
//   try {
//     if (form.value.id) {
//       // 编辑销售单
//       await axios.put(`/api/customers/${form.value.id}`, form.value)
//     } else {
//       // 添加销售单
//       await axios.post('/api/customers', form.value)
//     }
//     fetchTableData() // 刷新表格数据
//     dialogVisible.value = false // 关闭弹窗
//     ElMessage.success('操作成功')
//   } catch (error) {
//     console.error('保存数据失败:', error)
//     ElMessage.error('操作失败，请稍后重试')
//   }
// }

// 编辑销售单
function onEditCustomer(customer: Order) {
  form.value = { ...customer } // 克隆选中项
  dialogVisible.value = true // 打开编辑弹窗
}

// 删除销售单
async function onDeleteCustomer(id: number | undefined) {
  if (!id) {
    return
  }
  try {
    await axios.delete(`/api/customers/${id}`)
    fetchTableData() // 刷新表格数据
    ElMessage.success('删除成功')
  }
  catch (error) {
    console.error('删除失败:', error)
    ElMessage.error('删除失败，请稍后重试')
  }
}

// 搜索框的控制变量
const showDialog = ref(false) // 查询弹窗的显隐
const inputName = ref('') // 搜索框输入值

// 查询销售单数据
async function fetchCustomerInfo() {
  if (!inputName.value.trim()) {
    ElMessage.error('请输入客户姓名或产品名称')
    return
  }
  try {
    const response = await axios.get('/api/customers', {
      params: { query: inputName.value }, // 假设接口支持 query 参数
    })
    tableData.value = response.data // 更新表格数据
    if (!tableData.value.length) {
      ElMessage.warning('未找到匹配的销售单信息')
    }
    showDialog.value = false // 关闭查询弹窗
  }
  catch (error) {
    console.error('查询失败:', error)
    ElMessage.error('查询失败，请稍后重试')
  }
}

// 重置查询弹窗
function resetDialog() {
  inputName.value = ''
  showDialog.value = false
}
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="customer-info">
      <h2>销售单信息管理</h2>
      <div class="mb-4">
        <el-button type="primary" plain @click="dialogVisible = true">
          添加销售单
        </el-button>
        <el-button type="success" plain :disabled="!selectedCustomer" @click="onEditCustomer(selectedCustomer)">
          编辑销售单
        </el-button>
        <el-button type="warning" plain :disabled="!selectedCustomer" @click="onDeleteCustomer(selectedCustomer.id)">
          删除销售单
        </el-button>
        <el-button type="danger" plain @click="showDialog = true">
          查询销售单
        </el-button>
      </div>
    </div>

    <!-- 弹出搜索对话框 -->
    <el-dialog
      v-model="showDialog"
      title="查询销售单信息"
      width="400px"
      :close-on-click-modal="false"
    >
      <!-- 搜索输入框 -->
      <div class="mb-4 flex gap-4">
        <el-input
          v-model="inputName"
          style="width: 240px;"
          placeholder="请输入客户姓名或产品名称"
        />
      </div>
      <!-- 按钮操作 -->
      <div class="button-container mb-4">
        <el-button type="success" plain @click="fetchCustomerInfo">
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
