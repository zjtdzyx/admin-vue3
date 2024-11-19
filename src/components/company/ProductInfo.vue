<script setup lang="ts">
import { useProductStore } from '@/store/product'
import { ElButton, ElCard, ElDatePicker, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productStore = useProductStore()
const productInfo = ref([])
const newProduct = ref({ product_number: '', name: '', grade: '', origin: '', cost_price: '', packaging: '', inbound_date: '', quantity: '', auditedCount: '', systemCount: '', difference: '' })
const editingProduct = ref<{ product_number: string, name: string, grade: string, origin: string, cost_price: string, packaging: string, inbound_date: string, quantity: string, auditedCount: string, systemCount: string, difference: string } | null>(null)

onMounted(async () => {
  try {
    await productStore.loadProducts()
    productInfo.value = productStore.products
  }
  catch {
    ElMessage.error('Failed to fetch product info')
  }
})

async function addProduct() {
  try {
    await productStore.addProduct(newProduct.value)
    newProduct.value = { product_number: '', name: '', grade: '', origin: '', cost_price: '', packaging: '', inbound_date: '', quantity: '', auditedCount: '', systemCount: '', difference: '' }
    ElMessage.success('Product added successfully')
  }
  catch {
    ElMessage.error('Failed to add product')
  }
}

function editProduct(product) {
  editingProduct.value = { ...product }
}

async function updateProduct() {
  try {
    await productStore.editProduct(editingProduct.value.product_number, editingProduct.value)
    editingProduct.value = null
    ElMessage.success('Product updated successfully')
  }
  catch {
    ElMessage.error('Failed to update product')
  }
}

async function removeProduct(product_number) {
  try {
    await productStore.removeProduct(product_number)
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
      <ElForm label-width="120px" @submit.prevent="addProduct">
        <ElFormItem label="产品编号">
          <ElInput v-model="newProduct.product_number" placeholder="产品编号" required />
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
          <ElInput v-model="newProduct.cost_price" placeholder="成本价" required />
        </ElFormItem>
        <ElFormItem label="包装">
          <ElInput v-model="newProduct.packaging" placeholder="包装" required />
        </ElFormItem>
        <ElFormItem label="入库日期">
          <ElDatePicker v-model="newProduct.inbound_date" placeholder="入库日期" required />
        </ElFormItem>
        <ElFormItem label="数量">
          <ElInput v-model="newProduct.quantity" placeholder="数量" required />
        </ElFormItem>
        <ElFormItem label="盘点前数量">
          <ElInput v-model="newProduct.auditedCount" placeholder="盘点前数量" required />
        </ElFormItem>
        <ElFormItem label="盘点后数量">
          <ElInput v-model="newProduct.systemCount" placeholder="盘点后数量" required />
        </ElFormItem>
        <ElFormItem label="盘点前后差异">
          <ElInput v-model="newProduct.difference" placeholder="盘点前后差异" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addProduct">
            添加产品
          </ElButton>
        </ElFormItem>
      </ElForm>
      <ElTable :data="productInfo" style="width: 100%; overflow-x: auto;" height="400" border>
        <ElTableColumn prop="product_number" label="产品编号" width="150" />
        <ElTableColumn prop="name" label="名称" width="150" />
        <ElTableColumn prop="grade" label="等级" width="150" />
        <ElTableColumn prop="origin" label="产地" width="150" />
        <ElTableColumn prop="cost_price" label="成本价" width="150" />
        <ElTableColumn prop="packaging" label="包装" width="150" />
        <ElTableColumn prop="inbound_date" label="入库日期" width="150" />
        <ElTableColumn prop="quantity" label="数量" width="150" />
        <ElTableColumn prop="auditedCount" label="盘点前数量" width="150" />
        <ElTableColumn prop="systemCount" label="盘点后数量" width="150" />
        <ElTableColumn prop="difference" label="盘点前后差异" width="150" />
        <ElTableColumn label="操作" width="150">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="editProduct(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" @click="removeProduct(scope.row.product_number)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <div v-if="editingProduct">
      <h2>编辑产品</h2>
      <ElForm label-width="120px" @submit.prevent="updateProduct">
        <ElFormItem label="产品编号">
          <ElInput v-model="editingProduct.product_number" placeholder="产品编号" required />
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
          <ElInput v-model="editingProduct.cost_price" placeholder="成本价" required />
        </ElFormItem>
        <ElFormItem label="包装">
          <ElInput v-model="editingProduct.packaging" placeholder="包装" required />
        </ElFormItem>
        <ElFormItem label="入库日期">
          <ElDatePicker v-model="editingProduct.inbound_date" placeholder="入库日期" required />
        </ElFormItem>
        <ElFormItem label="数量">
          <ElInput v-model="editingProduct.quantity" placeholder="数量" required />
        </ElFormItem>
        <ElFormItem label="盘点前数量">
          <ElInput v-model="editingProduct.auditedCount" placeholder="盘点前数量" required />
        </ElFormItem>
        <ElFormItem label="盘点后数量">
          <ElInput v-model="editingProduct.systemCount" placeholder="盘点后数量" required />
        </ElFormItem>
        <ElFormItem label="盘点前后差异">
          <ElInput v-model="editingProduct.difference" placeholder="盘点前后差异" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="updateProduct">
            更新产品
          </ElButton>
          <ElButton @click="editingProduct = null">
            取消
          </ElButton>
        </ElFormItem>
      </ElForm>
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
</style>
