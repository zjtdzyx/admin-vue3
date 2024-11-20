<script setup lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 定义接口
interface productIN {
  productNumber: string
  name: string
  grade: string
  origin: string
  costPrice: number
  packaging: string
}

// 表格数据和表单数据
const GetData = ref<productIN[]>([])
const form = reactive({
  productNumber: '',
  name: '',
  grade: '',
  origin: '',
  costPrice: '',
  packaging: '',
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
    const response = await axios.get<productIN[]>('/products')
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
    loading.value = true
    const response = await axios.post('/products', form)
    responsedata.value = response.data

    ElMessageBox.alert('产品信息已成功提交！', '成功', {
      confirmButtonText: 'OK',
      type: 'success',
    })
    fetchTableData() // 更新表格数据
  }
  catch (err: any) {
    error.value = err.message || '提交失败，请稍后再试！'
    ElMessageBox.alert('错误', {
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
  </el-table>

  <el-form :model="form" label-width="100" style="max-width: 600px;">
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
      <el-input v-model="form.costPrice" />
    </el-form-item>

    <el-form-item label="包装物">
      <el-input v-model="form.packaging" />
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
