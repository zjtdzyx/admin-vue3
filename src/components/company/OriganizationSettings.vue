<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 初始组织数据
const initialOrganizationInfo = [
  { organizationName: '公司', type: '类型A' },
  { organizationName: '批发中心', type: '类型A' },
  { organizationName: '代购点', type: '类型B' },
  { organizationName: '公司', type: '类型A' },
  { organizationName: '批发中心', type: '类型A' },
  { organizationName: '代购点', type: '类型C' }
]

// 从 localStorage 恢复组织数据
const storedOrganizationInfo = localStorage.getItem('organizationInfo')
const organizationInfo = ref(storedOrganizationInfo ? JSON.parse(storedOrganizationInfo) : [...initialOrganizationInfo])

const searchQuery = ref('')
const filteredOrganizationInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return organizationInfo.value
  return organizationInfo.value.filter(org =>
    Object.values(org).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newOrganization = ref({ organizationName: '', type: '' })
const editingOrganization = ref<{ organizationName: string, type: string } | null>(null)

onMounted(() => {
  ElMessage.success('Organization info loaded successfully')
})

// 保存数据到 localStorage
function updateLocalStorage() {
  localStorage.setItem('organizationInfo', JSON.stringify(organizationInfo.value))
}

function addOrganizationHandler() {
  organizationInfo.value.push({ ...newOrganization.value })
  updateLocalStorage()  // 更新 localStorage
  newOrganization.value = { organizationName: '', type: '' }
  ElMessage.success('Organization added successfully')
}

function editOrganizationHandler(organization) {
  editingOrganization.value = { ...organization }
}

function updateOrganizationHandler() {
  const index = organizationInfo.value.findIndex(o => o.organizationName === editingOrganization.value?.organizationName)
  if (index !== -1 && editingOrganization.value) {
    organizationInfo.value[index] = { ...editingOrganization.value }
    updateLocalStorage()  // 更新 localStorage
    editingOrganization.value = null
    ElMessage.success('Organization updated successfully')
  }
}

function removeOrganizationHandler(organizationName) {
  organizationInfo.value = organizationInfo.value.filter(o => o.organizationName !== organizationName)
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Organization removed successfully')
}

function restoreDataHandler() {
  organizationInfo.value = [...initialOrganizationInfo]  // 还原到初始数据
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Data restored to initial state')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>组织信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索组织..."
          clearable
        />
      </div>
      <ElForm label-width="120px" @submit.prevent="addOrganizationHandler">
        <ElFormItem label="组织名称">
          <ElInput v-model="newOrganization.organizationName" placeholder="组织名称" required />
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
        <ElTable :data="filteredOrganizationInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="organizationName" label="组织名称" width="150" />
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
      <!-- 还原按钮 -->
      <div class="restore-container">
        <ElButton type="warning" @click="restoreDataHandler">
          还原数据
        </ElButton>
      </div>
    </ElCard>
    <div v-if="editingOrganization" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑组织</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateOrganizationHandler">
          <ElFormItem label="组织名称">
            <ElInput v-model="editingOrganization.organizationName" placeholder="组织名称" required />
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
