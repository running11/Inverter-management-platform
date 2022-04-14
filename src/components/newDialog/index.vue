<template>
  <el-dialog
    :width="width"
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :before-close="close"
  >
    <slot />
    <span v-if="btns" slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class NewDialog extends Vue {
  /**
   * dialog按钮 默认显示
   */
  @Prop({ type: Boolean, required: false, default: true })
  btns?: any;
  /**
   * dialog宽度
   */
  @Prop({ type: String, required: false, default: "28%" })
  width?: "";
  /**
   * 标题
   */
  @Prop({ type: String, required: true })
  title!: "";
  /**
   * 显示对话框
   */
  @Prop({ type: Boolean, required: false, default: false })
  show?: false;
  /**
   * 点击确认的时候调用
   */
  @Prop({ required: false, default: () => ({}) })
  onSubmit?: any;
  /**
   * 关闭对话框调用
   */
  @Prop({ required: false, default: () => ({}) })
  onClose?: any;

  dialogVisible = false;

  @Watch("show", { immediate: true, deep: true })
  getShow(newVal: boolean, oldVal: boolean) {
    this.dialogVisible = newVal;
  }

  close(): void {
    this.onClose();
  }
  submit() {
    this.onSubmit();
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-dialog {
  width: 28%;
}
::v-deep.el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
</style>
