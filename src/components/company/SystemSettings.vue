<script setup lang="ts">
import { useSystemStore } from '@/store/system'
import { ElButton, ElCard, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const systemStore = useSystemStore()
const systemSettings = ref([])

onMounted(async () => {
  try {
    await systemStore.loadSystemSettings()
    systemSettings.value = systemStore.settings
  }
  catch {
    ElMessage.error('Failed to fetch system settings')
  }
})

function viewDetails(_user) {
  // 查看详情逻辑
}

function editUser(_user) {
  // 编辑用户逻辑
}

async function deleteUser(userId) {
  try {
    await systemStore.deleteUser(userId)
    ElMessage.success('User deleted successfully')
  }
  catch {
    ElMessage.error('Failed to delete user')
  }
}

function resetPassword(_user) {
  // 重置密码逻辑
}

async function toggleStatus(user) {
  try {
    await systemStore.toggleUserStatus(user.id)
    ElMessage.success('User status updated successfully')
  }
  catch {
    ElMessage.error('Failed to update user status')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>系统设置</h1>
      </div>
      <div class="table-container">
        <ElTable :data="systemSettings" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="id" label="用户ID" width="150" />
          <ElTableColumn prop="username" label="用户名" width="150" />
          <ElTableColumn prop="created_at" label="创建时间" width="150" />
          <ElTableColumn prop="last_login_time" label="最后登录时间" width="150" />
          <ElTableColumn prop="status" label="状态" width="150" />
          <ElTableColumn label="操作" width="300">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="viewDetails(scope.row)">
                查看详情
              </ElButton>
              <ElButton type="primary" size="small" @click="editUser(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="deleteUser(scope.row.id)">
                删除
              </ElButton>
              <ElButton type="warning" size="small" @click="resetPassword(scope.row)">
                重置密码
              </ElButton>
              <ElButton type="info" size="small" @click="toggleStatus(scope.row)">
                {{ scope.row.status === 'enabled' ? '禁用' : '启用' }}
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
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

.table-container {
  display: flex;
  justify-content: center;
}
</style>
