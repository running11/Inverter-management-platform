import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/styles/index.scss";
import "./permission.ts";
import i18n from "./language";
import echarts from "echarts";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
