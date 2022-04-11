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
        v-if="company"
        :model="company"
        :rules="rules"
      >
        <el-form-item label="公司名称" prop="companyName">
          <el-input
            v-model="company.companyName"
            placeholder="请输入公司名称"
          />
        </el-form-item>
        <el-form-item label="公司地址" prop="companyAddress">
          <el-input
            v-model="company.companyAddress"
            placeholder="请输入公司地址"
          />
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input
            v-model="company.phoneNumber"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <el-form-item label="公司描述" prop="companyDesc">
          <el-input
            type="textarea"
            :rows="3"
            v-model="company.companyDesc"
            placeholder="请输入公司描述"
          />
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";

interface ICompany {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  companyDesc: string;
  [propName: string]: any;
}

@Component({
  components: {
    NewDialog,
  },
})
export default class CompanyDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) currentCompany!: ICompany;
  isShow = false;
  company: ICompany = this.currentCompany;

  rules: any = {
    companyName: [
      { required: true, message: "请输入公司名称", trigger: "blur" },
    ],
    companyAddress: [
      { required: true, message: "请输入公司地址", trigger: "blur" },
    ],
    phoneNumber: [
      { required: true, message: "请输入联系方式", trigger: "blur" },
    ],
  };

  @Watch("currentCompany", { immediate: true, deep: true })
  getCurrentCompany(newVal: any, oldVal: any) {
    this.company = newVal;
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
