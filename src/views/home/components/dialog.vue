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
        ref="basicForm"
        :model="basicForm"
        :rules="basicFormRules"
      >
        <el-form-item label="所属公司" prop="compyName">
          <el-input
            placeholder="请输入项目名称"
            v-model="basicForm.compyName"
            @click.native="changeSelectTree"
            @blur="hideParentClick"
          />
          <el-tree
            v-show="isShowTree"
            id="floatTree"
            class="tree"
            empty-text="暂无数据"
            highlight-current
            :expand-on-click-node="false"
            :props="{label: 'compyName'}"
            :data="companyList"
            @node-click="selectCompany"
          />
        </el-form-item>
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
        ref="otherForm"
        :model="otherForm"
        :rules="otherFormRules"
      >
        <el-form-item label="电站图片" prop="plantImage">
          <file-upload @getImageUrl="getImageUrl"></file-upload>
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
        <el-form-item label="经纬度">
          <el-input
            placeholder="请输入经纬度"
            v-model="computedLngAndLat"
            @focus="innerVisible = true"
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
        <el-button class="btn" type="primary" v-if="active == 1" @click="submitForm">提交</el-button>
      </div>
    </new-dialog>

    <el-dialog
      width="58%"
      title="选择经纬度"
      :visible.sync="innerVisible"
      append-to-body
      :before-close="closeMap">
      <map-test @getLngAndLat="getLngAndLat"></map-test>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMap">取 消</el-button>
        <el-button type="primary" @click="getFinLngAndLat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import countryJSON from "@/utils/countryList";
import service from "@/utils/request";
import moment from 'moment';
import MapTest from "@/components/map/index.vue";
import FileUpload from "@/components/fileUpload/index.vue";

@Component({
  components: {
    NewDialog,
    MapTest,
    FileUpload
  },
})
export default class HomeDialog extends Vue {
  @Prop(String) title!: string;
  innerVisible = false;
  active = 0;
  isShow = false;

  basicForm: any = {
    compyId: "",
    compyName: "",
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
    longitude: 0,
    latitude: 0,
    zone: "",
    safeRunDate: "",
    remark: ""
  };
  lngAndLat: string[] = [];
  basicFormRules: any = {
    compyName: [
      { required: true, message: "请选择所属公司", trigger: "blur" },
    ],
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
  isShowTree = false;
  companyList = [];

  get computedLngAndLat() {
    return this.lngAndLat.toString();
  }

  created(): void{
    this.getCompanyList();
  }

  closeMap(): void{
    this.innerVisible = false;
  }
  getImageUrl(url: string){
    // console.log(url, `父级收到的url`);
    this.otherForm.plantImage = url;
  }
  getLngAndLat(payload: any): void{
    console.log(payload.position, "获取经纬度");
    this.lngAndLat = payload.position;
    this.otherForm.longitude = payload.position[0];
    this.otherForm.latitude = payload.position[1];
  }
  getFinLngAndLat(): void{
    this.innerVisible = false;
  }

  changeSelectTree(): void{
    this.isShowTree = !this.isShowTree;
  }
  hideParentClick(e: any): void{
    var isOther = e.relatedTarget == null || e.relatedTarget.closest("div.el-tree") == null || e.relatedTarget.closest("div.el-tree").id != "floatTree";
    if(isOther){
      this.isShowTree = false;
    }else{
      e.target.focus();
    }
  }
  selectCompany(data:any, Node:any): void{
    this.basicForm.compyId = data.compyId;
    this.basicForm.compyName = data.compyName;
    this.isShowTree = false;
  }
  getCompanyList(): void{
    service({
      method: "get",
      url: "/api/business/EmsCompany/treeList",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = res.data.data || [];
          this.companyList = list;
          // console.log("公司列表", this.companyList);
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
    if(this.$refs["otherForm"]) (this.$refs["otherForm"] as any).resetFields();
  }
  showDialog(): void {
    this.isShow = true;
    this.active = 0; // 打开弹窗，默认选中第一步
  }
  submitForm(): void {
    // 提交
    (this.$refs["otherForm"] as any).validate((valid: boolean) => {
      console.log(valid);
      if(valid){
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
          safeRunDate: this.otherForm.safeRunDate || 0, // 安全运行开始时间
          status: "0", // 项目状态（0正常 1停用） 默认传0
          zone: this.otherForm.zone, // 时区
          remark: this.otherForm.remark // 备注
        };
        service({
          method: "post",
          url: "/api/business/EmsProject",
          data: paramsData,
        })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: "添加成功",
                center: true,
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