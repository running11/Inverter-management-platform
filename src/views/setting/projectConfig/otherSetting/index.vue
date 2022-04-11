<template>
  <div class="project-config-wrapper">
    <div class="details-wrapper">
      <el-row :gutter="12">
        <el-col :span="10">
          <el-form
            label-position="right"
            label-width="150px"
            :model="formData"
            :rules="rules"
          >
            <el-form-item label="电站图片">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img
                  v-if="formData.imageUrl"
                  :src="formData.imageUrl"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="所在地区" prop="country">
              <el-select v-model="formData.country" placeholder="">
                <template v-for="(item, index) in countryList">
                  <el-option
                    :label="item.cn"
                    :value="item.cn"
                    :key="index"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>

            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="经纬度" prop="longitudeLatitude">
              <el-input v-model="formData.longitudeLatitude"></el-input>
            </el-form-item>
            <el-form-item label="安全运行开始时间">
              <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="安全运行结束时间">
              <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="电站简介">
              <el-input v-model="formData.introduction"></el-input>
            </el-form-item>
            <el-form-item label="电站时区" prop="timeZone">
              <el-select v-model="formData.timeZone" placeholder="">
                <template v-for="(item, index) in timeZoneList">
                  <el-option
                    :label="item"
                    :value="item"
                    :key="index"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="14">
          <!-- <my-map></my-map> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import myMap from "./components/map.vue"
import countryJSON from "@/utils/countryList";
@Component({
  components: {
    // myMap
  },
})
export default class otherSetting extends Vue {
  formData = {
    imgUrl: "",
    country: "中国",
    address: "",
    longitudeLatitude: "",
    startTime: "",
    introduction: "",
    timeZone: "",
  };
  rules: any = {
    country: [{ required: true, message: "请输入地区", trigger: "blur" }],
    address: [{ required: true, message: "请输入地址", trigger: "blur" }],
    longitudeLatitude: [
      { required: true, message: "请输入经纬度", trigger: "blur" },
    ],
    timeZone: [{ required: true, message: "请输入时区", trigger: "blur" }],
  };
  timeZoneList = ["(UTC+08:00)北京", "(UTC+08:00)台北"];
  countryList = countryJSON;
  // mounted(){
  //   console.log()
  // }
  handleChange(value: string) {
    console.log(value);
  }
}
</script>
<style lang="scss" scoped>
.project-config-wrapper {
  padding: 20px 0;
  .details-wrapper {
    background: $white;
    padding: 40px 20px;
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
}
</style>
