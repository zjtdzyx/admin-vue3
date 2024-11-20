<script setup lang="ts">
import axios from 'axios'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const organizationInfo = ref([])
const newOrganization = ref({ organizationName: '', type: '' })
const editingOrganization = ref<{ organizationName: string, type: string } | null>(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

onMounted(async () => {
  try {
    const response = await api.get('/organizations')
    organizationInfo.value = response.data
    ElMessage.success('Organization info loaded successfully')
  }
  catch {
    ElMessage.error('Failed to load organization info')
  }
})

async function addOrganizationHandler() {
  try {
    const response = await api.post('/organizations', newOrganization.value)
    organizationInfo.value.push(response.data)
    newOrganization.value = { organizationName: '', type: '' }
    ElMessage.success('Organization added successfully')
  }
  catch {
    ElMessage.error('Failed to add organization')
  }
}

function editOrganizationHandler(organization) {
  editingOrganization.value = { ...organization }
}

async function updateOrganizationHandler() {
  try {
    const response = await api.put(`/organizations/${editingOrganization.value.organizationName}`, editingOrganization.value)
    const index = organizationInfo.value.findIndex(o => o.organizationName === editingOrganization.value.organizationName)
    if (index !== -1) {
      organizationInfo.value[index] = response.data
    }
    editingOrganization.value = null
    ElMessage.success('Organization updated successfully')
  }
  catch {
    ElMessage.error('Failed to update organization')
  }
}

async function removeOrganizationHandler(organizationName) {
  try {
    await api.delete(`/organizations/${organizationName}`)
    organizationInfo.value = organizationInfo.value.filter(o => o.organizationName !== organizationName)
    ElMessage.success('Organization removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove organization')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>公司机构信息管理</h1>
      </div>
      <ElForm label-width="120px" @submit.prevent="addOrganizationHandler">
        <ElFormItem label="机构名称">
          <ElInput v-model="newOrganization.organizationName" placeholder="机构名称" required />
        </ElFormItem>
        <ElFormItem label="类型">
          <ElInput v-model="newOrganization.type" placeholder="类型" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addOrganizationHandler">
            添加机构
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="organizationInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="organizationName" label="机构名称" width="150" />
          <ElTableColumn prop="type" label="类型" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editOrganizationHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeOrganizationHandler(scope.row.organizationName)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingOrganization" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑机构</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateOrganizationHandler">
          <ElFormItem label="机构名称">
            <ElInput v-model="editingOrganization.organizationName" placeholder="机构名称" required />
          </ElFormItem>
          <ElFormItem label="类型">
            <ElInput v-model="editingOrganization.type" placeholder="类型" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateOrganizationHandler">
              更新机构
            </ElButton>
            <ElButton @click="editingOrganization = null">
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
