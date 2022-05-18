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
        v-if="projectForm"
        :model="projectForm"
        :rules="rules"
      >
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="projectForm.projectName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="projectForm.companyName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电站名称" prop="plantName">
          <el-input
            v-model="projectForm.plantName"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="并网时间" prop="gridConnectionDate">
          <el-date-picker
            v-model="projectForm.gridConnectionDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="projectForm.contacts" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="projectForm.phone" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import { isvalidPhone } from "@/utils/validate";
interface IProject {
  projectName: string;
  companyName: string;
  plantName: string;
  connectionTime: string;
  contacts: string;
  phone: string;
}
@Component({
  components: {
    NewDialog,
  },
})
export default class projectManageDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) currentProject!: IProject;
  isShow = false;
  projectForm: IProject = this.currentProject;
  rules: any = {
    projectName: [{ required: true, message: "请输设备名称", trigger: "blur" }],
    companyName: [
      { required: true, message: "请输入公司名称", trigger: "blur" },
    ],
    plantName: [
      { required: true, message: "请输入电站名称", trigger: "blur" },
    ],
    connectionTime: [
      { required: true, message: "请输入并网时间", trigger: "blur" },
    ],
    contacts: [{ required: true, message: "请输入联系人", trigger: "blur" }],
    phone: [{ required: true, trigger: "blur", validator: this.validPhone }],
  };
  @Watch("currentProject", { immediate: true, deep: true })
  getcurrentProject(newVal: any, oldVal: any) {
    this.projectForm = newVal;
  }
  validPhone(rule: any, value: number, callback: any): void {
    if (!value) {
      return callback(new Error("请输入手机号码"));
    } else if (!isvalidPhone(value)) {
      return callback(new Error("请输入正确的11位手机号码"));
    } else {
      return callback();
    }
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
