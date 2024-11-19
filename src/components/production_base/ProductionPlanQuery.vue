<script setup lang="ts">
import { useProductionStore } from '@/store/production'
import { ElButton, ElCard, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref } from 'vue'
import 'element-plus/dist/index.css'

const productionStore = useProductionStore()
const productionPlans = ref([])

onMounted(async () => {
  try {
    await productionStore.loadProductionPlans()
    productionPlans.value = productionStore.plans
  }
  catch {
    ElMessage.error('Failed to fetch production plans')
  }
})

function viewDetails(_plan) {
  // 查看详情逻辑
}

function editPlan(_plan) {
  // 编辑计划逻辑
}

async function deletePlan(planId) {
  try {
    await productionStore.deletePlan(planId)
    ElMessage.success('Plan deleted successfully')
  }
  catch {
    ElMessage.error('Failed to delete plan')
  }
}

function exportPlan(_plan) {
  // 导出计划逻辑
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>生产计划管理</h1>
      </div>
      <ElTable :data="productionPlans" style="width: 100%; overflow-x: auto;" height="400" border>
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
        <ElTableColumn label="操作" width="300">
          <template #default="scope">
            <ElButton type="primary" size="small" @click="viewDetails(scope.row)">
              查看详情
            </ElButton>
            <ElButton type="primary" size="small" @click="editPlan(scope.row)">
              编辑
            </ElButton>
            <ElButton type="danger" size="small" @click="deletePlan(scope.row.plan_id)">
              删除
            </ElButton>
            <ElButton type="warning" size="small" @click="exportPlan(scope.row)">
              导出
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
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
</style>
