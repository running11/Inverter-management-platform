<template>
  <div>
		<el-upload
			class="avatar-uploader"
			action=""
			:before-upload="handleBeforeUpload"
			:http-request="handleHttpRequest"
			:show-file-list="false"
		>
			<img
				v-if="imageUrl"
				:src="imageUrl"
				class="avatar"
			/>
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import service from "@/utils/request";
import myMessage from '@/utils/myMessage';

@Component({
  components: {},
})
export default class FileUpload extends Vue {
	imageUrl = "";
	fileType:string[] = ['png', 'jpg', 'jpeg'];
	fileSize = 5;
	// 上传前校检格式和大小
	handleBeforeUpload(file: any) {
		// 校检文件类型
		if (this.fileType && this.fileType.length > 0) {
			let fileExtension = "";
			if (file.name.lastIndexOf(".") > -1) {
				fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
			}
			const isTypeOk = this.fileType.some((type) => {
				if (file.type.indexOf(type) > -1) return true;
				if (fileExtension && fileExtension.indexOf(type) > -1) return true;
				return false;
			});
			if (!isTypeOk) {
				myMessage.error({
					msg: `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
				});
				return false;
			}
		}
		// 校检文件大小
		if (this.fileSize) {
			const isLt = file.size / 1024 / 1024 < this.fileSize;
			if (!isLt) {
				myMessage.error({
					msg: `上传文件大小不能超过 ${this.fileSize} MB!`
				});
				return false;
			}
		}
		return true;
	}
	@Emit("getImageUrl")
	async handleHttpRequest(a: any){
    let formData = new FormData();
    formData.append("file", a.file);
    formData.append("fileName", a.file.name);
    formData.append("fileDir", "stations");
    formData.append("uploadType", "2");
    let res: any = await service({
      method: "post",
      url: "/api/Common/UploadFile",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
		if (res && res.data.code === 200) {
			myMessage.success({
				message: "添加成功",
				center: true,
				type: "success"
			});
			this.imageUrl = res.data.data.url;
			return res.data.data.url;
		}
  }
}
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
	border: 1px solid #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}
</style>
