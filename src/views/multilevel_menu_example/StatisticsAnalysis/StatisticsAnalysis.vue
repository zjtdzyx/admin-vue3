<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const salesData = ref([
  { 销售ID: 101, 产品名称: '小麦', 销售数量: 200, 销售金额: 50, 销售日期: '2024-01-15' },
  { 销售ID: 102, 产品名称: '大米', 销售数量: 300, 销售金额: 75, 销售日期: '2024-02-10' },
  { 销售ID: 103, 产品名称: '玉米', 销售数量: 150, 销售金额: 30, 销售日期: '2024-03-05' },
  { 销售ID: 104, 产品名称: '花生', 销售数量: 400, 销售金额: 100, 销售日期: '2024-04-20' },
  { 销售ID: 105, 产品名称: '大豆', 销售数量: 250, 销售金额: 62.5, 销售日期: '2024-05-15' },
])

const purchaseData = ref([
  { 代购ID: 201, 供应商名称: '农业超市A', 产品名称: '化肥', 采购数量: 500, 采购金额: 25, 采购日期: '2024-01-10' },
  { 代购ID: 202, 供应商名称: '农资供应B', 产品名称: '农药', 采购数量: 300, 采购金额: 15, 采购日期: '2024-02-05' },
  { 代购ID: 203, 供应商名称: '种子公司C', 产品名称: '种子', 采购数量: 1000, 采购金额: 10, 采购日期: '2024-03-01' },
  { 代购ID: 204, 供应商名称: '化肥站D', 产品名称: '农机', 采购数量: 20, 采购金额: 50, 采购日期: '2024-04-15' },
  { 代购ID: 205, 供应商名称: '农资站E', 产品名称: '塑料薄膜', 采购数量: 2000, 采购金额: 8, 采购日期: '2024-05-10' },
])

const profitData = ref([
  { 利润ID: 301, 产品名称: '小麦', 销售利润: 10, 利润率: 20, 结算日期: '2024-01-20' },
  { 利润ID: 302, 产品名称: '大米', 销售利润: 15, 利润率: 20, 结算日期: '2024-02-15' },
  { 利润ID: 303, 产品名称: '玉米', 销售利润: 5, 利润率: 16.7, 结算日期: '2024-03-10' },
  { 利润ID: 304, 产品名称: '花生', 销售利润: 25, 利润率: 25, 结算日期: '2024-04-25' },
  { 利润ID: 305, 产品名称: '大豆', 销售利润: 12.5, 利润率: 20, 结算日期: '2024-05-20' },
])

const salesChart = ref(null)
const purchaseChart = ref(null)
const profitChart = ref(null)

onMounted(() => {
  if (salesChart.value) {
    const salesChartInstance = echarts.init(salesChart.value)
    salesChartInstance.setOption({
      title: { text: '销售数量柱状图' },
      tooltip: {},
      xAxis: { data: ['小麦', '大米', '玉米', '花生', '大豆'] },
      yAxis: {},
      series: [{ type: 'bar', data: [200, 300, 150, 400, 250] }],
    })
  }

  if (purchaseChart.value) {
    const purchaseChartInstance = echarts.init(purchaseChart.value)
    purchaseChartInstance.setOption({
      title: { text: '采购金额饼图', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 25, name: '化肥' },
            { value: 15, name: '农药' },
            { value: 10, name: '种子' },
            { value: 50, name: '农机' },
            { value: 8, name: '塑料薄膜' },
          ],
        },
      ],
    })
  }

  if (profitChart.value) {
    const profitChartInstance = echarts.init(profitChart.value)
    profitChartInstance.setOption({
      title: { text: '销售利润折线图' },
      tooltip: {},
      xAxis: { data: ['小麦', '大米', '玉米', '花生', '大豆'] },
      yAxis: {},
      series: [{ type: 'line', data: [10, 15, 5, 25, 12.5] }],
    })
  }
})
</script>

<template>
  <el-container>
    <!-- 销售表和柱状图 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>销售表</h3>
          <el-table :data="salesData" border style="width: 100%;">
            <el-table-column prop="销售ID" label="销售ID" width="100" />
            <el-table-column prop="产品名称" label="产品名称" />
            <el-table-column prop="销售数量" label="销售数量(吨)" width="140" />
            <el-table-column prop="销售金额" label="销售金额(万元)" width="140" />
            <el-table-column prop="销售日期" label="销售日期" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>销售数量柱状图</h3>
          <div ref="salesChart" class="chart" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 代购表和饼图 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>代购表</h3>
          <el-table :data="purchaseData" border style="width: 100%;">
            <el-table-column prop="代购ID" label="代购ID" width="100" />
            <el-table-column prop="供应商名称" label="供应商名称" />
            <el-table-column prop="产品名称" label="产品名称" />
            <el-table-column prop="采购数量" label="采购数量(单位)" width="140" />
            <el-table-column prop="采购金额" label="采购金额(万元)" width="140" />
            <el-table-column prop="采购日期" label="采购日期" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>采购金额饼图</h3>
          <div ref="purchaseChart" class="chart" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 利润表和折线图 -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>利润表</h3>
          <el-table :data="profitData" border style="width: 100%;">
            <el-table-column prop="利润ID" label="利润ID" width="100" />
            <el-table-column prop="产品名称" label="产品名称" />
            <el-table-column prop="销售利润" label="销售利润(万元)" width="140" />
            <el-table-column prop="利润率" label="利润率(%)" width="140" />
            <el-table-column prop="结算日期" label="结算日期" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover">
          <h3>销售利润折线图</h3>
          <div ref="profitChart" class="chart" />
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<style scoped>
.el-container {
  padding: 20px;
  overflow-x: auto;
}

.el-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.el-table {
  margin-bottom: 20px;
}

.chart {
  height: 500px; /* 增加图表高度 */
}
</style>
