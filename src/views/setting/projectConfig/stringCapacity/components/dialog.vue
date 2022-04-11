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
        v-if="dataForm"
        :model="dataForm"
        :rules="rules"
      >
        <el-form-item label="组串数" prop="amount">
          <el-input
            v-model="dataForm.number"
            :disabled="true"
            placeholder="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="Pv1容量" prop="sizePv1">
          <el-input v-model="dataForm.sizePv1">
            <template slot="append">Wp</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Pv2容量" prop="sizePv2">
          <el-input v-model="dataForm.sizePv2">
            <template slot="append">Wp</template>
          </el-input>
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
@Component({
  components: {
    NewDialog,
  },
})
export default class SetDialog extends Vue {
  @Prop(String) title!: string;
  isShow = false;
  dataForm = {
    // amount: 2,
    sizePv1: 0,
    sizePv2: 1.5,
  };
  rules: any = {
    // amount: [{ required: true, message: "请输入用户名称", trigger: "blur"}],
    sizePv1: [{ required: true, message: "请输入组串容量", trigger: "blur" }],
    sizePv2: [{ required: true, message: "请输入组串容量", trigger: "blur" }],
  };

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
