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
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})

