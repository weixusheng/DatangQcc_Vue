<template>
  <el-row>
    <el-button type="success" size="large" @click="dialogFormVisible = true"
      >新增接口</el-button
    >
  </el-row>
  <el-dialog v-model="dialogFormVisible" title="新增接口配置参数">
    <el-form :model="form">
      <el-form-item label="接口中文名称" :label-width="formLabelWidth">
        <el-input v-model="form.data['zh_name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口英文名称" :label-width="formLabelWidth">
        <el-input v-model="form.data['name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口网址" :label-width="formLabelWidth">
        <el-input v-model="form.data['url']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口参数" :label-width="formLabelWidth">
        <el-input v-model="form.data['args']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="参数注释" :label-width="formLabelWidth">
        <el-input v-model="form.data['comment']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求参数" :label-width="formLabelWidth">
        <el-input v-model="form.data['request']" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="handle_insert">确认新增</el-button>
      </span>
    </template>
  </el-dialog>
  <com_table v-model:tableData="fatherData"></com_table>
</template>


<script lang="ts" setup>
import axios from "axios";
import {
  ref,
  watch,
  computed,
  defineComponent,
  toRefs,
  reactive,
  onBeforeMount,
  toRaw,
} from "vue";
import com_table from "../../components/com_table.vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import { getIP, getBrowserInfo } from "../../utiliy/sys_info";

console.log(getIP());
console.log(getBrowserInfo());

// 接口列表数据
const fatherData = ref([]);
function getdata(): any {
  axios
    .post("interface/get_list")
    .then((res) => {
      fatherData.value = res.data;
      console.log(fatherData.value);
    })
    .catch((err) => {
      console.log(err);
    });
}
getdata();

// 模态框
// 模态框--定义参数
const form = reactive({
  data: {
    name: "",
    zh_name: "",
    url: "",
    args: "",
    comment: "",
    request: "",
  },
});
// 模态框--定义出口参数
let dialogFormVisible = ref(false);
const search = ref("");
const formLabelWidth = "140px";
// 模态框--axios
function insertdata(data: any): any {
  // 获取当前时间
  var myDate = new Date();
  console.log(myDate.toLocaleString());
  axios
    .post(
      // 新增接口参数
      "interface/insert",
      { data: form.data, update_time: myDate.toLocaleString() }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 模态框--数据提交函数
const handle_insert = (res: any) => {
  // 更新当前的接口
  let shit = toRaw(form);
  console.log(shit.data);
  insertdata(shit.data);
};

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
  float: right;
}
</style>
