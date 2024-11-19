<script setup lang="ts">
import { useOrganizationStore } from '@/store/organization'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const organizationStore = useOrganizationStore()
const organizationInfo = ref([])
const newOrganization = ref({ organization_number: '', organization_name: '', type: '' })
const editingOrganization = ref<{ organization_number: string, organization_name: string, type: string } | null>(null)

onMounted(async () => {
  try {
    await organizationStore.loadOrganizations()
    organizationInfo.value = organizationStore.organizations
  }
  catch {
    ElMessage.error('Failed to fetch organization info')
  }
})

async function addOrganization() {
  try {
    await organizationStore.addOrganization(newOrganization.value)
    newOrganization.value = { organization_number: '', organization_name: '', type: '' }
    ElMessage.success('Organization added successfully')
  }
  catch {
    ElMessage.error('Failed to add organization')
  }
}

function editOrganization(organization) {
  editingOrganization.value = { ...organization }
}

async function updateOrganization() {
  try {
    await organizationStore.editOrganization(editingOrganization.value.organization_number, editingOrganization.value)
    editingOrganization.value = null
    ElMessage.success('Organization updated successfully')
  }
  catch {
    ElMessage.error('Failed to update organization')
  }
}

async function removeOrganization(organization_number) {
  try {
    await organizationStore.removeOrganization(organization_number)
    ElMessage.success('Organization removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove organization')
  }
}
</script>

<template>
  <div>
    <h1>组织信息管理</h1>
    <ElForm label-width="120px" @submit.prevent="addOrganization">
      <ElFormItem label="组织编号">
        <ElInput v-model="newOrganization.organization_number" placeholder="组织编号" required />
      </ElFormItem>
      <ElFormItem label="组织名称">
        <ElInput v-model="newOrganization.organization_name" placeholder="组织名称" required />
      </ElFormItem>
      <ElFormItem label="类型">
        <ElInput v-model="newOrganization.type" placeholder="类型" required />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="addOrganization">
          添加组织
        </ElButton>
      </ElFormItem>
    </ElForm>
    <ElTable :data="organizationInfo" style="width: 100%;">
      <ElTableColumn prop="organization_number" label="组织编号" width="180" />
      <ElTableColumn prop="organization_name" label="组织名称" width="180" />
      <ElTableColumn prop="type" label="类型" width="180" />
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton type="primary" size="small" @click="editOrganization(scope.row)">
            编辑
          </ElButton>
          <ElButton type="danger" size="small" @click="removeOrganization(scope.row.organization_number)">
            删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="editingOrganization">
      <h2>编辑组织</h2>
      <ElForm label-width="120px" @submit.prevent="updateOrganization">
        <ElFormItem label="组织编号">
          <ElInput v-model="editingOrganization.organization_number" placeholder="组织编号" required />
        </ElFormItem>
        <ElFormItem label="组织名称">
          <ElInput v-model="editingOrganization.organization_name" placeholder="组织名称" required />
        </ElFormItem>
        <ElFormItem label="类型">
          <ElInput v-model="editingOrganization.type" placeholder="类型" required />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="updateOrganization">
            更新组织
          </ElButton>
          <ElButton @click="editingOrganization = null">
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
