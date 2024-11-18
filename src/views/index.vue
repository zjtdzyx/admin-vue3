<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const fantasticStartkitInfo = ref({
  feature: [
    '支持 TypeScript',
    '默认集成 vue-router 和 pinia',
    '支持基于文件系统的路由',
    '全局组件自动引入',
    '全局 SCSS 资源引入',
    '支持 Unocss',
    '支持 SVG 文件图标、Iconify 图标、UnoCSS 图标',
    '支持 mock 数据，可脱离后端束缚独立开发',
    '支持 gzip / brotli 优化项目体积，提高加载速度',
    '结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范',
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://fantastic-admin.hurui.me/preview1.png',
    'https://fantastic-admin.hurui.me/preview2.png',
    'https://fantastic-admin.hurui.me/preview3.png',
    'https://fantastic-admin.hurui.me/preview4.png',
    'https://fantastic-admin.hurui.me/preview5.png',
    'https://fantastic-admin.hurui.me/preview6.png',
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.hurui.me/preview1.png',
    'https://one-step-admin.hurui.me/preview2.png',
    'https://one-step-admin.hurui.me/preview3.png',
    'https://one-step-admin.hurui.me/preview4.png',
    'https://one-step-admin.hurui.me/preview5.png',
    'https://one-step-admin.hurui.me/preview6.png',
  ],
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎来到嘉农公司信息管理系统
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            这里是嘉农公司后台管理系统的主页，在这个页面中，我们会对这个系统的一些基本信息进行介绍，同时也会简要介绍一下我们项目的技术栈、基本功能、业务逻辑等。
          </div>

          <div>
            注：我们团队的成员是张博闻、张岳平、张宇翔、李昊珉、陈彦伟，本系统于2024.11.18日开始开发，预计11.21号完成基本功能
          </div>
        </div>
      </template>
      <HButton outline @click="open('https://fantastic-admin.hurui.me')">
        <SvgIcon name="i-ri:file-text-line" />
        模版文档
      </HButton>
      <HDropdownMenu
        :items="[
          [
            {
              label: 'Gitee',
              handle: () => open('https://gitee.com/yx_z04/jianong-admin'),
            },
            {
              label: 'Github',
              handle: () => open('https://github.com/zjtdzyx/jianong-admin'),
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
    <div class="w-full flex flex-col gap-4 px-4 xl:flex-row">
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://cn.vuejs.org/logo.svg">
            <div>
              <h1 class="c-[#41b883]">
                Fantastic-startkit
              </h1>
              <h2>一款简单好用的 Vue3 项目启动套件</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton
              @click="open('https://hooray.github.io/fantastic-startkit')"
            >
              访问官网
            </HButton>
          </div>
        </template>
        <ul class="m-0 pr-8 text-size-sm leading-6">
          <li v-for="item in fantasticStartkitInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://fantastic-admin.hurui.me/logo.png">
            <div>
              <h1 class="c-[#e60000]">
                Fantastic-admin
              </h1>
              <h2>一款开箱即用的 Vue 中后台管理系统框架</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://fantastic-admin.hurui.me')">
              访问官网
            </HButton>
          </div>
        </template>
        <ElCarousel
          trigger="click"
          indicator-position="none"
          :interval="5000"
          height="250px"
        >
          <ElCarouselItem
            v-for="(item, index) in fantasticAdminInfo.data"
            :key="item"
          >
            <ElImage
              :src="item"
              fit="cover"
              style="width: 100%; height: 250px; margin: auto; cursor: pointer;"
              @click="
                fantasticAdminInfo.imageVisible = true;
                fantasticAdminInfo.index = index;
              "
            />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer
          v-if="fantasticAdminInfo.imageVisible"
          :url-list="fantasticAdminInfo.data"
          :initial-index="fantasticAdminInfo.index"
          @close="fantasticAdminInfo.imageVisible = false"
        />
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://one-step-admin.hurui.me/logo.png">
            <div>
              <h1 class="c-[#67c23a]">
                One-step-admin
              </h1>
              <h2>一款干啥都快人一步的 Vue 中后台系统框架</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://one-step-admin.hurui.me')">
              访问官网
            </HButton>
          </div>
        </template>
        <ElCarousel
          trigger="click"
          indicator-position="none"
          :interval="5000"
          height="250px"
        >
          <ElCarouselItem
            v-for="(item, index) in oneStepAdminInfo.data"
            :key="item"
          >
            <ElImage
              :src="item"
              fit="cover"
              style="width: 100%; height: 250px; margin: auto; cursor: pointer;"
              @click="
                oneStepAdminInfo.imageVisible = true;
                oneStepAdminInfo.index = index;
              "
            />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer
          v-if="oneStepAdminInfo.imageVisible"
          :url-list="oneStepAdminInfo.data"
          :initial-index="oneStepAdminInfo.index"
          @close="oneStepAdminInfo.imageVisible = false"
        />
      </PageMain>
    </div>
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.ecology {
  --uno: flex-1 m-0;

  :deep(.title-container) {
    --uno: flex items-center justify-between flex-wrap gap-4;

    .title-info {
      --uno: flex items-center gap-4;

      img {
        --uno: block w-12 h-12;
      }

      h1 {
        --uno: m-0 text-2xl;
      }

      h2 {
        --uno: m-0 text-base text-stone-5 font-normal;
      }
    }
  }
}
</style>
