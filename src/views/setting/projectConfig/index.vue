<template>
  <div class="details-wrapper">
    <el-breadcrumb style="margin-bottom: 20px">
      <el-breadcrumb-item :to="{ path: '/setting/projectManage' }"
        >项目管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>项目配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list">
      <div
        :class="['item', { active: activeName === item.name }]"
        v-for="item in tabList"
        :key="item.name"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface ITab {
  label: string;
  name: string;
}

@Component
export default class ProjectConfig extends Vue {
  activeName = "";
  tabList: ITab[] = [
    {
      label: "接入设备",
      name: "accessEquipment",
    },
    {
      label: "组串容量设置",
      name: "stringCapacity",
    },
    {
      label: "电价设置",
      name: "electricityPrice",
    },
    {
      label: "其他",
      name: "otherSetting",
    },
  ];

  mounted(): void {
    this.$nextTick((): void => {
      this.handleRoutes();
    });
  }

  handleRoutes(): void {
    this.activeName = this.$route.name as string;
    this.$router.push({ name: this.$route.name });
  }

  handleClick(tab: ITab): void {
    this.activeName = tab.name;
    this.$router.push({ name: tab.name });
  }
}
</script>
<style lang="scss" scoped>
.details-wrapper {
  .list {
    background-color: $white;
    display: flex;
    .item {
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      color: $gray;
      border: 1px solid #979797;
      line-height: 40px;
      border-right: none;
      cursor: pointer;
    }
    .item:last-child {
      border-right: 1px solid #979797;
    }
    .active {
      background-color: $main-color;
      color: $white;
      border: 1px solid $main-color;
      position: relative;
    }
    .active:after {
      border: solid transparent;
      content: " ";
      width: 0;
      height: 0;
      position: absolute;
      border-width: 10px;
      border-top-color: $main-color;
      left: 50%;
      bottom: -20px;
      margin: 0 0 0 -8px;
    }
  }
}
</style>
