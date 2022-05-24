<template>
  <div class="login-wrapper">
    <div class="login-main">
      <el-form
        class="login-form"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <div class="title-container">
          <h3 class="title">{{$t("header.title")}}</h3>
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            class="username"
            :placeholder="$t('login.pleaseEnterUserName')"
            name="username"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            class="password"
            :placeholder="$t('login.pleaseEnterPassword')"
            name="password"
            type="password"
          />
          <span class="show-pwd">
            <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
          </span>
        </el-form-item>
        <el-form-item class="code-form-item" prop="code">
          <el-input
            v-model="loginForm.code"
            :placeholder="$t('login.pleaseEnterCode')"
            name="code"
            @keyup.enter.native="handleLogin"
          />
          <img :src="codeImgUrl" :alt="$t('login.code')" @click="getCode" />
        </el-form-item>
        <el-button
          class="login-btn"
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
          >{{$t("login.login")}}</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import service from "@/utils/request";
import { ElForm } from "element-ui/types/form";
import { Mutation, Action } from "vuex-class";
import { Route } from 'vue-router';
import { encrypt } from "@/utils";
import i18n from "@/language";
interface ILoginForm {
  username: string;
  password: string;
  code: string;
}
const validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(i18n.t(`login.usernameTip`) as string)); // 请输入正确的用户名
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(i18n.t(`login.passwordTip`) as string)); // 密码不能为空
  } else {
    callback();
  }
};
const validateCode = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(i18n.t(`login.codeTip`) as string)); // 验证码不能为空
  } else {
    callback();
  }
};
@Component({
  name: "login",
})
export default class Login extends Vue {
  @Mutation updateTokenValue: any;
  @Action getDeviceTypeList: any;
  private loginForm: ILoginForm = {
    username: "",
    password: "",
    code: "",
  };
  private loginRules: any = {
    username: [
      { required: true, trigger: "blur", validator: validateUsername },
    ],
    password: [
      { required: true, trigger: "blur", validator: validatePassword },
    ],
    code: [{ required: true, trigger: "blur", validator: validateCode }],
  };
  private loading = false;
  private codeImgUrl = "";
  private uuid = "";
  private redirect:any =  undefined;
  created() {
    this.getCode();
  }
  @Watch("$route", {immediate: true})
  routechange(route: Route) {
    // console.log(route, `login route`)
    this.redirect = route.query && route.query.redirect;
  }

  // 获取验证码
  getCode(): void {
    service
      .get("/dmapi/captchaImage")
      .then((res) => {
        if (res && res.data.code === 200) {
          this.codeImgUrl = `data:image/png;base64,${res.data.data.img}`;
          this.uuid = res.data.data.uuid;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleLogin(): void {
    (this.$refs["loginForm"] as ElForm).validate((valid: boolean) => {
      if (valid) {
        const paramsData = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.code,
          uuid: this.uuid,
        };
        this.loading = true;
        service({
          method: "post",
          url: "/dmapi/login",
          data: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              // console.log(this.redirect, `this.redirect`);
              this.updateTokenValue(res.data.data);
              // 由于 token 30分钟会过期，所以把这个时间记录下来
              window.localStorage.setItem("tokenTimeMillis", new Date().getTime().toString());
              // 把登录参数记录下来，过期前可以再请求
              let loginInfo = paramsData;
              loginInfo.password = encrypt(paramsData.password)
              window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
              this.$router.push(this.redirect || "/home");
              this.loading = false;
              service.get("/dmapi/getInfo");
              this.getDeviceTypeList(); // 调获取当前用户所有设备类型的接口 侧边栏设备中心下的数据
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-main {
    position: relative;
    width: 400px;
    max-width: 100%;
    overflow: hidden;
    .login-form {
      box-sizing: border-box;
      width: 100%;
      background-color: $white;
      padding: 20px 30px;
      border-radius: 4px;
    }
    .username {
      ::v-deep .el-input__inner {
        background: url("./../../assets/images/icon_user.png") 7px center
          no-repeat;
        background-size: 20px;
        padding: 0 15px 0 35px;
      }
    }
    .password {
      ::v-deep .el-input__inner {
        background: url("./../../assets/images/icon_password.png") 7px center
          no-repeat;
        background-size: 20px;
        padding: 0 15px 0 35px;
      }
    }
    .code-form-item {
      position: relative;
      img {
        position: absolute;
        width: 80px;
        height: 38px;
        top: 1px;
        right: 1px;
        cursor: pointer;
      }
    }
    .login-btn {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 20px;
      color: $main-color;
      margin: 10px auto 20px;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>