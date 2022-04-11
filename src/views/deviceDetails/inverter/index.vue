<template>
  <div class="main-wrapper">
    <div class="details-wrapper">
      <div class="box-card">
        <span class="title"><b>基本信息</b></span>
        <basic-info :List="basicData"></basic-info>
      </div>

      <div class="box-card">
        <span class="title"><b>实时数据</b></span>
        <div class="data-box">
          <el-row :gutter="10">
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/sbzt.png" alt=""
                /></i>
                <span>停用</span>
                <label>运行状态</label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/gz.png" alt=""
                /></i>
                <span>xxx</span>
                <label>故障状态</label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dianl.png" alt=""
                /></i>
                <span>20</span>
                <label>总发电量<span>（kwh）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dianl.png" alt=""
                /></i>
                <span>30</span>
                <label>日发电量<span>（kwh）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>50</span>
                <label>直流电流<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>5</span>
                <label>A相电流<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>6</span>
                <label>B相电流<span>（A）</span></label>
              </div>

              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>7</span>
                <label>C相电流<span>（A）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>直流电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>AB线电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>BC线电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>CA线电压<span>（V）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>30</span>
                <label>模块温度<span>（℃）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>35</span>
                <label>变压器温度（℃）</label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>32</span>
                <label>内部温度（℃）</label>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/kw.png" alt=""
                /></i>
                <span>30</span>
                <label>有功功率<span>（kw）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/pl.png" alt=""
                /></i>
                <span>100</span>
                <label>频率<span>（Hz）</span></label>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicInfo from "../components/basicInfo.vue";
interface DataItem {
  label: string;
  value: string;
  iconUrl?: string;
  unitName?: string;
}
@Component({
  components: {
    BasicInfo,
  },
})
export default class InverterDetails extends Vue {
  basicData: DataItem[] = [
    {
      label: "设备地址：",
      value: "1.2",
    },
    {
      label: "类型：",
      value: "1.2",
    },
    {
      label: "固件版本：",
      value: "1.2",
    },
  ];
  dataList: DataItem[] = [
    {
      label: "运行状态",
      value: "停用",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "故障状态",
      value: "离网",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "总发电量",
      value: "30",
      iconUrl: require("@/assets/images/dianl.png"),
      unitName: "kw",
    },
    {
      label: "日发电量",
      value: "30",
      iconUrl: require("@/assets/images/dianl.png"),
      unitName: "kw",
    },
    {
      label: "A相电流",
      value: "30",
      iconUrl: require("@/assets/images/dl.png"),
      unitName: "A",
    },
    {
      label: "B相电流",
      value: "30",
      iconUrl: require("@/assets/images/dl.png"),
      unitName: "A",
    },
    {
      label: "C相电流",
      value: "30",
      iconUrl: require("@/assets/images/dl.png"),
      unitName: "A",
    },
    {
      label: "有功功率",
      value: "90",
      iconUrl: require("@/assets/images/kw.png"),
      unitName: "kw",
    },
    {
      label: "AB线电压",
      value: "30",
      iconUrl: require("@/assets/images/dy.png"),
      unitName: "V",
    },
    {
      label: "BC线电压",
      value: "30",
      iconUrl: require("@/assets/images/dy.png"),
      unitName: "V",
    },
    {
      label: "CA线电压",
      value: "30",
      iconUrl: require("@/assets/images/dy.png"),
      unitName: "V",
    },
    {
      label: "频率",
      value: "30",
      iconUrl: require("@/assets/images/pl.png"),
      unitName: "Hz",
    },
    {
      label: "直流电流",
      value: "30",
      iconUrl: require("@/assets/images/dl.png"),
      unitName: "A",
    },
    {
      label: "直流电压",
      value: "30",
      iconUrl: require("@/assets/images/dy.png"),
      unitName: "V",
    },
    {
      label: "模块温度",
      value: "30",
      iconUrl: require("@/assets/images/wd.png"),
      unitName: "℃",
    },
    {
      label: "变压器温度",
      value: "30",
      iconUrl: require("@/assets/images/wd.png"),
      unitName: "℃",
    },
    {
      label: "内部温度",
      value: "30",
      iconUrl: require("@/assets/images/wd.png"),
      unitName: "℃",
    },
  ];
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
</style>
