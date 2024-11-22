<script setup lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'


const api = axios.create({

baseURL:

 import.meta.env.DEV && import.meta.env.VITE_OPEN_PROXY === 'true'

  ? '/proxy/'

  : import.meta.env.VITE_APP_API_BASEURL,

timeout: 1000 * 60,

responseType: 'json',

})
// 定义接口
interface materialIN {
  materialNumber: string
  name: string
  unit: string
  quantity: number
}

// 表格数据和表单数据
const GetData = ref<materialIN[]>([])
const form = reactive({
  materialNumber: '',
  quantity: '',
})

// 状态管理
const loading = ref<boolean>(false)
const error = ref<string | null>(null)
const responsedata = ref<any>(null)

// 获取表格数据
async function fetchTableData() {
  loading.value = true
  error.value = null

  try {
    const response = await api.get<materialIN[]>('/materials')
    GetData.value = response.data
  }
  catch (err: any) {
    error.value = err.message || 'Failed to fetch data'
  }
  finally {
    loading.value = false
  }
}

// 组件加载时自动调用 fetchTableData
onMounted(() => {
  fetchTableData()
})

// 处理物资编号输入变化
function onMaterialNumberChange() {
  const material = GetData.value.find(item => item.materialNumber === form.materialNumber)

  if (material) {
    // 更新出库数量的默认值
    material.quantity = Number(form.quantity)
  }
  else {
    // 找不到物资编号时，清空数量
    form.quantity = ''
  }
  return material
}

// 提交表单
async function onSubmit() {
  const material = onMaterialNumberChange()

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
    const response = await api.put(`/materials/${material.materialNumber}`, material)
    responsedata.value = response.data
    fetchTableData() // 更新表格数据
    ElMessageBox.alert('物资出库成功！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })
  }
  catch (err: any) {
    error.value = err.message || 'Failed to update data'
  }
}
</script>

<template>
  <el-table :data="GetData" height="250" style="width: 100%;">
    <el-table-column prop="materialNumber" label="物资编号" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="unit" label="单位" width="180" />
    <el-table-column prop="quantity" label="数量" width="180" />
  </el-table>

  <el-form :model="form" label-width="100" style="max-width: 600px;">
    <el-form-item label="产品编号">
      <el-input v-model="form.materialNumber" @input="onMaterialNumberChange" />
    </el-form-item>

    <el-form-item label="出库数量">
      <el-input v-model="form.quantity" type="number" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>
