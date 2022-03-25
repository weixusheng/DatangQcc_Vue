<template>
  <el-descriptions class="margin-top" :column="3" size="large" border>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">执行方式</div>
      </template>
      单天执行
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">选择时间</div>
      </template>
      <el-time-select
        v-model="every_time"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="选择执行时间"
      >
      </el-time-select>
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label> 操作 </template>
      <div class="cell-item">
        <el-button type="primary" plain @click="every_submit">设定</el-button>
      </div>
    </el-descriptions-item>

    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">执行方式</div>
      </template>
      单次执行
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">选择时间</div>
      </template>
      <el-date-picker
        v-model="single_time"
        type="datetime"
        placeholder="选择日期和时间"
        :default-time="defaultTime"
        format="YYYY-MM-DD HH:mm"
        value-format="YYYY-MM-DD HH:mm"
      >
      </el-date-picker>
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label> 操作 </template>
      <div class="cell-item">
        <el-button type="primary" plain @click="single_submit">设定</el-button>
      </div>
    </el-descriptions-item>

    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">执行方式</div>
      </template>
      每周执行
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">选择时间</div>
      </template>
      <el-select
        v-model="week"
        style="margin-right: 15px"
        placeholder="选择日期"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-time-select
        v-model="week_time"
        start="08:30"
        step="00:15"
        end="18:30"
        placeholder="选择执行时间"
      >
      </el-time-select>
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label> 操作 </template>
      <div class="cell-item">
        <el-button type="primary" plain @click="week_submit">设定</el-button>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { get_current } from "@/utils/time";
import { add_single, add_week, add_every } from "@/api/scheduler";
import { msg } from "@/utils/message";
const props = defineProps(["table_selected"]);
const every_time = ref("");
const single_time = ref("");
const week = ref("");
const week_time = ref("");

const defaultTime = new Date(2000, 1, 1, 22, 0, 0);
const options = [
  { value: "mon", label: "周一" },
  { value: "tue", label: "周二" },
  { value: "wed", label: "周三" },
  { value: "thu", label: "周四" },
  { value: "fri", label: "周五" },
  { value: "sat", label: "周六" },
  { value: "sun", label: "周日" },
];

const every_submit = () => {
  // 提交当前任务--每天执行
  for (var item in props.table_selected) {
    console.log(props.table_selected[item].name);
    var interface_name = props.table_selected[item].name;
    var postdata = { time: every_time.value, interface: interface_name };
    add_every({ data: postdata }).then((res) => {
      if (res.status == 200) {
        msg.success("设定定时任务成功");
        console.log("every scheduler success");
      } else {
        msg.error("设定定时任务失败");
      }
    });
  }
};

const single_submit = () => {
  // 提交当前任务--单次执行
  for (var item in props.table_selected) {
    console.log(props.table_selected[item].name);
    var interface_name = props.table_selected[item].name;
    var postdata = { time: single_time.value, interface: interface_name };
    add_single({ data: postdata }).then((res) => {
      if (res.status == 200) {
        msg.success("设定定时任务成功");
        console.log("single scheduler success");
      } else {
        msg.error("设定定时任务失败");
      }
    });
  }
};

const week_submit = () => {
  // 提交当前任务--周执行
  for (var item in props.table_selected) {
    console.log(props.table_selected[item].name);
    var interface_name = props.table_selected[item].name;
    var posttime = week.value + "-" + week_time.value;
    var postdata = { time: posttime, interface: interface_name };
    add_week({ data: postdata }).then((res) => {
      if (res.status == 200) {
        msg.success("设定定时任务成功");
        console.log("week scheduler success");
      } else {
        msg.error("设定定时任务失败");
      }
    });
  }
};
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 40px;
  text-align: center;
  line-height: 40px;
  padding: auto;
  margin: auto;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
