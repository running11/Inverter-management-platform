<template>
  <el-header class="header-wrapper">
    <div class="logo-box">
      <div class="img-box">
        <img src="@/assets/images/chint_logo.png" alt="logo" />
      </div>
      <div class="name">{{ $t("header.title") }}</div>
    </div>
    <div class="menu-box">
      <div class="big-screen" @click="toBigScreen"></div>
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
    this.clearTokenValue();
    this.$router.push({
      path: "/login",
      query: {
        redirect: this.$route.fullPath || ''
      }
    });
    // service
    //   .post("/dmapi/logout")
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  toBigScreen(): void {
    this.$router.push("/bigScreen");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-wrapper {
  width: 100%;
  height: $header-height !important;
  background-color: $main-color;
  border-bottom: 4px solid #25c1ff;
  display: flex;
  justify-content: space-between;
  box-sizing: content-box;
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
    .big-screen{
      width: 40px;
      height: $header-height;
      background: url("./../../assets/images/icon_screen.png") center center no-repeat;
      background-size: 22px 22px;
      cursor: pointer;
      margin-right: 5px;
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
