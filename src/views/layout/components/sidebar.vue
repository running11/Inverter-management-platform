<template>
  <el-aside class="side-warpper" :width="isCollapse ? '56px' : '200px'">
    <el-menu
      class="el-menu-vertical-demo"
      mode="vertical"
      :collapse="isCollapse"
      :default-active="activeMenu"
      :uniqueOpened="true"
      :default-openeds="openeds"
      @select="changeRoute"
    >
      <nav-menu :navMenus="menusList"></nav-menu>
    </el-menu>
    <div class="fold-box">
      <i
        @click="toggleCollapse"
        :class="['icon', isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
      ></i>
    </div>
  </el-aside>
</template>
<script lang="ts">
import NavMenu from "@/views/layout/components/navMenu.vue";
import { Component, Watch, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { queryParentNode } from "@/utils";

interface MenuItem {
  name: string;
  title: string;
  path: string;
  [propsName: string]: any;
}

@Component({
  components: {
    NavMenu,
  },
})
export default class Sidebar extends Vue {
  // @Inject("routerRefresh") readonly routerRefresh!: any;
  isCollapse = false;
  activeMenu = "";
  openeds: Array<string> = [];
  menusList: MenuItem[] = [];
  @Getter getRoutesList: any;

  @Watch("$route")
  routechange(to: MenuItem) {
    if (this.getSpecialActiveMenu(to.name)) {
      this.activeMenu = this.getSpecialActiveMenu(to.name) as string;
    } else {
      this.activeMenu = to.name;
    }
  }
  @Watch("getRoutesList", {immediate: true, deep: true})
  handleRoutesList(val: any, oldVal: any){
    let routesList: MenuItem[] = JSON.parse(JSON.stringify(val));
    let list = routesList[1].children || [];
    this.menusList = list;
    this.getActiveMenu();
  }

  created(): void {
    if (!this.getRoutesList) {return};
    let routesList: MenuItem[] = JSON.parse(JSON.stringify(this.getRoutesList));
    let list = routesList[1].children || [];
    this.menusList = list;
    this.getActiveMenu();
  }

  getSpecialActiveMenu(menu: string) {
    const str = new Map([
      ["projectOverview", "home"],
      ["projectView", "home"],
      ["deviceList", "home"],
      ["powerCurve", "home"],
      ["EmsDetails", "EMS"],
      ["inverterDetails", "inverter"],
      ["PcsDetails", "PCS"],
      ["batteryDetails", "battery"],
      ["airConditionDetails", "airConditioning"],
      ["UPSDetails", "UPS"],
      ["electricityMeterDetails", "electricityMeter"],
      ["accessEquipment", "projectManage"],
      ["stringCapacity", "projectManage"],
      ["electricityPrice", "projectManage"],
      ["otherSetting", "projectManage"],
    ]);
    return str.get(menu);
  }

  getActiveMenu(): void {
    let activePathName = "";
    let route = this.$route;
    let routeName = route.name as string;
    if (this.getSpecialActiveMenu(routeName)) {
      activePathName = this.getSpecialActiveMenu(routeName) as string;
    } else {
      activePathName = routeName;
    }
    this.activeMenu = activePathName;
    let name = queryParentNode(this.menusList, activePathName)
      ? queryParentNode(this.menusList, activePathName).name
      : "";
    this.openeds = [name];
  }

  changeRoute(key: string): void {
    const route: any = this.menusList.find((item) => {
      if (item.name === key) {
        return item;
      }
    });
    if (route && route.redirect) {
      this.activeMenu = route.name;
    } else {
      this.activeMenu = key;
    }
    this.$router.push({ name: key });
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
}
</script>
<style lang="scss" scoped>
.side-warpper {
  background-color: $white;
  box-shadow: 1px 0 5px #ccc;
  overflow-x: hidden;
  position: relative;
  ::v-deep.el-menu {
    border-right: none;
  }
  .fold-box {
    width: 100%;
    border-top: 1px solid #f0f0f0;
    position: absolute;
    left: 12px;
    bottom: 0;
    .icon {
      font-size: 22px;
      color: #409eff;
      margin: 10px 0;
    }
  }
}
</style>
