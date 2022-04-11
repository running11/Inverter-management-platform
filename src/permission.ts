import router from "@/router";
import getPageTitle from "@/utils/getPageTitle";
import NProgress from "nprogress";

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  // console.log(to, to.matched);

  next();
  // if (hasToken) {
  //   if (to.path === "/login") {
  //     next({ path: "/" });
  //   } else {
  //     next();
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next(`login?redirect=${to.path}`);
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});
