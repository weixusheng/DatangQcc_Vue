<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header height="85px" style="background-color:#F5F5F5;">
      <com_header></com_header>
    </el-header>
    <el-container>
      <el-aside width="230px" style="background-color:#F5F5F5">
        <com_navbar></com_navbar>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import com_navbar from '@/components/com_navbar.vue'
import com_header from '@/components/com_header.vue'
</script>