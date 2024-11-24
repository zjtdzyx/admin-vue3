<script setup lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { computed, reactive, ref, onMounted } from 'vue'

  // 模拟的初始数据
  const originalData = [
    { farmerNumber: 'F001', name: '张三', address: 'A村', contact: '1234567890', sowingArea: '50亩' },
    { farmerNumber: 'F002', name: '李四', address: 'B村', contact: '2345678901', sowingArea: '30亩' },
    { farmerNumber: 'F003', name: '王五', address: 'C村', contact: '3456789012', sowingArea: '40亩' },
    { farmerNumber: 'F004', name: '赵六', address: 'D村', contact: '4567890123', sowingArea: '60亩' },
    { farmerNumber: 'F005', name: '孙七', address: 'E村', contact: '5678901234', sowingArea: '20亩' },
    { farmerNumber: 'F006', name: '周八', address: 'F村', contact: '6789012345', sowingArea: '70亩' },
    { farmerNumber: 'F007', name: '吴九', address: 'A村', contact: '7890123456', sowingArea: '10亩' },
    { farmerNumber: 'F008', name: '郑十', address: 'B村', contact: '8901234567', sowingArea: '80亩' },
    { farmerNumber: 'F009', name: '冯十一', address: 'C村', contact: '9012345678', sowingArea: '90亩' },
    { farmerNumber: 'F010', name: '陈十二', address: 'D村', contact: '0123456789', sowingArea: '100亩' },
  ]

  // 表格数据
  const GetData = ref([...originalData]) // 初始化表格数据

  // 表单数据
  const form = reactive({
    farmerNumber: '',
    name: '',
    address: '',
    contact: '',
    sowingArea: '',
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
      item.farmerNumber.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  // 当前编辑状态
  const editIndex = ref<number | null>(null)
  const editColumn = ref<string>('')

  // 本地存储初始化
  onMounted(() => {
    const localData = localStorage.getItem('farmersData')
    if (localData) {
      GetData.value = JSON.parse(localData)
    } else {
      localStorage.setItem('farmersData', JSON.stringify(GetData.value))
    }
  })

  // 保存本地存储
  function saveToLocalStorage() {
    localStorage.setItem('farmersData', JSON.stringify(GetData.value))
  }

  // 还原功能
  function restoreData() {
    GetData.value = [...originalData]
    saveToLocalStorage()
    ElMessage.success('数据已还原到初始状态！')
  }

  // 提交表单
  function onSubmit() {
    if (!form.farmerNumber || !form.name) {
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
      `确定要删除农户 ${row.name} 吗？`,
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
        ElMessage.success(`农户 ${row.name} 删除成功！`)
      })
      .catch(() => {
        ElMessage.info('已取消删除操作')
      })
  }
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <el-input v-model="search" size="small" placeholder="搜索农户信息" style="margin-bottom: 15px;" clearable />

    <!-- 表格 -->
    <el-table :data="filterTableData" style="width: 100%;">
      <el-table-column prop="farmerNumber" label="农户编号">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'farmerNumber')"
            v-model="scope.row.farmerNumber" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'farmerNumber')">{{ scope.row.farmerNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="农户名称">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'name')" v-model="scope.row.name"
            size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'name')">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="农户住址">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'address')"
            v-model="scope.row.address" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'address')">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="联系电话">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'contact')"
            v-model="scope.row.contact" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'contact')">{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sowingArea" label="播种面积">
        <template #default="scope">
          <el-input v-if="editIndex === scope.$index && (!editColumn || editColumn === 'sowingArea')"
            v-model="scope.row.sowingArea" size="small" @blur="handleBlur" />
          <span v-else @click="handleCellClick(scope.$index, 'sowingArea')">{{ scope.row.sowingArea }}</span>
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
      添加农户
    </el-button>
    <el-button type="warning" style="margin-top: 15px;" @click="restoreData">
      还原数据
    </el-button>

    <!-- 添加农户表单弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加农户">
      <el-form :model="form" label-width="100px">
        <el-form-item label="农户编号">
          <el-input v-model="form.farmerNumber" />
        </el-form-item>
        <el-form-item label="农户名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="农户住址">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contact" />
        </el-form-item>
        <el-form-item label="播种面积">
          <el-input v-model="form.sowingArea" />
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
