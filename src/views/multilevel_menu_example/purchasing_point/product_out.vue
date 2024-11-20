<script setup lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 产品出库的接口类型定义
interface ProductOut {
  productNumber: string
  name: string
  grade: string
  origin: string
  costPrice: number
  packaging: string
  quantity: number
}

// 存储获取的产品数据
const GetData = ref<ProductOut[]>([])

// 加载状态
const loading = ref<boolean>(false)

// 错误信息
const error = ref<string | null>(null)

// 表单数据
const form = reactive({
  productNumber: '',
  quantity: 0,
})

// 获取表格数据
async function fetchTableData() {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get<ProductOut[]>('/products')
    GetData.value = response.data // 将返回的数据赋值给表格数据
  }
  catch (err: any) {
    error.value = err.message || 'Failed to fetch data'
  }
  finally {
    loading.value = false
  }
}

// 组件加载时，自动调用 fetchTableData
onMounted(() => {
  fetchTableData()
})

// 存储产品数量
const outProduct = ref<number>(0)

// 根据产品编号查找对应产品，并更新数量
function onnameChange() {
  const product = GetData.value.find(item => item.productNumber === form.productNumber)
  if (product) {
    outProduct.value = product.quantity // 获取产品的库存数量
  }
  else {
    outProduct.value = 0 // 如果没有找到产品，数量设为 0
  }
  return outProduct.value // 返回产品数量
}

// 提交表单
async function onSubmit() {
  if (form.quantity <= 0 || form.quantity > outProduct.value) {
    // 如果输入的数量不合法，提示错误
    await ElMessageBox.alert('非法的出库数量，请检查输入的数量。', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
    return
  }

  const selectedProduct = GetData.value.find(item => item.productNumber === form.productNumber)
  if (!selectedProduct) {
    // 如果没有找到对应的产品，提示错误
    await ElMessageBox.alert('未找到对应的产品编号，请检查后再试。', '错误', {
      confirmButtonText: 'OK',
      type: 'error',
    })
    return
  }

  try {
    // 更新产品出库数量
    const _response = await axios.put(`/products/out/${selectedProduct.productNumber}`, {
      ...selectedProduct,
      quantity: form.quantity,
    })

    // 成功提示
    await ElMessageBox.alert('出库操作成功！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })

    // 刷新数据
    fetchTableData()
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
    <el-table-column prop="productNumber" label="产品编号" width="180" />
    <el-table-column prop="name" label="产品名称" width="180" />
    <el-table-column prop="grade" label="产品等级" width="180" />
    <el-table-column prop="origin" label="产地" width="180" />
    <el-table-column prop="costPrice" label="进价" width="180" />
    <el-table-column prop="packaging" label="包装物" width="180" />
    <el-table-column prop="quantity" label="数量" width="180" />
  </el-table>

  <el-form :model="form" label-width="100px" style="max-width: 600px;">
    <el-form-item label="产品编号">
      <el-input v-model="form.productNumber" @input="onnameChange" />
    </el-form-item>

    <el-form-item label="出库数量">
      <el-input v-model="form.quantity" />
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
