<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productInfo = ref([
  { product_number: 'P001', product_name: '产品A', type: '类型1' },
  { product_number: 'P002', product_name: '产品B', type: '类型2' },
])
const newProduct = ref({ product_number: '', product_name: '', type: '' })
const editingProduct = ref<{ product_number: string, product_name: string, type: string } | null>(null)

onMounted(() => {
  // 模拟获取产品信息
  ElMessage.success('Product info loaded successfully')
})

function addProductHandler() {
  try {
    productInfo.value.push({ ...newProduct.value })
    newProduct.value = { product_number: '', product_name: '', type: '' }
    ElMessage.success('Product added successfully')
  }
  catch {
    ElMessage.error('Failed to add product')
  }
}

function editProductHandler(product) {
  editingProduct.value = { ...product }
}

function updateProductHandler() {
  try {
    const index = productInfo.value.findIndex(p => p.product_number === editingProduct.value.product_number)
    if (index !== -1) {
      productInfo.value[index] = { ...editingProduct.value }
    }
    editingProduct.value = null
    ElMessage.success('Product updated successfully')
  }
  catch {
    ElMessage.error('Failed to update product')
  }
}

function removeProductHandler(product_number) {
  try {
    productInfo.value = productInfo.value.filter(p => p.product_number !== product_number)
    ElMessage.success('Product removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove product')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>产品信息管理</h1>
      </div>
      <ElForm label-width="120px" @submit.prevent="addProductHandler">
        <ElFormItem label="产品编号">
          <ElInput v-model="newProduct.product_number" placeholder="产品编号" required />
        </ElFormItem>
        <ElFormItem label="产品名称">
          <ElInput v-model="newProduct.product_name" placeholder="产品名称" required />
        </ElFormItem>
        <ElFormItem label="类型">
          <ElInput v-model="newProduct.type" placeholder="类型" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addProductHandler">
            添加产品
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="productInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="product_number" label="产品编号" width="150" />
          <ElTableColumn prop="product_name" label="产品名称" width="150" />
          <ElTableColumn prop="type" label="类型" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editProductHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeProductHandler(scope.row.product_number)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingProduct" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑产品</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateProductHandler">
          <ElFormItem label="产品编号">
            <ElInput v-model="editingProduct.product_number" placeholder="产品编号" required />
          </ElFormItem>
          <ElFormItem label="产品名称">
            <ElInput v-model="editingProduct.product_name" placeholder="产品名称" required />
          </ElFormItem>
          <ElFormItem label="类型">
            <ElInput v-model="editingProduct.type" placeholder="类型" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateProductHandler">
              更新产品
            </ElButton>
            <ElButton @click="editingProduct = null">
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
