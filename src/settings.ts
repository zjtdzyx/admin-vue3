import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'
import { defaultsDeep } from 'lodash-es'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
    enableDynamicTitle: true,
  },
  home: {
    title: 'Home',
  },
  menu: {
    mode: 'head',
  },
  topbar: {
    mode: 'sticky',
  },
  tabbar: {
    enableIcon: true,
  },
  toolbar: {
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
  },
  copyright: {
    enable: true,
    dates: '2024.11.18-2024.11.22',
    company: '嘉农公司信息管理系统',
  },

  // 请在此处编写或粘贴配置代码
}

export default defaultsDeep(
  globalSettings,
  settingsDefault,
) as RecursiveRequired<Settings.all>
