import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/views/layout/index.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "icon-tabzhuye",
        },
      },
      {
        path: "/projectDetails",
        name: "projectDetails",
        component: () => import("@/views/projectDetails/index.vue"),
        redirect: "/projectDetails/projectOverview",
        meta: {
          title: "项目详情",
          hidden: true,
        },
        children: [
          {
            path: "projectOverview",
            name: "projectOverview",
            component: () =>
              import("@/views/projectDetails/projectOverview/index.vue"),
            meta: {
              title: "项目总览",
            },
          },
          {
            path: "projectView",
            name: "projectView",
            component: () =>
              import("@/views/projectDetails/projectView/index.vue"),
            meta: {
              title: "项目视图",
            },
          },
          {
            path: "deviceList",
            name: "deviceList",
            component: () =>
              import("@/views/projectDetails/deviceList/index.vue"),
            meta: {
              title: "设备列表",
            },
          },
          {
            path: "powerCurve",
            name: "powerCurve",
            component: () =>
              import("@/views/projectDetails/powerCurve/index.vue"),
            meta: {
              title: "功率曲线",
            },
          },
        ],
      },

      {
        path: "/deviceCenter",
        name: "deviceCenter",
        component: () => import("@/views/deviceCenter/index.vue"),
        meta: {
          title: "设备中心",
          icon: "icon-shebeixinghao",
        },

        children: [
          {
            path: "EMS",
            name: "EMS",
            component: () => import("@/views/deviceCenter/EMS/index.vue"),
            meta: {
              title: "EMS",
            },
          },

          {
            path: "inverter",
            name: "inverter",
            component: () => import("@/views/deviceCenter/inverter/index.vue"),
            meta: {
              title: "逆变器",
            },
          },
          {
            path: "PCS",
            name: "PCS",
            component: () => import("@/views/deviceCenter/PCS/index.vue"),
            meta: {
              title: "PCS",
            },
          },
          {
            path: "battery",
            name: "battery",
            component: () => import("@/views/deviceCenter/battery/index.vue"),
            meta: {
              title: "电池",
            },
          },
          {
            path: "airConditioning",
            name: "airConditioning",
            component: () =>
              import("@/views/deviceCenter/airConditioning/index.vue"),
            meta: {
              title: "空调",
            },
          },
          {
            path: "UPS",
            name: "UPS",
            component: () => import("@/views/deviceCenter/UPS/index.vue"),
            meta: {
              title: "UPS",
            },
          },
          {
            path: "electricityMeter",
            name: "electricityMeter",
            component: () =>
              import("@/views/deviceCenter/electricityMeter/index.vue"),
            meta: {
              title: "电表",
            },
          },
          {
            path: "EmsDetails",
            name: "EmsDetails",
            component: () => import("@/views/deviceDetails/EMS/index.vue"),
            meta: {
              title: "EMS详情",
              hidden: true,
            },
          },
          {
            path: "inverterDetails",
            name: "inverterDetails",
            component: () => import("@/views/deviceDetails/inverter/index.vue"),
            meta: {
              title: "逆变器详情",
              hidden: true,
            },
          },
          {
            path: "PcsDetails",
            name: "PcsDetails",
            component: () => import("@/views/deviceDetails/PCS/index.vue"),
            meta: {
              title: "PCS详情",
              hidden: true,
            },
          },
          {
            path: "batteryDetails",
            name: "batteryDetails",
            component: () => import("@/views/deviceDetails/battery/index.vue"),
            meta: {
              title: "电池详情",
              hidden: true,
            },
          },
          {
            path: "UPSDetails",
            name: "UPSDetails",
            component: () => import("@/views/deviceDetails/UPS/index.vue"),
            meta: {
              title: "UPS详情",
              hidden: true,
            },
          },
          {
            path: "airConditionDetails",
            name: "airConditionDetails",
            component: () =>
              import("@/views/deviceDetails/airConditioning/index.vue"),
            meta: {
              title: "空调详情",
              hidden: true,
            },
          },
          {
            path: "electricityMeterDetails",
            name: "electricityMeterDetails",
            component: () =>
              import("@/views/deviceDetails/electricityMeter/index.vue"),
            meta: {
              title: "电表详情",
              hidden: true,
            },
          },
        ],
      },

      {
        path: "/dataAnalysis",
        name: "dataAnalysis",
        component: () => import("@/views/dataAnalysis/index.vue"),
        meta: {
          title: "数据分析",
          icon: "icon-shujufenxi1",
          hidden: true,
        },
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("@/views/setting/index.vue"),
        meta: {
          title: "设置",
          icon: "icon-cebianlan_shebeizhongxin",
        },
        children: [
          {
            path: "companyManage",
            name: "companyManage",
            component: () => import("@/views/setting/companyManage/index.vue"),
            meta: {
              title: "公司管理",
            },
          },
          {
            path: "userManage",
            name: "userManage",
            component: () => import("@/views/setting/userManage/index.vue"),
            meta: {
              title: "用户管理",
            },
          },
          {
            path: "personCenter",
            name: "personCenter",
            component: () => import("@/views/setting/personCenter/index.vue"),
            meta: {
              title: "个人中心",
            },
          },
          {
            path: "projectManage",
            name: "projectManage",
            component: () => import("@/views/setting/projectManage/index.vue"),
            meta: {
              title: "项目管理",
            },
          },

          {
            path: "deviceManage",
            name: "deviceManage",
            component: () => import("@/views/setting/deviceManage/index.vue"),
            meta: {
              title: "设备管理",
            },
          },
        ],
      },
      {
        path: "/projectConfig",
        name: "projectConfig",
        component: () => import("@/views/setting/projectConfig/index.vue"),
        redirect: "/projectConfig/accessEquipment",
        meta: {
          title: "项目配置",
          hidden: true,
        },
        children: [
          {
            path: "accessEquipment",
            name: "accessEquipment",
            component: () =>
              import("@/views/setting/projectConfig/accessEquipment/index.vue"),
            meta: {
              title: "接入设备",
            },
          },
          {
            path: "stringCapacity",
            name: "stringCapacity",
            component: () =>
              import("@/views/setting/projectConfig/stringCapacity/index.vue"),
            meta: {
              title: "组串容量设置",
            },
          },
          {
            path: "electricityPrice",
            name: "electricityPrice",
            component: () =>
              import(
                "@/views/setting/projectConfig/electricityPrice/index.vue"
              ),
            meta: {
              title: "电价设置",
            },
          },
          {
            path: "otherSetting",
            name: "otherSetting",
            component: () =>
              import("@/views/setting/projectConfig/otherSetting/index.vue"),
            meta: {
              title: "其他",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/notFound/index.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(routes, 'routes');

export default router;
