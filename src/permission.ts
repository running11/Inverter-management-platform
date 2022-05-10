import router from "@/router";
import getPageTitle from "@/utils/getPageTitle";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import i18n from '@/language';

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(i18n.t(to.meta.title) as string);
  
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
