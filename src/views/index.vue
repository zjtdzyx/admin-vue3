<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

// 当前日期
const currentDate = ref(new Date().toLocaleDateString())

// 统计数据
const stats = ref([
  { name: '总用户数', value: 1200 },
  { name: '总产品数', value: 300 },
  { name: '总订单数', value: 150 },
])

// 最近活动
const recentActivities = ref([
  { id: 1, description: '用户A创建了一个新订单' },
  { id: 2, description: '用户B更新了产品信息' },
  { id: 3, description: '用户C删除了一个订单' },
])

// 图表初始化函数
function initChart() {
  const chartDom = document.getElementById('statsChart')
  if (chartDom) {
    const myChart = echarts.init(chartDom)

    const option = {
      title: {
        text: '系统统计数据',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: '10%',
      },
      series: [
        {
          name: '统计数据',
          type: 'pie',
          radius: '50%',
          data: stats.value.map(item => ({
            value: item.value,
            name: item.name,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }

    myChart.setOption(option)
  }
  }
  function openLink(url) {
  window.open(url, '_blank')
}

onMounted(() => {
  initChart()
})
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
         <h3>
          欢迎来到某农业公司后台管理系统的主页
         </h3>
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            这里是嘉农公司后台管理系统的主页，在这个页面中，我们会对这个系统的一些基本信息进行介绍，同时也会简要介绍一下我们项目的技术栈、基本功能、业务逻辑等。
          </div>

          <div>
            注：本系统于2024.11.18日开始开发，预计11.21号完成基本功能
          </div>
        </div>
      </template>
      <HButton outline @click="openLink('https://fantastic-admin.hurui.me')">
        <SvgIcon name="i-ri:file-text-line" />
        模版文档
      </HButton>
      <HDropdownMenu
        :items="[
          [
            {
              label: 'Gitee',
              handle: () => openLink('https://gitee.com/yx_z04/jianong-admin'),
            },
            {
              label: 'Github',
              handle: () => openLink('https://github.com/zjtdzyx/jianong-admin'),
            },
          ],
        ]"
      >
        <HButton class="ml-2">
          <SvgIcon name="i-ri:code-s-slash-line" />
          代码仓库
          <SvgIcon name="i-ep:arrow-down" />
        </HButton>
      </HDropdownMenu>
    </PageHeader>

    <!-- 欢迎消息 -->
    <el-row :gutter="20" class="dashboard">
      <el-col :span="24" class="welcome">
        <el-card>
          <h2>欢迎回来，管理员！</h2>
          <p>今天是 {{ currentDate }}</p>
        </el-card>
      </el-col>

      <!-- 统计数据图表 -->
      <el-col :span="24">
        <el-card>
          <h3>系统统计数据</h3>
          <div id="statsChart" style="width: 100%; height: 400px;" />
        </el-card>
      </el-col>

      <!-- 最近活动 -->
      <el-col :span="24" class="recent-activities">
        <el-card>
          <h3>最近活动</h3>
          <el-timeline>
            <el-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
            >
              {{ activity.description }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.welcome {
  margin-bottom: 20px;
}

.recent-activities {
  margin-top: 20px;
}
</style>
