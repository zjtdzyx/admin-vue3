<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productInfo = ref([
  { product_number: 'P001', name: '产品A', grade: '一级', origin: '中国', cost_price: '100', packaging: '盒装', inbound_date: '2023-01-01', quantity: '1000', auditedCount: '1000', systemCount: '1000', difference: '0' },
  { product_number: 'P002', name: '产品B', grade: '二级', origin: '美国', cost_price: '200', packaging: '袋装', inbound_date: '2023-02-01', quantity: '2000', auditedCount: '2000', systemCount: '2000', difference: '0' },
])
const newProduct = ref({ product_number: '', name: '', grade: '', origin: '', cost_price: '', packaging: '', inbound_date: '', quantity: '', auditedCount: '', systemCount: '', difference: '' })
const editingProduct = ref<{ product_number: string, name: string, grade: string, origin: string, cost_price: string, packaging: string, inbound_date: string, quantity: string, auditedCount: string, systemCount: string, difference: string } | null>(null)

onMounted(() => {
  // 模拟获取产品信息
  ElMessage.success('Product info loaded successfully')
})

function addProductHandler() {
  try {
    productInfo.value.push({ ...newProduct.value })
    newProduct.value = { product_number: '', name: '', grade: '', origin: '', cost_price: '', packaging: '', inbound_date: '', quantity: '', auditedCount: '', systemCount: '', difference: '' }
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
          <ElInput v-model="newProduct.inbound_date" placeholder="入库日期" required />
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
          <ElButton type="primary" @click="addProductHandler">
            添加产品
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="productInfo" style="width: auto; margin: 0 auto;" height="400" border>
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
            <ElInput v-model="editingProduct.inbound_date" placeholder="入库日期" required />
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
