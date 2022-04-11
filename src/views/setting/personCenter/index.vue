<template>
  <div class="main-wrapper">
    <div class="tab-box">
      <el-tabs tab-position="top">
        <el-tab-pane label="基本资料">
          <basic-information></basic-information>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <change-password></change-password>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import basicInformation from "./basicInformation/index.vue";
import changePassword from "./changePassword/index.vue";
@Component({
  components: {
    basicInformation,
    changePassword,
  },
})
export default class PersonCenter extends Vue {}
</script>
<style lang="scss" scoped>
.tab-box {
  padding: 20px;
  background: $white;
  /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
</style>
