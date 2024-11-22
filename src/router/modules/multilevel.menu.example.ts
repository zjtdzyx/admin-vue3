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
    // 公司功能
    {
      path: 'company',
      name: 'multilevelMenuExampleCompany',
      component: () => import('@/views/multilevel_menu_example/company.vue'),
      meta: {
        title: '公司',
      },
      children: [
        {
          path: 'product_info',
          name: 'companyProductInfo',
          component: () =>
            import('@/views/multilevel_menu_example/company/product_info.vue'),
          meta: {
            title: '产品信息管理',
          },
        },
        {
          path: 'material_info',
          name: 'companyMaterialInfo',
          component: () =>
            import('@/views/multilevel_menu_example/company/material_info.vue'),
          meta: {
            title: '物资信息管理',
          },
        },
        {
          path: 'farmer_info',
          name: 'companyFarmerInfo',
          component: () =>
            import('@/views/multilevel_menu_example/company/farmer_info.vue'),
          meta: {
            title: '农户信息管理',
          },
        },
        {
          path: 'customer_info',
          name: 'companyCustomerInfo',
          component: () =>
            import('@/views/multilevel_menu_example/company/customer_info.vue'),
          meta: {
            title: '顾客信息管理',
          },
        },
        {
          path: 'organization_settings',
          name: 'companyOrganizationSettings',
          component: () =>
            import(
              '@/views/multilevel_menu_example/company/organization_settings.vue'
            ),
          meta: {
            title: '公司机构设置',
          },
        },
        {
          path: 'system_settings',
          name: 'companySystemSettings',
          component: () =>
            import(
              '@/views/multilevel_menu_example/company/system_settings.vue'
            ),
          meta: {
            title: '系统设置',
          },
        },
      ],
    },
    // 批发中心功能
    {
      path: 'wholesale_center',
      name: 'multilevelMenuExampleWholesaleCenter',
      component: () =>
        import('@/views/multilevel_menu_example/wholesale_center.vue'),
      meta: {
        title: '批发中心',
      },
      children: [
        {
          path: 'product_info_query',
          name: 'wholesaleCenterProductInfoQuery',
          component: () =>
            import(
              '@/views/multilevel_menu_example/wholesale_center/product_info_query.vue'
            ),
          meta: {
            title: '产品信息查询',
          },
        },
        {
          path: 'customer_info',
          name: 'wholesaleCenterCustomerInfo',
          component: () =>
            import(
              '@/views/multilevel_menu_example/wholesale_center/customer_info.vue'
            ),
          meta: {
            title: '顾客信息管理',
          },
        },
        {
          path: 'product_inventory',
          name: 'wholesaleCenterProductInventory',
          component: () =>
            import(
              '@/views/multilevel_menu_example/wholesale_center/product_inventory.vue'
            ),
          meta: {
            title: '产品盘存',
          },
        },
      ],
    },
    // 生产基地功能
    {
      path: 'production_base',
      name: 'multilevelMenuExampleProductionBase',
      component: () =>
        import('@/views/multilevel_menu_example/production_base.vue'),
      meta: {
        title: '生产基地',
      },
      children: [
        {
          path: 'material_info_query',
          name: 'productionBaseMaterialInfoQuery',
          component: () =>
            import(
              '@/views/multilevel_menu_example/production_base/material_info_query.vue'
            ),
          meta: {
            title: '物资信息查询',
          },
        },
        {
          path: 'production_plan_query',
          name: 'productionBaseProductionPlanQuery',
          component: () =>
            import(
              '@/views/multilevel_menu_example/production_base/production_plan_query.vue'
            ),
          meta: {
            title: '生产计划查询',
          },
        },
        {
          path: 'product_inventory',
          name: 'productionBaseProductInventory',
          component: () =>
            import(
              '@/views/multilevel_menu_example/production_base/product_inventory.vue'
            ),
          meta: {
            title: '产品盘点',
          },
        },
      ],
    },
    // 收购点功能
    {
      path: 'purchasing_point',
      name: 'multilevelMenuExamplePurchasingPoint',
      component: () =>
        import('@/views/multilevel_menu_example/purchasing_point.vue'),
      meta: {
        title: '代购点',
      },
      children: [
        {
          path: 'farmer_info',
          name: 'purchasingPointFarmerInfo',
          component: () =>
            import(
              '@/views/multilevel_menu_example/purchasing_point/farmer_info.vue'
            ),
          meta: {
            title: '农户信息管理',
          },
        },
        {
          path: 'product_in',
          name: 'purchasingPointProductIn',
          component: () =>
            import(
              '@/views/multilevel_menu_example/purchasing_point/product_in.vue'
            ),
          meta: {
            title: '产品入库',
          },
        },
        {
          path: 'product_out',
          name: 'purchasingPointProductOut',
          component: () =>
            import(
              '@/views/multilevel_menu_example/purchasing_point/product_out.vue'
            ),
          meta: {
            title: '产品出库',
          },
        },
        {
          path: 'material_in',
          name: 'purchasingPointMaterialIn',
          component: () =>
            import(
              '@/views/multilevel_menu_example/purchasing_point/material_in.vue'
            ),
          meta: {
            title: '物资入库',
          },
        },
        {
          path: 'material_out',
          name: 'purchasingPointMaterialOut',
          component: () =>
            import(
              '@/views/multilevel_menu_example/purchasing_point/material_out.vue'
            ),
          meta: {
            title: '物资出库',
          },
        },
      ],
    },
    // 统计分析
    {
      path: 'StatisticsAnalysis.vue',
      name: 'multilevelMenuExampleStatisticsAnalysis.vue',
      component: () =>
        import('@/views/multilevel_menu_example/StatisticsAnalysis.vue'),
      meta: {
        title: '统计分析',
      },
      children: [
        {
          path: 'StatisticsAnalysis',
          name: 'StatisticsAnalysisInfo',
          component: () =>
            import(
              '@/views/multilevel_menu_example/StatisticsAnalysis/StatisticsAnalysis.vue'
            ),
          meta: {
            title: '统计分析',
          },
        },
      ],
    },
  ],
}

export default routes
