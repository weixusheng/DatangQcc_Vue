<template>
  <el-divider style="margin-top: 20px; margin-bottom: 40px">
    <el-tag type="success" size="large">高级搜索运行记录</el-tag>
  </el-divider>

  <el-descriptions class="margin-top" :column="3" size="large" border>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">接口英文名称</div>
      </template>
      <el-input
        v-model="search_enname"
        placeholder="输入接口英文名称"
        clearable
      />
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">接口名称</div>
      </template>
      <el-input v-model="search_zhname" placeholder="输入接口名称" clearable />
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">执行结果</div>
      </template>
      <el-select v-model="search_res" placeholder="选择执行结果">
        <el-option key="success" value="success" label="成功"> </el-option>
        <el-option key="fail" value="fail" label="失败"> </el-option>
      </el-select>
    </el-descriptions-item>
    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">执行时间</div>
      </template>
      <el-date-picker
        v-model="search_day"
        type="date"
        placeholder="Pick a day"
        style="margin-right: 10px"
      >
      </el-date-picker>
      <el-time-picker
        v-model="search_time"
        is-range
        arrow-control
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
        format="HH:mm"
        value-format="HH:mm"
      >
      </el-time-picker>
    </el-descriptions-item>

    <el-descriptions-item align="center">
      <template #label>
        <div class="cell-item">操作</div>
      </template>
      <el-button type="primary" plain @click="search_btn">搜索</el-button>
      <el-button type="primary" plain @click="search_reset">重置条件</el-button>
    </el-descriptions-item>
  </el-descriptions>

  <el-divider style="margin-top: 50px; margin-bottom: 30px">
    <el-tag type="success" size="large">任务运行记录</el-tag>
  </el-divider>
  <el-table :data="original_data" style="width: 100%">
    <el-table-column property="name" label="接口" />
    <el-table-column property="zh_name" label="接口名称" />
    <el-table-column property="start" label="执行时间" show-overflow-tooltip />
    <el-table-column property="end" label="完成时间" />
    <el-table-column
      prop="result"
      label="运行结果"
      width="180"
      size="large"
      :filters="[
        { text: '成功', value: 'Success' },
        { text: '失败', value: 'Fail' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.result === 'Success' ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.result }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="查看详情">
      <el-button type="primary" plain>查看详情</el-button>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const search_enname = ref("");
const search_zhname = ref("");
const search_res = ref("");
const search_day = ref("");
const search_time = ref([]);

interface inter {
  zh_name: string;
  name: string;
  start: string;
  end: string;
  result: string;
}

const props = defineProps<{
  tableData: Array<inter>;
}>();

const filterTag = (value: string, row: inter) => {
  return row.result === value;
};
const original_data = ref([]);
original_data.value = props.tableData;

const search_enname_computed = (search: string, oridata: any) => {
  return computed(() =>
    oridata.filter(
      (data: any) =>
        !search || data.name.toLowerCase().includes(search.toLowerCase())
    )
  );
};

const search_zhname_computed = (search: string, oridata: any) => {
  return computed(() =>
    oridata.filter(
      (data: any) =>
        !search || data.zh_name.toLowerCase().includes(search.toLowerCase())
    )
  );
};

const search_res_computed = (search: string, oridata: any) => {
  return computed(() =>
    oridata.filter(
      (data: any) =>
        !search || data.result.toLowerCase().includes(search.toLowerCase())
    )
  );
};

const search_btn = () => {
  let tmp: any = original_data.value;
  if (search_enname.value != "") {
    tmp = search_enname_computed(search_enname.value, tmp);
    tmp = tmp.value;
  } else if (search_zhname.value != "") {
    tmp = search_zhname_computed(search_zhname.value, tmp);
    tmp = tmp.value;
  } else if (search_res.value != "") {
    tmp = search_res_computed(search_res.value, tmp);
    tmp = tmp.value;
  }
  original_data.value = tmp;
};

const search_reset = () => {
  console.log(search_time.value[0]);
  console.log(search_time.value[1]);
};

const handleEdit = (index: number, row: inter) => {
  // 编辑当前接口
  console.log(index, row);
};
const handleDelete = (index: number, row: inter) => {
  // 删除当前的接口
  console.log(index, row);
};
</script>

<style scoped>
.el-row {
  margin-top: 20px;
}
</style>
