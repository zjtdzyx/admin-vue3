<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 初始材料数据
const initialMaterialInfo = [
  { materialNumber: 'M001', name: '化肥', unit: '吨', costPrice: '2000元/吨', sellingPrice: '2500元/吨' },
  { materialNumber: 'M002', name: '农药', unit: '升', costPrice: '100元/升', sellingPrice: '150元/升' },
  { materialNumber: 'M003', name: '种子', unit: '公斤', costPrice: '50元/公斤', sellingPrice: '80元/公斤' },
  { materialNumber: 'M004', name: '饲料', unit: '吨', costPrice: '3000元/吨', sellingPrice: '3500元/吨' },
  { materialNumber: 'M005', name: '农膜', unit: '卷', costPrice: '500元/卷', sellingPrice: '600元/卷' },
  { materialNumber: 'M006', name: '滴灌设备', unit: '套', costPrice: '1000元/套', sellingPrice: '1200元/套' },
  { materialNumber: 'M007', name: '农机配件', unit: '件', costPrice: '200元/件', sellingPrice: '250元/件' },
  { materialNumber: 'M008', name: '有机肥', unit: '吨', costPrice: '1500元/吨', sellingPrice: '1800元/吨' }
]

// 从 localStorage 恢复材料数据
const storedMaterialInfo = localStorage.getItem('materialInfo')
const materialInfo = ref(storedMaterialInfo ? JSON.parse(storedMaterialInfo) : [...initialMaterialInfo])

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

onMounted(() => {
  ElMessage.success('Material info loaded successfully')
})

// 保存数据到 localStorage
function updateLocalStorage() {
  localStorage.setItem('materialInfo', JSON.stringify(materialInfo.value))
}

function addMaterialHandler() {
  materialInfo.value.push({ ...newMaterial.value })
  updateLocalStorage()  // 更新 localStorage
  newMaterial.value = { materialNumber: '', name: '', unit: '', costPrice: '', sellingPrice: '' }
  ElMessage.success('Material added successfully')
}

function editMaterialHandler(material) {
  editingMaterial.value = { ...material }
}

function updateMaterialHandler() {
  const index = materialInfo.value.findIndex(m => m.materialNumber === editingMaterial.value?.materialNumber)
  if (index !== -1 && editingMaterial.value) {
    materialInfo.value[index] = { ...editingMaterial.value }
    updateLocalStorage()  // 更新 localStorage
    editingMaterial.value = null
    ElMessage.success('Material updated successfully')
  }
}

function removeMaterialHandler(materialNumber) {
  materialInfo.value = materialInfo.value.filter(m => m.materialNumber !== materialNumber)
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Material removed successfully')
}

function restoreDataHandler() {
  materialInfo.value = [...initialMaterialInfo]  // 还原到初始数据
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Data restored to initial state')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>材料信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索材料..."
          clearable
        />
      </div>
      <ElForm label-width="120px" @submit.prevent="addMaterialHandler">
        <ElFormItem label="材料编号">
          <ElInput v-model="newMaterial.materialNumber" placeholder="材料编号" required />
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
            添加材料
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="filteredMaterialInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="materialNumber" label="材料编号" width="150" />
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
      <!-- 还原按钮 -->
      <div class="restore-container">
        <ElButton type="warning" @click="restoreDataHandler">
          还原数据
        </ElButton>
      </div>
    </ElCard>
    <div v-if="editingMaterial" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑材料</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateMaterialHandler">
          <ElFormItem label="材料编号">
            <ElInput v-model="editingMaterial.materialNumber" placeholder="材料编号" required />
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
              更新材料
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
