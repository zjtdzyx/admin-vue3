<script setup lang="ts">
import { useCustomerStore } from '@/store/customer'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const customerStore = useCustomerStore()
const customerInfo = ref([])
const newCustomer = ref({ customer_number: '', name: '', contact: '', address: '' })
const editingCustomer = ref<{ customer_number: string, name: string, contact: string, address: string } | null>(null)

onMounted(async () => {
  try {
    await customerStore.loadCustomers()
    customerInfo.value = customerStore.customers
  }
  catch {
    ElMessage.error('Failed to fetch customer info')
  }
})

async function addCustomer() {
  try {
    await customerStore.addCustomer(newCustomer.value)
    newCustomer.value = { customer_number: '', name: '', contact: '', address: '' }
    ElMessage.success('Customer added successfully')
  }
  catch {
    ElMessage.error('Failed to add customer')
  }
}

function editCustomer(customer) {
  editingCustomer.value = { ...customer }
}

async function updateCustomer() {
  try {
    await customerStore.editCustomer(editingCustomer.value.customer_number, editingCustomer.value)
    editingCustomer.value = null
    ElMessage.success('Customer updated successfully')
  }
  catch {
    ElMessage.error('Failed to update customer')
  }
}

async function removeCustomer(customer_number) {
  try {
    await customerStore.removeCustomer(customer_number)
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
      <ElForm label-width="120px" @submit.prevent="addCustomer">
        <ElFormItem label="客户编号">
          <ElInput v-model="newCustomer.customer_number" placeholder="客户编号" required />
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
          <ElButton type="primary" @click="addCustomer">
            添加客户
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="customerInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="customer_number" label="客户编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="contact" label="联系人" width="150" />
          <ElTableColumn prop="address" label="地址" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editCustomer(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeCustomer(scope.row.customer_number)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingCustomer">
      <h2>编辑客户</h2>
      <ElForm label-width="120px" @submit.prevent="updateCustomer">
        <ElFormItem label="客户编号">
          <ElInput v-model="editingCustomer.customer_number" placeholder="客户编号" required />
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
          <ElButton type="primary" @click="updateCustomer">
            更新客户
          </ElButton>
          <ElButton @click="editingCustomer = null">
            取消
          </ElButton>
        </ElFormItem>
      </ElForm>
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
</style>
