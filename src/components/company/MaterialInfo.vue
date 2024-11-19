<script setup lang="ts">
import { useMaterialStore } from '@/store/material'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const materialStore = useMaterialStore()
const materialInfo = ref([])
const newMaterial = ref({ material_number: '', name: '', unit: '', cost_price: '', selling_price: '', quantity: '' })
const editingMaterial = ref<{ material_number: string, name: string, unit: string, cost_price: string, selling_price: string, quantity: string } | null>(null)

onMounted(async () => {
  try {
    await materialStore.loadMaterials()
    materialInfo.value = materialStore.materials
  }
  catch {
    ElMessage.error('Failed to fetch material info')
  }
})

async function addMaterial() {
  try {
    await materialStore.addMaterial(newMaterial.value)
    newMaterial.value = { material_number: '', name: '', unit: '', cost_price: '', selling_price: '', quantity: '' }
    ElMessage.success('Material added successfully')
  }
  catch {
    ElMessage.error('Failed to add material')
  }
}

function editMaterial(material) {
  editingMaterial.value = { ...material }
}

async function updateMaterial() {
  try {
    await materialStore.editMaterial(editingMaterial.value.material_number, editingMaterial.value)
    editingMaterial.value = null
    ElMessage.success('Material updated successfully')
  }
  catch {
    ElMessage.error('Failed to update material')
  }
}

async function removeMaterial(material_number) {
  try {
    await materialStore.removeMaterial(material_number)
    ElMessage.success('Material removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove material')
  }
}
</script>

<template>
  <div>
    <h1>材料信息管理</h1>
    <ElForm label-width="120px" @submit.prevent="addMaterial">
      <ElFormItem label="材料编号">
        <ElInput v-model="newMaterial.material_number" placeholder="材料编号" required />
      </ElFormItem>
      <ElFormItem label="名称">
        <ElInput v-model="newMaterial.name" placeholder="名称" required />
      </ElFormItem>
      <ElFormItem label="单位">
        <ElInput v-model="newMaterial.unit" placeholder="单位" required />
      </ElFormItem>
      <ElFormItem label="成本价">
        <ElInput v-model="newMaterial.cost_price" placeholder="成本价" required />
      </ElFormItem>
      <ElFormItem label="销售价">
        <ElInput v-model="newMaterial.selling_price" placeholder="销售价" required />
      </ElFormItem>
      <ElFormItem label="数量">
        <ElInput v-model="newMaterial.quantity" placeholder="数量" required />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="addMaterial">
          添加材料
        </ElButton>
      </ElFormItem>
    </ElForm>
    <ElTable :data="materialInfo" style="width: 100%;">
      <ElTableColumn prop="material_number" label="材料编号" width="180" />
      <ElTableColumn prop="name" label="名称" width="180" />
      <ElTableColumn prop="unit" label="单位" width="180" />
      <ElTableColumn prop="cost_price" label="成本价" width="180" />
      <ElTableColumn prop="selling_price" label="销售价" width="180" />
      <ElTableColumn prop="quantity" label="数量" width="180" />
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton type="primary" size="small" @click="editMaterial(scope.row)">
            编辑
          </ElButton>
          <ElButton type="danger" size="small" @click="removeMaterial(scope.row.material_number)">
            删除
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div v-if="editingMaterial">
      <h2>编辑材料</h2>
      <ElForm label-width="120px" @submit.prevent="updateMaterial">
        <ElFormItem label="材料编号">
          <ElInput v-model="editingMaterial.material_number" placeholder="材料编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="editingMaterial.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="单位">
          <ElInput v-model="editingMaterial.unit" placeholder="单位" required />
        </ElFormItem>
        <ElFormItem label="成本价">
          <ElInput v-model="editingMaterial.cost_price" placeholder="成本价" required />
        </ElFormItem>
        <ElFormItem label="销售价">
          <ElInput v-model="editingMaterial.selling_price" placeholder="销售价" required />
        </ElFormItem>
        <ElFormItem label="数量">
          <ElInput v-model="editingMaterial.quantity" placeholder="数量" required />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="updateMaterial">
            更新材料
          </ElButton>
          <ElButton @click="editingMaterial = null">
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
