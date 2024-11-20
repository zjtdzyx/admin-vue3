<script setup lang="ts">
import axios from 'axios'
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

// 获取数据的函数
async function fetchTableData() {
  try {
    const response = await axios.get('/api/customers') // 修改为实际接口地址
    tableData.value = response.data
  }
  catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 提交表单，保存数据到数据库
async function onSubmit() {
  try {
    if (form.value.id) {
      // 编辑客户
      await axios.put(`/api/customers/${form.value.id}`, form.value)
    }
    else {
      // 添加客户
      await axios.post('/api/customers', form.value)
    }
    fetchTableData() // 刷新表格数据
    dialogVisible.value = false // 关闭弹窗
  }
  catch (error) {
    console.error('保存数据失败:', error)
  }
}

// 编辑客户
function onEditCustomer(customer: User) {
  form.value = { ...customer }
  dialogVisible.value = true
}

// 删除客户
async function onDeleteCustomer(id: number) {
  try {
    await axios.delete(`/api/customers/${id}`)
    fetchTableData() // 刷新表格数据
  }
  catch (error) {
    console.error('删除客户失败:', error)
  }
}

// 控制对话框是否显示
const showDialog = ref(false)
// 输入框内容
const inputName = ref('')
// 表格数据
const tableData1 = ref([]) // 修改后的表格数据变量名

// 获取客户信息
async function fetchCustomerInfo() {
  if (!inputName.value.trim()) {
    ElMessage.error('请输入客户姓名')
    return
  }

  try {
    // 调用接口获取客户信息
    const response = await axios.get('/api/customers', {
      params: { name: inputName.value },
    })

    // 更新表格数据
    tableData1.value = response.data

    // 如果没有匹配的数据
    if (!tableData1.value.length) {
      ElMessage.warning('未找到匹配的客户信息')
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
    <div class="customer-info">
      <h2>客户信息管理</h2>

      <div class="mb-4">
        <el-button type="primary" plain @click="dialogVisible = true">
          添加客户
        </el-button>
        <el-button type="success" plain :disabled="!selectedCustomer" @click="onEditCustomer(selectedCustomer)">
          编辑客户
        </el-button>
        <el-button type="warning" plain :disabled="!selectedCustomer" @click="onDeleteCustomer(selectedCustomer.id)">
          删除客户
        </el-button>
        <el-button type="danger" plain @click="showDialog = true">
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
        :formatter="row => (row.isEnterprise ? '个人' : '企业')"
      />
      <el-table-column
        property="remark"
        label="备注"
        width="150"
        align="center"
        show-overflow-tooltip
      />
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
          :prefix-icon="Search"
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
