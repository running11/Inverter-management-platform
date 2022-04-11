<template>
  <el-header class="header-wrapper">
    <div class="logo-box">
      <div class="img-box">
        <img src="@/assets/images/chint_logo.png" alt="logo" />
      </div>
      <div class="name">{{ $t("header.title") }}</div>
    </div>
    <div class="menu-box">
      <div class="user">
        <i class="el-icon-user"></i>
        <label>admin</label>
      </div>
      <select-language></select-language>
      <i class="iconfont icon-tuichudenglu" @click="logout"></i>
    </div>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectLanguage from "@/components/selectLanguage/index.vue";
// import service from "@/utils/request";
import { Mutation } from "vuex-class";

@Component({
  components: {
    SelectLanguage,
  },
})
export default class Header extends Vue {
  @Mutation clearTokenValue: any;

  logout(): void{
    this.$router.push("/login");
    this.clearTokenValue();
    // service
    //   .post("/api/logout")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // service.get("/api/getInfo")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: $header-height !important;
  background-color: $main-color;
  display: flex;
  justify-content: space-between;
  .logo-box {
    display: flex;
    .img-box {
      width: 84px;
      height: $header-height;
      display: flex;
      align-items: center;
      img {
        width: 84px;
        height: auto;
      }
    }
    .name {
      font-size: 16px;
      color: $white;
      line-height: $header-height;
      margin-left: 15px;
    }
  }
  .menu-box {
    display: flex;
    .user {
      margin-right: 15px;
      color: $white;
      i {
        font-size: 22px;
        margin-right: 5px;
        line-height: $header-height;
      }
      label {
        display: inline-block;
        height: $header-height;
        font-size: 15px;
        line-height: $header-height;
        vertical-align: top;
      }
    }
    .iconfont {
      font-size: 22px;
      color: $white;
      line-height: $header-height;
      cursor: pointer;
    }
  }
}
</style>
