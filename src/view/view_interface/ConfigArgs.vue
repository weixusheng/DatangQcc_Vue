<template>
  <el-divider style="margin-top: 20px; margin-bottom: 10px">
    <el-tag type="success" size="large">接口参数列表</el-tag>
  </el-divider>
  <com_table_insert @flush_table="get_table(1,30)"></com_table_insert>
  <com_table_content
    v-model:tableData="fatherData"
    v-model:count="count"
    ref="from_table_selected"
    @update_selected="update_selected"
    @flush_table="get_table(1,30)"
  ></com_table_content>
  <el-divider style="margin-top: 40px; margin-bottom: 40px">
    <el-tag type="success" size="large">设定定时任务</el-tag>
  </el-divider>
  <com_table_setter :table_selected="to_picker_data"></com_table_setter>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import com_table_insert from "@/components/interagrs/com_table_insert.vue";
import com_table_content from "@/components/interagrs/com_table_content.vue";
import com_table_setter from "@/components/interagrs/com_table_setter.vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import { get_interface } from "@/api/interface";
import { msg } from "@/utils/message";
// import { getIP, getBrowserInfo } from "../../utiliy/sys_info";
// console.log(getIP());
// console.log(getBrowserInfo());

// 接口列表数据
const fatherData = ref([]);
const count = ref(0);
const from_table_selected = ref(null);
const to_picker_data = ref(null);

const update_selected = () => {
  to_picker_data.value = from_table_selected.value.multipleSelection;
};

const get_table = (page: number, page_size: number) => {
  var postdata = {
    page: page,
    page_size: page_size,
  };
  get_interface({ data: postdata }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      fatherData.value = res.data.tabledata;
      count.value = res.data.count;
      msg.success("获取接口数据成功");
    } else {
      msg.warning("获取接口数据失败,请刷新页面");
    }
  });
};

get_table(1, 30);
// 当前路由
const currentRoute = useRoute();
console.log(currentRoute.path);

// 侦测路由变化
watch(
  () => currentRoute.path,
  (path) => {
    console.log(path);
  }
);
</script>

<style type="text/css" scoped>
.el-row {
  margin-bottom: 10px;
  /* float: right; */
}
</style>
