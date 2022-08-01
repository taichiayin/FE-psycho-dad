import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const fs = require('fs')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    VitePWA({
      // 註冊service work options inline, script, auto, null
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      // 測試環境開啟pwa
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'psychodad',
        short_name: 'Psycho Dad',
        start_url: './index.html',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#577a9e',
        icons: [
          {
            src: './image/icons/mstile-150x150.png?v=4',
            sizes: '150x150',
            type: 'image/png'
          },
          {
            src: './image/icons/apple-touch-icon-180x180.png?v=4',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: './image/icons/msapplication-icon-144x144.png?v=6',
            sizes: '144x144',
            type: 'image/png'
          }
        ]
      },
      // precache manifest預處理
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    open: true,
    https: {
      key: fs.readFileSync(`${__dirname}/src/assets/localhost-key.pem`),
      cert: fs.readFileSync(`${__dirname}/src/assets/localhost.pem`)
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3088/', // 后端接口的域名
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/img': {
        target: 'http://localhost:3088', // 后端接口的域名
        changeOrigin: true
        // rewrite: path => path.replace(/^\/img/, '/v1/img')
      }
    }
  }
})
