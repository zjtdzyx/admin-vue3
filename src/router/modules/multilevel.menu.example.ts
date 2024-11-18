import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_example',
  component: Layout,
  redirect: '/multilevel_menu_example/company',
  name: 'multilevelMenuExample',
  meta: {
    title: '',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'company',
      name: 'multilevelMenuExampleCompany',
      component: () => import('@/views/multilevel_menu_example/company.vue'),
      meta: {
        title: '公司',
      },
      children: [
        {
          path: 'basic_info',
          name: 'companyBasicInfo',
          component: () => import('@/views/multilevel_menu_example/company/basic_info.vue'),
          meta: {
            title: '基本信息设置',
          },
        },
        {
          path: 'statistics_analysis',
          name: 'companyStatisticsAnalysis',
          component: () => import('@/views/multilevel_menu_example/company/statistics_analysis.vue'),
          meta: {
            title: '统计分析',
          },
        },
        {
          path: 'production_plan',
          name: 'companyProductionPlan',
          component: () => import('@/views/multilevel_menu_example/company/production_plan.vue'),
          meta: {
            title: '生产计划制定',
          },
        },
        {
          path: 'material_in',
          name: 'companyMaterialIn',
          component: () => import('@/views/multilevel_menu_example/company/material_in.vue'),
          meta: {
            title: '公司物资入库',
          },
        },
        {
          path: 'material_out',
          name: 'companyMaterialOut',
          component: () => import('@/views/multilevel_menu_example/company/material_out.vue'),
          meta: {
            title: '公司物质出库',
          },
        },
        {
          path: 'material_inventory',
          name: 'companyMaterialInventory',
          component: () => import('@/views/multilevel_menu_example/company/material_inventory.vue'),
          meta: {
            title: '公司物质盘点',
          },
        },
      ],
    },
    {
      path: 'wholesale_center',
      name: 'multilevelMenuExampleWholesaleCenter',
      component: () => import('@/views/multilevel_menu_example/wholesale_center.vue'),
      meta: {
        title: '批发中心',
      },
      children: [
        {
          path: 'daily_business',
          name: 'wholesaleCenterDailyBusiness',
          component: () => import('@/views/multilevel_menu_example/wholesale_center/daily_business.vue'),
          meta: {
            title: '日常业务处理',
          },
        },
        {
          path: 'inventory_query',
          name: 'wholesaleCenterInventoryQuery',
          component: () => import('@/views/multilevel_menu_example/wholesale_center/inventory_query.vue'),
          meta: {
            title: '产品库存查询',
          },
        },
        {
          path: 'product_inventory',
          name: 'wholesaleCenterProductInventory',
          component: () => import('@/views/multilevel_menu_example/wholesale_center/product_inventory.vue'),
          meta: {
            title: '产品盘存',
          },
        },
      ],
    },
    {
      path: 'production_base',
      name: 'multilevelMenuExampleProductionBase',
      component: () => import('@/views/multilevel_menu_example/production_base.vue'),
      meta: {
        title: '生产基地',
      },
      children: [
        {
          path: 'material_info_query',
          name: 'productionBaseMaterialInfoQuery',
          component: () => import('@/views/multilevel_menu_example/production_base/material_info_query.vue'),
          meta: {
            title: '物资信息查询',
          },
        },
        {
          path: 'production_plan_query',
          name: 'productionBaseProductionPlanQuery',
          component: () => import('@/views/multilevel_menu_example/production_base/production_plan_query.vue'),
          meta: {
            title: '生产计划查询',
          },
        },
        {
          path: 'material_in',
          name: 'productionBaseMaterialIn',
          component: () => import('@/views/multilevel_menu_example/production_base/material_in.vue'),
          meta: {
            title: '物资入库',
          },
        },
        {
          path: 'material_out',
          name: 'productionBaseMaterialOut',
          component: () => import('@/views/multilevel_menu_example/production_base/material_out.vue'),
          meta: {
            title: '物资出库',
          },
        },
        {
          path: 'material_inventory',
          name: 'productionBaseMaterialInventory',
          component: () => import('@/views/multilevel_menu_example/production_base/material_inventory.vue'),
          meta: {
            title: '物资盘点',
          },
        },
        {
          path: 'product_inventory',
          name: 'productionBaseProductInventory',
          component: () => import('@/views/multilevel_menu_example/production_base/production_inventory.vue'),
          meta: {
            title: '产品盘点',
          },
        },
      ],
    },
    {
      path: 'purchasing_point',
      name: 'multilevelMenuExamplePurchasingPoint',
      component: () => import('@/views/multilevel_menu_example/purchasing_point.vue'),
      meta: {
        title: '代购点',
      },
      children: [
        {
          path: 'farmer_info',
          name: 'purchasingPointFarmerInfo',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/farmer_info.vue'),
          meta: {
            title: '农户信息设置',
          },
        },
        {
          path: 'material_in',
          name: 'purchasingPointMaterialIn',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/material_in.vue'),
          meta: {
            title: '物资入库',
          },
        },
        {
          path: 'material_out',
          name: 'purchasingPointMaterialOut',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/material_out.vue'),
          meta: {
            title: '物资出库',
          },
        },
        {
          path: 'material_inventory',
          name: 'purchasingPointMaterialInventory',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/material_inventory.vue'),
          meta: {
            title: '物资盘点',
          },
        },
        {
          path: 'product_inventory',
          name: 'purchasingPointProductInventory',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/product_inventory.vue'),
          meta: {
            title: '产品盘点',
          },
        },
        {
          path: 'production_plan_query',
          name: 'purchasingPointProductionPlanQuery',
          component: () => import('@/views/multilevel_menu_example/purchasing_point/production_plan_query.vue'),
          meta: {
            title: '生产计划查询',
          },
        },
      ],
    },
  ],
}

export default routes
