import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    vue(),
    UnoCSS(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest:{
        theme_color:'rgb(4,22,34)',
      }
      
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          viewportWidth: 390,
          propList: ["*"],
          selectorBlackList: [
            ".v-popper__arrow-inner",
            ".v-popper__arrow-outer",
          ],
          unitPrecision: 6, // 转换后的精度，即小数点位数
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          replace: true, // 是否转换后直接更换属性值
        }),
      ],
    },
  },
});
