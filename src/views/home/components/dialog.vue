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
        <el-step :title="$t('projectManage.basicProperty')"></el-step>
        <el-step :title="$t('projectManage.other')"></el-step>
      </el-steps>

      <el-form
        v-if="active === 0 && basicForm"
        label-width="145px"
        class="form"
        ref="basicForm"
        :model="basicForm"
        :rules="basicFormRules"
      >
        <el-form-item :label="$t('projectManage.companyName')" prop="compyId">
          <treeselect
            v-model="basicForm.compyId"
            :options="companyList"
            :normalizer="normalizer"
            :show-count="true"
            :placeholder="$t('projectManage.pleaseSelectCompany')"
            @input="changeCompyId"
            @close="changeCompyId"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.projectName')" prop="projectName">
          <el-input
            :placeholder="$t('projectManage.pleaseEnterProjectName')"
            v-model="basicForm.projectName"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.plantName')" prop="plantName">
          <el-input
            :placeholder="$t('projectManage.pleaseEnterPlantName')"
            v-model="basicForm.plantName"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.gridConnectionDate')" prop="gridConnectionDate">
          <el-date-picker
            v-model="basicForm.gridConnectionDate"
            type="date"
            :placeholder="$t('projectManage.pleaseSelectGridConnectionDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('projectManage.address')" prop="address">
          <el-input
            :placeholder="$t('projectManage.pleaseEnterAddress')"
            v-model="basicForm.address"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.contactPerson')" prop="contactPerson">
          <el-input
            :placeholder="$t('projectManage.pleaseEnterContactPerson')"
            v-model="basicForm.contactPerson"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.contactMethod')" prop="contactMethod">
          <el-input :placeholder="$t('projectManage.pleaseEnterContactMethod')" v-model="basicForm.contactMethod" />
        </el-form-item>
      </el-form>

      <el-form
        v-if="active === 1 && otherForm"
        label-width="145px"
        class="form"
        ref="otherForm"
        :model="otherForm"
        :rules="otherFormRules"
      >
        <el-form-item :label="$t('projectManage.plantImage')" prop="plantImage">
          <file-upload ref="fileUpload" :url="otherForm.plantImage" @getImageUrl="getImageUrl"></file-upload>
        </el-form-item>
        <el-form-item style="margin-top: -10px;" :label="$t('projectManage.region')" prop="region">
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
        <el-form-item :label="$t('projectManage.lngAndLat')">
          <el-input
            :placeholder="$t('projectManage.pleaseSelectLngAndLat')"
            v-model="computedLngAndLat"
            @focus="openMapDialog"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.zone')" prop="zone">
          <el-input
            :placeholder="$t('projectManage.pleaseEnterZone')"
            v-model="otherForm.zone"
          />
        </el-form-item>
        <el-form-item :label="$t('projectManage.safeRunDate')" prop="safeRunDate">
          <el-date-picker
            v-model="otherForm.safeRunDate"
            type="date"
            :placeholder="$t('projectManage.pleaseEnterSafeRunDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('projectManage.remark')" prop="remark">
          <el-input
            type="textarea"
            :rows="3"
            :placeholder="$t('projectManage.pleaseEnterRemark')"
            v-model="otherForm.remark"
          />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button class="btn" v-if="active == 1" @click="prev">{{$t("projectManage.prev")}}</el-button>
        <el-button class="btn" v-if="active == 0" @click="next">{{$t("projectManage.next")}}</el-button>
        <el-button class="btn" type="primary" v-if="active == 1" @click="submitForm">{{$t("projectManage.submit")}}</el-button>
      </div>
    </new-dialog>

    <el-dialog
      v-if="mapDialog"
      width="58%"
      :title="$t('projectManage.selectLngAndLat')"
      :visible.sync="innerVisible"
      append-to-body
      :before-close="closeMap">
      <map-test :lngandLat="lngAndLat" @getLngAndLat="getLngAndLat"></map-test>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMap">{{$t("common.cancelButtonText")}}</el-button>
        <el-button type="primary" @click="getFinLngAndLat">{{$t("common.confirmButtonText")}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import countryJSON from "@/utils/countryList";
import service from "@/utils/request";
import moment from 'moment';
import MapTest from "@/components/map/index.vue";
import FileUpload from "@/components/fileUpload/index.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import i18n from "@/language";

@Component({
  components: {
    Treeselect,
    NewDialog,
    MapTest,
    FileUpload
  },
})
export default class HomeDialog extends Vue {
  @Prop(String) title!: string;
  @Prop(Object) currentProject!: any;
  innerVisible = false;
  mapDialog = false;
  active = 0;
  isShow = false;

  basicForm: any = {
    compyId: undefined,
    compyName: this.currentProject.compyName,
    projectName: this.currentProject.projectName,
    plantName: this.currentProject.plantName,
    gridConnectionDate: this.currentProject.gridConnectionDate,
    address: this.currentProject.address,
    contactPerson: this.currentProject.contactPerson,
    contactMethod: this.currentProject.contactMethod,
  };
  otherForm = {
    plantImage: this.currentProject.plantImage,
    region: this.currentProject.region,
    longitude: this.currentProject.longitude,
    latitude: this.currentProject.latitude,
    zone: this.currentProject.zone,
    safeRunDate: this.currentProject.safeRunDate,
    remark: this.currentProject.remark
  };
  lngAndLat: string[] = [];
  basicFormRules: any = {
    compyId: [
      { required: true, message: i18n.t(`projectManage.pleaseSelectCompany`), trigger: "input" },
    ],
    projectName: [
      { required: true, message: i18n.t(`projectManage.pleaseEnterProjectName`), trigger: "blur" },
    ],
    plantName: [
      { required: true, message: i18n.t(`projectManage.pleaseEnterPlantName`), trigger: "blur" },
    ],
    gridConnectionDate: [
      { required: true, message: i18n.t(`projectManage.pleaseSelectGridConnectionDate`), trigger: "blur" },
    ],
    address: [
      { required: false, message: i18n.t(`projectManage.pleaseEnterAddress`), trigger: "blur" },
    ],
    contactPerson: [
      { required: false, message: i18n.t(`projectManage.pleaseEnterContactPerson`), trigger: "blur" },
    ],
  }
  otherFormRules: any = {
    region: [
      { required: false, message: i18n.t(`projectManage.pleaseSelectRegion`), trigger: "blur" },
    ],
    safeRunDate: [
      { required: false, message: i18n.t(`projectManage.pleaseEnterSafeRunDate`), trigger: "blur" },
    ]
  };
  countryList = countryJSON;
  companyList = [];

  get computedLngAndLat() {
    return this.lngAndLat.toString();
  }

  @Watch("currentProject", { immediate: true, deep: true })
  getCurrentDProject(newVal: any, oldVal: any) {
    // console.log(newVal, oldVal, `nnnnn`);
    if(newVal){
      this.basicForm.compyId = newVal.compyId;
      this.basicForm.compyName = newVal.compyName;
      this.basicForm.projectName = newVal.projectName;
      this.basicForm.plantName = newVal.plantName;
      this.basicForm.gridConnectionDate = newVal.gridConnectionDate;
      this.basicForm.address = newVal.address;
      this.basicForm.contactPerson = newVal.contactPerson;
      this.basicForm.contactMethod = newVal.contactMethod;
      this.otherForm.plantImage = newVal.plantImage;
      this.otherForm.region = newVal.region;
      this.otherForm.longitude = newVal.longitude;
      this.otherForm.latitude = newVal.latitude;
      this.otherForm.zone = newVal.zone;
      this.otherForm.safeRunDate = newVal.safeRunDate;
      this.otherForm.remark = newVal.remark;
      if (newVal.longitude && newVal.latitude) { // 经纬度
        this.lngAndLat = [newVal.longitude, newVal.latitude];
      }
    }
  }

  created(): void{
    this.getCompanyList();
  }

  /** 转换菜单数据结构 */
  normalizer(node: any) {
    if (node.children && !node.children.length) {
      delete node.children;
    }
    return {
      id: node.compyId,
      label: node.compyName,
      children: node.children,
    };
  }

  // Treeselect 触发校验
  changeCompyId(): void{
    this.$nextTick(() => {
      (this.$refs["basicForm"] as any).validateField("compyId");
    })
  }
  closeMap(): void{
    this.innerVisible = false;
    this.mapDialog = false;
  }
  openMapDialog(): void {
    this.innerVisible = true;
    this.mapDialog = true;
  }
  getImageUrl(url: string){
    // console.log(url, `父级收到的url`);
    this.otherForm.plantImage = url;
  }
  getLngAndLat(payload: any): void{
    // console.log(payload.position, "获取经纬度");
    this.lngAndLat = payload.position;
    this.otherForm.longitude = payload.position[0];
    this.otherForm.latitude = payload.position[1];
  }
  getFinLngAndLat(): void{
    this.innerVisible = false;
    this.mapDialog = false;
  }

  getCompanyList(): void{
    service({
      method: "get",
      url: "/dmapi/business/EmsCompany/treeList",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = res.data.data || [];
          this.companyList = list;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  prev(): void{
    --this.active;
    if(this.active < 0) this.active = 0;
  }
  next(): void{
    (this.$refs["basicForm"] as any).validate((valid: boolean) => {
      if(valid){
        if(this.active++ > 1) this.active = 0;
      }
    })
  }
  closeDialog(): void {
    this.isShow = false;
    if(this.$refs["basicForm"]) (this.$refs["basicForm"] as any).resetFields();
    // console.log(this.$refs["otherForm"], `this.$refs["otherForm"]`);
    if(this.$refs["otherForm"]) {
      (this.$refs["fileUpload"] as any).resetUpload();
      this.otherForm.plantImage = "";
      this.otherForm.region = "";
      this.otherForm.zone = "";
      this.otherForm.safeRunDate = "";
      this.otherForm.remark = "";
      this.otherForm.longitude = 0;
      this.otherForm.latitude = 0;
      this.lngAndLat = [];
      this.$nextTick(() => {
        (this.$refs["otherForm"] as any).clearValidate();
        // (this.$refs["otherForm"] as any).resetFields(["region", "safeRunDate"]);
      });
    };
  }
  showDialog(): void {
    this.isShow = true;
    this.active = 0; // 打开弹窗，默认选中第一步
  }
  submitForm(): void {
    // 提交
    (this.$refs["otherForm"] as any).validate((valid: boolean) => {
      if(valid){
        if(this.currentProject.projectId != undefined){
          const paramsData = {
            compyId: this.basicForm.compyId, // 公司id 所属公司
            projectName: this.basicForm.projectName, // 项目名称
            plantName: this.basicForm.plantName, // 电站名称
            projectType: this.currentProject.projectType, // 项目类型 默认传"00"
            gridConnectionDate: moment(this.basicForm.gridConnectionDate).valueOf(), // 并网时间
            address: this.basicForm.address, // 地址
            contactPerson: this.basicForm.contactPerson, // 联系人
            contactMethod: this.basicForm.contactMethod, // 联系方式
            plantImage: this.otherForm.plantImage, // 电站图片
            region: this.otherForm.region, // 国家或地区（存储编码）
            longitude: this.otherForm.longitude, // 经度
            latitude: this.otherForm.latitude, // 纬度
            safeRunDate: moment(this.otherForm.safeRunDate).valueOf() || 0, // 安全运行开始时间
            status: this.currentProject.status, // 项目状态（0正常 1停用） 默认传0
            zone: this.otherForm.zone || "", // 时区
            remark: this.otherForm.remark || "" // 备注
          };
          console.log(this.currentProject, paramsData);
          service({
            method: "put",
            url: "/dmapi/business/EmsProject",
            data: paramsData,
          })
            .then((res) => {
              if (res && res.data.code === 200) {
                this.$message({
                  message: i18n.t(`common.editSuccess`) as string,
                  type: "success"
                });
                this.isShow = false;
                this.$emit("fetchData");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }else{
          const paramsData = {
            compyId: this.basicForm.compyId, // 公司id 所属公司
            projectName: this.basicForm.projectName, // 项目名称
            plantName: this.basicForm.plantName, // 电站名称
            gridConnectionDate: moment(this.basicForm.gridConnectionDate).valueOf(), // 并网时间
            projectType: "00", // 项目类型 默认传"00"
            address: this.basicForm.address, // 地址
            contactPerson: this.basicForm.contactPerson, // 联系人
            contactMethod: this.basicForm.contactMethod, // 联系方式
            plantImage: this.otherForm.plantImage, // 电站图片
            region: this.otherForm.region, // 国家或地区（存储编码）
            longitude: this.otherForm.longitude, // 经度
            latitude: this.otherForm.latitude, // 纬度
            safeRunDate: moment(this.otherForm.safeRunDate).valueOf() || 0, // 安全运行开始时间
            status: "0", // 项目状态（0正常 1停用） 默认传0
            zone: this.otherForm.zone, // 时区
            remark: this.otherForm.remark // 备注
          };
          service({
            method: "post",
            url: "/dmapi/business/EmsProject",
            data: paramsData,
          })
            .then((res) => {
              if (res && res.data.code === 200) {
                this.$message({
                  message: i18n.t(`common.addSuccess`) as string,
                  type: "success"
                });
                this.isShow = false;
                this.$emit("fetchData");
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
::v-deep.el-dialog__body{
  padding: 30px 20px 10px;
}
.step-wrapper{
  padding: 0 60px 10px;
}
.form {
  padding: 10px 120px 0 80px;
  overflow: hidden;
}
.btn-box{
  padding-right: 60px;
  text-align: right;
  margin-bottom: 20px;
}
.btn{
  margin-top: 12px;
}
.tree{
  position: absolute;
  overflow: auto;
  z-index: 100;
  width: 100%;
  padding-bottom: 15px;
  // height: 200px;
  border-radius: 1px;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  line-height: normal; 
  z-index: 204;
}
</style>