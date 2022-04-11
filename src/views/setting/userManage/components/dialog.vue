<template>
  <div>
    <new-dialog
      :show="isShow"
      :title="title"
      :on-close="closeDialog"
      :on-submit="submitForm"
    >
      <el-form
        label-width="100px"
        class="form"
        ref="form"
        v-if="userForm"
        :model="userForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="mail">
          <el-input
            v-model="userForm.mail"
            placeholder="请输入邮件地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="userForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="超级用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司" prop="companyName">
          <el-select
            v-model="userForm.companyName"
            placeholder="请选择公司名称"
          >
            <el-option label="公司1-1" value="1"></el-option>
            <el-option label="公司1-2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="userForm.mail"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="userForm.mail"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
interface user {
  userName: string;
  role: string;
  companyName: string;
  mail: string;
  phone: string;
  status: string;
  [propName: string]: any;
}
@Component({
  components: {
    NewDialog,
  },
})
export default class UserDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) currentUser!: user;
  isShow = false;
  userForm: user = this.currentUser;
  rules: any = {
    userName: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
    mail: [{ required: true, message: "请输入角色", trigger: "blur" }],
    phone: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
  };
  @Watch("currentUser", { immediate: true, deep: true })
  getCurrentUser(newVal: any, oldVal: any) {
    this.userForm = newVal;
  }
  closeDialog(): void {
    this.isShow = false;
    (this.$refs["form"] as any).resetFields();
  }
  showDialog(): void {
    this.isShow = true;
  }
  submitForm(): void {
    (this.$refs["form"] as any).validate((valid: any) => {
      console.log(valid);
    });
  }
}
</script>
<style lang="scss" scoped>
.form {
  padding-right: 30px;
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>
