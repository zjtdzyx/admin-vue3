<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 生成10组死数据
const initialOrganizationInfo = [
  { organizationName: '财务部', type: '行政' },
  { organizationName: '人事部', type: '行政' },
  { organizationName: '技术部', type: '技术' },
  { organizationName: '销售部', type: '市场' },
  { organizationName: '市场部', type: '市场' },
  { organizationName: '研发部', type: '技术' },
  { organizationName: '法务部', type: '行政' },
  { organizationName: '产品部', type: '技术' },
  { organizationName: '客服部', type: '支持' },
  { organizationName: '运营部', type: '管理' }
]

// 从 localStorage 恢复公司机构数据
const storedOrganizationInfo = localStorage.getItem('organizationInfo')
const organizationInfo = ref(storedOrganizationInfo ? JSON.parse(storedOrganizationInfo) : [...initialOrganizationInfo])

const searchQuery = ref('')
const filteredOrganizationInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return organizationInfo.value
  return organizationInfo.value.filter(organization =>
    Object.values(organization).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newOrganization = ref({ organizationName: '', type: '' })
const editingOrganization = ref<{ organizationName: string, type: string } | null>(null)

// 保存数据到 localStorage
function updateLocalStorage() {
  localStorage.setItem('organizationInfo', JSON.stringify(organizationInfo.value))
}

// 添加新公司机构
function addOrganizationHandler() {
  organizationInfo.value.push({ ...newOrganization.value })
  updateLocalStorage()
  newOrganization.value = { organizationName: '', type: '' }
  ElMessage.success('Organization added successfully')
}

// 编辑公司机构
function editOrganizationHandler(organization) {
  editingOrganization.value = { ...organization }
}

// 更新公司机构
function updateOrganizationHandler() {
  const index = organizationInfo.value.findIndex(o => o.organizationName === editingOrganization.value?.organizationName)
  if (index !== -1 && editingOrganization.value) {
    organizationInfo.value[index] = { ...editingOrganization.value }
    updateLocalStorage()
    editingOrganization.value = null
    ElMessage.success('Organization updated successfully')
  }
}

// 删除公司机构
function removeOrganizationHandler(organizationName) {
  organizationInfo.value = organizationInfo.value.filter(o => o.organizationName !== organizationName)
  updateLocalStorage()
  ElMessage.success('Organization removed successfully')
}

// 还原初始数据
function restoreDataHandler() {
  organizationInfo.value = [...initialOrganizationInfo]  // 还原到初始数据
  updateLocalStorage()
  ElMessage.success('Data restored to initial state')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>公司机构设置</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索机构..."
          clearable
        />
      </div>

      <!-- 添加机构表单 -->
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

      <!-- 公司机构表格 -->
      <div class="table-container">
        <ElTable :data="filteredOrganizationInfo" style="width: auto; margin: 0 auto;" height="400" border>
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

      <!-- 还原数据按钮 -->
      <div class="restore-container">
        <ElButton type="warning" @click="restoreDataHandler">
          还原数据
        </ElButton>
      </div>
    </ElCard>

    <!-- 编辑公司机构 -->
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

.restore-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.edit-container {
  margin-top: 20px;
}
</style>
