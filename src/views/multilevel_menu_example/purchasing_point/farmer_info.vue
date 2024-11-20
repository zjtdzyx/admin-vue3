<script setup lang="ts">
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'

interface User {
  farmerNumber: string
  name: string
  address: string
  contact: string
  sowingArea: string
}

const form = reactive({
  farmerNumber: '',
  name: '',
  address: '',
  contact: '',
  sowingArea: '',
})

const GetData = ref<User[]>([]) // 表格数据
const loading = ref<boolean>(false) // 请求状态
const _error = ref<string | null>(null) // 错误信息

const search = ref('')
const filterTableData = computed(() => {
  if (!search.value) {
    return GetData.value // 如果没有搜索词，返回所有数据
  }
  // 否则，根据 `search` 字段过滤数据
  return GetData.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
    || item.farmerNumber.toLowerCase().includes(search.value.toLowerCase()),
  )
})

// 数据请求函数
async function fetchTableData() {
  loading.value = true // 开始加载
  _error.value = null // 清空错误信息

  try {
    const _response = await axios.get<User[]>('/farmers')
    GetData.value = _response.data // 将返回的数据赋值给表格数据
  }
  catch (_err: any) {
    _error.value = _err.message || 'Failed to fetch data' // 捕获并显示错误
  }
  finally {
    loading.value = false // 请求完成，停止加载
  }
}

// 组件加载时，自动调用 fetchTableData
onMounted(() => {
  fetchTableData()
})

// 提交表单
async function onSubmit() {
  try {
    const _response = await axios.post('/farmers', form)
    ElMessage.success('提交成功')
  }
  catch (_err: any) {
    _error.value = _err.message || 'Failed to submit data'
    ElMessage.error('提交失败')
  }
  finally {
    loading.value = false // 请求完成，停止加载
  }
}

// 编辑相关变量
const editIndex = ref(null) // 当前正在编辑的行的索引
const editColumn = ref('') // 当前正在编辑的列的名称

// 点击编辑按钮时调用，设置当前编辑的行
function handleEdit(index: any, _row?: any) {
  if (editIndex.value === index) {
    editIndex.value = null
    editColumn.value = ''
  }
  else {
    editIndex.value = index
    editColumn.value = 'farmerNumber' // 编辑列
  }
}

// 点击单元格时调用，设置当前编辑的单元格
function handleCellClick(index: any, column: any) {
  if (editIndex.value === index) {
    editColumn.value = column
  }
}

// 输入框失去焦点时调用，结束编辑状态
async function handleBlur(index: any | number) {
  try {
    const updatedData = GetData.value[index]
    const payload = {
      farmerNumber: updatedData.farmerNumber,
      name: updatedData.name,
      address: updatedData.address,
      contact: updatedData.contact,
      sowingArea: updatedData.sowingArea,
    }
    const _response = await axios.put(`/farmers/${payload.farmerNumber}`, payload)
    if (_response.status === 200) {
      fetchTableData() // 重新获取数据
    }
    else {
      ElMessage.error('更新失败')
    }
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_error) { // 将 error 重命名为 _error
    ElMessage.error('请求更新失败')
    editIndex.value = null
    editColumn.value = ''
  }
}

// 删除操作
async function handleDelete(index: any, row: any) {
  try {
    const confirmDelete = await ElMessageBox.confirm(
      `确定要删除农户 ${row.name} 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    if (confirmDelete) {
      const _response = await axios.delete(`/farmers/${row.farmerNumber}`)
      if (_response.status === 204) {
        GetData.value.splice(index, 1)
        ElMessage.success(`农户 ${row.name} 删除成功`)
      }
      else {
        ElMessage.error('删除失败')
      }
    }
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_error) { // 将 error 重命名为 _error
    ElMessage.error('删除失败')
  }
}
</script>

<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%;">
      <el-table-column label="农户编号" prop="farmerNumber">
        <template #default="scope">
          <el-input
            v-if="editIndex === scope.$index && editColumn === 'farmerNumber'" v-model="scope.row.farmerNumber"
            size="small" placeholder="请输入农户编号" @blur="handleBlur"
          />
          <span v-else @click="handleCellClick(scope.$index, 'farmerNumber')">{{ scope.row.farmerNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="农户名称" prop="name">
        <template #default="scope">
          <el-input
            v-if="editIndex === scope.$index && editColumn === 'name'" v-model="scope.row.name"
            size="small" placeholder="请输入农户名称" @blur="handleBlur"
          />
          <span v-else @click="handleCellClick(scope.$index, 'name')">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="农户住址" prop="address">
        <template #default="scope">
          <el-input
            v-if="editIndex === scope.$index && editColumn === 'address'" v-model="scope.row.address"
            size="small" placeholder="请输入农户住址" @blur="handleBlur"
          />
          <span v-else @click="handleCellClick(scope.$index, 'address')">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="联系电话" prop="contact">
        <template #default="scope">
          <el-input
            v-if="editIndex === scope.$index && editColumn === 'contact'" v-model="scope.row.contact"
            size="small" placeholder="请输入联系电话" @blur="handleBlur"
          />
          <span v-else @click="handleCellClick(scope.$index, 'contact')">{{ scope.row.contact }}</span>
        </template>
      </el-table-column>

      <el-table-column label="播种面积" prop="sowingArea">
        <template #default="scope">
          <el-input
            v-if="editIndex === scope.$index && editColumn === 'sowingArea'" v-model="scope.row.sowingArea"
            size="small" placeholder="请输入播种面积" @blur="handleBlur"
          />
          <span v-else @click="handleCellClick(scope.$index, 'sowingArea')">{{ scope.row.sowingArea }}</span>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>

        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>

          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="form" label-width="100" style="max-width: 600px;">
      <el-form-item label="农户编号">
        <el-input v-model="form.farmerNumber" />
      </el-form-item>
      <el-form-item label="农户姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="农户住址">
        <el-select v-model="form.address" placeholder="请选择所在村">
          <el-option label="A村" value="A村" />
          <el-option label="B村" value="B村" />
          <el-option label="C村" value="C村" />
          <el-option label="D村" value="D村" />
          <el-option label="E村" value="E村" />
          <el-option label="F村" value="F村" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact" />
      </el-form-item>
      <el-form-item label="种植面积">
        <el-input v-model="form.sowingArea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
