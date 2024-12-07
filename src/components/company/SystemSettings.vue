<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 初始数据：用于恢复数据
const initialUserInfo = [
  { user_id: 'U001', username: 'admin', created_at: '2023-01-01', last_login_time: '2023-01-10', status: '启用' },
  { user_id: 'U002', username: 'user', created_at: '2023-02-01', last_login_time: '2023-02-10', status: '禁用' },
  { user_id: 'U003', username: 'guest', created_at: '2023-03-01', last_login_time: '2023-03-10', status: '启用' },
  { user_id: 'U004', username: 'manager', created_at: '2023-04-01', last_login_time: '2023-04-10', status: '禁用' },
  { user_id: 'U005', username: 'developer', created_at: '2023-05-01', last_login_time: '2023-05-10', status: '启用' },
]

// 尝试从 localStorage 获取数据，若无则使用初始数据
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || JSON.stringify(initialUserInfo)))

const searchQuery = ref('')
const filteredUserInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return userInfo.value
  return userInfo.value.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newUser = ref({ user_id: '', username: '', created_at: '', last_login_time: '', status: '' })
const editingUser = ref<{ user_id: string, username: string, created_at: string, last_login_time: string, status: string } | null>(null)

onMounted(() => {
  ElMessage.success('User info loaded successfully')
})

function addUserHandler() {
  try {
    userInfo.value.push({ ...newUser.value })
    newUser.value = { user_id: '', username: '', created_at: '', last_login_time: '', status: '' }
    saveDataToLocalStorage()
    ElMessage.success('User added successfully')
  }
  catch {
    ElMessage.error('Failed to add user')
  }
}

function editUserHandler(user) {
  editingUser.value = { ...user }
}

function updateUserHandler() {
  try {
    const index = userInfo.value.findIndex(u => u.user_id === editingUser.value.user_id)
    if (index !== -1) {
      userInfo.value[index] = { ...editingUser.value }
      saveDataToLocalStorage()
    }
    editingUser.value = null
    ElMessage.success('User updated successfully')
  }
  catch {
    ElMessage.error('Failed to update user')
  }
}

function removeUserHandler(user_id) {
  try {
    userInfo.value = userInfo.value.filter(u => u.user_id !== user_id)
    saveDataToLocalStorage()
    ElMessage.success('User removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove user')
  }
}

// 将数据保存到 localStorage
function saveDataToLocalStorage() {
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
}

// 还原数据：恢复到初始数据
function restoreData() {
  userInfo.value = [...initialUserInfo] // 使用初始数据恢复
  saveDataToLocalStorage() // 恢复后同步到 localStorage
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>用户权限管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索用户..."
          clearable
        />
      </div>
      <ElForm label-width="120px" @submit.prevent="addUserHandler">
        <ElFormItem label="用户ID">
          <ElInput v-model="newUser.user_id" placeholder="用户ID" required />
        </ElFormItem>
        <ElFormItem label="用户名">
          <ElInput v-model="newUser.username" placeholder="用户名" required />
        </ElFormItem>
        <ElFormItem label="创建时间">
          <ElInput v-model="newUser.created_at" placeholder="创建时间" required />
        </ElFormItem>
        <ElFormItem label="最后登录时间">
          <ElInput v-model="newUser.last_login_time" placeholder="最后登录时间" required />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElInput v-model="newUser.status" placeholder="状态" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addUserHandler">
            添加用户
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="filteredUserInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="user_id" label="用户ID" width="150" />
          <ElTableColumn prop="username" label="用户名" width="150" />
          <ElTableColumn prop="created_at" label="创建时间" width="150" />
          <ElTableColumn prop="last_login_time" label="最后登录时间" width="150" />
          <ElTableColumn prop="status" label="状态" width="150">
            <template #default="scope">
              <span :style="{ color: scope.row.status === '启用' ? 'green' : 'red', fontWeight: 'bold', fontSize: '16px' }">
                {{ scope.row.status }}
              </span>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editUserHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeUserHandler(scope.row.user_id)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <ElButton type="warning" @click="restoreData">还原数据</ElButton>
    </ElCard>
    <div v-if="editingUser" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑用户</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateUserHandler">
          <ElFormItem label="用户ID">
            <ElInput v-model="editingUser.user_id" placeholder="用户ID" required />
          </ElFormItem>
          <ElFormItem label="用户名">
            <ElInput v-model="editingUser.username" placeholder="用户名" required />
          </ElFormItem>
          <ElFormItem label="创建时间">
            <ElInput v-model="editingUser.created_at" placeholder="创建时间" required />
          </ElFormItem>
          <ElFormItem label="最后登录时间">
            <ElInput v-model="editingUser.last_login_time" placeholder="最后登录时间" required />
          </ElFormItem>
          <ElFormItem label="状态">
            <ElInput v-model="editingUser.status" placeholder="状态" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateUserHandler">
              更新用户
            </ElButton>
            <ElButton @click="editingUser = null">
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
