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
      >
        <el-form-item
          label="用户名称"
          prop="name"
          :rules="{
            required: true,
            message: '用户名称不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="userInfo.name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="邮件地址"
          prop="mailAddress"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="userInfo.mailAddress" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码"
          prop="phone"
          :rules="[
            {
              required: true,
              trigger: 'blur',
              validator: validPhone,
            },
          ]"
        >
          <el-input v-model.number="userInfo.phone" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="角色"
          prop="role"
          :rules="{
            required: true,
            message: '请输入角色',
            trigger: 'blur',
          }"
        >
          <el-input v-model="userInfo.role" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" :offset="3">
      <div class="rightbox">
        <span>头像</span>
        <div class="imgbox">
          <img src="@/assets/images/icon_electricity.png" alt="头像" />
        </div>
      </div>
      <!-- <div> -->

      <el-upload action="">
        <el-button size="small" icon="el-icon-upload2">更换头像</el-button>
      </el-upload>
      <!-- </div> -->
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form } from "element-ui";
import { isvalidPhone } from "@/utils/validate";
interface user {
  name: string;
  mailAddress: string;
  phone: string;
  role: string;
}

@Component
export default class basicInformation extends Vue {
  labelPosition = "top";
  isHide = true;
  userInfo: user = {
    name: "",
    mailAddress: "",
    phone: "",
    role: "",
  };
  mounted(): void {
    this.$nextTick(() => {
      this.userInfo.name = "张三";
      this.userInfo.mailAddress = "zhangsan@ddd.com";
      this.userInfo.phone = "13345645654";
      this.userInfo.role = "普通用户";
    });
  }
  validPhone(rule: any, value: number, callback: any): void {
    if (!value) {
      callback(new Error("请输入手机号码"));
    } else if (!isvalidPhone(value)) {
      callback(new Error("请输入正确的11位手机号码"));
    } else {
      callback();
    }
  }

  submit(): void {
    (this.$refs.userFrom as Form).validate((valid: boolean) => {
      if (valid) {
        alert(valid);
      } else {
        alert("error submit!!");
        return false;
      }
    });
  }
  resetForm(): void {
    (this.$refs.userFrom as Form).resetFields();
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
    border-radius: 100px;
    overflow: hidden;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
