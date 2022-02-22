import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 查看文档
// https://cn.vitejs.dev/config

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/interface': {
        target: 'http://127.0.0.1:8080/interface',
        //target: 'http://47.94.236.194/interface',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/interface/, '')
      },
      '/scheduler': {
        target: 'http://127.0.0.1:8080/scheduler',
        //target: 'http://47.94.236.194/scheduler',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/scheduler/, '')
      },
      '/supplier': {
        target: 'http://127.0.0.1:8080/supplier',
        //target: 'http://47.94.236.194/supplier',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supplier/, '')
      },
      '/logrun': {
        target: 'http://127.0.0.1:8080/logrun',
        //target: 'http://47.94.236.194/logrun',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/logrun/, '')
      },
    }
  }
})