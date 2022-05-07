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
import { decrypt } from "@/utils";
import service from "@/utils/request";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

// token会过期，每隔 30分钟 会过期，再次请求登录接口
window.setInterval(function(){
  const start = Number(window.localStorage.getItem("tokenTimeMillis"));

  const loginInfo = JSON.parse(window.localStorage.getItem("loginInfo") || '');
  loginInfo.password = decrypt(loginInfo.password);

  if (new Date().getTime() - start > 25 * 60 * 1000) { // 每隔25分钟请求下登录接口
    service({
      method: "post",
      url: "/api/login",
      data: loginInfo,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          store.commit("updateTokenValue", res.data.data);
          // 由于 token 30分钟会过期，所以把这个时间记录下来
          window.localStorage.setItem("tokenTimeMillis", new Date().getTime().toString());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, 10*10*1000);

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
