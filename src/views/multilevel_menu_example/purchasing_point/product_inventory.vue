<script setup lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 定义接口
interface productInventory {
  productNumber: string
  name: string
  auditedCount: number
  SystemCount: number
  difference: number
}

const GetData = ref<productInventory[]>([])
const loading = ref<boolean>(false) // 请求状态
const error = ref<string | null>(null) // 错误信息

// 获取表格数据
async function fetchTableData() {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get<productInventory[]>('/products')
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

// 表单数据
const form = reactive({
  productNumber: '',
  SystemCount: '',
})

// 提交处理
const responsedata = ref<any>(null)

// 根据产品编号更新数量
function onProductNumberChange() {
  const product = GetData.value.find(item => item.productNumber === form.productNumber)
  if (product) {
    product.SystemCount = Number(form.SystemCount)
  }
  return product
}

// 提交表单
async function onSubmit() {
  const product1 = onProductNumberChange()

  try {
    if (!product1) {
      // 提交时没有找到对应的产品编号，弹出提示
      await ElMessageBox.alert('未找到对应的产品编号，请检查后再试。', '错误', {
        confirmButtonText: 'OK',
        type: 'error',
      })
      return
    }

    // 弹出加载中的提示框
    await ElMessageBox.alert('正在提交...', '加载中', {
      confirmButtonText: 'OK',
      type: 'info',
    })

    const response = await axios.put(`/products/${product1.productNumber}`, product1)
    responsedata.value = response.data

    // 提交成功的提示框
    await ElMessageBox.alert('产品信息更新成功！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })

    fetchTableData() // 刷新表格数据
  }
  catch (err: any) {
    error.value = err.message || '提交失败，请稍后再试！'
    await ElMessageBox.alert('错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <el-table :data="GetData" height="250" style="width: 100%;">
    <el-table-column prop="productNumber" label="产品代号" width="180" />
    <el-table-column prop="name" label="产品名称" width="180" />
    <el-table-column prop="auditedCount" label="更新前" width="180" />
    <el-table-column prop="SystemCount" label="更新后" width="180" />
    <el-table-column prop="difference" label="差异" width="180" />
  </el-table>

  <el-form :model="form" label-width="100px" style="max-width: 600px;">
    <el-form-item label="盘存产品代号">
      <el-input v-model="form.productNumber" />
    </el-form-item>

    <el-form-item label="修改数量">
      <el-input v-model="form.SystemCount" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
h1 {
  margin-bottom: 16px;
  font-size: 24px;
}
</style>
