<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

const defaultCustomerInfo = [
  { customerNumber: '001', name: '张三', contact: '123456789', address: '北京市' },
  { customerNumber: '002', name: '李四', contact: '987654321', address: '上海市' },
  { customerNumber: '003', name: '王五', contact: '456123789', address: '广州市' },
  { customerNumber: '004', name: '赵六', contact: '321654987', address: '深圳市' },
  { customerNumber: '005', name: '孙七', contact: '789123456', address: '杭州市' },
  { customerNumber: '006', name: '周八', contact: '654789123', address: '成都市' },
  { customerNumber: '007', name: '吴九', contact: '123789456', address: '南京市' },
  { customerNumber: '008', name: '郑十', contact: '987321654', address: '苏州市' },
  { customerNumber: '009', name: '王十一', contact: '456987123', address: '武汉市' },
  { customerNumber: '010', name: '李十二', contact: '321987654', address: '长沙市' }
]

const customerInfo = ref<any[]>(JSON.parse(localStorage.getItem('customerInfo') || JSON.stringify(defaultCustomerInfo)))

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

onMounted(() => {
  ElMessage.success('Customer info loaded successfully')
})

function saveToLocalStorage() {
  localStorage.setItem('customerInfo', JSON.stringify(customerInfo.value))
}

function addCustomerHandler() {
  customerInfo.value.push({ ...newCustomer.value })
  newCustomer.value = { customerNumber: '', name: '', contact: '', address: '' }
  saveToLocalStorage()
  ElMessage.success('Customer added successfully')
}

function editCustomerHandler(customer: any) {
  editingCustomer.value = { ...customer }
}

function updateCustomerHandler() {
  const index = customerInfo.value.findIndex(c => c.customerNumber === editingCustomer.value?.customerNumber)
  if (index !== -1 && editingCustomer.value) {
    customerInfo.value[index] = { ...editingCustomer.value }
    editingCustomer.value = null
    saveToLocalStorage()
    ElMessage.success('Customer updated successfully')
  }
}

function removeCustomerHandler(customerNumber: string) {
  customerInfo.value = customerInfo.value.filter(c => c.customerNumber !== customerNumber)
  saveToLocalStorage()
  ElMessage.success('Customer removed successfully')
}

function restoreDefaultData() {
  customerInfo.value = [...defaultCustomerInfo]
  saveToLocalStorage()
  ElMessage.success('Data restored to default values')
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
      
      <ElButton type="warning" @click="restoreDefaultData">还原数据</ElButton>
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
</style>
