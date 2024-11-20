<script setup lang="ts">
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus' // 引入 Element Plus 提示组件
import { onMounted, ref } from 'vue'

// 定义接口
interface produceplan {
  planId: string
  productNumber: string
  quantity: number
  startDate: string
  endDate: string
}

// 获取数据
const GetData = ref<produceplan[]>([])

// 请求状态
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

// 获取数据并绑定到 GetData
async function fetchTableData() {
  loading.value = true // 开始加载
  error.value = null // 清空之前的错误信息

  try {
    // 模拟请求数据
    const response = await axios.get<produceplan[]>('/production/plans')
    GetData.value = response.data // 将返回的数据赋值给表格数据
  }
  catch (err: any) {
    error.value = err.message || '数据加载失败' // 捕获错误并提示
    ElMessage.error('数据加载失败') // 使用 Element Plus 弹出错误信息
  }
  finally {
    loading.value = false // 停止加载
  }
}

// 组件加载时获取数据
onMounted(() => {
  fetchTableData()
})
</script>

<template>
  <!-- 表格展示数据 -->
  <el-table :data="GetData" height="250" style="width: 100%;">
    <el-table-column prop="planId" label="计划ID" width="180" />
    <el-table-column prop="productNumber" label="产品代号" width="180" />
    <el-table-column prop="quantity" label="数量" />
    <el-table-column prop="startDate" label="开始日期" />
    <el-table-column prop="endDate" label="结束日期" />
  </el-table>

  <!-- 加载中状态 -->
  <ElLoading :loading="loading" text="加载中..." />

  <!-- 错误信息 -->
  <ElMessage v-if="error" type="error">
    {{ error }}
  </ElMessage>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
