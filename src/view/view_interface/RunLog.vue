<template>
  <com_schedule_history v-model:tableData="fatherData"></com_schedule_history>
</template>

<script lang="ts" setup>
import com_schedule_history from "@/components/scheduler/com_schedule_history.vue";

interface inter {
  zh_name: string;
  name: string;
  start: string;
  end: string;
  result: string;
}

const fatherData: inter[] = [
  {
    name: "AdminLicenseCheckList",
    zh_name: "行政区可列表",
    start: "2022-01-01 10:00:00",
    end: "2022-01-01 10:02:00",
    result: "Fail",
  },
  {
    name: "AdminPenaltyCheckDetail",
    zh_name: "行政处罚详情",
    start: "2022-01-01 10:00:00",
    end: "2022-01-01 10:02:00",
    result: "Success",
  },
  {
    name: "AdminPenaltyCheckList",
    zh_name: "行政处罚列表",
    start: "2022-01-01 10:00:00",
    end: "2022-01-01 10:02:00",
    result: "Success",
  },
];
</script>