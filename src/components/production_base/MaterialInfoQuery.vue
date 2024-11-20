<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const materialInfo = ref([
  { material_number: 'M001', name: '钢材', unit: '吨', cost_price: '5000', selling_price: '6000', quantity: '100' },
  { material_number: 'M002', name: '水泥', unit: '吨', cost_price: '300', selling_price: '400', quantity: '200' },
])
const newMaterial = ref({ material_number: '', name: '', unit: '', cost_price: '', selling_price: '', quantity: '' })
const editingMaterial = ref<{ material_number: string, name: string, unit: string, cost_price: string, selling_price: string, quantity: string } | null>(null)

onMounted(() => {
  // 模拟获取物资信息
  ElMessage.success('Material info loaded successfully')
})

function addMaterialHandler() {
  try {
    materialInfo.value.push({ ...newMaterial.value })
    newMaterial.value = { material_number: '', name: '', unit: '', cost_price: '', selling_price: '', quantity: '' }
    ElMessage.success('Material added successfully')
  }
  catch {
    ElMessage.error('Failed to add material')
  }
}

function editMaterialHandler(material) {
  editingMaterial.value = { ...material }
}

function updateMaterialHandler() {
  try {
    const index = materialInfo.value.findIndex(m => m.material_number === editingMaterial.value.material_number)
    if (index !== -1) {
      materialInfo.value[index] = { ...editingMaterial.value }
    }
    editingMaterial.value = null
    ElMessage.success('Material updated successfully')
  }
  catch {
    ElMessage.error('Failed to update material')
  }
}

function removeMaterialHandler(material_number) {
  try {
    materialInfo.value = materialInfo.value.filter(m => m.material_number !== material_number)
    ElMessage.success('Material removed successfully')
  }
  catch {
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
      <ElForm label-width="120px" @submit.prevent="addMaterialHandler">
        <ElFormItem label="物资编号">
          <ElInput v-model="newMaterial.material_number" placeholder="物资编号" required />
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
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addMaterialHandler">
            添加物资
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="materialInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="material_number" label="物资编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="unit" label="单位" width="150" />
          <ElTableColumn prop="cost_price" label="成本价" width="150" />
          <ElTableColumn prop="selling_price" label="销售价" width="150" />
          <ElTableColumn prop="quantity" label="数量" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editMaterialHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeMaterialHandler(scope.row.material_number)">
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
            <ElInput v-model="editingMaterial.material_number" placeholder="物资编号" required />
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
