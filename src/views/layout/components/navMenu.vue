<template>
  <div class="menu-wrapper">
    <template v-for="navMenu in navMenus">
      <el-menu-item
        v-if="!navMenu.children && !navMenu.meta.hidden"
        :data="navMenu"
        :index="navMenu.name"
        :key="navMenu.name"
      >
        <i :class="['iconfont', navMenu.meta.icon]"></i>
        <span slot="title">{{ navMenu.meta.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-if="navMenu.children && !navMenu.meta.hidden"
        :data="navMenu"
        :index="navMenu.name"
        :key="navMenu.name"
      >
        <template slot="title">
          <i :class="['iconfont', navMenu.meta.icon]"></i>
          <span slot="title">{{ navMenu.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <nav-menu :key="navMenu.name" :navMenus="navMenu.children"></nav-menu>
      </el-submenu>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface MenuItem {
  name: string;
  title: string;
  path: string;
  [propsName: string]: any;
}

@Component({
  name: "NavMenu",
  components: {},
})
export default class NavMenu extends Vue {
  @Prop(Array) navMenus?: Array<MenuItem>;
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  .iconfont {
    font-weight: bold;
  }
  ::v-deep.el-menu-item,
  ::v-deep.el-submenu__title {
    font-size: 15px;
    text-indent: 0;
    padding: 0 15px !important;
    color: rgba(0, 0, 0, 0.85);
    .iconfont {
      font-size: 15px;
      color: rgba(85, 52, 52, 0.85);
      margin-right: 5px;
    }
  }
  ::v-deep.el-menu-item.is-active,
  ::v-deep.el-submenu.is-active .el-submenu__title {
    color: #409eff;
    .iconfont {
      color: #409eff;
    }
  }
}
.el-menu--inline {
  .menu-wrapper {
    ::v-deep.el-menu-item,
    ::v-deep.el-submenu__title {
      padding: 0 30px !important;
    }
  }
}
</style>
<style>
.el-menu--collapse .menu-wrapper .el-submenu__title {
  text-indent: 0.3em;
}
@media screen and (max-width: 1440px) {
  .el-menu--collapse .menu-wrapper .el-submenu__title {
    text-indent: 0.6em;
  }
}
@media screen and (max-width: 1200px) {
  .el-menu--collapse .menu-wrapper .el-submenu__title {
    text-indent: 0.8em;
  }
}

/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
  display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
