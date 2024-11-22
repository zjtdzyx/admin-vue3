<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 初始化死数据
const initialCustomerInfo = [
  { customerNumber: 'C001', name: '张三', contact: '13800000001', address: '北京市' },
  { customerNumber: 'C002', name: '李四', contact: '13800000002', address: '上海市' },
  { customerNumber: 'C003', name: '王五', contact: '13800000003', address: '广州市' },
  { customerNumber: 'C004', name: '赵六', contact: '13800000004', address: '深圳市' },
  { customerNumber: 'C005', name: '孙七', contact: '13800000005', address: '杭州市' },
  { customerNumber: 'C006', name: '周八', contact: '13800000006', address: '南京市' },
  { customerNumber: 'C007', name: '吴九', contact: '13800000007', address: '武汉市' },
  { customerNumber: 'C008', name: '郑十', contact: '13800000008', address: '重庆市' },
  { customerNumber: 'C009', name: '冯十一', contact: '13800000009', address: '成都市' },
  { customerNumber: 'C010', name: '陈十二', contact: '13800000010', address: '苏州市' }
]

// 从 localStorage 恢复客户数据
const storedCustomerInfo = localStorage.getItem('customerInfo')
const customerInfo = ref(storedCustomerInfo ? JSON.parse(storedCustomerInfo) : [...initialCustomerInfo])

const searchQuery = ref('')
const filteredCustomerInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return customerInfo.value
  return customerInfo.value.filter(customer =>
    Object.values(customer).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newCustomer = ref({ customerNumber: '', name: '', contact: '', address: '' })
const editingCustomer = ref<{ customerNumber: string, name: string, contact: string, address: string } | null>(null)

// 更新 localStorage 中的客户数据
function updateLocalStorage() {
  localStorage.setItem('customerInfo', JSON.stringify(customerInfo.value))
}

// 添加客户
function addCustomerHandler() {
  customerInfo.value.push({ ...newCustomer.value })
  updateLocalStorage()
  newCustomer.value = { customerNumber: '', name: '', contact: '', address: '' }
  ElMessage.success('Customer added successfully')
}

// 编辑客户
function editCustomerHandler(customer) {
  editingCustomer.value = { ...customer }
}

// 更新客户
function updateCustomerHandler() {
  const index = customerInfo.value.findIndex(c => c.customerNumber === editingCustomer.value?.customerNumber)
  if (index !== -1 && editingCustomer.value) {
    customerInfo.value[index] = { ...editingCustomer.value }
    updateLocalStorage()
    editingCustomer.value = null
    ElMessage.success('Customer updated successfully')
  }
}

// 删除客户
function removeCustomerHandler(customerNumber) {
  customerInfo.value = customerInfo.value.filter(c => c.customerNumber !== customerNumber)
  updateLocalStorage()
  ElMessage.success('Customer removed successfully')
}

// 还原数据
function restoreDataHandler() {
  customerInfo.value = [...initialCustomerInfo]  // 还原到初始数据
  updateLocalStorage()
  ElMessage.success('Data restored to initial state')
}
</script>
<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>顾客信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索客户..."
          clearable
        />
      </div>
      
      <ElForm label-width="120px" @submit.prevent="addCustomerHandler">
        <ElFormItem label="客户编号">
          <ElInput v-model="newCustomer.customerNumber" placeholder="客户编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newCustomer.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="联系人">
          <ElInput v-model="newCustomer.contact" placeholder="联系人" required />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="newCustomer.address" placeholder="地址" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addCustomerHandler">
            添加客户
          </ElButton>
        </ElFormItem>
      </ElForm>

      <div class="table-container">
        <ElTable :data="filteredCustomerInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="customerNumber" label="客户编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="contact" label="联系人" width="150" />
          <ElTableColumn prop="address" label="地址" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editCustomerHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeCustomerHandler(scope.row.customerNumber)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>

    <div v-if="editingCustomer" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑客户</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateCustomerHandler">
          <ElFormItem label="客户编号">
            <ElInput v-model="editingCustomer.customerNumber" placeholder="客户编号" required />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="editingCustomer.name" placeholder="名称" required />
          </ElFormItem>
          <ElFormItem label="联系人">
            <ElInput v-model="editingCustomer.contact" placeholder="联系人" required />
          </ElFormItem>
          <ElFormItem label="地址">
            <ElInput v-model="editingCustomer.address" placeholder="地址" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateCustomerHandler">
              更新客户
            </ElButton>
            <ElButton @click="editingCustomer = null">
              取消
            </ElButton>
          </ElFormItem>
        </ElForm>
      </ElCard>
    </div>

    <div class="restore-container">
      <ElButton type="warning" @click="restoreDataHandler">
        还原数据
      </ElButton>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
}

.el-table th,
.el-table td {
  padding: 8px !important;
  border-right: 1px solid #ebeef5;
}

.el-table th:last-child,
.el-table td:last-child {
  border-right: none;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.table-container {
  display: flex;
  justify-content: center;
}

.edit-container {
  margin-top: 20px;
}

.restore-container {
  margin-top: 20px;
  text-align: center;
}
</style>
