<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, computed } from 'vue'

// 模拟的初始数据
const originalData = [
  { materialNumber: 'M001', name: '物资一', unit: '件', quantity: 100 },
  { materialNumber: 'M002', name: '物资二', unit: '件', quantity: 200 },
  { materialNumber: 'M003', name: '物资三', unit: '件', quantity: 300 },
  { materialNumber: 'M004', name: '物资四', unit: '件', quantity: 400 },
  { materialNumber: 'M005', name: '物资五', unit: '件', quantity: 500 },
  { materialNumber: 'M006', name: '物资六', unit: '件', quantity: 600 },
  { materialNumber: 'M007', name: '物资七', unit: '件', quantity: 700 },
  { materialNumber: 'M008', name: '物资八', unit: '件', quantity: 800 },
  { materialNumber: 'M009', name: '物资九', unit: '件', quantity: 900 },
  { materialNumber: 'M010', name: '物资十', unit: '件', quantity: 1000 },
]

// 表格数据
const GetData = ref([...originalData]) // 初始化表格数据

// 表单数据
const form = reactive({
  materialNumber: '',
  name: '',
  unit: '',
  quantity: '',
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
    item.materialNumber.toLowerCase().includes(search.value.toLowerCase())
  )
})

// 本地存储初始化
onMounted(() => {
  const localData = localStorage.getItem('materialsData')
  if (localData) {
    GetData.value = JSON.parse(localData)
  } else {
    localStorage.setItem('materialsData', JSON.stringify(GetData.value))
  }
})

// 保存本地存储
function saveToLocalStorage() {
  localStorage.setItem('materialsData', JSON.stringify(GetData.value))
}

// 还原功能
function restoreData() {
  GetData.value = [...originalData]
  saveToLocalStorage()
  ElMessage.success('数据已还原到初始状态！')
}

// 提交表单
async function onSubmit() {
  const material = GetData.value.find(item => item.materialNumber === form.materialNumber)

  if (!material) {
    ElMessageBox.alert('物资编号无效，请重新输入！', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
    return
  }

  const quantity = Number(form.quantity)

  // 校验出库数量
  if (quantity <= 0 || quantity > material.quantity) {
    ElMessageBox.alert('非法的出库数量，请检查后重新输入！', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
    return
  }

  // 执行出库操作
  try {
    material.quantity -= quantity // 更新物资库存数量
    saveToLocalStorage() // 保存到本地存储
    fetchTableData() // 更新表格数据
    ElMessageBox.alert('物资出库成功！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })
  } catch (err: any) {
    error.value = err.message || 'Failed to update data'
  }
}

// 获取表格数据
function fetchTableData() {
  const localData = localStorage.getItem('materialsData')
  if (localData) {
    GetData.value = JSON.parse(localData)
  }
}

// 编辑功能
function handleEdit(index: number) {
  const material = GetData.value[index]
  form.materialNumber = material.materialNumber
  form.name = material.name
  form.unit = material.unit
  form.quantity = material.quantity.toString()
}

// 删除操作
function handleDelete(index: number, row: any) {
  ElMessageBox.confirm(
    `确定要删除物资 ${row.name} 吗？`,
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
      ElMessage.success(`物资 ${row.name} 删除成功！`)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}

// 更新物资信息
function updateMaterial() {
  const material = GetData.value.find(item => item.materialNumber === form.materialNumber)
  if (material) {
    material.name = form.name
    material.unit = form.unit
    material.quantity = Number(form.quantity)
    saveToLocalStorage()
    fetchTableData()
    ElMessage.success('物资信息更新成功！')
  } else {
    ElMessage.error('物资编号无效，无法更新！')
  }
}

// 添加新物资
function addMaterial() {
  const material = GetData.value.find(item => item.materialNumber === form.materialNumber)
  if (material) {
    ElMessage.error('物资编号已存在，无法添加！')
    return
  }
  GetData.value.push({ ...form, quantity: Number(form.quantity) })
  saveToLocalStorage()
  fetchTableData()
  ElMessage.success('物资添加成功！')
}
</script>

<template>
  <div class="container">

    <el-input v-model="search" placeholder="搜索物资" class="search-bar" clearable />

    <el-table :data="filterTableData" height="400" style="width: 100%; margin-bottom: 20px;">
      <el-table-column prop="materialNumber" label="物资编号" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="unit" label="单位" width="180" />
      <el-table-column prop="quantity" label="数量" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="form" label-width="100" class="form-container">
      <el-form-item label="物资编号">
        <el-input v-model="form.materialNumber" />
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="单位">
        <el-input v-model="form.unit" />
      </el-form-item>

      <el-form-item label="数量">
        <el-input v-model="form.quantity" type="number" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addMaterial">
          添加
        </el-button>
        <el-button type="primary" @click="updateMaterial">
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