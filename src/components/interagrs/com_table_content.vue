<template>
  <el-table
    :data="filterTableData"
    @selection-change="handleSelectionChange"
    style="width: 100%"
    max-height="505px"
    table-layout="auto"
  >
    <el-table-column type="selection" />
    <el-table-column label="接口" prop="name" />
    <el-table-column label="接口名称" prop="zh_name" />
    <el-table-column label="网址" prop="url" />
    <el-table-column label="最后编辑时间" prop="update_time" />
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

  <el-dialog v-model="dialogFormVisible" title="编辑接口配置参数" width="40%">
    <el-form :model="form">
      <el-form-item label="接口中文名称" :label-width="formLabelWidth">
        <el-input style="width: 30%;" v-model="form.data['zh_name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口英文名称" :label-width="formLabelWidth">
        <el-input style="width: 30%;" v-model="form.data['name']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口网址" :label-width="formLabelWidth">
        <el-input style="width: 60%;" v-model="form.data['url']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口参数" :label-width="formLabelWidth">
        <el-input v-model="form.data['args']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="参数注释" :label-width="formLabelWidth">
        <el-input v-model="form.data['comment']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求参数" :label-width="formLabelWidth">
        <el-input style="width: 60%;" v-model="form.data['request']" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="请求模板" :label-width="formLabelWidth">
        <el-input
          v-model="form.data['template']"
          autocomplete="off"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="解析类型" :label-width="formLabelWidth"
        >
          <el-select v-model="form.data['type']" placeholder="Select">
            <el-option
              v-for="item in exp_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            /> </el-select
        >
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

const currentPage = ref(1);
const pageSize = ref(30);
const search = ref("");

interface inter {
  zh_name: string;
  name: string;
  url: string;
  args: string;
  comment: string;
  request: string;
  template: string;
  type: string;
}

const props = defineProps<{
  tableData: Array<inter>;
  count: number;
}>();

const multipleSelection = ref<inter[]>([]);
defineExpose({
  multipleSelection, //向父组件暴露 multipleSelection 变量
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

const emit = defineEmits(["update_selected", "flush_table"]);

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
    template: "",
    type: "",
  },
});

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

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
  form.data["template"] = row.template;
  form.data["type"] = row.type;
};

const handleDelete = (uuid: string) => {
  // 删除当前的接口
  var updatetime = get_current();
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
  postdata["update_time"] = get_current();
  update_interface({ data: postdata }).then((res) => {
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

.el-pagination {
  justify-content: right;
}
</style>
