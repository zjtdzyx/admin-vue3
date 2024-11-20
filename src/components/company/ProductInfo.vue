<script setup lang="ts">
import axios from 'axios'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productInfo = ref([])
const newProduct = ref({ productNumber: '', name: '', grade: '', origin: '', costPrice: '', packaging: '' })
const editingProduct = ref<{ productNumber: string, name: string, grade: string, origin: string, costPrice: string, packaging: string } | null>(null)

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASEURL,
  timeout: 1000 * 60,
  responseType: 'json',
})

onMounted(async () => {
  try {
    const response = await api.get('/products')
    productInfo.value = response.data
    ElMessage.success('Product info loaded successfully')
  }
  catch {
    ElMessage.error('Failed to load product info')
  }
})

async function addProductHandler() {
  try {
    const response = await api.post('/products', newProduct.value)
    productInfo.value.push(response.data)
    newProduct.value = { productNumber: '', name: '', grade: '', origin: '', costPrice: '', packaging: '' }
    ElMessage.success('Product added successfully')
  }
  catch {
    ElMessage.error('Failed to add product')
  }
}

function editProductHandler(product) {
  editingProduct.value = { ...product }
}

async function updateProductHandler() {
  try {
    const response = await api.put(`/products/${editingProduct.value.productNumber}`, editingProduct.value)
    const index = productInfo.value.findIndex(p => p.productNumber === editingProduct.value.productNumber)
    if (index !== -1) {
      productInfo.value[index] = response.data
    }
    editingProduct.value = null
    ElMessage.success('Product updated successfully')
  }
  catch {
    ElMessage.error('Failed to update product')
  }
}

async function removeProductHandler(productNumber) {
  try {
    await api.delete(`/products/${productNumber}`)
    productInfo.value = productInfo.value.filter(p => p.productNumber !== productNumber)
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
          <ElInput v-model="newProduct.productNumber" placeholder="产品编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newProduct.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="等级">
          <ElInput v-model="newProduct.grade" placeholder="等级" required />
        </ElFormItem>
        <ElFormItem label="产地">
          <ElInput v-model="newProduct.origin" placeholder="产地" required />
        </ElFormItem>
        <ElFormItem label="成本价">
          <ElInput v-model="newProduct.costPrice" placeholder="成本价" required />
        </ElFormItem>
        <ElFormItem label="包装">
          <ElInput v-model="newProduct.packaging" placeholder="包装" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addProductHandler">
            添加产品
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="productInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="productNumber" label="产品编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="grade" label="等级" width="150" />
          <ElTableColumn prop="origin" label="产地" width="150" />
          <ElTableColumn prop="costPrice" label="成本价" width="150" />
          <ElTableColumn prop="packaging" label="包装" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editProductHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeProductHandler(scope.row.productNumber)">
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
            <ElInput v-model="editingProduct.productNumber" placeholder="产品编号" required />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="editingProduct.name" placeholder="名称" required />
          </ElFormItem>
          <ElFormItem label="等级">
            <ElInput v-model="editingProduct.grade" placeholder="等级" required />
          </ElFormItem>
          <ElFormItem label="产地">
            <ElInput v-model="editingProduct.origin" placeholder="产地" required />
          </ElFormItem>
          <ElFormItem label="成本价">
            <ElInput v-model="editingProduct.costPrice" placeholder="成本价" required />
          </ElFormItem>
          <ElFormItem label="包装">
            <ElInput v-model="editingProduct.packaging" placeholder="包装" required />
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
