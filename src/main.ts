import "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import { createApp, createVNode } from "vue";
import App from "./App.vue";
import router from "./router/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import * as Icons from "@element-plus/icons-vue";

import { Request } from "@/utils/request";

const app = createApp(App);

app.use(ElementPlus, {locale});
app.use(router);

// app.config.globalProperties.$axios = axios;
// axios.defaults.baseURL = "/";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// app.use(VueAxios, axios);
app.use(VueAxios, Request.init());

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.mount("#app");
