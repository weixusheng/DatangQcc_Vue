<template>
  <el-divider style="margin-top: 20px; margin-bottom: 30px">
    <el-tag type="success" size="large">当前正在运行的任务</el-tag>
  </el-divider>
  <com_schedule_table
    v-model:tableData="fatherData"
    @flush_table="get_table"
  ></com_schedule_table>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import com_schedule_table from "@/components/scheduler/com_schedule_table.vue";
import { get_scheduler } from "@/api/scheduler";
import { msg } from "@/utils/message";

const fatherData = ref([]);

const get_table = () => {
  get_scheduler().then((res) => {
    if (res.status == 200) {
      fatherData.value = res.data;
      msg.success("获取定时任务成功");
    } else {
      msg.warning("获取定时任务失败,请刷新页面");
    }
  });
};

get_table();
</script>
