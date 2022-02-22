<template>
  <el-row>
    <el-button type="success" size="large" @click="display_insert" plain
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
  },
});
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
  var updatetime = get_current;
  insert_interface({ data: postdata, update_time: updatetime }).then((res) => {
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
