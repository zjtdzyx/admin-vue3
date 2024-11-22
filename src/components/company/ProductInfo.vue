<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

// 初始产品数据
const initialProductInfo = [
  { productNumber: 'P001', name: '苹果', grade: 'A', origin: '山东', costPrice: '5元/斤', packaging: '纸箱' },
  { productNumber: 'P002', name: '香蕉', grade: 'B', origin: '海南', costPrice: '3元/斤', packaging: '塑料袋' },
  { productNumber: 'P003', name: '橙子', grade: 'A', origin: '江西', costPrice: '4元/斤', packaging: '纸箱' },
  { productNumber: 'P004', name: '葡萄', grade: 'A', origin: '新疆', costPrice: '6元/斤', packaging: '纸箱' },
  { productNumber: 'P005', name: '西瓜', grade: 'B', origin: '河南', costPrice: '2元/斤', packaging: '塑料袋' },
  { productNumber: 'P006', name: '草莓', grade: 'A', origin: '江苏', costPrice: '10元/斤', packaging: '纸箱' },
  { productNumber: 'P007', name: '梨', grade: 'B', origin: '河北', costPrice: '3元/斤', packaging: '塑料袋' },
  { productNumber: 'P008', name: '桃子', grade: 'A', origin: '陕西', costPrice: '5元/斤', packaging: '纸箱' }
]

// 从 localStorage 恢复产品数据
const storedProductInfo = localStorage.getItem('productInfo')
const productInfo = ref(storedProductInfo ? JSON.parse(storedProductInfo) : [...initialProductInfo])

const searchQuery = ref('')
const filteredProductInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return productInfo.value
  return productInfo.value.filter(product =>
    Object.values(product).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newProduct = ref({ productNumber: '', name: '', grade: '', origin: '', costPrice: '', packaging: '' })
const editingProduct = ref<{ productNumber: string, name: string, grade: string, origin: string, costPrice: string, packaging: string } | null>(null)

onMounted(() => {
  ElMessage.success('Product info loaded successfully')
})

// 保存数据到 localStorage
function updateLocalStorage() {
  localStorage.setItem('productInfo', JSON.stringify(productInfo.value))
}

function addProductHandler() {
  productInfo.value.push({ ...newProduct.value })
  updateLocalStorage()  // 更新 localStorage
  newProduct.value = { productNumber: '', name: '', grade: '', origin: '', costPrice: '', packaging: '' }
  ElMessage.success('Product added successfully')
}

function editProductHandler(product) {
  editingProduct.value = { ...product }
}

function updateProductHandler() {
  const index = productInfo.value.findIndex(p => p.productNumber === editingProduct.value?.productNumber)
  if (index !== -1 && editingProduct.value) {
    productInfo.value[index] = { ...editingProduct.value }
    updateLocalStorage()  // 更新 localStorage
    editingProduct.value = null
    ElMessage.success('Product updated successfully')
  }
}

function removeProductHandler(productNumber) {
  productInfo.value = productInfo.value.filter(p => p.productNumber !== productNumber)
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Product removed successfully')
}

function restoreDataHandler() {
  productInfo.value = [...initialProductInfo]  // 还原到初始数据
  updateLocalStorage()  // 更新 localStorage
  ElMessage.success('Data restored to initial state')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>产品信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索产品..."
          clearable
        />
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
        <ElTable :data="filteredProductInfo" style="width: auto; margin: 0 auto;" height="400" border>
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
      <!-- 还原按钮 -->
      <div class="restore-container">
        <ElButton type="warning" @click="restoreDataHandler">
          还原数据
        </ElButton>
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