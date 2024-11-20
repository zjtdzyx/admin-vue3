<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const organizationInfo = ref([
  { organization_number: 'O001', organization_name: '研发部', type: '技术' },
  { organization_number: 'O002', organization_name: '销售部', type: '市场' },
])
const newOrganization = ref({ organization_number: '', organization_name: '', type: '' })
const editingOrganization = ref<{ organization_number: string, organization_name: string, type: string } | null>(null)

onMounted(() => {
  // 模拟获取公司机构信息
  ElMessage.success('Organization info loaded successfully')
})

function addOrganizationHandler() {
  try {
    organizationInfo.value.push({ ...newOrganization.value })
    newOrganization.value = { organization_number: '', organization_name: '', type: '' }
    ElMessage.success('Organization added successfully')
  }
  catch {
    ElMessage.error('Failed to add organization')
  }
}

function editOrganizationHandler(organization) {
  editingOrganization.value = { ...organization }
}

function updateOrganizationHandler() {
  try {
    const index = organizationInfo.value.findIndex(o => o.organization_number === editingOrganization.value.organization_number)
    if (index !== -1) {
      organizationInfo.value[index] = { ...editingOrganization.value }
    }
    editingOrganization.value = null
    ElMessage.success('Organization updated successfully')
  }
  catch {
    ElMessage.error('Failed to update organization')
  }
}

function removeOrganizationHandler(organization_number) {
  try {
    organizationInfo.value = organizationInfo.value.filter(o => o.organization_number !== organization_number)
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
        <ElFormItem label="组织编号">
          <ElInput v-model="newOrganization.organization_number" placeholder="组织编号" required />
        </ElFormItem>
        <ElFormItem label="组织名称">
          <ElInput v-model="newOrganization.organization_name" placeholder="组织名称" required />
        </ElFormItem>
        <ElFormItem label="类型">
          <ElInput v-model="newOrganization.type" placeholder="类型" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addOrganizationHandler">
            添加组织
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="organizationInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="organization_number" label="组织编号" width="150" />
          <ElTableColumn prop="organization_name" label="组织名称" width="150" />
          <ElTableColumn prop="type" label="类型" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editOrganizationHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeOrganizationHandler(scope.row.organization_number)">
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
          <h2>编辑组织</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateOrganizationHandler">
          <ElFormItem label="组织编号">
            <ElInput v-model="editingOrganization.organization_number" placeholder="组织编号" required />
          </ElFormItem>
          <ElFormItem label="组织名称">
            <ElInput v-model="editingOrganization.organization_name" placeholder="组织名称" required />
          </ElFormItem>
          <ElFormItem label="类型">
            <ElInput v-model="editingOrganization.type" placeholder="类型" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateOrganizationHandler">
              更新组织
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
