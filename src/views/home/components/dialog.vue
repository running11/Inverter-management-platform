<template>
  <div>
    <new-dialog
      width="50%"
      :btns="false"
      :show="isShow"
      :title="title"
      :on-close="closeDialog"
      :on-submit="submitForm">
      <el-steps class="step-wrapper" :active="active">
        <el-step title="基本属性"></el-step>
        <el-step title="其他"></el-step>
      </el-steps>

      <el-form
        v-if="active === 0"
        label-width="145px"
        class="form"
        ref="form"
        :model="basicForm"
        :rules="basicFormRules"
      >
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="basicForm.projectName"
          />
        </el-form-item>
        <el-form-item label="电站名称" prop="plantName">
          <el-input
            placeholder="请输入电站名称"
            v-model="basicForm.plantName"
          />
        </el-form-item>
        <el-form-item label="并网时间" prop="gridConnectionDate">
          <el-date-picker
            v-model="basicForm.gridConnectionDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            placeholder="请输入地址"
            v-model="basicForm.address"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input
            placeholder="请输入联系人"
            v-model="basicForm.contactPerson"
          />
        </el-form-item>
        <el-form-item label="联系方式" prop="contactMethod">
          <el-input placeholder="请输入手机号或座机号或邮箱地址" v-model="basicForm.contactMethod" />
        </el-form-item>
      </el-form>
      <el-form
        v-if="active === 1"
        label-width="145px"
        class="form"
        ref="form"
        :model="otherForm"
        :rules="otherFormRules"
      >
        <el-form-item label="电站图片" prop="plantImage">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img
              v-if="otherForm.plantImage"
              :src="otherForm.plantImage"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-top: -10px;" label="所在地区" prop="region">
          <el-select v-model="otherForm.region" placeholder="">
            <template v-for="(item, index) in countryList">
              <el-option
                :label="item.cn"
                :value="item.cn"
                :key="index"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="经纬度" prop="longitudeAndLatitude">
          <el-input
            placeholder="请输入经纬度"
            v-model="otherForm.longitudeAndLatitude"
          />
        </el-form-item>
        <el-form-item label="电站时区" prop="zone">
          <el-input
            placeholder="请输入电站时区"
            v-model="otherForm.zone"
          />
        </el-form-item>
        <el-form-item label="安全运行开始时间" prop="safeRunDate">
          <el-date-picker
            v-model="otherForm.safeRunDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电站简介" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入电站简介"
            v-model="otherForm.remark"
          />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button class="btn" v-if="active == 1" @click="prev">上一步</el-button>
        <el-button class="btn" v-if="active == 0" @click="next">下一步</el-button>
        <el-button class="btn" type="primary" v-if="active == 1">提交</el-button>
      </div>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import countryJSON from "@/utils/countryList";
import service from "@/utils/request";

// interface IProject {
//   compyId: 0,
//   projectName: string; // 项目名称
//   plantName: string; // 电站名称
//   projectType?: string; // 项目类型
//   address: string; // 地址
//   contactPerson: string; // 联系人
//   contactMethod: string; // 联系方式
//   plantImage: string; // 电站图片
//   region: string; // 国家或地区（存储编码）
//   longitude?: number; // 经度
//   latitude?: number; // 纬度
//   gridConnectionDate: number | string; // 并网时间
//   safeRunDate: string; // 安全运行开始时间
//   status?: string; // 项目状态（0正常 1停用）
//   zone: string; // 时区
//   remark: string; // 备注
// }
@Component({
  components: {
    NewDialog,
  },
})
export default class HomeDialog extends Vue {
  @Prop(String) title!: string;
  active = 0;
  isShow = false;

  basicForm = {
    compyId: 0,
    projectName: "",
    plantName: "",
    gridConnectionDate: "",
    address: "",
    contactPerson: "",
    contactMethod: ""
  };
  otherForm = {
    plantImage: "",
    region: "中国",
    longitudeAndLatitude: "",
    zone: "",
    safeRunDate: "",
    remark: ""
  };
  basicFormRules: any = {
    projectName: [
      { required: true, message: "请输入项目名称", trigger: "blur" },
    ],
    plantName: [
      { required: true, message: "请输入电站名称", trigger: "blur" },
    ],
    gridConnectionDate: [
      { required: true, message: "请选择并网时间", trigger: "blur" },
    ],
    address: [
      { required: false, message: "请输入地址", trigger: "blur" },
    ],
    contactPerson: [
      { required: false, message: "请输入联系人", trigger: "blur" },
    ],
  }
  otherFormRules: any = {
    plantImage: [{ required: false, message: "请选择电站图片", trigger: "blur" }],
    region: [
      { required: false, message: "请选择所在地区", trigger: "blur" },
    ],
    safeRunDate: [
      { required: false, message: "请选择安全运行开始时间", trigger: "blur" },
    ]
  };
  countryList = countryJSON;

  prev(): void{
    --this.active;
    if(this.active < 0) this.active = 0;
  }
  next(): void{
    if(this.active++ > 1) this.active = 0;
  }
  closeDialog(): void {
    this.isShow = false;
    (this.$refs["form"] as any).resetFields();
  }
  showDialog(): void {
    this.isShow = true;
  }
  submitForm(): void {
    (this.$refs["form"] as any).validate((valid: boolean) => {
      console.log(valid);
      if(valid){
        const paramsData = {
          compyId: 0,
          // projectName: this.project.projectName, // 项目名称
          // plantName: this.project.plantName, // 电站名称
          // projectType: "00", // 项目类型
          // address: this.project.address, // 地址
          // contactPerson: this.project.contactPerson, // 联系人
          // contactMethod: this.project.contactMethod, // 联系方式
          // plantImage: this.project.plantImage, // 电站图片
          // region: this.project.region, // 国家或地区（存储编码）
          // longitude: this.project.longitude, // 经度
          // latitude: this.project.latitude, // 纬度
          // gridConnectionDate: this.project.gridConnectionDate, // 并网时间
          // safeRunDate: this.project.safeRunDate, // 安全运行开始时间
          // status: "0", // 项目状态（0正常 1停用）
          // zone: this.project.zone, // 时区
          // remark: this.project.remark // 备注
        };
        service({
          method: "post",
          url: "/api/business/EmsProject",
          data: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              console.log("11", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__body{
  padding: 30px 20px 10px;
}
.step-wrapper{
  padding: 0 60px 10px;
}
.form {
  padding: 10px 120px 0 80px;
  overflow: hidden;
  /deep/ .avatar-uploader .el-upload {
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
}
.btn-box{
  padding-right: 60px;
  text-align: right;
  margin-bottom: 20px;
}
.btn{
  margin-top: 12px;
}
</style>
