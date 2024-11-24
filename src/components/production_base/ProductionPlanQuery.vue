<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref, computed } from 'vue'

// 模拟的初始数据
const originalPlans = [
  { plan_id: 'P001', plan_name: '计划A', product_name: '产品A', product_id: 'PR001', plan_type: '常规计划', planned_start_date: '2023-01-01', planned_end_date: '2023-01-10', actual_start_date: '2023-01-02', actual_end_date: '2023-01-09', planned_quantity: 1000, actual_quantity: 950, unit: '件', workshop: '车间1', person_in_charge: '张三', equipment: '设备A', plan_status: '已完成', priority: '高', remarks: '无' },
  { plan_id: 'P002', plan_name: '计划B', product_name: '产品B', product_id: 'PR002', plan_type: '紧急计划', planned_start_date: '2023-02-01', planned_end_date: '2023-02-15', actual_start_date: '2023-02-02', actual_end_date: '2023-02-14', planned_quantity: 2000, actual_quantity: 1800, unit: '件', workshop: '车间2', person_in_charge: '李四', equipment: '设备B', plan_status: '进行中', priority: '中', remarks: '无' },
  { plan_id: 'P003', plan_name: '计划C', product_name: '产品C', product_id: 'PR003', plan_type: '常规计划', planned_start_date: '2023-03-01', planned_end_date: '2023-03-10', actual_start_date: '2023-03-02', actual_end_date: '2023-03-09', planned_quantity: 1500, actual_quantity: 1400, unit: '件', workshop: '车间3', person_in_charge: '王五', equipment: '设备C', plan_status: '已完成', priority: '低', remarks: '无' },
  { plan_id: 'P004', plan_name: '计划D', product_name: '产品D', product_id: 'PR004', plan_type: '紧急计划', planned_start_date: '2023-04-01', planned_end_date: '2023-04-15', actual_start_date: '2023-04-02', actual_end_date: '2023-04-14', planned_quantity: 2500, actual_quantity: 2300, unit: '件', workshop: '车间4', person_in_charge: '赵六', equipment: '设备D', plan_status: '进行中', priority: '高', remarks: '无' },
  { plan_id: 'P005', plan_name: '计划E', product_name: '产品E', product_id: 'PR005', plan_type: '常规计划', planned_start_date: '2023-05-01', planned_end_date: '2023-05-10', actual_start_date: '2023-05-02', actual_end_date: '2023-05-09', planned_quantity: 3000, actual_quantity: 2900, unit: '件', workshop: '车间5', person_in_charge: '孙七', equipment: '设备E', plan_status: '已完成', priority: '中', remarks: '无' },
  { plan_id: 'P006', plan_name: '计划F', product_name: '产品F', product_id: 'PR006', plan_type: '紧急计划', planned_start_date: '2023-06-01', planned_end_date: '2023-06-15', actual_start_date: '2023-06-02', actual_end_date: '2023-06-14', planned_quantity: 3500, actual_quantity: 3400, unit: '件', workshop: '车间6', person_in_charge: '周八', equipment: '设备F', plan_status: '进行中', priority: '低', remarks: '无' },
  { plan_id: 'P007', plan_name: '计划G', product_name: '产品G', product_id: 'PR007', plan_type: '常规计划', planned_start_date: '2023-07-01', planned_end_date: '2023-07-10', actual_start_date: '2023-07-02', actual_end_date: '2023-07-09', planned_quantity: 4000, actual_quantity: 3900, unit: '件', workshop: '车间7', person_in_charge: '吴九', equipment: '设备G', plan_status: '已完成', priority: '高', remarks: '无' },
  { plan_id: 'P008', plan_name: '计划H', product_name: '产品H', product_id: 'PR008', plan_type: '紧急计划', planned_start_date: '2023-08-01', planned_end_date: '2023-08-15', actual_start_date: '2023-08-02', actual_end_date: '2023-08-14', planned_quantity: 4500, actual_quantity: 4400, unit: '件', workshop: '车间8', person_in_charge: '郑十', equipment: '设备H', plan_status: '进行中', priority: '中', remarks: '无' },
  { plan_id: 'P009', plan_name: '计划I', product_name: '产品I', product_id: 'PR009', plan_type: '常规计划', planned_start_date: '2023-09-01', planned_end_date: '2023-09-10', actual_start_date: '2023-09-02', actual_end_date: '2023-09-09', planned_quantity: 5000, actual_quantity: 4900, unit: '件', workshop: '车间9', person_in_charge: '冯十一', equipment: '设备I', plan_status: '已完成', priority: '低', remarks: '无' },
  { plan_id: 'P010', plan_name: '计划J', product_name: '产品J', product_id: 'PR010', plan_type: '紧急计划', planned_start_date: '2023-10-01', planned_end_date: '2023-10-15', actual_start_date: '2023-10-02', actual_end_date: '2023-10-14', planned_quantity: 5500, actual_quantity: 5400, unit: '件', workshop: '车间10', person_in_charge: '陈十二', equipment: '设备J', plan_status: '进行中', priority: '高', remarks: '无' },
]

// 表格数据
const productionPlans = ref([...originalPlans]) // 初始化表格数据

// 表单数据
const newPlan = reactive({
  plan_id: '',
  plan_name: '',
  product_name: '',
  product_id: '',
  plan_type: '',
  planned_start_date: '',
  planned_end_date: '',
  actual_start_date: '',
  actual_end_date: '',
  planned_quantity: 0,
  actual_quantity: 0,
  unit: '',
  workshop: '',
  person_in_charge: '',
  equipment: '',
  plan_status: '',
  priority: '',
  remarks: '',
})

// 搜索框数据
const search = ref('')

// 过滤后的表格数据
const filterTableData = computed(() => {
  if (!search.value) {
    return productionPlans.value
  }
  return productionPlans.value.filter(item =>
    item.plan_name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.product_name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.plan_id.toLowerCase().includes(search.value.toLowerCase())
  )
})

// 本地存储初始化
onMounted(() => {
  const storedPlans = localStorage.getItem('productionPlans')
  if (storedPlans) {
    productionPlans.value = JSON.parse(storedPlans)
  } else {
    localStorage.setItem('productionPlans', JSON.stringify(productionPlans.value))
  }
})

// 保存本地存储
const saveToLocalStorage = () => {
  localStorage.setItem('productionPlans', JSON.stringify(productionPlans.value));
};

// 还原功能
function restoreData() {
  productionPlans.value = [...originalPlans]
  saveToLocalStorage()
  ElMessage.success('数据已还原到初始状态！')
}

// 提交表单
function addPlanHandler() {
  try {
    productionPlans.value.push({ ...newPlan })
    saveToLocalStorage()
    (Object.keys(newPlan) as Array<keyof typeof newPlan>).forEach((key: keyof typeof newPlan) => {
      if (typeof newPlan[key] === 'number') {
        newPlan[key] = 0 as any;
      } else {
        newPlan[key] = '' as any;
      }
    });
    ElMessage.success('计划添加成功')
  } catch (error) {
    ElMessage.error('添加计划失败')
  }
}

// 编辑功能
function handleEdit(index: number) {
  const plan = productionPlans.value[index]
  Object.assign(newPlan, plan)
}

// 删除操作
function handleDelete(index: number, row: any) {
  ElMessageBox.confirm(
    `确定要删除计划 ${row.plan_name} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      productionPlans.value.splice(index, 1)
      saveToLocalStorage()
      ElMessage.success(`计划 ${row.plan_name} 删除成功！`)
    })
    .catch(() => {
      ElMessage.info('已取消删除操作')
    })
}

// 更新计划信息
function updatePlan() {
  const plan = productionPlans.value.find(item => item.plan_id === newPlan.plan_id)
  if (plan) {
    Object.assign(plan, newPlan)
    saveToLocalStorage()
    ElMessage.success('计划信息更新成功！')
  } else {
    ElMessage.error('计划编号无效，无法更新！')
  }
}
</script>

<template>
  <div class="container">
  
    <el-input v-model="search" placeholder="搜索计划" class="search-bar" clearable />

    <el-table :data="filterTableData" height="400" style="width: 100%; margin-bottom: 20px;">
      <el-table-column prop="plan_id" label="计划编号" width="180" />
      <el-table-column prop="plan_name" label="计划名称" width="180" />
      <el-table-column prop="product_name" label="产品名称" width="180" />
      <el-table-column prop="product_id" label="产品编号" width="180" />
      <el-table-column prop="plan_type" label="计划类型" width="180" />
      <el-table-column prop="planned_start_date" label="计划开始日期" width="180" />
      <el-table-column prop="planned_end_date" label="计划结束日期" width="180" />
      <el-table-column prop="actual_start_date" label="实际开始日期" width="180" />
      <el-table-column prop="actual_end_date" label="实际结束日期" width="180" />
      <el-table-column prop="planned_quantity" label="计划数量" width="180" />
      <el-table-column prop="actual_quantity" label="实际数量" width="180" />
      <el-table-column prop="unit" label="单位" width="180" />
      <el-table-column prop="workshop" label="车间" width="180" />
      <el-table-column prop="person_in_charge" label="负责人" width="180" />
      <el-table-column prop="equipment" label="设备" width="180" />
      <el-table-column prop="plan_status" label="计划状态" width="180" />
      <el-table-column prop="priority" label="优先级" width="180" />
      <el-table-column prop="remarks" label="备注" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="newPlan" label-width="100" class="form-container">
      <el-form-item label="计划编号">
        <el-input v-model="newPlan.plan_id" />
      </el-form-item>

      <el-form-item label="计划名称">
        <el-input v-model="newPlan.plan_name" />
      </el-form-item>

      <el-form-item label="产品名称">
        <el-input v-model="newPlan.product_name" />
      </el-form-item>

      <el-form-item label="产品编号">
        <el-input v-model="newPlan.product_id" />
      </el-form-item>

      <el-form-item label="计划类型">
        <el-input v-model="newPlan.plan_type" />
      </el-form-item>

      <el-form-item label="计划开始日期">
        <el-input v-model="newPlan.planned_start_date" />
      </el-form-item>

      <el-form-item label="计划结束日期">
        <el-input v-model="newPlan.planned_end_date" />
      </el-form-item>

      <el-form-item label="实际开始日期">
        <el-input v-model="newPlan.actual_start_date" />
      </el-form-item>

      <el-form-item label="实际结束日期">
        <el-input v-model="newPlan.actual_end_date" />
      </el-form-item>

      <el-form-item label="计划数量">
        <el-input v-model="newPlan.planned_quantity" type="number" />
      </el-form-item>

      <el-form-item label="实际数量">
        <el-input v-model="newPlan.actual_quantity" type="number" />
      </el-form-item>

      <el-form-item label="单位">
        <el-input v-model="newPlan.unit" />
      </el-form-item>

      <el-form-item label="车间">
        <el-input v-model="newPlan.workshop" />
      </el-form-item>

      <el-form-item label="负责人">
        <el-input v-model="newPlan.person_in_charge" />
      </el-form-item>

      <el-form-item label="设备">
        <el-input v-model="newPlan.equipment" />
      </el-form-item>

      <el-form-item label="计划状态">
        <el-input v-model="newPlan.plan_status" />
      </el-form-item>

      <el-form-item label="优先级">
        <el-input v-model="newPlan.priority" />
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="newPlan.remarks" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addPlanHandler">
          添加
        </el-button>
        <el-button type="primary" @click="updatePlan">
          更新
        </el-button>
        <el-button type="warning" @click="restoreData">
          还原数据
        </el-button>
      </el-form-item>
    </el-form>
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
  margin-bottom: 20px;
}

.search-bar {
  width: 300px;
  margin-bottom: 20px;
}

.form-container {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.form-container .el-form-item {
  margin-bottom: 20px;
}

.form-container .el-input {
  width: 100%;
}

.form-container .el-button {
  margin-right: 10px;
}
</style>