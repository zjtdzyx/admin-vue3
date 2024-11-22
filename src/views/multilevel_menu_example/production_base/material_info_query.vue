<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'
import { createMaterial, getMaterials, updateMaterial, deleteMaterial } from '@/api/material'

// 物资数据
const materialInfo = ref([])

const searchQuery = ref('')
const filteredMaterialInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return materialInfo.value
  return materialInfo.value.filter(material =>
    Object.values(material).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newMaterial = ref({ materialNumber: '', name: '', unit: '', costPrice: '', sellingPrice: '' })
const editingMaterial = ref<{ materialNumber: string, name: string, unit: string, costPrice: string, sellingPrice: string } | null>(null)

onMounted(async () => {
  try {
    const response = await getMaterials()
    materialInfo.value = response
    ElMessage.success('Material info loaded successfully')
  } catch (error) {
    ElMessage.error('Failed to load material info')
  }
})

async function addMaterialHandler() {
  try {
    const response = await createMaterial(newMaterial.value)
    materialInfo.value.push(response)
    newMaterial.value = { materialNumber: '', name: '', unit: '', costPrice: '', sellingPrice: '' }
    ElMessage.success('Material added successfully')
  } catch (error) {
    ElMessage.error('Failed to add material')
  }
}

function editMaterialHandler(material) {
  editingMaterial.value = { ...material }
}

async function updateMaterialHandler() {
  try {
    const response = await updateMaterial(editingMaterial.value.materialNumber, editingMaterial.value)
    const index = materialInfo.value.findIndex(m => m.materialNumber === editingMaterial.value?.materialNumber)
    if (index !== -1) {
      materialInfo.value[index] = response
      editingMaterial.value = null
      ElMessage.success('Material updated successfully')
    }
  } catch (error) {
    ElMessage.error('Failed to update material')
  }
}

async function removeMaterialHandler(materialNumber) {
  try {
    await deleteMaterial(materialNumber)
    materialInfo.value = materialInfo.value.filter(m => m.materialNumber !== materialNumber)
    ElMessage.success('Material removed successfully')
  } catch (error) {
    ElMessage.error('Failed to remove material')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>物资信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索物资..."
          clearable
        />
      </div>
      
      <ElForm label-width="120px" @submit.prevent="addMaterialHandler">
        <ElFormItem label="物资编号">
          <ElInput v-model="newMaterial.materialNumber" placeholder="物资编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newMaterial.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="单位">
          <ElInput v-model="newMaterial.unit" placeholder="单位" required />
        </ElFormItem>
        <ElFormItem label="成本价">
          <ElInput v-model="newMaterial.costPrice" placeholder="成本价" required />
        </ElFormItem>
        <ElFormItem label="售价">
          <ElInput v-model="newMaterial.sellingPrice" placeholder="售价" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addMaterialHandler">
            添加物资
          </ElButton>
        </ElFormItem>
      </ElForm>

      <div class="table-container">
        <ElTable :data="filteredMaterialInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="materialNumber" label="物资编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="unit" label="单位" width="150" />
          <ElTableColumn prop="costPrice" label="成本价" width="150" />
          <ElTableColumn prop="sellingPrice" label="售价" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editMaterialHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeMaterialHandler(scope.row.materialNumber)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingMaterial" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑物资</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateMaterialHandler">
          <ElFormItem label="物资编号">
            <ElInput v-model="editingMaterial.materialNumber" placeholder="物资编号" required />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="editingMaterial.name" placeholder="名称" required />
          </ElFormItem>
          <ElFormItem label="单位">
            <ElInput v-model="editingMaterial.unit" placeholder="单位" required />
          </ElFormItem>
          <ElFormItem label="成本价">
            <ElInput v-model="editingMaterial.costPrice" placeholder="成本价" required />
          </ElFormItem>
          <ElFormItem label="售价">
            <ElInput v-model="editingMaterial.sellingPrice" placeholder="售价" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateMaterialHandler">
              更新物资
            </ElButton>
            <ElButton @click="editingMaterial = null">
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