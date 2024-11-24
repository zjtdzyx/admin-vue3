<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { defineOptions, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'CustomerInfo',
})

// 定义接口的数据结构
interface User {
  id?: number
  date: string
  name: string
  contact: string
  address: string
  isEnterprise: boolean
  remark: string
}

// 表单数据
const form = ref<User>({
  name: '',
  contact: '',
  address: '',
  isEnterprise: false,
  remark: '',
  date: new Date().toISOString(),
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

// 生成10组死数据
const initialData: User[] = [
  { id: 1, date: '2023-01-01', name: '客户1', contact: '1234567890', address: '地址1', isEnterprise: false, remark: '备注1' },
  { id: 2, date: '2023-02-01', name: '客户2', contact: '1234567891', address: '地址2', isEnterprise: true, remark: '备注2' },
  { id: 3, date: '2023-03-01', name: '客户3', contact: '1234567892', address: '地址3', isEnterprise: false, remark: '备注3' },
  { id: 4, date: '2023-04-01', name: '客户4', contact: '1234567893', address: '地址4', isEnterprise: true, remark: '备注4' },
  { id: 5, date: '2023-05-01', name: '客户5', contact: '1234567894', address: '地址5', isEnterprise: false, remark: '备注5' },
  { id: 6, date: '2023-06-01', name: '客户6', contact: '1234567895', address: '地址6', isEnterprise: true, remark: '备注6' },
  { id: 7, date: '2023-07-01', name: '客户7', contact: '1234567896', address: '地址7', isEnterprise: false, remark: '备注7' },
  { id: 8, date: '2023-08-01', name: '客户8', contact: '1234567897', address: '地址8', isEnterprise: true, remark: '备注8' },
  { id: 9, date: '2023-09-01', name: '客户9', contact: '1234567898', address: '地址9', isEnterprise: false, remark: '备注9' },
  { id: 10, date: '2023-10-01', name: '客户10', contact: '1234567899', address: '地址10', isEnterprise: true, remark: '备注10' },
]

// 本地存储数据
function saveToLocalStorage(data: User[]) {
  localStorage.setItem('customers', JSON.stringify(data))
}

// 从本地存储获取数据
function loadFromLocalStorage(): User[] {
  const data = localStorage.getItem('customers')
  return data ? JSON.parse(data) : initialData
}

// 获取数据的函数
function fetchTableData() {
  tableData.value = loadFromLocalStorage()
}

// 提交表单，保存数据到本地存储
function onSubmit() {
  if (form.value.id) {
    // 编辑客户
    const index = tableData.value.findIndex(customer => customer.id === form.value.id)
    if (index !== -1) {
      tableData.value[index] = { ...form.value }
    }
  } else {
    // 添加客户
    form.value.id = Date.now()
    tableData.value.push({ ...form.value })
  }
  saveToLocalStorage(tableData.value)
  fetchTableData() // 刷新表格数据
  dialogVisible.value = false // 关闭弹窗
}

// 编辑客户
function onEditCustomer(customer: User) {
  form.value = { ...customer }
  dialogVisible.value = true
}

// 删除客户
function onDeleteCustomer(id: number) {
  tableData.value = tableData.value.filter(customer => customer.id !== id)
  saveToLocalStorage(tableData.value)
  fetchTableData() // 刷新表格数据
}

// 控制对话框是否显示
const showDialog = ref(false)
// 输入框内容
const inputName = ref('')

// 获取客户信息
function fetchCustomerInfo() {
  if (!inputName.value.trim()) {
    ElMessage.error('请输入客户姓名')
    return
  }

  // 过滤客户数据
  tableData.value = loadFromLocalStorage().filter(customer =>
    customer.name.includes(inputName.value)
  )

  // 如果没有匹配的数据
  if (!tableData.value.length) {
    ElMessage.warning('未找到匹配的客户信息')
  }

  // 关闭对话框
  showDialog.value = false
}

// 重置对话框
function resetDialog() {
  showDialog.value = false
  inputName.value = ''
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
    <div class="customer-info">

      <div class="mb-4">
        <el-button type="primary" plain @click="dialogVisible = true">
          添加客户
        </el-button>
    
        <el-button type="warning" plain @click="resetData">
          还原数据
        </el-button>

        <el-button type="info" plain @click="showDialog = true">
          查询客户
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 100%;"
      @row-click="row => selectedCustomer = row"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="客户编号" width="100" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="客户姓名" width="120" align="center" />
      <el-table-column property="contact" label="联系方式" width="150" align="center" />
      <el-table-column
        property="address"
        label="客户地址"
        width="200"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        property="isEnterprise"
        label="客户类型"
        width="120"
        align="center"
        :formatter="row => (row.isEnterprise ? '企业' : '个人')"
      />
      <el-table-column
        property="remark"
        label="备注"
        width="150"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button size="mini" @click="onEditCustomer(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteCustomer(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="客户信息"
      :width="600"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="客户姓名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="客户类型">
          <el-radio-group v-model="form.isEnterprise">
            <el-radio :label="true">
              企业
            </el-radio>
            <el-radio :label="false">
              个人
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" />
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
      title="查询客户信息"
      width="400px"
      :close-on-click-modal="false"
    >
      <!-- 搜索输入框 -->
      <div class="mb-4 flex gap-4">
        <el-input
          v-model="inputName"
          style="width: 240px;"
          placeholder="请输入客户姓名"
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
  margin: 20px;
}

.customer-info {
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