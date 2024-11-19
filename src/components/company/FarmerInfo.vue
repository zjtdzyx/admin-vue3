<script setup lang="ts">
import { useFarmerStore } from '@/store/farmer'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const farmerStore = useFarmerStore()
const farmerInfo = ref([])
const newFarmer = ref({ farmer_number: '', name: '', address: '', contact: '', sowing_area: '' })
const editingFarmer = ref<{ farmer_number: string, name: string, address: string, contact: string, sowing_area: string } | null>(null)

onMounted(async () => {
  try {
    await farmerStore.loadFarmers()
    farmerInfo.value = farmerStore.farmers
  }
  catch {
    ElMessage.error('Failed to fetch farmer info')
  }
})

async function addFarmer() {
  try {
    await farmerStore.addFarmer(newFarmer.value)
    newFarmer.value = { farmer_number: '', name: '', address: '', contact: '', sowing_area: '' }
    ElMessage.success('Farmer added successfully')
  }
  catch {
    ElMessage.error('Failed to add farmer')
  }
}

function editFarmer(farmer) {
  editingFarmer.value = { ...farmer }
}

async function updateFarmer() {
  try {
    await farmerStore.editFarmer(editingFarmer.value.farmer_number, editingFarmer.value)
    editingFarmer.value = null
    ElMessage.success('Farmer updated successfully')
  }
  catch {
    ElMessage.error('Failed to update farmer')
  }
}

async function removeFarmer(farmer_number) {
  try {
    await farmerStore.removeFarmer(farmer_number)
    ElMessage.success('Farmer removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove farmer')
  }
}
</script>

<template>
  <div>
    <h1>农户信息管理</h1>
    <ElForm label-width="120px" @submit.prevent="addFarmer">
      <ElFormItem label="农民编号">
        <ElInput v-model="newFarmer.farmer_number" placeholder="农民编号" required />
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
        <ElInput v-model="newFarmer.sowing_area" placeholder="播种面积" required />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="addFarmer">
          添加农民
        </ElButton>
      </ElFormItem>
    </ElForm>
    <ElTable :data="farmerInfo" style="width: 100%;">
      <ElTableColumn prop="farmer_number" label="农民编号" width="180" />
      <ElTableColumn prop="name" label="名称" width="180" />
      <ElTableColumn prop="address" label="地址" width="180" />
      <ElTableColumn prop="contact" label="联系人" width="180" />
      <ElTableColumn prop="sowing_area" label="播种面积" width="180" />
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton type="primary" size="small" @click="editFarmer(scope.row)">
            编辑
          </ElButton>
          <ElButton type="danger" size="small" @click="removeFarmer(scope.row.farmer_number)">
            删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="editingFarmer">
      <h2>编辑农民</h2>
      <ElForm label-width="120px" @submit.prevent="updateFarmer">
        <ElFormItem label="农民编号">
          <ElInput v-model="editingFarmer.farmer_number" placeholder="农民编号" required />
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
          <ElInput v-model="editingFarmer.sowing_area" placeholder="播种面积" required />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="updateFarmer">
            更新农民
          </ElButton>
          <ElButton @click="editingFarmer = null">
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
