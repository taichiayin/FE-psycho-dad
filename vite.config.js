import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

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
      // ,
      // '/static': {
      //   target: 'https://admin.prj300.xyz/', // 后端接口的域名
      //   changeOrigin: true
      // }
    }
  }
})
