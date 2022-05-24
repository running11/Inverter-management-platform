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
        <el-form-item :label="$t('companyManage.companyName')" prop="compyName">
          <el-input
            v-model="company.compyName"
            :placeholder="$t('companyManage.pleaseEnterCompanyName')"
          />
        </el-form-item>
        <el-form-item :label="$t('companyManage.companyAddress')" prop="address">
          <el-input
            v-model="company.address"
            :placeholder="$t('companyManage.pleaseEnterCompanyAddress')"
          />
        </el-form-item>
        <el-form-item :label="$t('companyManage.contactPerson')" prop="contactPerson">
          <el-input
            v-model="company.contactPerson"
            :placeholder="$t('companyManage.pleaseEnterContactPerson')"
          />
        </el-form-item>
        <el-form-item :label="$t('companyManage.contactMethod')" prop="contactMethod">
          <el-input
            v-model="company.contactMethod"
            :placeholder="$t('companyManage.pleaseEnterContactMethod')"
          />
        </el-form-item>
        <el-form-item :label="$t('companyManage.companyDescription')" prop="compyDescription">
          <el-input
            type="textarea"
            :rows="3"
            v-model="company.compyDescription"
            :placeholder="$t('companyManage.pleaseEnterCompanyDescription')"
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
import i18n from "@/language";

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
      { required: true, message: i18n.t(`companyManage.pleaseEnterCompanyName`), trigger: "blur" },
    ],
    address: [
      { required: true, message: i18n.t(`companyManage.pleaseEnterCompanyAddress`), trigger: "blur" },
    ],
    contactPerson: [
      { required: false, message: i18n.t(`companyManage.pleaseEnterContactPerson`), trigger: "blur" },
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
      if(valid){
        if(this.currentCompany.compyId != undefined){
          // console.log("修改");
          service({
            method: "put",
            url: "/dmapi/business/EmsCompany",
            data: this.currentCompany,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: i18n.t(`common.editSuccess`) as string,
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
          // console.log("新增");
          service({
            method: "post",
            url: "/dmapi/business/EmsCompany",
            data: this.currentCompany,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: i18n.t(`common.addSuccess`) as string,
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
