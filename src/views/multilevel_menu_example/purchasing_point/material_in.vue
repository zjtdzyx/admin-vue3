<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, computed } from 'vue'

// 模拟的初始数据
const originalData = [
  { materialNumber: 'M001', name: '物资一', unit: '件', costPrice: 10, selling_price: 15, quantity: 100 },
  { materialNumber: 'M002', name: '物资二', unit: '件', costPrice: 20, selling_price: 25, quantity: 200 },
  { materialNumber: 'M003', name: '物资三', unit: '件', costPrice: 30, selling_price: 35, quantity: 300 },
  { materialNumber: 'M004', name: '物资四', unit: '件', costPrice: 40, selling_price: 45, quantity: 400 },
  { materialNumber: 'M005', name: '物资五', unit: '件', costPrice: 50, selling_price: 55, quantity: 500 },
  { materialNumber: 'M006', name: '物资六', unit: '件', costPrice: 60, selling_price: 65, quantity: 600 },
  { materialNumber: 'M007', name: '物资七', unit: '件', costPrice: 70, selling_price: 75, quantity: 700 },
  { materialNumber: 'M008', name: '物资八', unit: '件', costPrice: 80, selling_price: 85, quantity: 800 },
  { materialNumber: 'M009', name: '物资九', unit: '件', costPrice: 90, selling_price: 95, quantity: 900 },
  { materialNumber: 'M010', name: '物资十', unit: '件', costPrice: 100, selling_price: 105, quantity: 1000 },
]

// 表格数据
const GetData = ref([...originalData]) // 初始化表格数据

// 表单数据
const form = reactive({
  materialNumber: '',
  name: '',
  unit: '',
  costPrice: 0,
  selling_price: 0,
  quantity: 0,
})
const dialogVisible = ref(false) // 控制弹窗显示

// 搜索框数据
const search = ref('')
const filterTableData = computed(() => {
  if (!search.value) {
    return GetData.value
  }
  return GetData.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.materialNumber.toLowerCase().includes(search.value.toLowerCase())
  )
})

// 当前编辑状态
const editIndex = ref<number | null>(null)
const editColumn = ref<string>('')

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
function onSubmit() {
  if (!form.materialNumber || !form.name) {
    ElMessage.error('请填写完整表单！')
    return
  }
  GetData.value.push({ ...form })
  saveToLocalStorage()
  Object.keys(form).forEach(key => (form[key as keyof typeof form] = ''))
  dialogVisible.value = false
  ElMessage.success('添加成功！')
}

// 编辑功能
function handleEdit(index: number) {
  editIndex.value = index
  editColumn.value = '' // 默认不指定列，允许整行编辑
}

function handleCellClick(index: number, column: string) {
  editIndex.value = index
  editColumn.value = column
}

function handleBlur() {
  saveToLocalStorage()
  editIndex.value = null
  editColumn.value = ''
  ElMessage.success('修改成功！')
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
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <el-input v-model="search" size="small" placeholder="搜索物资信息" style="margin-bottom: 15px;" clearable />

    <!-- 表格 -->
    <el-table :data="filterTableData" style="width: 100%;">
      <el-table-column prop="materialNumber" label="物资编号">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'materialNumber')"
            v-model="scope.row.materialNumber" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'materialNumber')">{{ scope.row.materialNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="物资名称">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'name')" v-model="scope.row.name"
            size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'name')">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'unit')"
            v-model="scope.row.unit" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'unit')">{{ scope.row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="costPrice" label="单价">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'costPrice')"
            v-model="scope.row.costPrice" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'costPrice')">{{ scope.row.costPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="selling_price" label="售价">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'selling_price')"
            v-model="scope.row.selling_price" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'selling_price')">{{ scope.row.selling_price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'quantity')"
            v-model="scope.row.quantity" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'quantity')">{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index)"> 编辑 </el-button>
          <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加表单按钮 -->
    <el-button type="primary" style="margin-top: 15px;" @click="dialogVisible = true">
      添加物资
    </el-button>
    <el-button type="warning" style="margin-top: 15px;" @click="restoreData">
      还原数据
    </el-button>

    <!-- 添加物资表单弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加物资">
      <el-form :model="form" label-width="100px">
        <el-form-item label="物资编号">
          <el-input v-model="form.materialNumber" />
        </el-form-item>
        <el-form-item label="物资名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model.number="form.costPrice" />
        </el-form-item>
        <el-form-item label="售价">
          <el-input v-model.number="form.selling_price" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model.number="form.quantity" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
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
    margin-bottom: 10px;
  }

  .search-bar {
    width: 300px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .el-button {
    margin-right: 10px;
  }
</style>