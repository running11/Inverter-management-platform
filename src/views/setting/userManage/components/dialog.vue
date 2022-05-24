<template>
  <!-- 用户导入对话框 -->
  <new-dialog
     width="460px"
    :show="upload.open"
    :title="upload.title"
    :on-close="closeDialog"
    :on-submit="submitFileForm"
  >
    <el-upload
        name="file"
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
    
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">{{$t("userManage.tipUpload")}}<em>{{$t("userManage.upload")}}</em></div>
      <div class="el-upload__tip text-center" slot="tip">
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />
          {{$t("userManage.isUpdate")}}
        </div>
        <span>{{$t("userManage.fileFormat")}}</span>
        <el-link
          type="primary"
          :underline="false"
          style="font-size: 12px; vertical-align: baseline"
          @click="importTemplate"
          >{{$t("userManage.downloadTemplate")}}</el-link
        >
      </div>
    </el-upload>
    <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div> -->
  </new-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import { getToken } from "@/utils/auth";
import { download } from "@/api/user/user";
import i18n from "@/language";
@Component({
  components: {
    NewDialog,
  },
})
export default class UserDialog extends Vue {
  // 用户导入参数
  upload = {
    // 是否显示弹出层（用户导入）
    open: false,
    // 弹出层标题（用户导入）
    title: i18n.t('userManage.userImport'),
    // 是否禁用上传
    isUploading: false,
    // 是否更新已经存在的用户数据
    updateSupport: 0,
    // 设置上传的请求头部
    headers: { Authorization: "Bearer " + getToken() },
    // 上传的地址 
    url: "/dmapi/system/user/importData",
  };
  /** 导入按钮操作 */
  handleImport() {
    this.upload.open = true;
  }
  /** 下载模板操作 */
  importTemplate() {
    download("/system/user/importTemplate");
  }
  // 文件上传中处理
  handleFileUploadProgress() {
    this.upload.isUploading = true;
  }
  // 文件上传成功处理
  handleFileSuccess(response: any) {
    this.upload.open = false;
    this.upload.isUploading = false;
    (this.$refs.upload as any).clearFiles();
    this.$alert(response.msg, "", { dangerouslyUseHTMLString: true });
    this.$emit("fetchData");
  }
  // 提交上传文件
  submitFileForm() {
    (this.$refs.upload as any).submit();
  }
  showDialog() {
    this.upload.open = true;
  }
  closeDialog() {
    this.upload.open = false;
  }
 
}
</script>
<style lang="scss" scoped>
</style>
