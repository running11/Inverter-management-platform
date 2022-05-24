<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="passwordInfo"
        ref="passForm"
        status-icon
        :hide-required-asterisk="isHide"
        :rules="rules"
      >
        <el-form-item :label="text.nowPassword" prop="oldPassword">
          <el-input
            v-model="passwordInfo.oldPassword"
            clearable
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="text.newPassword" prop="newPassword">
          <el-input
            v-model="passwordInfo.newPassword"
            clearable
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label="text.confirmPassword" prop="checkPassword">
          <el-input
            v-model="passwordInfo.checkPassword"
            clearable
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            $t("personCenter.preserve")
          }}</el-button>
          <el-button @click="resetForm">{{ $t("common.reset") }}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import service from "@/utils/request";
import i18n from "@/language";
@Component
export default class changePassword extends Vue {
  text = {
    nowPassword: i18n.t("personCenter.nowPassword"),
    newPassword: i18n.t("personCenter.newPassword"),
    confirmPassword: i18n.t("personCenter.confirmPassword"),
  };
  private labelPosition = "top";
  private isHide = true;
  private passwordInfo = {
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
  };
  // 表单校验
  rules = {
    oldPassword: [
      { required: true, message: i18n.t("personCenter.tip1"), trigger: "blur" },
    ],
    newPassword: [
      { required: true, message: i18n.t("personCenter.tip2"), trigger: "blur" },
      {
        min: 6,
        max: 20,
        message: i18n.t("personCenter.tip7"),
        trigger: "blur",
      },
    ],
    checkPassword: [
      { required: true, message: i18n.t("personCenter.tip3"), trigger: "blur" },
      { required: true, validator: this.againCheckPass, trigger: "blur" },
    ],
  };
  againCheckPass(rule: any, value: string, callback: any): void {
    if (value === "") {
      callback(new Error(i18n.t("personCenter.tip4") as string));
    } else if (value !== this.passwordInfo.newPassword) {
      callback(new Error(i18n.t("personCenter.tip5") as string));
    } else {
      callback();
    }
  }
  checkNewPass(rule: any, value: string, callback: any): void {
    if (value === "") {
      callback(new Error(i18n.t("personCenter.tip6") as string));
    } else {
      if (this.passwordInfo.checkPassword !== "") {
        (this.$refs.passForm as Form).validateField("checkPassword");
      }
      callback();
    }
  }

  submit(): void {
    (this.$refs.passForm as Form).validate((valid: boolean) => {
      if (valid) {
        alert(valid);

        const paramsData = {
          oldPassword: this.passwordInfo.oldPassword,
          newPassword: this.passwordInfo.newPassword,
        };

        service({
          method: "put",
          url: "/dmapi/system/user/profile/updatePwd",
          params: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                type: "success",
                message:i18n.t("personCenter.editSuccess") as string,
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
    (this.$refs.passForm as any).resetFields();
  }
}
</script>
<style lang="scss" scoped></style>
