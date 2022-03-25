<template>
  <el-table
    :data="filterTableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    table-layout="auto"
  >
    <el-table-column type="selection" />
    <el-table-column property="interface" label="接口" />
    <el-table-column property="zh_name" label="接口名称" />
    <el-table-column property="url" label="网址" show-overflow-tooltip />
    <el-table-column
      property="type"
      :formatter="typeFormat"
      label="定时任务类型"
    />
    <el-table-column
      property="content"
      label="执行时间"
      :formatter="timeFormat"
    />
    <el-table-column property="time" label="创建时间" />
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
          @click="handleRun(scope.row.uuid)"
          >Run</el-button
        >
        <el-button
          type="primary"
          size="default"
          plain
          @click="handlePause(scope.$index, scope.row)"
          >暂停</el-button
        >
        <el-button
          size="default"
          type="danger"
          plain
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div style="text-align: center; margin-top: 30px">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.count"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
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
import { run_now } from "@/api/scheduler";
import { msg } from "@/utils/message";

const currentPage = ref(1);
const pageSize = ref(30);
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
  count: number;
}>();

const emit = defineEmits(["flush_table"]);

const filterTableData = computed(() =>
  props.tableData.filter(
    (data: any) =>
      !search.value ||
      data.zh_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const typeFormat = (row: any) => {
  if (row.type === "week") {
    return "每周循环执行";
  } else if (row.type === "everyday") {
    return "每天循环执行";
  } else if (row.type === "single") {
    return "单次执行";
  }
};

const timeFormat = (row: any) => {
  if (row.type === "week") {
    let time_array = row.content.split("-");
    let week = time_array[0];
    let time = time_array[1];
    let dictionary = {
      mon: "周一",
      tue: "周二",
      wed: "周三",
      thu: "周四",
      fri: "周五",
      sat: "周六",
      sun: "周日",
    };
    return dictionary[week] + " - " + time;
  } else {
    return row.content;
  }
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

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

const handleRun = (row: number) => {
  // 立即执行当前任务
  console.log(row);
  var postdata = {
    uuid: row,
  };
  run_now({ data: postdata }).then((res) => {
    if (res.status == 200) {
      msg.success("设定定时任务成功");
      console.log("single scheduler success");
    } else {
      msg.error("设定定时任务失败");
    }
  });
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
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}

.el-pagination {
  justify-content: right;
}
</style>
