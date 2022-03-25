<template>
  <el-row>
    <el-button type="success" size="large" @click="display_insert" plain
      >新增接口</el-button
    >
  </el-row>
  <el-dialog v-model="dialogFormVisible" title="新增接口配置参数" width="40%">
    <el-form :model="form">
      <el-form-item label="接口中文名称" :label-width="formLabelWidth"
        ><el-col :span="10">
          <el-input
            v-model="form.data['zh_name']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="接口英文名称" :label-width="formLabelWidth"
        ><el-col :span="10">
          <el-input
            v-model="form.data['name']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="接口网址" :label-width="formLabelWidth"
        ><el-col :span="15">
          <el-input
            v-model="form.data['url']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="接口参数" :label-width="formLabelWidth"
        ><el-col :span="20">
          <el-input
            v-model="form.data['args']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="参数注释" :label-width="formLabelWidth">
        <el-col :span="20">
          <el-input
            v-model="form.data['comment']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="请求参数" :label-width="formLabelWidth">
        <el-col :span="15"
          ><el-input
            v-model="form.data['request']"
            autocomplete="off"
            clearable
          ></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="请求模板" :label-width="formLabelWidth">
        <el-col :span="20">
          <el-input
            v-model="form.data['template']"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="解析类型" :label-width="formLabelWidth"
        ><el-col :span="10">
          <el-select v-model="form.data['type']" placeholder="Select">
            <el-option
              v-for="item in exp_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> </el-select
        ></el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="handle_insert">确认新增</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from "vue";
import { insert_interface } from "@/api/interface";
import { get_current } from "@/utils/time";
import { msg } from "@/utils/message";
// import { getIP, getBrowserInfo } from "../../utiliy/sys_info";
// console.log(getIP());
// console.log(getBrowserInfo());

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
    template: "",
    type: "",
  },
});

const exp_options = [
  {
    value: "normal",
    label: "常规",
  },
  {
    value: "relation",
    label: "关系族谱",
  },
];
// 模态框--定义出口参数
let dialogFormVisible = ref(false);
const formLabelWidth = "140px";
// 模态框--axios

const emit = defineEmits(["flush_table"]);
const to_flush_table = () => {
  emit("flush_table");
};

const display_insert = () => {
  dialogFormVisible.value = true;
};
// 模态框--数据提交函数
const handle_insert = (res: any) => {
  // 更新当前的接口
  let tmp = toRaw(form);
  var postdata = tmp.data;
  postdata["update_time"] = get_current();
  insert_interface({ data: postdata }).then((res) => {
    if (res.status == 200) {
      console.log("success insert interface");
      msg.success("新增接口成功");
      form.data = {
        name: "",
        zh_name: "",
        url: "",
        args: "",
        comment: "",
        request: "",
        template: "",
        type: "",
      };
    } else {
      msg.error("新增接口失败");
    }
  });
  dialogFormVisible.value = false;
  to_flush_table();
};
</script>

<style type="text/css" scoped>
.el-row {
  margin-bottom: 10px;
  /* float: right; */
}
</style>
