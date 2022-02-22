<template>
  <el-table
    :data="filterTableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="40" />
    <el-table-column property="interface" label="接口" width="200" />
    <el-table-column property="zh_name" label="接口名称" width="180" />
    <el-table-column property="url" label="网址" show-overflow-tooltip />
    <el-table-column property="type" label="定时任务类型" width="150" />
    <el-table-column property="content" label="定时任务" width="130" />
    <el-table-column property="time" label="创建时间" width="200" />
    <el-table-column align="right">
      <template #header>
        <el-input
          style="width: 90%"
          v-model="search"
          size="large"
          placeholder="接口名称搜索"
        />
      </template>
      <template #default="scope">
        <el-button
          type="success"
          size="default"
          plain
          @click="handleRun(scope.$index, scope.row)"
          >立即执行</el-button
        >
        <el-button
          type="primary"
          size="default"
          plain
          @click="handlePause(scope.$index, scope.row)"
          >暂停任务</el-button
        >
        <el-button
          size="default"
          type="danger"
          plain
          @click="handleDelete(scope.$index, scope.row)"
          >删除任务</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-row style="margin-top: 30px">
    <el-button size="large" type="success" plain @click="multiple_pause"
      >批量执行</el-button
    >
    <el-button size="large" type="primary" plain @click="multiple_pause"
      >批量暂停</el-button
    >
    <el-button size="large" type="danger" plain @click="multiple_delete"
      >批量删除</el-button
    >
  </el-row>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const search = ref("");
const multipleSelection = ref<inter[]>([]);

interface inter {
  zh_name: string;
  name: string;
  url: string;
  task_info: string;
}

const props = defineProps<{
  tableData: Array<inter>;
}>();

const emit = defineEmits(["flush_table"]);

const filterTableData = computed(() =>
  props.tableData.filter(
    (data: any) =>
      !search.value ||
      data.zh_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const multiple_pause = () => {
  for (var i in multipleSelection.value) {
    console.log(multipleSelection.value[i].name + "已暂停");
  }
};

const multiple_delete = () => {
  for (var i in multipleSelection.value) {
    console.log(multipleSelection.value[i].name + "已删除");
  }
  emit("flush_table");
};

const handleSelectionChange = (val: inter[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};

const handleRun = (index: number, row: inter) => {
  // 立即执行当前任务
  console.log(index, row);
};

const handlePause = (index: number, row: inter) => {
  // 暂停当前任务
  console.log(index, row);
};

const handleDelete = (index: number, row: inter) => {
  // 删除当前任务
  console.log(index, row);
  emit("flush_table");
};

const tableData: inter[] = [
  {
    name: "AdminLicenseCheckList",
    zh_name: "行政区可列表",
    url: "https://pro.qcc.com/api/yj/AdminLicenseCheck/GetList",
    task_info: "每周 - 周三 - 10:00",
  },
  {
    name: "AdminPenaltyCheckDetail",
    zh_name: "行政处罚详情",
    url: "https://pro.qcc.com/api/yj/AdminPenaltyCheck/GetCreditDetail",
    task_info: "每周 - 周三 - 10:00",
  },
  {
    name: "AdminPenaltyCheckList",
    zh_name: "行政处罚列表",
    url: "https://pro.qcc.com/api/yj/AdminPenaltyCheck/GetList",
    task_info: "每周 - 周三 - 10:00",
  },
];
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>
