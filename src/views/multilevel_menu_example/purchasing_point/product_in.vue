<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, computed } from 'vue'

// 模拟的初始数据
const originalData = [
  { productNumber: 'P001', name: '产品一', grade: 'A', origin: '中国', costPrice: 100, packaging: '盒' },
  { productNumber: 'P002', name: '产品二', grade: 'B', origin: '美国', costPrice: 200, packaging: '袋' },
  { productNumber: 'P003', name: '产品三', grade: 'A', origin: '日本', costPrice: 300, packaging: '瓶' },
  { productNumber: 'P004', name: '产品四', grade: 'C', origin: '德国', costPrice: 400, packaging: '盒' },
  { productNumber: 'P005', name: '产品五', grade: 'A', origin: '法国', costPrice: 500, packaging: '袋' },
  { productNumber: 'P006', name: '产品六', grade: 'B', origin: '英国', costPrice: 600, packaging: '瓶' },
  { productNumber: 'P007', name: '产品七', grade: 'C', origin: '意大利', costPrice: 700, packaging: '盒' },
  { productNumber: 'P008', name: '产品八', grade: 'A', origin: '西班牙', costPrice: 800, packaging: '袋' },
  { productNumber: 'P009', name: '产品九', grade: 'B', origin: '澳大利亚', costPrice: 900, packaging: '瓶' },
  { productNumber: 'P010', name: '产品十', grade: 'C', origin: '加拿大', costPrice: 1000, packaging: '盒' },
]

// 表格数据
const GetData = ref([...originalData]) // 初始化表格数据

// 表单数据
const form = reactive({
  productNumber: '',
  name: '',
  grade: '',
  origin: '',
  costPrice: 0,
  packaging: '',
})

// 搜索框数据
const search = ref('')

// 过滤后的表格数据
const filterTableData = computed(() => {
  if (!search.value) {
    return GetData.value
  }
  return GetData.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.productNumber.toLowerCase().includes(search.value.toLowerCase())
  )
})

// 本地存储初始化
onMounted(() => {
  const localData = localStorage.getItem('productsData')
  if (localData) {
    GetData.value = JSON.parse(localData)
  } else {
    localStorage.setItem('productsData', JSON.stringify(GetData.value))
  }
})

// 保存本地存储
function saveToLocalStorage() {
  localStorage.setItem('productsData', JSON.stringify(GetData.value))
}

// 还原功能
function restoreData() {
  GetData.value = [...originalData]
  saveToLocalStorage()
  ElMessage.success('数据已还原到初始状态！')
}

// 提交表单
async function onSubmit() {
  if (!form.productNumber || !form.name || !form.grade || !form.origin || !form.costPrice || !form.packaging) {
    ElMessageBox.alert('所有字段都是必填项，请检查输入！', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
    return
  }

  try {
    const product = GetData.value.find(item => item.productNumber === form.productNumber)
    if (product) {
      ElMessageBox.alert('产品编号已存在，无法添加！', '错误', {
        confirmButtonText: 'OK',
        type: 'error',
      })
      return
    }

    GetData.value.push({ ...form, costPrice: Number(form.costPrice) })
    saveToLocalStorage()
    fetchTableData()
    ElMessageBox.alert('产品信息已成功提交！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })
  } catch (err: any) {
    ElMessageBox.alert('提交失败，请稍后再试！', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
  }
}

// 获取表格数据
function fetchTableData() {
  const localData = localStorage.getItem('productsData')
  if (localData) {
    GetData.value = JSON.parse(localData)
  }
}

// 编辑功能
function handleEdit(index: number) {
  const product = GetData.value[index]
  form.productNumber = product.productNumber
  form.name = product.name
  form.grade = product.grade
  form.origin = product.origin
  form.costPrice = product.costPrice
  form.packaging = product.packaging
}

// 删除操作
function handleDelete(index: number, row: any) {
  ElMessageBox.confirm(
    `确定要删除产品 ${row.name} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      GetData.value.splice(index, 1)
      saveToLocalStorage()
      ElMessage.success(`产品 ${row.name} 删除成功！`)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}

// 更新产品信息
function updateProduct() {
  const product = GetData.value.find(item => item.productNumber === form.productNumber)
  if (product) {
    product.name = form.name
    product.grade = form.grade
    product.origin = form.origin
    product.costPrice = form.costPrice
    product.packaging = form.packaging
    saveToLocalStorage()
    fetchTableData()
    ElMessage.success('产品信息更新成功！')
  } else {
    ElMessage.error('产品编号无效，无法更新！')
  }
}
</script>

<template>
  <div class="container">
    <el-input v-model="search" placeholder="搜索产品" class="search-bar" clearable />

    <el-table :data="filterTableData" height="400" style="width: 100%; margin-bottom: 20px;">
      <el-table-column prop="productNumber" label="产品编号" width="180" />
      <el-table-column prop="name" label="产品名称" width="180" />
      <el-table-column prop="grade" label="产品等级" width="180" />
      <el-table-column prop="origin" label="产地" width="180" />
      <el-table-column prop="costPrice" label="进价" width="180" />
      <el-table-column prop="packaging" label="包装物" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="form" label-width="100" class="form-container">
      <el-form-item label="产品编号">
        <el-input v-model="form.productNumber" />
      </el-form-item>

      <el-form-item label="产品名称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="产品等级">
        <el-input v-model="form.grade" />
      </el-form-item>

      <el-form-item label="产地">
        <el-input v-model="form.origin" />
      </el-form-item>

      <el-form-item label="进价">
        <el-input v-model="form.costPrice" type="number" />
      </el-form-item>

      <el-form-item label="包装物">
        <el-input v-model="form.packaging" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
        <el-button type="primary" @click="updateProduct">
          更新
        </el-button>
        <el-button type="warning" @click="restoreData">
          还原数据
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  width: 300px;
  margin-bottom: 20px;
}

.form-container {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.form-container .el-form-item {
  margin-bottom: 20px;
}

.form-container .el-input {
  width: 100%;
}

.form-container .el-button {
  margin-right: 10px;
}
</style>