<script setup lang="ts">
import { useCustomerStore } from '@/store/customer'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const customerStore = useCustomerStore()
const customerInfo = ref([])
const newCustomer = ref({ customer_number: '', name: '', contact: '', address: '' })
const editingCustomer = ref<{ customer_number: string, name: string, contact: string, address: string } | null>(null)
const showAddDialog = ref(false)

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
    showAddDialog.value = false
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
  <div>
    <h1>顾客信息管理</h1>
    <ElButton type="primary" @click="showAddDialog = true">
      添加客户
    </ElButton>
    <ElDialog v-model="showAddDialog" title="添加客户">
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
        <ElFormItem>
          <ElButton type="primary" @click="addCustomer">
            提交
          </ElButton>
          <ElButton @click="showAddDialog = false">
            取消
          </ElButton>
        </ElFormItem>
      </ElForm>
    </ElDialog>
    <ElTable :data="customerInfo" style="width: 100%;">
      <ElTableColumn prop="customer_number" label="客户编号" width="180" />
      <ElTableColumn prop="name" label="名称" width="180" />
      <ElTableColumn prop="contact" label="联系人" width="180" />
      <ElTableColumn prop="address" label="地址" width="180" />
      <ElTableColumn label="操作">
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
        <ElFormItem>
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
h1 {
  margin-bottom: 16px;
}
</style>
