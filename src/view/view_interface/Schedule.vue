<template>
  <el-divider style="margin-top: 20px; margin-bottom: 30px">
    <el-tag type="success" size="large">当前正在运行的任务</el-tag>
  </el-divider>
  <com_schedule_table
    v-model:tableData="fatherData"
    v-model:count="count"
    @flush_table="get_table"
  ></com_schedule_table>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import com_schedule_table from "@/components/scheduler/com_schedule_table.vue";
import { get_scheduler } from "@/api/scheduler";
import { msg } from "@/utils/message";

const fatherData = ref([]);
const count = ref(0);

const get_table = (page: number, page_size: number) => {
  var postdata = {
    page: page,
    page_size: page_size,
  };
  get_scheduler({ data: postdata }).then((res) => {
    if (res.status == 200) {
      count.value = res.data.count;
      fatherData.value = res.data.tabledata;
      msg.success("获取定时任务成功");
    } else {
      msg.warning("获取定时任务失败,请刷新页面");
    }
  });
};

get_table(1, 30);
</script>
