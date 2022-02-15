//父集
<template>
  <div class="_login">
    <firstStep @nextStep="nextStep" :data="data1"></firstStep>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"; //
import firstStep from "./page1.vue";

interface DataProps {
  data1: any;
}
export default defineComponent({
  name: "Login",
  components: { firstStep },
  setup() {
    //需要展现到页面的变量
    const data: DataProps = reactive({
      data1: 0,
      /**
       * 下一步
       * 点击反馈
       */
      nextStep($event: any) {

        data.data1 = $event;
      },
    });
    const refData = toRefs(data);
    /**
     * 抛出最终使用的参数+事件
     */
    return {
      ...refData,
    };
  },
});
</script>

