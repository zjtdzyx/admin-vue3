<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

// 定义接口
interface MaterialInventory {
  materialNumber: string
  name: string
  auditedCount: number
  SystemCount: number
  difference: number
}

// 表格数据
const GetData = ref<MaterialInventory[]>([])

// 请求状态和错误处理
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

// 表单数据
const form = reactive({
  materialNumber: '',
  SystemCount: 0,
})

// 初始化表格数据
async function fetchTableData() {
  loading.value = true
  error.value = null

  try {
    // 假设 API URL 是这个
    const response = await axios.get<MaterialInventory[]>('/materials')
    GetData.value = response.data // 将返回的数据赋值给表格数据
  }
  catch (err: any) {
    error.value = err.message || 'Failed to fetch data' // 捕获并显示错误
  }
  finally {
    loading.value = false // 请求完成，停止加载
  }
}

// 组件加载时自动调用 fetchTableData
onMounted(() => {
  fetchTableData()
})

// 提交表单
async function onSubmit() {
  // 确保物资编号和修改数量有效
  const material = GetData.value.find(item => item.materialNumber === form.materialNumber)
  if (!material) {
    error.value = '物资编号无效，请检查'
    return
  }

  // 更新物资数量并计算差异
  material.SystemCount = form.SystemCount
  material.difference = material.SystemCount - material.auditedCount

  try {
    // 向服务器发送更新请求
    const response = await axios.put(`/inventory/${material.materialNumber}`, material)
    if (response.status === 200) {
      // 更新成功，刷新表格数据
      fetchTableData()
      form.SystemCount = 0 // 重置表单
    }
  }
  catch (err: any) {
    error.value = err.message || 'Failed to update material' // 捕获并显示错误
  }
}
</script>

<template>
  <el-table :data="GetData" height="250" style="width: 100%;">
    <el-table-column prop="materialNumber" label="物资代号" width="180" />
    <el-table-column prop="name" label="物资名称" width="180" />
    <el-table-column prop="auditedCount" label="更新前" width="180" />
    <el-table-column prop="SystemCount" label="更新后" width="180" />
    <el-table-column prop="difference" label="差异" width="180" />
  </el-table>

  <el-form :model="form" label-width="100px" style="max-width: 600px;">
    <el-form-item label="盘存物资代号">
      <el-input v-model="form.materialNumber" />
    </el-form-item>

    <el-form-item label="修改数量">
      <el-input v-model="form.SystemCount" type="number" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>
