<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="userInfo"
        ref="userFrom"
        status-icon
        :hide-required-asterisk="isHide"
        :rules="rules"
      >
        <el-form-item :label="text.userName" prop="userName">
          <el-input v-model="userInfo.userName" clearable></el-input>
        </el-form-item>
        <el-form-item :label="text.email" prop="email">
          <el-input v-model="userInfo.email" clearable></el-input>
        </el-form-item>
        <el-form-item :label="text.phone" prop="phonenumber">
          <el-input v-model="userInfo.phonenumber" clearable></el-input>
        </el-form-item>
        <el-form-item :label="text.nickName" prop="nickName">
          <el-input v-model="userInfo.nickName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            $t("personCenter.preserve")
          }}</el-button>
          <el-button @click="resetForm">{{ $t("common.reset") }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" :offset="3">
      <div class="rightbox">
        <span>{{ text.avatar }}</span>
        <div class="imgbox" v-if="imageUrl">
          <img :src="imageUrl" alt="" />
        </div>
        <div class="imgbox" v-else>
          <img :src="defaultImageUrl" alt="" />
        </div>
      </div>

      <el-upload
        class="avatar-uploader"
        ref="upload"
        action="#"
        :show-file-list="false"
        :http-request="handelUpload"
        :before-upload="beforeUpload"
      >
        <el-button size="small" icon="el-icon-upload2">{{
          text.changeAvatar
        }}</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { isvalidPhone } from "@/utils/validate";
import service from "@/utils/request";
import i18n from "@/language";

interface user {
  // [key: string]: any;
  userId: number;
  userName: string;
  nickName: string;
  email: string;
  remark: string;
  phonenumber: string;
  sex: number;
}

@Component
export default class basicInformation extends Vue {
  text = {
    userName: i18n.t("userManage.userName"),
    email: i18n.t("userManage.email"),
    phone: i18n.t("userManage.phone"),
    nickName: i18n.t("userManage.nickName"),
    avatar: i18n.t("userManage.avatar"),
    changeAvatar: i18n.t("personCenter.changeAvatar"),
  };
  private labelPosition = "top";
  private isHide = true;
  private userInfo: user = {
    userId: 0,
    userName: "",
    nickName: "",
    email: "",
    remark: "",
    phonenumber: "",
    sex: 0,
  };
  private postGroup = ""; //接口返回字段，暂时不知道怎么用
  private roles = []; //接口返回字段，暂时不知道怎么用
  private defaultImageUrl = require("@/assets/images/icon_electricity.png");
  private imageUrl = "";
  rules = {
    userName: [
      {
        required: true,
        message: i18n.t("personCenter.userNameTip"),
        trigger: "blur",
      },
    ],
    email: [
      { required: false, trigger: "blur" },
      {
        type: "email",
        message: i18n.t("personCenter.enterEmail"),
        trigger: ["blur", "change"],
      },
    ],
    phonenumber: [
      { required: false, trigger: "blur", validator: this.validPhone },
    ],
  };
  mounted(): void {
    this.fetchData();
  }

  //获取用户信息
  fetchData(): void {
    service({
      method: "get",
      url: "/dmapi/system/user/profile",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log("7777", res.data.data);
          this.postGroup = res.data.data.postGroup;
          this.roles = res.data.data.roles;
          this.userInfo.userId = res.data.data.user.userId;
          this.userInfo.userName = res.data.data.user.userName;
          this.userInfo.nickName = res.data.data.user.nickName;
          this.userInfo.email = res.data.data.user.email;
          this.userInfo.remark = res.data.data.user.remark;
          this.userInfo.phonenumber = res.data.data.user.phonenumber;
          this.userInfo.sex = parseInt(res.data.data.user.sex);
          this.imageUrl = res.data.data.user.avatar || this.defaultImageUrl;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  validPhone(rule: any, value: number, callback: any): void {
    if (!value) {
      callback(new Error(i18n.t("userManage.pleasePhone") as string));
    } else if (!isvalidPhone(value)) {
      callback(new Error(i18n.t("personCenter.succPhone") as string));
    } else {
      callback();
    }
  }
  //提交修改的用户信息
  submit(): void {
    (this.$refs.userFrom as Form).validate((valid: boolean) => {
      if (valid) {
        const paramsData = JSON.stringify(this.userInfo);
        //console.log(paramsData, "提交");
        service({
          method: "put",
          url: "/dmapi/system/user/profile",
          params: {},
          data: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                type: "success",
                message: i18n.t("personCenter.editSuccess") as string,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  resetForm(): void {
    (this.$refs.userFrom as Form).resetFields();
  }

  // 上传预处理
  beforeUpload(file: any) {
    if (file.type.indexOf("image/") == -1) {
      this.$message({
        type: "warning",
        message: i18n.t("personCenter.fileTip") as string,
      });
      return false;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //  console.log(typeof(reader.result))
        this.imageUrl = reader.result as string;
      };
    }
  }
  handelUpload(file: any) {
    // console.log("888", file);
    let fileData = new FormData();
    fileData.append("picture", file.file);
    service({
      method: "post",
      url: "/dmapi/system/user/profile/Avatar",
      data: fileData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log("imgURL", res.data);
          this.fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style lang="scss" scoped>
.rightbox {
  display: flex;
  flex-direction: column;
  span {
    display: block;
    padding-top: 12px;
    color: $gray;
    margin-bottom: 10px;
  }
  .imgbox {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 10px;
    img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 auto;
      height: 200px;
    }
  }
}
</style>
