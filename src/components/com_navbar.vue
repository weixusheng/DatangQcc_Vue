<template>
  <el-scrollbar>
    <el-menu :default-openeds="['1']"
             :default-active="this.$route.path"
             active-text-color="#ffd04b"
             background-color="#545c64"
             class="el-menu-vertical-demo"
             default-active="2"
             text-color="#fff"
             @open="handleOpen"
             @close="handleClose"
             router
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <grid/>
          </el-icon>
          <span>企查查接口管理</span>
        </template>
        <el-menu-item v-for="(item, i) in nav_config" :key="i" :index="item.router" @click="click_config">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.itemname }}
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <data-analysis />
          </el-icon>
          <span>日志查询</span>
        </template>
        <el-menu-item v-for="(item, i) in nav_log" :key="i" :index="item.router" @click="click_log">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.itemname }}
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <tools />
          </el-icon>
          <span>设置</span>
        </template>
        <el-menu-item v-for="(item, i) in nav_setting" :key="i" :index="item.router" @click="click_setting">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          {{ item.itemname }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      nav_config: [
        {router: "/ConfigArgs", itemname: "接口参数配置", icon: 'Edit'},
        {router: "/Schedule", itemname: "程序运行", icon: 'D-arrow-right'},
        {router: "/page_father", itemname: "供应商列表", icon: 'Document'},
      ],
      nav_log: [
        {router: "/", itemname: "日志查看", icon: 'Search'},
        {router: "/", itemname: "运行记录", icon: 'Success-filled'},
      ],
      nav_setting: [
        {router: "/", itemname: "权限设置", icon: 'Key'},
        {router: "/", itemname: "用户管理", icon: 'User-filled'},
      ]
    };
  },
  methods: {
    click_config(key, keyPath) {
      console.log(key, keyPath);
    },
    click_log(){
      ElMessage.error('功能开发中...')
    },
    click_setting(){
      ElMessage.error('功能开发中...')
    },
    handleOpen(key, keyPath) {
      console.log("打开标签")
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>
<style>
a {
  text-decoration: none;
}
</style>