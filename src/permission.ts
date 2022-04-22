import router from "@/router";
import getPageTitle from "@/utils/getPageTitle";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`login?redirect=${to.fullPath}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
