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
        v-if="deviceForm"
        :model="deviceForm"
        :rules="rules"
      >
        <el-form-item label="SN号" prop="snNumber">
          <el-input v-model="deviceForm.snNumber" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceType">
          <el-input v-model="deviceForm.deviceType" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="deviceModel">
          <el-input v-model="deviceForm.deviceModel" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
interface IDevice {
  snNumber: string;
  deviceType: string;
  deviceModel: string;
}
@Component({
  components: {
    NewDialog,
  },
})
export default class accessEquipmentDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) currentDevice!: IDevice;
  isShow = false;
  deviceForm: IDevice = this.currentDevice;
  rules: any = {
    snNumber: [{ required: true, message: "请输入SN号", trigger: "blur" }],
    deviceType: [
      { required: true, message: "请输入设备类型", trigger: "blur" },
    ],
    deviceModel: [
      { required: true, message: "请输入设备型号", trigger: "blur" },
    ],
  };
  @Watch("currentDevice", { immediate: true, deep: true })
  getCurrentDevice(newVal: any, oldVal: any) {
    this.deviceForm = newVal;
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
