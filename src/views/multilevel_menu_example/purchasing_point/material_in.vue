<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

interface MaterialIN {
  materialNumber: string
  name: string
  unit: string
  costPrice: number
  selling_price: number
  quantity: number
}

const GetData = ref<MaterialIN[]>([]) // 表格数据
const loading = ref<boolean>(false) // 请求状态
const error = ref<string | null>(null) // 错误信息

// 获取数据并更新表格
async function fetchTableData() {
  loading.value = true
  error.value = null // 清空错误信息
  try {
    const response = await axios.get<MaterialIN[]>('/materials')
    GetData.value = response.data // 更新数据
  }
  catch (err: any) {
    error.value = err.message || '获取数据失败'
  }
  finally {
    loading.value = false // 完成请求
  }
}

// 组件加载时，自动调用 fetchTableData
onMounted(() => {
  fetchTableData()
})

// 表单数据
const form = reactive<MaterialIN>({
  materialNumber: '',
  name: '',
  unit: '',
  costPrice: 0,
  selling_price: 0,
  quantity: 0,
})

const responsedata = ref<any>(null)

// 提交表单数据
async function onSubmit() {
  try {
    const response = await axios.post('/materials', form)
    responsedata.value = response.data // 保存响应数据
    // 提交成功后刷新表格数据
    fetchTableData()
  }
  catch (err: any) {
    error.value = err.message || '提交数据失败'
  }
}
</script>

<template>
  <div>
    <!-- 表格展示 -->
    <el-table :data="GetData" height="250" style="width: 100%;">
      <el-table-column prop="materialNumber" label="物资编号" width="180" />
      <el-table-column prop="name" label="物资名称" width="180" />
      <el-table-column prop="unit" label="单位" width="180" />
      <el-table-column prop="costPrice" label="单价" width="180" />
      <el-table-column prop="selling_price" label="售价" width="180" />
      <el-table-column prop="quantity" label="数量" width="180" />
    </el-table>

    <!-- 物资表单 -->
    <el-form :model="form" label-width="100px" style="max-width: 600px;">
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

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
