<template>
  <el-descriptions
        title="About"
      direction="vertical"
      :column="4"
      size="large"
      border
  >
    <el-descriptions-item label="Version">2022年1月25日</el-descriptions-item>
    <el-descriptions-item label="Programer">小辣鸡</el-descriptions-item>
    <el-descriptions-item label="Place" :span="2">Beijing</el-descriptions-item>
    <el-descriptions-item label="Status">
      <el-tag size="large" type="danger">开发中</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Company"
    >大唐电商技术有限公司
    </el-descriptions-item>
  </el-descriptions>
</template>