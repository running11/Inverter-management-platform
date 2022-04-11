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
      >
        <el-form-item
          label="当前密码"
          prop="nowPassword"
          :rules="{
            required: true,
            message: '当前密码不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="passwordInfo.nowPassword"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
          :rules="{
            validator: checkNewPass,
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="passwordInfo.newPassword"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPassword"
          :rules="{
            validator: againCheckPass,
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="passwordInfo.checkPassword"
            clearable
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
@Component
export default class changePassword extends Vue {
  labelPosition = "top";
  isHide = true;
  passwordInfo = {
    nowPassword: "",
    newPassword: "",
    checkPassword: "",
  };
  checkNewPass(rule: any, value: string, callback: any): void {
    if (value === "") {
      callback(new Error("请输入新密码"));
    } else {
      if (this.passwordInfo.checkPassword !== "") {
        (this.$refs.passForm as Form).validateField("checkPassword");
      }
      callback();
    }
  }
  againCheckPass(rule: any, value: string, callback: any): void {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.passwordInfo.newPassword) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  }

  submit(): void {
    (this.$refs.passForm as Form).validate((valid: boolean) => {
      if (valid) {
        alert(valid);
      } else {
        alert("error submit!!");
        return false;
      }
    });
  }
  resetForm(): void {
    (this.$refs.passForm as any).resetFields();
  }
}
</script>
<style lang="scss" scoped></style>
