<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content" style="margin-top: 5px">
        <el-image style="height: 70px" :src="url" :fit="fit"></el-image>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">大唐电商技术有限公司</div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">企查查数据接口配置</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const fit = "contain";
const url = "src/assets/img/cweme_logo.png";
</script>
<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  margin-top: 14px;
}
</style>
