// vite.config.ts
import fs from "node:fs";
import path2 from "node:path";
import process2 from "node:process";
import dayjs from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
import { defineConfig, loadEnv as loadEnv2 } from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0/node_modules/vite/dist/node/index.js";
import checker from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-checker@0.8.0_eslint@9.15.0_jiti@1.21.6__optionator@0.9.4_stylelint@16.10.0_types_tfow42cw4ns6zddmj3xawu45ee/node_modules/vite-plugin-checker/dist/esm/main.js";

// package.json
var package_default = {
  type: "module",
  version: "4.12.0",
  engines: {
    node: "^18.18.0 || ^20.9.0 || >=21.1.0"
  },
  scripts: {
    dev: "vite",
    build: "vite build --base=/jianong-admin/",
    "build:test": "vue-tsc -b && vite build --mode test",
    serve: "http-server ./dist -o",
    "serve:test": "http-server ./dist-test -o",
    svgo: "svgo -f src/assets/icons",
    new: "plop",
    "generate:icons": "esno ./scripts/generate.icons.ts",
    lint: "npm-run-all -s lint:tsc lint:eslint lint:stylelint",
    "lint:tsc": "vue-tsc -b",
    "lint:eslint": "eslint . --cache --fix",
    "lint:stylelint": 'stylelint "src/**/*.{css,scss,vue}" --cache --fix',
    postinstall: "simple-git-hooks",
    preinstall: "npx only-allow pnpm",
    commit: "git cz",
    release: "bumpp"
  },
  dependencies: {
    "@headlessui/vue": "^1.7.23",
    "@imengyu/vue3-context-menu": "^1.4.3",
    "@vueuse/components": "^11.1.0",
    "@vueuse/core": "^11.1.0",
    "@vueuse/integrations": "^11.1.0",
    axios: "^1.7.7",
    dayjs: "^1.11.13",
    defu: "^6.1.4",
    "disable-devtool": "^0.3.8",
    echarts: "^5.5.1",
    "element-plus": "^2.8.5",
    eruda: "^3.4.0",
    "floating-vue": "5.2.2",
    "hotkeys-js": "^3.13.7",
    "lodash-es": "^4.17.21",
    mitt: "^3.0.1",
    mockjs: "^1.1.0",
    nprogress: "^0.2.0",
    overlayscrollbars: "^2.10.0",
    "overlayscrollbars-vue": "^0.5.9",
    "path-browserify": "^1.0.1",
    "path-to-regexp": "^8.2.0",
    pinia: "^2.2.4",
    qs: "^6.13.0",
    scule: "^1.3.0",
    vconsole: "^3.15.1",
    vite: "5.2.0",
    vue: "^3.5.12",
    "vue-echarts": "^7.0.3",
    "vue-m-message": "^4.0.2",
    "vue-router": "^4.4.5"
  },
  devDependencies: {
    "@antfu/eslint-config": "3.8.0",
    "@iconify/json": "^2.2.261",
    "@iconify/vue": "^4.1.2",
    "@stylistic/stylelint-config": "^2.0.0",
    "@types/lodash-es": "^4.17.12",
    "@types/mockjs": "^1.0.10",
    "@types/nprogress": "^0.2.3",
    "@types/path-browserify": "^1.0.3",
    "@types/qs": "^6.9.16",
    "@unocss/eslint-plugin": "^0.63.4",
    "@vitejs/plugin-legacy": "^5.4.2",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vitejs/plugin-vue-jsx": "^4.0.1",
    autoprefixer: "^10.4.20",
    "axios-mock-adapter": "^2.1.0",
    boxen: "^8.0.1",
    bumpp: "^9.7.1",
    "cz-git": "^1.10.1",
    eslint: "^9.15.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    esno: "^4.8.0",
    "fs-extra": "^11.2.0",
    "http-server": "^14.1.1",
    inquirer: "^12.0.0",
    "lint-staged": "^15.2.10",
    "npm-run-all2": "^6.2.4",
    picocolors: "^1.1.1",
    plop: "^4.0.1",
    postcss: "^8.4.47",
    "postcss-nested": "^6.2.0",
    prettier: "^3.3.3",
    "sass-embedded": "^1.80.2",
    "simple-git-hooks": "^2.11.1",
    stylelint: "^16.10.0",
    "stylelint-config-recess-order": "^5.1.1",
    "stylelint-config-standard-scss": "^13.1.0",
    "stylelint-config-standard-vue": "^1.0.0",
    "stylelint-scss": "^6.8.1",
    svgo: "^3.3.2",
    typescript: "^5.6.3",
    unocss: "^0.63.4",
    "unocss-preset-scrollbar": "^0.3.1",
    "unplugin-auto-import": "^0.18.3",
    "unplugin-turbo-console": "^1.10.4",
    "unplugin-vue-components": "^0.27.4",
    "vite-plugin-app-loading": "^0.3.0",
    "vite-plugin-archiver": "^0.1.1",
    "vite-plugin-banner": "^0.8.0",
    "vite-plugin-checker": "^0.8.0",
    "vite-plugin-compression2": "^1.3.0",
    "vite-plugin-fake-server": "^2.1.2",
    "vite-plugin-pages": "^0.32.3",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.5.2",
    "vite-plugin-vue-meta-layouts": "^0.4.3",
    "vue-tsc": "^2.1.6"
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite/plugins.ts
import path from "node:path";
import process from "node:process";
import vueLegacy from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.2_terser@5.33.0_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0_/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import vue from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.1_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import boxen from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js";
import picocolors from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js";
import Unocss from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/unocss@0.63.4_postcss@8.4.47_rollup@4.24.0_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0_/node_modules/unocss/dist/vite.mjs";
import autoImport from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0_vue@3.5.12_typescript@5.6.3___rollup@4.24.0_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import TurboConsole from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/unplugin-turbo-console@1.10.4_@babel+parser@7.25.8_esbuild@0.23.1_rollup@4.24.0_vite@5.2.0_@t_cwdwlr6vazafz27d5qxq3fmnfq/node_modules/unplugin-turbo-console/dist/vite.mjs";
import components from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.8_rollup@4.24.0_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { loadEnv } from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0/node_modules/vite/dist/node/index.js";
import AppLoading from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-app-loading@0.3.0/node_modules/vite-plugin-app-loading/dist/index.js";
import Archiver from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-archiver@0.1.1/node_modules/vite-plugin-archiver/dist/index.js";
import banner from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-banner@0.8.0/node_modules/vite-plugin-banner/dist/index.mjs";
import { compression } from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-compression2@1.3.0_rollup@4.24.0/node_modules/vite-plugin-compression2/dist/index.mjs";
import { vitePluginFakeServer } from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-fake-server@2.1.2/node_modules/vite-plugin-fake-server/dist/index.mjs";
import Pages from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-pages@0.32.3_@vue+compiler-sfc@3.5.12_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_t_n5bfdrfvexew6bc74bil4umxfe/node_modules/vite-plugin-pages/dist/index.js";
import { createSvgIconsPlugin } from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueDevTools from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-vue-devtools@7.5.2_rollup@4.24.0_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser_uyxhhu5v744l47gj732wqi5gae/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Layouts from "file:///D:/School/%E5%98%89%E5%86%9Cadmin/local/jianong-admin/node_modules/.pnpm/vite-plugin-vue-meta-layouts@0.4.3_vite@5.2.0_@types+node@22.5.5_sass@1.79.2_terser@5.33.0__v_ebjza7t4xyypipgarw3umhymdq/node_modules/vite-plugin-vue-meta-layouts/dist/index.mjs";
function createVitePlugins(mode, isBuild = false) {
  const viteEnv = loadEnv(mode, process.cwd());
  const vitePlugins = [
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: ["es.array.at", "es.array.find-last"]
    }),
    // https://github.com/vuejs/devtools-next
    viteEnv.VITE_OPEN_DEVTOOLS === "true" && VueDevTools(),
    // https://github.com/unplugin/unplugin-auto-import
    autoImport({
      imports: ["vue", "vue-router", "pinia"],
      dts: "./src/types/auto-imports.d.ts",
      dirs: ["./src/utils/composables/**"]
    }),
    // https://github.com/unplugin/unplugin-vue-components
    components({
      dirs: ["src/components", "src/layouts/ui-kit"],
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      dts: "./src/types/components.d.ts"
    }),
    Unocss(),
    // https://github.com/vbenjs/vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/")],
      symbolId: "icon-[dir]-[name]",
      svgoOptions: isBuild
    }),
    // https://github.com/condorheroblog/vite-plugin-fake-server
    vitePluginFakeServer({
      logger: !isBuild,
      include: "src/mock",
      infixName: false,
      enableProd: isBuild && viteEnv.VITE_BUILD_MOCK === "true"
    }),
    // https://github.com/dishait/vite-plugin-vue-meta-layouts
    Layouts({
      defaultLayout: "index"
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: "src/views",
      exclude: ["**/components/**/*.vue"]
    }),
    // https://github.com/nonzzz/vite-plugin-compression
    viteEnv.VITE_BUILD_COMPRESS?.split(",").includes("gzip") && compression(),
    viteEnv.VITE_BUILD_COMPRESS?.split(",").includes("brotli") && compression({
      exclude: [/\.(br)$/, /\.(gz)$/],
      algorithm: "brotliCompress"
    }),
    viteEnv.VITE_BUILD_ARCHIVE && Archiver({
      archiveType: viteEnv.VITE_BUILD_ARCHIVE
    }),
    AppLoading("loading.html"),
    // https://github.com/unplugin/unplugin-turbo-console
    TurboConsole(),
    // https://github.com/chengpeiquan/vite-plugin-banner
    banner(`
/**
 * \u7531 Fantastic-admin \u63D0\u4F9B\u6280\u672F\u652F\u6301
 * Powered by Fantastic-admin
 * https://fantastic-admin.hurui.me
 */
    `),
    {
      name: "vite-plugin-debug-plugin",
      enforce: "pre",
      transform: (code, id) => {
        if (/src\/main.ts$/.test(id)) {
          if (viteEnv.VITE_APP_DEBUG_TOOL === "eruda") {
            code = code.concat(`
              import eruda from 'eruda'
              eruda.init()
            `);
          } else if (viteEnv.VITE_APP_DEBUG_TOOL === "vconsole") {
            code = code.concat(`
              import VConsole from 'vconsole'
              new VConsole()
            `);
          }
          return {
            code,
            map: null
          };
        }
      }
    },
    {
      name: "vite-plugin-disable-devtool",
      enforce: "pre",
      transform: (code, id) => {
        if (/src\/main.ts$/.test(id)) {
          if (viteEnv.VITE_APP_DISABLE_DEVTOOL === "true") {
            code = code.concat(`
              import DisableDevtool from 'disable-devtool'
              DisableDevtool()
            `);
          }
          return {
            code,
            map: null
          };
        }
      }
    },
    {
      name: "vite-plugin-terminal-info",
      apply: "serve",
      async buildStart() {
        const { bold, green, cyan, bgGreen, underline } = picocolors;
        console.log(
          boxen(
            `${bold(green(`\u7531 ${bgGreen("Fantastic-admin")} \u9A71\u52A8`))}

${underline("https://fantastic-admin.hurui.me")}

\u5F53\u524D\u4F7F\u7528\uFF1A${cyan("\u57FA\u7840\u7248")}`,
            {
              padding: 1,
              margin: 1,
              borderStyle: "double",
              textAlignment: "center"
            }
          )
        );
      }
    }
  ];
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\School\\\u5609\u519Cadmin\\local\\jianong-admin";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv2(mode, process2.cwd());
  const scssResources = [];
  fs.readdirSync("src/assets/styles/resources").forEach((dirname) => {
    if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(
        `@use "/src/assets/styles/resources/${dirname}" as *;`
      );
    }
  });
  return {
    // 开发服务器选项 https://cn.vitejs.dev/config/server-options
    "server": {
      open: true,
      port: 9e3,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path3) => path3.replace(/\/proxy/, "")
        }
      }
    },
    "plugins": [
      createVitePlugins(mode, command === "build"),
      checker({ typescript: false })
      // 添加这行来忽略 TypeScript 类型检查
    ],
    "esbuild": {
      loader: "ts",
      logLevel: "silent"
      // 禁止报错信息
    },
    "define": {
      __BUILD_INFO__: JSON.stringify({
        pkg: {
          name: package_default.name,
          version: package_default.version
        },
        lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
      })
    },
    "resolve": {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "src"),
        "#": path2.resolve(__vite_injected_original_dirname, "src/types")
      }
    },
    "css": {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: scssResources.join("")
        }
      }
    },
    "simple-git-hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run test"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInZpdGUvcGx1Z2lucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFNjaG9vbFxcXFxcdTU2MDlcdTUxOUNhZG1pblxcXFxsb2NhbFxcXFxqaWFub25nLWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxTY2hvb2xcXFxcXHU1NjA5XHU1MTlDYWRtaW5cXFxcbG9jYWxcXFxcamlhbm9uZy1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovU2Nob29sLyVFNSU5OCU4OSVFNSU4NiU5Q2FkbWluL2xvY2FsL2ppYW5vbmctYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcidcclxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbidcclxuaW1wb3J0IGNyZWF0ZVZpdGVQbHVnaW5zIGZyb20gJy4vdml0ZS9wbHVnaW5zJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUsIGNvbW1hbmQgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICAvLyBcdTUxNjhcdTVDNDAgc2NzcyBcdThENDRcdTZFOTBcclxuICBjb25zdCBzY3NzUmVzb3VyY2VzOiBzdHJpbmdbXSA9IFtdXHJcbiAgZnMucmVhZGRpclN5bmMoJ3NyYy9hc3NldHMvc3R5bGVzL3Jlc291cmNlcycpLmZvckVhY2goKGRpcm5hbWUpID0+IHtcclxuICAgIGlmIChmcy5zdGF0U3luYyhgc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1gKS5pc0ZpbGUoKSkge1xyXG4gICAgICBzY3NzUmVzb3VyY2VzLnB1c2goXHJcbiAgICAgICAgYEB1c2UgXCIvc3JjL2Fzc2V0cy9zdHlsZXMvcmVzb3VyY2VzLyR7ZGlybmFtZX1cIiBhcyAqO2AsXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkwMDlcdTk4NzkgaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy9zZXJ2ZXItb3B0aW9uc1xyXG4gICAgJ3NlcnZlcic6IHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgcG9ydDogOTAwMCxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL3Byb3h5Jzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgZW52LlZJVEVfT1BFTl9QUk9YWSA9PT0gJ3RydWUnLFxyXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL1xcL3Byb3h5LywgJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ3BsdWdpbnMnOiBbXHJcbiAgICAgIGNyZWF0ZVZpdGVQbHVnaW5zKG1vZGUsIGNvbW1hbmQgPT09ICdidWlsZCcpLFxyXG4gICAgICBjaGVja2VyKHsgdHlwZXNjcmlwdDogZmFsc2UgfSksIC8vIFx1NkRGQlx1NTJBMFx1OEZEOVx1ODg0Q1x1Njc2NVx1NUZGRFx1NzU2NSBUeXBlU2NyaXB0IFx1N0M3Qlx1NTc4Qlx1NjhDMFx1NjdFNVxyXG4gICAgXSxcclxuICAgICdlc2J1aWxkJzoge1xyXG4gICAgICBsb2FkZXI6ICd0cycsXHJcbiAgICAgIGxvZ0xldmVsOiAnc2lsZW50JywgLy8gXHU3OTgxXHU2QjYyXHU2MkE1XHU5NTE5XHU0RkUxXHU2MDZGXHJcbiAgICB9LFxyXG4gICAgJ2RlZmluZSc6IHtcclxuICAgICAgX19CVUlMRF9JTkZPX186IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICBwa2c6IHtcclxuICAgICAgICAgIG5hbWU6IHBrZy5uYW1lLFxyXG4gICAgICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG4gICAgICB9KSxcclxuICAgIH0sXHJcbiAgICAncmVzb2x2ZSc6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgICAnIyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdHlwZXMnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnY3NzJzoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBzY3NzUmVzb3VyY2VzLmpvaW4oJycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ3NpbXBsZS1naXQtaG9va3MnOiB7XHJcbiAgICAgICdwcmUtY29tbWl0JzogJ25wbSBydW4gbGludCcsXHJcbiAgICAgICdwcmUtcHVzaCc6ICducG0gcnVuIHRlc3QnLFxyXG4gICAgfSxcclxuICB9XHJcbn0pXG4iLCAie1xuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiNC4xMi4wXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjE4LjE4LjAgfHwgXjIwLjkuMCB8fCA+PTIxLjEuMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGQgLS1iYXNlPS9qaWFub25nLWFkbWluL1wiLFxuICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZ1ZS10c2MgLWIgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxuICAgIFwic2VydmVcIjogXCJodHRwLXNlcnZlciAuL2Rpc3QgLW9cIixcbiAgICBcInNlcnZlOnRlc3RcIjogXCJodHRwLXNlcnZlciAuL2Rpc3QtdGVzdCAtb1wiLFxuICAgIFwic3Znb1wiOiBcInN2Z28gLWYgc3JjL2Fzc2V0cy9pY29uc1wiLFxuICAgIFwibmV3XCI6IFwicGxvcFwiLFxuICAgIFwiZ2VuZXJhdGU6aWNvbnNcIjogXCJlc25vIC4vc2NyaXB0cy9nZW5lcmF0ZS5pY29ucy50c1wiLFxuICAgIFwibGludFwiOiBcIm5wbS1ydW4tYWxsIC1zIGxpbnQ6dHNjIGxpbnQ6ZXNsaW50IGxpbnQ6c3R5bGVsaW50XCIsXG4gICAgXCJsaW50OnRzY1wiOiBcInZ1ZS10c2MgLWJcIixcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC4gLS1jYWNoZSAtLWZpeFwiLFxuICAgIFwibGludDpzdHlsZWxpbnRcIjogXCJzdHlsZWxpbnQgXFxcInNyYy8qKi8qLntjc3Msc2Nzcyx2dWV9XFxcIiAtLWNhY2hlIC0tZml4XCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInNpbXBsZS1naXQtaG9va3NcIixcbiAgICBcInByZWluc3RhbGxcIjogXCJucHggb25seS1hbGxvdyBwbnBtXCIsXG4gICAgXCJjb21taXRcIjogXCJnaXQgY3pcIixcbiAgICBcInJlbGVhc2VcIjogXCJidW1wcFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBoZWFkbGVzc3VpL3Z1ZVwiOiBcIl4xLjcuMjNcIixcbiAgICBcIkBpbWVuZ3l1L3Z1ZTMtY29udGV4dC1tZW51XCI6IFwiXjEuNC4zXCIsXG4gICAgXCJAdnVldXNlL2NvbXBvbmVudHNcIjogXCJeMTEuMS4wXCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTEuMS4wXCIsXG4gICAgXCJAdnVldXNlL2ludGVncmF0aW9uc1wiOiBcIl4xMS4xLjBcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy43XCIsXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjEzXCIsXG4gICAgXCJkZWZ1XCI6IFwiXjYuMS40XCIsXG4gICAgXCJkaXNhYmxlLWRldnRvb2xcIjogXCJeMC4zLjhcIixcbiAgICBcImVjaGFydHNcIjogXCJeNS41LjFcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjguNVwiLFxuICAgIFwiZXJ1ZGFcIjogXCJeMy40LjBcIixcbiAgICBcImZsb2F0aW5nLXZ1ZVwiOiBcIjUuMi4yXCIsXG4gICAgXCJob3RrZXlzLWpzXCI6IFwiXjMuMTMuN1wiLFxuICAgIFwibG9kYXNoLWVzXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm1vY2tqc1wiOiBcIl4xLjEuMFwiLFxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJvdmVybGF5c2Nyb2xsYmFyc1wiOiBcIl4yLjEwLjBcIixcbiAgICBcIm92ZXJsYXlzY3JvbGxiYXJzLXZ1ZVwiOiBcIl4wLjUuOVwiLFxuICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJwYXRoLXRvLXJlZ2V4cFwiOiBcIl44LjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4yLjRcIixcbiAgICBcInFzXCI6IFwiXjYuMTMuMFwiLFxuICAgIFwic2N1bGVcIjogXCJeMS4zLjBcIixcbiAgICBcInZjb25zb2xlXCI6IFwiXjMuMTUuMVwiLFxuICAgIFwidml0ZVwiOiBcIjUuMi4wXCIsXG4gICAgXCJ2dWVcIjogXCJeMy41LjEyXCIsXG4gICAgXCJ2dWUtZWNoYXJ0c1wiOiBcIl43LjAuM1wiLFxuICAgIFwidnVlLW0tbWVzc2FnZVwiOiBcIl40LjAuMlwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjQuNVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiMy44LjBcIixcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjI2MVwiLFxuICAgIFwiQGljb25pZnkvdnVlXCI6IFwiXjQuMS4yXCIsXG4gICAgXCJAc3R5bGlzdGljL3N0eWxlbGludC1jb25maWdcIjogXCJeMi4wLjBcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2gtZXNcIjogXCJeNC4xNy4xMlwiLFxuICAgIFwiQHR5cGVzL21vY2tqc1wiOiBcIl4xLjAuMTBcIixcbiAgICBcIkB0eXBlcy9ucHJvZ3Jlc3NcIjogXCJeMC4yLjNcIixcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjNcIixcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTZcIixcbiAgICBcIkB1bm9jc3MvZXNsaW50LXBsdWdpblwiOiBcIl4wLjYzLjRcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiOiBcIl41LjQuMlwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMS40XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjQuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4yMFwiLFxuICAgIFwiYXhpb3MtbW9jay1hZGFwdGVyXCI6IFwiXjIuMS4wXCIsXG4gICAgXCJib3hlblwiOiBcIl44LjAuMVwiLFxuICAgIFwiYnVtcHBcIjogXCJeOS43LjFcIixcbiAgICBcImN6LWdpdFwiOiBcIl4xLjEwLjFcIixcbiAgICBcImVzbGludFwiOiBcIl45LjE1LjBcIixcbiAgICBcImVzbGludC1jb25maWctcHJldHRpZXJcIjogXCJeOS4xLjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjogXCJeNS4yLjFcIixcbiAgICBcImVzbm9cIjogXCJeNC44LjBcIixcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxuICAgIFwiaHR0cC1zZXJ2ZXJcIjogXCJeMTQuMS4xXCIsXG4gICAgXCJpbnF1aXJlclwiOiBcIl4xMi4wLjBcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuMTBcIixcbiAgICBcIm5wbS1ydW4tYWxsMlwiOiBcIl42LjIuNFwiLFxuICAgIFwicGljb2NvbG9yc1wiOiBcIl4xLjEuMVwiLFxuICAgIFwicGxvcFwiOiBcIl40LjAuMVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuNDdcIixcbiAgICBcInBvc3Rjc3MtbmVzdGVkXCI6IFwiXjYuMi4wXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjMuM1wiLFxuICAgIFwic2Fzcy1lbWJlZGRlZFwiOiBcIl4xLjgwLjJcIixcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMS4xXCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMTAuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNS4xLjFcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4xLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtdnVlXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtc2Nzc1wiOiBcIl42LjguMVwiLFxuICAgIFwic3Znb1wiOiBcIl4zLjMuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjYuM1wiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNjMuNFwiLFxuICAgIFwidW5vY3NzLXByZXNldC1zY3JvbGxiYXJcIjogXCJeMC4zLjFcIixcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTguM1wiLFxuICAgIFwidW5wbHVnaW4tdHVyYm8tY29uc29sZVwiOiBcIl4xLjEwLjRcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjcuNFwiLFxuICAgIFwidml0ZS1wbHVnaW4tYXBwLWxvYWRpbmdcIjogXCJeMC4zLjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWFyY2hpdmVyXCI6IFwiXjAuMS4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1iYW5uZXJcIjogXCJeMC44LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWNoZWNrZXJcIjogXCJeMC44LjBcIixcbiAgICBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMlwiOiBcIl4xLjMuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tZmFrZS1zZXJ2ZXJcIjogXCJeMi4xLjJcIixcbiAgICBcInZpdGUtcGx1Z2luLXBhZ2VzXCI6IFwiXjAuMzIuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjogXCJeNy41LjJcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1tZXRhLWxheW91dHNcIjogXCJeMC40LjNcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4xLjZcIlxuICB9LFxuICBcImNvbmZpZ1wiOiB7XG4gICAgXCJjb21taXRpemVuXCI6IHtcbiAgICAgIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9jei1naXRcIlxuICAgIH1cbiAgfVxufVxuXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFNjaG9vbFxcXFxcdTU2MDlcdTUxOUNhZG1pblxcXFxsb2NhbFxcXFxqaWFub25nLWFkbWluXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFNjaG9vbFxcXFxcdTU2MDlcdTUxOUNhZG1pblxcXFxsb2NhbFxcXFxqaWFub25nLWFkbWluXFxcXHZpdGVcXFxccGx1Z2lucy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovU2Nob29sLyVFNSU5OCU4OSVFNSU4NiU5Q2FkbWluL2xvY2FsL2ppYW5vbmctYWRtaW4vdml0ZS9wbHVnaW5zLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXHJcbmltcG9ydCB2dWVMZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgYm94ZW4gZnJvbSAnYm94ZW4nXHJcbmltcG9ydCBwaWNvY29sb3JzIGZyb20gJ3BpY29jb2xvcnMnXHJcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBUdXJib0NvbnNvbGUgZnJvbSAndW5wbHVnaW4tdHVyYm8tY29uc29sZS92aXRlJ1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBsb2FkRW52LCB0eXBlIFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBBcHBMb2FkaW5nIGZyb20gJ3ZpdGUtcGx1Z2luLWFwcC1sb2FkaW5nJ1xyXG5pbXBvcnQgQXJjaGl2ZXIgZnJvbSAndml0ZS1wbHVnaW4tYXJjaGl2ZXInXHJcbmltcG9ydCBiYW5uZXIgZnJvbSAndml0ZS1wbHVnaW4tYmFubmVyJ1xyXG5pbXBvcnQgeyBjb21wcmVzc2lvbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uMidcclxuaW1wb3J0IHsgdml0ZVBsdWdpbkZha2VTZXJ2ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1mYWtlLXNlcnZlcidcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLW1ldGEtbGF5b3V0cydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKG1vZGU6IHN0cmluZywgaXNCdWlsZCA9IGZhbHNlKSB7XHJcbiAgY29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICBjb25zdCB2aXRlUGx1Z2luczogKFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdKVtdID0gW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZ1ZUxlZ2FjeSh7XHJcbiAgICAgIHJlbmRlckxlZ2FjeUNodW5rczogZmFsc2UsXHJcbiAgICAgIG1vZGVyblBvbHlmaWxsczogWydlcy5hcnJheS5hdCcsICdlcy5hcnJheS5maW5kLWxhc3QnXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy9kZXZ0b29scy1uZXh0XHJcbiAgICB2aXRlRW52LlZJVEVfT1BFTl9ERVZUT09MUyA9PT0gJ3RydWUnICYmIFZ1ZURldlRvb2xzKCksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3VucGx1Z2luL3VucGx1Z2luLWF1dG8taW1wb3J0XHJcbiAgICBhdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxyXG4gICAgICBkdHM6ICcuL3NyYy90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnLi9zcmMvdXRpbHMvY29tcG9zYWJsZXMvKionXSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS91bnBsdWdpbi91bnBsdWdpbi12dWUtY29tcG9uZW50c1xyXG4gICAgY29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnLCAnc3JjL2xheW91dHMvdWkta2l0J10sXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwudHN4JC9dLFxyXG4gICAgICBkdHM6ICcuL3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxyXG4gICAgfSksXHJcblxyXG4gICAgVW5vY3NzKCksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZiZW5qcy92aXRlLXBsdWdpbi1zdmctaWNvbnNcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvJyldLFxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vY29uZG9yaGVyb2Jsb2cvdml0ZS1wbHVnaW4tZmFrZS1zZXJ2ZXJcclxuICAgIHZpdGVQbHVnaW5GYWtlU2VydmVyKHtcclxuICAgICAgbG9nZ2VyOiAhaXNCdWlsZCxcclxuICAgICAgaW5jbHVkZTogJ3NyYy9tb2NrJyxcclxuICAgICAgaW5maXhOYW1lOiBmYWxzZSxcclxuICAgICAgZW5hYmxlUHJvZDogaXNCdWlsZCAmJiB2aXRlRW52LlZJVEVfQlVJTERfTU9DSyA9PT0gJ3RydWUnLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rpc2hhaXQvdml0ZS1wbHVnaW4tdnVlLW1ldGEtbGF5b3V0c1xyXG4gICAgTGF5b3V0cyh7XHJcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdpbmRleCcsXHJcbiAgICB9KSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaGFubm9lcnUvdml0ZS1wbHVnaW4tcGFnZXNcclxuICAgIFBhZ2VzKHtcclxuICAgICAgZGlyczogJ3NyYy92aWV3cycsXHJcbiAgICAgIGV4Y2x1ZGU6IFsnKiovY29tcG9uZW50cy8qKi8qLnZ1ZSddLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vbnp6ei92aXRlLXBsdWdpbi1jb21wcmVzc2lvblxyXG4gICAgdml0ZUVudi5WSVRFX0JVSUxEX0NPTVBSRVNTPy5zcGxpdCgnLCcpLmluY2x1ZGVzKCdnemlwJykgJiYgY29tcHJlc3Npb24oKSxcclxuICAgIHZpdGVFbnYuVklURV9CVUlMRF9DT01QUkVTUz8uc3BsaXQoJywnKS5pbmNsdWRlcygnYnJvdGxpJylcclxuICAgICYmIGNvbXByZXNzaW9uKHtcclxuICAgICAgZXhjbHVkZTogWy9cXC4oYnIpJC8sIC9cXC4oZ3opJC9dLFxyXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICB9KSxcclxuXHJcbiAgICB2aXRlRW52LlZJVEVfQlVJTERfQVJDSElWRVxyXG4gICAgJiYgQXJjaGl2ZXIoe1xyXG4gICAgICBhcmNoaXZlVHlwZTogdml0ZUVudi5WSVRFX0JVSUxEX0FSQ0hJVkUsXHJcbiAgICB9KSxcclxuXHJcbiAgICBBcHBMb2FkaW5nKCdsb2FkaW5nLmh0bWwnKSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5wbHVnaW4vdW5wbHVnaW4tdHVyYm8tY29uc29sZVxyXG4gICAgVHVyYm9Db25zb2xlKCksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NoZW5ncGVpcXVhbi92aXRlLXBsdWdpbi1iYW5uZXJcclxuICAgIGJhbm5lcihgXHJcbi8qKlxyXG4gKiBcdTc1MzEgRmFudGFzdGljLWFkbWluIFx1NjNEMFx1NEY5Qlx1NjI4MFx1NjcyRlx1NjUyRlx1NjMwMVxyXG4gKiBQb3dlcmVkIGJ5IEZhbnRhc3RpYy1hZG1pblxyXG4gKiBodHRwczovL2ZhbnRhc3RpYy1hZG1pbi5odXJ1aS5tZVxyXG4gKi9cclxuICAgIGApLFxyXG5cclxuICAgIHtcclxuICAgICAgbmFtZTogJ3ZpdGUtcGx1Z2luLWRlYnVnLXBsdWdpbicsXHJcbiAgICAgIGVuZm9yY2U6ICdwcmUnLFxyXG4gICAgICB0cmFuc2Zvcm06IChjb2RlLCBpZCkgPT4ge1xyXG4gICAgICAgIGlmICgvc3JjXFwvbWFpbi50cyQvLnRlc3QoaWQpKSB7XHJcbiAgICAgICAgICBpZiAodml0ZUVudi5WSVRFX0FQUF9ERUJVR19UT09MID09PSAnZXJ1ZGEnKSB7XHJcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLmNvbmNhdChgXHJcbiAgICAgICAgICAgICAgaW1wb3J0IGVydWRhIGZyb20gJ2VydWRhJ1xyXG4gICAgICAgICAgICAgIGVydWRhLmluaXQoKVxyXG4gICAgICAgICAgICBgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAodml0ZUVudi5WSVRFX0FQUF9ERUJVR19UT09MID09PSAndmNvbnNvbGUnKSB7XHJcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLmNvbmNhdChgXHJcbiAgICAgICAgICAgICAgaW1wb3J0IFZDb25zb2xlIGZyb20gJ3Zjb25zb2xlJ1xyXG4gICAgICAgICAgICAgIG5ldyBWQ29uc29sZSgpXHJcbiAgICAgICAgICAgIGApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2RlLFxyXG4gICAgICAgICAgICBtYXA6IG51bGwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1kaXNhYmxlLWRldnRvb2wnLFxyXG4gICAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgICAgdHJhbnNmb3JtOiAoY29kZSwgaWQpID0+IHtcclxuICAgICAgICBpZiAoL3NyY1xcL21haW4udHMkLy50ZXN0KGlkKSkge1xyXG4gICAgICAgICAgaWYgKHZpdGVFbnYuVklURV9BUFBfRElTQUJMRV9ERVZUT09MID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgY29kZSA9IGNvZGUuY29uY2F0KGBcclxuICAgICAgICAgICAgICBpbXBvcnQgRGlzYWJsZURldnRvb2wgZnJvbSAnZGlzYWJsZS1kZXZ0b29sJ1xyXG4gICAgICAgICAgICAgIERpc2FibGVEZXZ0b29sKClcclxuICAgICAgICAgICAgYClcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGUsXHJcbiAgICAgICAgICAgIG1hcDogbnVsbCxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHtcclxuICAgICAgbmFtZTogJ3ZpdGUtcGx1Z2luLXRlcm1pbmFsLWluZm8nLFxyXG4gICAgICBhcHBseTogJ3NlcnZlJyxcclxuICAgICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcclxuICAgICAgICBjb25zdCB7IGJvbGQsIGdyZWVuLCBjeWFuLCBiZ0dyZWVuLCB1bmRlcmxpbmUgfSA9IHBpY29jb2xvcnNcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgYm94ZW4oXHJcbiAgICAgICAgICAgIGAke2JvbGQoZ3JlZW4oYFx1NzUzMSAke2JnR3JlZW4oJ0ZhbnRhc3RpYy1hZG1pbicpfSBcdTlBNzFcdTUyQThgKSl9XFxuXFxuJHt1bmRlcmxpbmUoJ2h0dHBzOi8vZmFudGFzdGljLWFkbWluLmh1cnVpLm1lJyl9XFxuXFxuXHU1RjUzXHU1MjREXHU0RjdGXHU3NTI4XHVGRjFBJHtjeWFuKCdcdTU3RkFcdTc4NDBcdTcyNDgnKX1gLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcGFkZGluZzogMSxcclxuICAgICAgICAgICAgICBtYXJnaW46IDEsXHJcbiAgICAgICAgICAgICAgYm9yZGVyU3R5bGU6ICdkb3VibGUnLFxyXG4gICAgICAgICAgICAgIHRleHRBbGlnbm1lbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICApXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF1cclxuICByZXR1cm4gdml0ZVBsdWdpbnNcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJULE9BQU8sUUFBUTtBQUMxVSxPQUFPQSxXQUFVO0FBQ2pCLE9BQU9DLGNBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsY0FBYyxXQUFBQyxnQkFBZTtBQUN0QyxPQUFPLGFBQWE7OztBQ0xwQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLE9BQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLGtCQUFrQjtBQUFBLElBQ2xCLE1BQVE7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLGtCQUFrQjtBQUFBLElBQ2xCLGFBQWU7QUFBQSxJQUNm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
