<template>
  <el-container direction="vertical" class="container-warpper">
    <header-custom></header-custom>
    <el-container class="container">
      <sidebar></sidebar>
      <el-main>
        <router-view :key="getKeys"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderCustom from "@/components/header/index.vue";
import Sidebar from "@/views/layout/components/sidebar.vue";

@Component({
  components: {
    HeaderCustom,
    Sidebar,
  },
})
export default class Layout extends Vue {
  get getKeys() {
    let key =
      this.$route.path.indexOf("projectDetails") > 0
        ? ""
        : this.$route.fullPath;
    return key;
  }
}
</script>
<style lang="scss" scoped>
.container-warpper {
  height: 100%;
  overflow: hidden;
  .container {
    width: 100%;
    height: calc(100% - 52px);
    background: #f0f2f5;
  }
}
</style>
