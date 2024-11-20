<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productionPlans = ref([
  { plan_id: 'P001', plan_name: '计划A', product_name: '产品A', product_id: 'PR001', plan_type: '常规计划', planned_start_date: '2023-01-01', planned_end_date: '2023-01-10', actual_start_date: '2023-01-02', actual_end_date: '2023-01-09', planned_quantity: 1000, actual_quantity: 950, unit: '件', workshop: '车间1', person_in_charge: '张三', equipment: '设备A', plan_status: '进行中', priority: '高', remarks: '无' },
  { plan_id: 'P002', plan_name: '计划B', product_name: '产品B', product_id: 'PR002', plan_type: '紧急计划', planned_start_date: '2023-02-01', planned_end_date: '2023-02-10', actual_start_date: '2023-02-02', actual_end_date: '2023-02-09', planned_quantity: 2000, actual_quantity: 1900, unit: '件', workshop: '车间2', person_in_charge: '李四', equipment: '设备B', plan_status: '已完成', priority: '中', remarks: '无' },
])
const newPlan = ref({ plan_id: '', plan_name: '', product_name: '', product_id: '', plan_type: '', planned_start_date: '', planned_end_date: '', actual_start_date: '', actual_end_date: '', planned_quantity: '', actual_quantity: '', unit: '', workshop: '', person_in_charge: '', equipment: '', plan_status: '', priority: '', remarks: '' })
const editingPlan = ref<{ plan_id: string, plan_name: string, product_name: string, product_id: string, plan_type: string, planned_start_date: string, planned_end_date: string, actual_start_date: string, actual_end_date: string, planned_quantity: string, actual_quantity: string, unit: string, workshop: string, person_in_charge: string, equipment: string, plan_status: string, priority: string, remarks: string } | null>(null)

onMounted(() => {
  // 模拟获取生产计划信息
  ElMessage.success('Production plans loaded successfully')
})

function addPlanHandler() {
  try {
    productionPlans.value.push({ ...newPlan.value })
    newPlan.value = { plan_id: '', plan_name: '', product_name: '', product_id: '', plan_type: '', planned_start_date: '', planned_end_date: '', actual_start_date: '', actual_end_date: '', planned_quantity: '', actual_quantity: '', unit: '', workshop: '', person_in_charge: '', equipment: '', plan_status: '', priority: '', remarks: '' }
    ElMessage.success('Plan added successfully')
  }
  catch {
    ElMessage.error('Failed to add plan')
  }
}

function editPlanHandler(plan) {
  editingPlan.value = { ...plan }
}

function updatePlanHandler() {
  try {
    const index = productionPlans.value.findIndex(p => p.plan_id === editingPlan.value.plan_id)
    if (index !== -1) {
      productionPlans.value[index] = { ...editingPlan.value }
    }
    editingPlan.value = null
    ElMessage.success('Plan updated successfully')
  }
  catch {
    ElMessage.error('Failed to update plan')
  }
}

function removePlanHandler(plan_id) {
  try {
    productionPlans.value = productionPlans.value.filter(p => p.plan_id !== plan_id)
    ElMessage.success('Plan removed successfully')
  }
  catch {
    ElMessage.error('Failed to remove plan')
  }
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>生产计划管理</h1>
      </div>
      <ElForm label-width="120px" @submit.prevent="addPlanHandler">
        <ElFormItem label="计划编号">
          <ElInput v-model="newPlan.plan_id" placeholder="计划编号" required />
        </ElFormItem>
        <ElFormItem label="计划名称">
          <ElInput v-model="newPlan.plan_name" placeholder="计划名称" required />
        </ElFormItem>
        <ElFormItem label="产品名称">
          <ElInput v-model="newPlan.product_name" placeholder="产品名称" required />
        </ElFormItem>
        <ElFormItem label="产品编号">
          <ElInput v-model="newPlan.product_id" placeholder="产品编号" required />
        </ElFormItem>
        <ElFormItem label="计划类型">
          <ElInput v-model="newPlan.plan_type" placeholder="计划类型" required />
        </ElFormItem>
        <ElFormItem label="计划开始时间">
          <ElInput v-model="newPlan.planned_start_date" placeholder="计划开始时间" required />
        </ElFormItem>
        <ElFormItem label="计划结束时间">
          <ElInput v-model="newPlan.planned_end_date" placeholder="计划结束时间" required />
        </ElFormItem>
        <ElFormItem label="实际开始时间">
          <ElInput v-model="newPlan.actual_start_date" placeholder="实际开始时间" required />
        </ElFormItem>
        <ElFormItem label="实际结束时间">
          <ElInput v-model="newPlan.actual_end_date" placeholder="实际结束时间" required />
        </ElFormItem>
        <ElFormItem label="计划产量">
          <ElInput v-model="newPlan.planned_quantity" placeholder="计划产量" required />
        </ElFormItem>
        <ElFormItem label="实际产量">
          <ElInput v-model="newPlan.actual_quantity" placeholder="实际产量" required />
        </ElFormItem>
        <ElFormItem label="单位">
          <ElInput v-model="newPlan.unit" placeholder="单位" required />
        </ElFormItem>
        <ElFormItem label="生产车间">
          <ElInput v-model="newPlan.workshop" placeholder="生产车间" required />
        </ElFormItem>
        <ElFormItem label="负责人">
          <ElInput v-model="newPlan.person_in_charge" placeholder="负责人" required />
        </ElFormItem>
        <ElFormItem label="设备">
          <ElInput v-model="newPlan.equipment" placeholder="设备" required />
        </ElFormItem>
        <ElFormItem label="计划状态">
          <ElInput v-model="newPlan.plan_status" placeholder="计划状态" required />
        </ElFormItem>
        <ElFormItem label="优先级">
          <ElInput v-model="newPlan.priority" placeholder="优先级" required />
        </ElFormItem>
        <ElFormItem label="备注">
          <ElInput v-model="newPlan.remarks" placeholder="备注" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addPlanHandler">
            添加计划
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="productionPlans" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="plan_id" label="计划编号" width="150" />
          <ElTableColumn prop="plan_name" label="计划名称" width="150" />
          <ElTableColumn prop="product_name" label="产品名称" width="150" />
          <ElTableColumn prop="product_id" label="产品编号" width="150" />
          <ElTableColumn prop="plan_type" label="计划类型" width="150" />
          <ElTableColumn prop="planned_start_date" label="计划开始时间" width="150" />
          <ElTableColumn prop="planned_end_date" label="计划结束时间" width="150" />
          <ElTableColumn prop="actual_start_date" label="实际开始时间" width="150" />
          <ElTableColumn prop="actual_end_date" label="实际结束时间" width="150" />
          <ElTableColumn prop="planned_quantity" label="计划产量" width="150" />
          <ElTableColumn prop="actual_quantity" label="实际产量" width="150" />
          <ElTableColumn prop="unit" label="单位" width="150" />
          <ElTableColumn prop="workshop" label="生产车间" width="150" />
          <ElTableColumn prop="person_in_charge" label="负责人" width="150" />
          <ElTableColumn prop="equipment" label="设备" width="150" />
          <ElTableColumn prop="plan_status" label="计划状态" width="150" />
          <ElTableColumn prop="priority" label="优先级" width="150" />
          <ElTableColumn prop="remarks" label="备注" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editPlanHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removePlanHandler(scope.row.plan_id)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>
    <div v-if="editingPlan">
      <h2>编辑计划</h2>
      <ElForm label-width="120px" @submit.prevent="updatePlanHandler">
        <ElFormItem label="计划编号">
          <ElInput v-model="editingPlan.plan_id" placeholder="计划编号" required />
        </ElFormItem>
        <ElFormItem label="计划名称">
          <ElInput v-model="editingPlan.plan_name" placeholder="计划名称" required />
        </ElFormItem>
        <ElFormItem label="产品名称">
          <ElInput v-model="editingPlan.product_name" placeholder="产品名称" required />
        </ElFormItem>
        <ElFormItem label="产品编号">
          <ElInput v-model="editingPlan.product_id" placeholder="产品编号" required />
        </ElFormItem>
        <ElFormItem label="计划类型">
          <ElInput v-model="editingPlan.plan_type" placeholder="计划类型" required />
        </ElFormItem>
        <ElFormItem label="计划开始时间">
          <ElInput v-model="editingPlan.planned_start_date" placeholder="计划开始时间" required />
        </ElFormItem>
        <ElFormItem label="计划结束时间">
          <ElInput v-model="editingPlan.planned_end_date" placeholder="计划结束时间" required />
        </ElFormItem>
        <ElFormItem label="实际开始时间">
          <ElInput v-model="editingPlan.actual_start_date" placeholder="实际开始时间" required />
        </ElFormItem>
        <ElFormItem label="实际结束时间">
          <ElInput v-model="editingPlan.actual_end_date" placeholder="实际结束时间" required />
        </ElFormItem>
        <ElFormItem label="计划产量">
          <ElInput v-model="editingPlan.planned_quantity" placeholder="计划产量" required />
        </ElFormItem>
        <ElFormItem label="实际产量">
          <ElInput v-model="editingPlan.actual_quantity" placeholder="实际产量" required />
        </ElFormItem>
        <ElFormItem label="单位">
          <ElInput v-model="editingPlan.unit" placeholder="单位" required />
        </ElFormItem>
        <ElFormItem label="生产车间">
          <ElInput v-model="editingPlan.workshop" placeholder="生产车间" required />
        </ElFormItem>
        <ElFormItem label="负责人">
          <ElInput v-model="editingPlan.person_in_charge" placeholder="负责人" required />
        </ElFormItem>
        <ElFormItem label="设备">
          <ElInput v-model="editingPlan.equipment" placeholder="设备" required />
        </ElFormItem>
        <ElFormItem label="计划状态">
          <ElInput v-model="editingPlan.plan_status" placeholder="计划状态" required />
        </ElFormItem>
        <ElFormItem label="优先级">
          <ElInput v-model="editingPlan.priority" placeholder="优先级" required />
        </ElFormItem>
        <ElFormItem label="备注">
          <ElInput v-model="editingPlan.remarks" placeholder="备注" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="updatePlanHandler">
            更新计划
          </ElButton>
          <ElButton @click="editingPlan = null">
            取消
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}

.el-table th,
 .el-table td {
  padding: 8px !important;
  border-right: 1px solid #ebeef5;
}

.el-table th:last-child,
 .el-table td:last-child {
  border-right: none;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.table-container {
  display: flex;
  justify-content: center;
}
</style>
