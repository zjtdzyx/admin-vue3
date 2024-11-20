<script setup lang="ts">
import axios from 'axios'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const customerInfo = ref([])
const newCustomer = ref({ customerNumber: '', name: '', contact: '', address: '' })
const editingCustomer = ref<{ customerNumber: string, name: string, contact: string, address: string } | null>(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

onMounted(async () => {
  try {
    const response = await api.get('/customers')
    customerInfo.value = response.data
    ElMessage.success('Customer info loaded successfully')
  }
  catch {
    ElMessage.error('Failed to load customer info')
  }
})

async function addCustomerHandler() {
  try {
    const response = await api.post('/customers', newCustomer.value)
    customerInfo.value.push(response.data)
    newCustomer.value = { customerNumber: '', name: '', contact: '', address: '' }
    ElMessage.success('Customer added successfully')
  }
  catch {
    ElMessage.error('Failed to add customer')
  }
}

function editCustomerHandler(customer) {
  editingCustomer.value = { ...customer }
}

async function updateCustomerHandler() {
  try {
    const response = await api.put(`/customers/${editingCustomer.value.customerNumber}`, editingCustomer.value)
    const index = customerInfo.value.findIndex(c => c.customerNumber === editingCustomer.value.customerNumber)
    if (index !== -1) {
      customerInfo.value[index] = response.data
    }
    editingCustomer.value = null
    ElMessage.success('Customer updated successfully')
  }
  catch {
    ElMessage.error('Failed to update customer')
  }
}

async function removeCustomerHandler(customerNumber) {
  try {
    await api.delete(`/customers/${customerNumber}`)
    customerInfo.value = customerInfo.value.filter(c => c.customerNumber !== customerNumber)
    ElMessage.success('Customer removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove customer')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>顾客信息管理</h1>
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
        <ElTable :data="customerInfo" style="width: auto; margin: 0 auto;" height="400" border>
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
