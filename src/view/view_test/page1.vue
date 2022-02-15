//子组件
<template>
  <div>
    <p>父级传递来的值=>{{ data }}</p>
    <p>{{ son }}</p>
    <p><button @click="nextDown">子按钮</button></p>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"; //
//参数 数据类型配置
interface DataProps {
  son: any;
  key: number;
}
export default defineComponent({
  name: "FirstStep",
  components: {},
  props: {
    data: {
      type: String, //设置数据类型
      required: true, //是否必传
      //对象
      // default: () => {
      //   return {
      //     type: 0,
      //     message: "",
      //   };
      // },
      // 非对象
      default: "默认参数",
    },
  },
  emits: ["nextStep"], //事件名称
  setup(props: any, context: any) {
    //  context子传递父的事件
    //需要展现到页面的变量
    const data: DataProps = reactive({
      son: "子元素",
      key: 1,
      /**
       * 下一步点击
       */
      nextDown() {
        let index = data.key++;
        context.emit("nextStep", index);
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
