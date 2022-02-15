<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="接口" prop="name" />
    <el-table-column label="接口名称" prop="zh_name" />
    <el-table-column label="网址" prop="url" />
    <el-table-column align="right">
      <template #header>
        <el-input style="width: 90%;"
          v-model="search"
          size="large"
          placeholder="接口名称搜索"
        />
      </template>
      <template #default="scope">
        <el-button type="primary" size="default" @click="handleEdit(scope.$index, scope.row)"
          >编辑参数</el-button
        >
        <el-button
          size="default"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogFormVisible" title="接口配置详情">
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
        <el-button type="primary" @click="handle_update">确认更新</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import axios from "axios";
import {
  reactive,
  onMounted,
  watch,
  toRefs,
  computed,
  defineComponent,
  ref,
  toRaw,
} from "vue";

interface inter {
  zh_name: string;
  name: string;
  url: string;
  args: string;
  comment: string;
  request: string;
}

// interface Props {
//   tableData: Array<inter>;
// } 

const props = defineProps<{
  tableData: Array<inter>;
}>();

// const props = withDefaults(defineProps<Props>(), {
//   tableData: Array,
// });

let dialogFormVisible = ref(false);
const search = ref("");
const formLabelWidth = "140px";

const form = reactive({
  data: {
    'name': "",
    'zh_name': "",
    'url': "",
    'args': "",
    'comment': "",
    'request': "",
  },
});

const filterTableData = computed(() =>
  props.tableData.filter(
    (data: any) =>
      !search.value ||
      data.zh_name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: inter) => {
  // 编辑当前接口
  dialogFormVisible.value = true;
  form.data["zh_name"] = row.zh_name;
  form.data["name"] = row.name;
  form.data["url"] = row.url;
  form.data["args"] = row.args;
  form.data["comment"] = row.comment;
  form.data["request"] = row.request;
};
const handleDelete = (index: number, row: inter) => {
  // 删除当前的接口
  console.log(index, row);
};
function updatedata(data: any): any {
  var myDate = new Date();
  console.log(myDate.toLocaleString());
  axios.post( // 更新接口参数
      "interface/update",
      { data: form.data, update_time: myDate.toLocaleString()},
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
const handle_update = (res: any) => {
  // 更新当前的接口
  let shit = toRaw(form);
  console.log(shit.data);
  updatedata(shit.data);
};
</script>

<style scoped>
.el-button--text {
  margin-right: 35px;
}
.el-input {
  width: 800px;
}
.dialog-footer button:first-child {
  margin-right: 20px;
}
</style>
