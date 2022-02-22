<template>
  <el-table
    :data="filterTableData"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    max-height="505px"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="接口" prop="name" />
    <el-table-column label="接口名称" prop="zh_name" />
    <el-table-column label="网址" prop="url" />
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
          type="primary"
          size="default"
          plain
          @click="handleEdit(scope.row, scope.row.uuid)"
          >编辑参数</el-button
        >
        <el-button
          size="default"
          type="danger"
          plain
          @click="handleDelete(scope.row.uuid)"
          >删除接口</el-button
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
import { reactive, computed, ref, toRaw } from "vue";
import { update_interface, delete_interface } from "@/api/interface";
import { get_current } from "@/utils/time";
import { msg } from "@/utils/message";

interface inter {
  zh_name: string;
  name: string;
  url: string;
  args: string;
  comment: string;
  request: string;
}

const props = defineProps<{
  tableData: Array<inter>;
}>();

const multipleSelection = ref<inter[]>([]);
defineExpose({
  multipleSelection, //向父组件暴露 multipleSelection 变量
});

const emit = defineEmits(["update_selected","flush_table"]);

const search = ref("");
let dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  data: {
    uuid: "",
    name: "",
    zh_name: "",
    url: "",
    args: "",
    comment: "",
    request: "",
  },
});

const handleSelectionChange = (val: inter[]) => {
  multipleSelection.value = val;
  emit("update_selected");
};

const filterTableData = computed(() =>
  props.tableData.filter(
    (data: any) =>
      !search.value ||
      data.zh_name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const handleEdit = (row: inter, uuid: string) => {
  // 编辑当前接口
  dialogFormVisible.value = true;
  form.data["uuid"] = uuid;
  form.data["zh_name"] = row.zh_name;
  form.data["name"] = row.name;
  form.data["url"] = row.url;
  form.data["args"] = row.args;
  form.data["comment"] = row.comment;
  form.data["request"] = row.request;
};

const handleDelete = (uuid: string) => {
  // 删除当前的接口
  var updatetime = get_current;
  var postdata = { uuid: uuid };
  delete_interface({ data: postdata, update_time: updatetime }).then((res) => {
    if (res.status == 200) {
      // 删除成功
      msg.success("删除成功");
      emit("flush_table");
    } else {
      msg.error("删除失败");
    }
  });
};

const handle_update = () => {
  // 更新当前的接口
  let tmp = toRaw(form);
  var postdata = tmp.data;
  var updatetime = get_current;
  update_interface({ data: postdata, update_time: updatetime }).then((res) => {
    if (res.status == 200) {
      msg.success("更新成功");
      emit("flush_table");
    } else {
      msg.error("更新失败");
    }
  });
  dialogFormVisible.value = false;
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
