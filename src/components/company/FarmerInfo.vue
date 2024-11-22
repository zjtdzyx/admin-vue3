<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 静态农户数据
const staticFarmers = [
  { farmerNumber: '001', name: '农户A', address: '地址A', contact: '1234567890', sowingArea: '50亩' },
  { farmerNumber: '002', name: '农户B', address: '地址B', contact: '1234567891', sowingArea: '60亩' },
  { farmerNumber: '003', name: '农户C', address: '地址C', contact: '1234567892', sowingArea: '70亩' },
  { farmerNumber: '004', name: '农户D', address: '地址D', contact: '1234567893', sowingArea: '80亩' },
  { farmerNumber: '005', name: '农户E', address: '地址E', contact: '1234567894', sowingArea: '90亩' },
  { farmerNumber: '006', name: '农户F', address: '地址F', contact: '1234567895', sowingArea: '100亩' },
  { farmerNumber: '007', name: '农户G', address: '地址G', contact: '1234567896', sowingArea: '110亩' },
  { farmerNumber: '008', name: '农户H', address: '地址H', contact: '1234567897', sowingArea: '120亩' },
  { farmerNumber: '009', name: '农户I', address: '地址I', contact: '1234567898', sowingArea: '130亩' },
  { farmerNumber: '010', name: '农户J', address: '地址J', contact: '1234567899', sowingArea: '140亩' },
]

// 本地存储的农户数据
const farmerInfo = ref<any[]>([])

const searchQuery = ref('')
const filteredFarmerInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return farmerInfo.value
  return farmerInfo.value.filter(farmer =>
    Object.values(farmer).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newFarmer = ref({ farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' })
const editingFarmer = ref<{ farmerNumber: string, name: string, address: string, contact: string, sowingArea: string } | null>(null)

// 加载本地存储的农户数据，若没有则使用静态数据
onMounted(() => {
  const storedData = localStorage.getItem('farmers')
  if (storedData) {
    farmerInfo.value = JSON.parse(storedData)
  } else {
    farmerInfo.value = staticFarmers
    localStorage.setItem('farmers', JSON.stringify(staticFarmers)) // 存储静态数据
  }
})

async function addFarmerHandler() {
  try {
    // 模拟添加农户的操作
    const newData = { ...newFarmer.value }
    farmerInfo.value.push(newData)
    newFarmer.value = { farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' }
    localStorage.setItem('farmers', JSON.stringify(farmerInfo.value)) // 更新到localStorage
    ElMessage.success('Farmer added successfully')
  } catch (error) {
    ElMessage.error('Failed to add farmer')
  }
}

function editFarmerHandler(farmer) {
  editingFarmer.value = { ...farmer }
}

async function updateFarmerHandler() {
  try {
    const updatedFarmer = { ...editingFarmer.value }
    const index = farmerInfo.value.findIndex(f => f.farmerNumber === editingFarmer.value?.farmerNumber)
    if (index !== -1) {
      farmerInfo.value[index] = updatedFarmer
      editingFarmer.value = null
      localStorage.setItem('farmers', JSON.stringify(farmerInfo.value)) // 更新到localStorage
      ElMessage.success('Farmer updated successfully')
    }
  } catch (error) {
    ElMessage.error('Failed to update farmer')
  }
}

async function removeFarmerHandler(farmerNumber) {
  try {
    farmerInfo.value = farmerInfo.value.filter(f => f.farmerNumber !== farmerNumber)
    localStorage.setItem('farmers', JSON.stringify(farmerInfo.value)) // 更新到localStorage
    ElMessage.success('Farmer removed successfully')
  } catch (error) {
    ElMessage.error('Failed to remove farmer')
  }
}

// 还原数据按钮，恢复到静态数据
function restoreDataHandler() {
  farmerInfo.value = staticFarmers
  localStorage.setItem('farmers', JSON.stringify(staticFarmers)) // 更新到localStorage
  ElMessage.success('Data restored to initial static data')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>农户信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索农户..."
          clearable
        />
      </div>
      
      <ElForm label-width="120px" @submit.prevent="addFarmerHandler">
        <ElFormItem label="农户编号">
          <ElInput v-model="newFarmer.farmerNumber" placeholder="农户编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newFarmer.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="newFarmer.address" placeholder="地址" required />
        </ElFormItem>
        <ElFormItem label="联系人">
          <ElInput v-model="newFarmer.contact" placeholder="联系人" required />
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
        <ElTable :data="filteredFarmerInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="farmerNumber" label="农户编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="address" label="地址" width="150" />
          <ElTableColumn prop="contact" label="联系人" width="150" />
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

      <!-- 还原数据按钮 -->
      <ElButton type="warning" @click="restoreDataHandler">
        还原数据
      </ElButton>
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
          <ElFormItem label="地址">
            <ElInput v-model="editingFarmer.address" placeholder="地址" required />
          </ElFormItem>
          <ElFormItem label="联系人">
            <ElInput v-model="editingFarmer.contact" placeholder="联系人" required />
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
