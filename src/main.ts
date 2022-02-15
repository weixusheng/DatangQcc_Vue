import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "vue-router";

import axios from "axios";
import VueAxios from "vue-axios";

import { createApp, createVNode } from "vue";
import App from "./App.vue";
import router from "./router/index";

import * as Icons from "@element-plus/icons-vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(router).mount("#app");

app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
app.use(VueAxios, axios);

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
