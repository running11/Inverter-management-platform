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
        <el-form-item label="公司名称" prop="compyName">
          <el-input
            v-model="company.compyName"
            placeholder="请输入公司名称"
          />
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input
            v-model="company.address"
            placeholder="请输入公司地址"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input
            v-model="company.contactPerson"
            placeholder="请输入联系人"
          />
        </el-form-item>
        <el-form-item label="联系方式" prop="contactMethod">
          <el-input
            v-model="company.contactMethod"
            placeholder="请输入手机号或座机号或邮箱地址"
          />
        </el-form-item>
        <el-form-item label="公司描述" prop="compyDescription">
          <el-input
            type="textarea"
            :rows="3"
            v-model="company.compyDescription"
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
import service from "@/utils/request";

interface ICompany {
  companyName: string;
  address: string;
  contactPerson: string;
  contactMethod: string;
  compyDescription: string;
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
    compyName: [
      { required: true, message: "请输入公司名称", trigger: "blur" },
    ],
    address: [
      { required: true, message: "请输入公司地址", trigger: "blur" },
    ],
    contactPerson: [
      { required: false, message: "请输入联系人", trigger: "blur" },
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
      if(valid){
        if(this.currentCompany.compyId != undefined){
          console.log("修改");
          service({
            method: "put",
            url: "/api/business/EmsCompany",
            data: this.currentCompany,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.isShow = false;
              this.$emit("fetchData");
            }else{
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }else{
          console.log("新增");
          service({
            method: "post",
            url: "/api/business/EmsCompany",
            data: this.currentCompany,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.isShow = false;
              this.$emit("fetchData");
            }else{
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      }
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
