import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
const fs = require('fs')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
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
    }
    // proxy: {
    //   '/api': {
    //     target: 'https://api30-sit.prj300.xyz/', // 后端接口的域名
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   },
    //   '/static': {
    //     target: 'https://admin.prj300.xyz/', // 后端接口的域名
    //     changeOrigin: true
    //   }
    // }
  }
})
