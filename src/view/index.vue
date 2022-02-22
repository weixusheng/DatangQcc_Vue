<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header height="85px" style="background-color: #f5f5f5">
      <com_header></com_header>
    </el-header>
    <el-divider style="margin-top: 0; margin-bottom: 0" content-position="right"
      >版权所有: 大唐电商技术有限公司</el-divider
    >
    <el-container>
      <el-aside width="230px" style="background-color: #f5f5f5">
        <com_navbar></com_navbar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import com_navbar from "@/components/layout/com_navbar.vue";
import com_header from "@/components/layout/com_header.vue";
</script>
