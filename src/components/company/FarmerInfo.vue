<script setup lang="ts">
import axios from 'axios'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const farmerInfo = ref([])
const newFarmer = ref({ farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' })
const editingFarmer = ref<{ farmerNumber: string, name: string, address: string, contact: string, sowingArea: string } | null>(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

onMounted(async () => {
  try {
    const response = await api.get('/farmers')
    farmerInfo.value = response.data
    ElMessage.success('Farmer info loaded successfully')
  }
  catch {
    ElMessage.error('Failed to load farmer info')
  }
})

async function addFarmerHandler() {
  try {
    const response = await api.post('/farmers', newFarmer.value)
    farmerInfo.value.push(response.data)
    newFarmer.value = { farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' }
    ElMessage.success('Farmer added successfully')
  }
  catch {
    ElMessage.error('Failed to add farmer')
  }
}

function editFarmerHandler(farmer) {
  editingFarmer.value = { ...farmer }
}

async function updateFarmerHandler() {
  try {
    const response = await api.put(`/farmers/${editingFarmer.value.farmerNumber}`, editingFarmer.value)
    const index = farmerInfo.value.findIndex(f => f.farmerNumber === editingFarmer.value.farmerNumber)
    if (index !== -1) {
      farmerInfo.value[index] = response.data
    }
    editingFarmer.value = null
    ElMessage.success('Farmer updated successfully')
  }
  catch {
    ElMessage.error('Failed to update farmer')
  }
}

async function removeFarmerHandler(farmerNumber) {
  try {
    await api.delete(`/farmers/${farmerNumber}`)
    farmerInfo.value = farmerInfo.value.filter(f => f.farmerNumber !== farmerNumber)
    ElMessage.success('Farmer removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove farmer')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>农户信息管理</h1>
      </div>
      <ElForm label-width="120px" @submit.prevent="addFarmerHandler">
        <ElFormItem label="农户编号">
          <ElInput v-model="newFarmer.farmerNumber" placeholder="农户编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newFarmer.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="住址">
          <ElInput v-model="newFarmer.address" placeholder="住址" required />
        </ElFormItem>
        <ElFormItem label="联系电话">
          <ElInput v-model="newFarmer.contact" placeholder="联系电话" required />
        </ElFormItem>
        <ElFormItem label="播种面积">
          <ElInput v-model="newFarmer.sowingArea" placeholder="播种面积" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addFarmerHandler">
            添加农户
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="farmerInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="farmerNumber" label="农户编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="address" label="住址" width="150" />
          <ElTableColumn prop="contact" label="联系电话" width="150" />
          <ElTableColumn prop="sowingArea" label="播种面积" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editFarmerHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeFarmerHandler(scope.row.farmerNumber)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingFarmer" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑农户</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateFarmerHandler">
          <ElFormItem label="农户编号">
            <ElInput v-model="editingFarmer.farmerNumber" placeholder="农户编号" required />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="editingFarmer.name" placeholder="名称" required />
          </ElFormItem>
          <ElFormItem label="住址">
            <ElInput v-model="editingFarmer.address" placeholder="住址" required />
          </ElFormItem>
          <ElFormItem label="联系电话">
            <ElInput v-model="editingFarmer.contact" placeholder="联系电话" required />
          </ElFormItem>
          <ElFormItem label="播种面积">
            <ElInput v-model="editingFarmer.sowingArea" placeholder="播种面积" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateFarmerHandler">
              更新农户
            </ElButton>
            <ElButton @click="editingFarmer = null">
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
