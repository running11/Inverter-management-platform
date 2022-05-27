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
          title: "menus.home", // 首页
          icon: "icon-tabzhuye",
        },
      },
      {
        path: "/projectDetails",
        name: "projectDetails",
        component: () => import("@/views/projectDetails/index.vue"),
        redirect: "/projectDetails/projectOverview",
        meta: {
          title: "menus.projectDetails", // 项目详情
          hidden: true,
        },
        children: [
          {
            path: "projectOverview",
            name: "projectOverview",
            component: () =>
              import("@/views/projectDetails/projectOverview/index.vue"),
            meta: {
              title: "menus.projectOverview", // 项目总览
            },
          },
          {
            path: "projectView",
            name: "projectView",
            component: () =>
              import("@/views/projectDetails/projectView/index.vue"),
            meta: {
              title: "menus.projectView", // 项目视图
            },
          },
          {
            path: "deviceList",
            name: "deviceList",
            component: () =>
              import("@/views/projectDetails/deviceList/index.vue"),
            meta: {
              title: "menus.deviceList", // 设备列表
            },
          },
          {
            path: "powerCurve",
            name: "powerCurve",
            component: () =>
              import("@/views/projectDetails/powerCurve/index.vue"),
            meta: {
              title: "menus.powerCurve", // 功率曲线
            },
          },
        ],
      },

      {
        path: "/deviceCenter",
        name: "deviceCenter",
        component: () => import("@/views/deviceCenter/index.vue"),
        meta: {
          title: "menus.equipmentCenter", // 设备中心
          icon: "icon-shebeixinghao",
        },
        children: [
          {
            path: "EMS",
            name: "EMS",
            component: () => import("@/views/deviceCenter/EMS/index.vue"),
            meta: {
              title: "menus.EMS", // EMS
            },
          },

          {
            path: "Inverter",
            name: "Inverter",
            component: () => import("@/views/deviceCenter/inverter/index.vue"),
            meta: {
              title: "menus.Inverter", // 逆变器
            },
          },
          {
            path: "Pcs",
            name: "Pcs",
            component: () => import("@/views/deviceCenter/PCS/index.vue"),
            meta: {
              title: "menus.Pcs", // PCS
            },
          },
          {
            path: "Bms",
            name: "Bms",
            component: () => import("@/views/deviceCenter/battery/index.vue"),
            meta: {
              title: "menus.Bms", // 电池
            },
          },
          {
            path: "Air",
            name: "Air",
            component: () =>
              import("@/views/deviceCenter/airConditioning/index.vue"),
            meta: {
              title: "menus.Air", // 空调
            },
          },
          {
            path: "Ups",
            name: "Ups",
            component: () => import("@/views/deviceCenter/UPS/index.vue"),
            meta: {
              title: "menus.Ups", // UPS
            },
          },
          {
            path: "Meter",
            name: "Meter",
            component: () =>
              import("@/views/deviceCenter/electricityMeter/index.vue"),
            meta: {
              title: "menus.Meter", // 电表
            },
          },
          {
            path: "TempHumi",
            name: "TempHumi",
            component: () =>
              import("@/views/deviceCenter/tempHumi/index.vue"),
            meta: {
              title: "menus.TempHumi", // 温湿度控制器
            },
          },
          {
            path: "EmsDetails",
            name: "EmsDetails",
            component: () => import("@/views/deviceDetails/EMS/index.vue"),
            meta: {
              title: "menus.EmsDetails", // EMS详情
              hidden: true,
            },
          },
          {
            path: "inverterDetails",
            name: "inverterDetails",
            component: () => import("@/views/deviceDetails/inverter/index.vue"),
            meta: {
              title: "menus.inverterDetails", // 逆变器详情
              hidden: true,
            },
          },
          {
            path: "PcsDetails",
            name: "PcsDetails",
            component: () => import("@/views/deviceDetails/PCS/index.vue"),
            meta: {
              title: "menus.PcsDetails", // PCS详情
              hidden: true,
            },
          },
          {
            path: "batteryDetails",
            name: "batteryDetails",
            component: () => import("@/views/deviceDetails/battery/index.vue"),
            meta: {
              title: "menus.batteryDetails", // 电池详情
              hidden: true,
            },
          },
          {
            path: "UPSDetails",
            name: "UPSDetails",
            component: () => import("@/views/deviceDetails/UPS/index.vue"),
            meta: {
              title: "menus.UPSDetails", // UPS详情
              hidden: true,
            },
          },
          {
            path: "airConditionDetails",
            name: "airConditionDetails",
            component: () =>
              import("@/views/deviceDetails/airConditioning/index.vue"),
            meta: {
              title: "menus.airConditionDetails", // 空调详情
              hidden: true,
            },
          },
          {
            path: "electricityMeterDetails",
            name: "electricityMeterDetails",
            component: () =>
              import("@/views/deviceDetails/electricityMeter/index.vue"),
            meta: {
              title: "menus.electricityMeterDetails", // 电表详情
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
          title: "menus.dataAnalysis", // 数据分析
          icon: "icon-shujufenxi1",
          hidden: true,
        },
      },
      {
        path: "/setting",
        name: "setting",
        component: () => import("@/views/setting/index.vue"),
        meta: {
          title: "menus.setting", // 设置
          icon: "icon-cebianlan_shebeizhongxin",
        },
        children: [
          {
            path: "companyManage",
            name: "companyManage",
            component: () => import("@/views/setting/companyManage/index.vue"),
            meta: {
              title: "menus.companyManage", // 公司管理
            },
          },
          {
            path: "userManage",
            name: "userManage",
            component: () => import("@/views/setting/userManage/index.vue"),
            meta: {
              title: "menus.userManage", // 用户管理
            },
          },
          {
            path: "roleManage",
            name: "roleManage",
            component: () => import("@/views/setting/roleManage/index.vue"),
            meta: {
              title: "menus.roleManage",//角色管理
            },
          },
          {
            path: "menuManage",
            name: "menuManage",
            component: () => import("@/views/setting/menuManage/index.vue"),
            meta: {
              title: "menus.menuManage",//菜单管理
            },
          },
          {
            path: "personCenter",
            name: "personCenter",
            component: () => import("@/views/setting/personCenter/index.vue"),
            meta: {
              title: "menus.personCenter", // 个人中心
            },
          },
          {
            path: "projectManage",
            name: "projectManage",
            component: () => import("@/views/setting/projectManage/index.vue"),
            meta: {
              title: "menus.projectManage", // 项目管理
            },
          },

          {
            path: "deviceManage",
            name: "deviceManage",
            component: () => import("@/views/setting/deviceManage/index.vue"),
            meta: {
              title: "menus.deviceManage", // 设备管理
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
          title: "menus.projectConfig", // 项目配置
          hidden: true,
        },
        children: [
          {
            path: "accessEquipment",
            name: "accessEquipment",
            component: () =>
              import("@/views/setting/projectConfig/accessEquipment/index.vue"),
            meta: {
              title: "menus.accessEquipment", // 接入设备
            },
          },
          {
            path: "stringCapacity",
            name: "stringCapacity",
            component: () =>
              import("@/views/setting/projectConfig/stringCapacity/index.vue"),
            meta: {
              title: "menus.stringCapacity", // 组串容量设置
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
              title: "menus.electricityPrice", // 电价设置
            },
          },
          {
            path: "otherSetting",
            name: "otherSetting",
            component: () =>
              import("@/views/setting/projectConfig/otherSetting/index.vue"),
            meta: {
              title: "menus.otherSetting", // 其他
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
  {
    path:"/bigScreen",
    name:"bigScreen",
    component: () => import("@/views/bigScreen/index.vue")
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(routes, 'routes');

export default router;
