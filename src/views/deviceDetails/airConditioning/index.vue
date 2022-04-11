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
            <el-col :span="12">
              <div class="text">温度</div>
              <meter-chart
                :val="temperature"
                chartName="温度（℃）"
                chartUnit="℃"
              ></meter-chart>
            </el-col>
            <el-col :span="12">
              <div class="text">湿度</div>
              <meter-chart
                :val="humidity"
                chartName="湿度（%）"
                chartUnit="%"
              ></meter-chart>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import meterChart from "@/components/meterChart/index.vue";
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
    meterChart,
  },
})
export default class airConditionDetails extends Vue {
  basicData: DataItem[] = [
    {
      label: "设备地址：",
      value: "1.2",
    },
    {
      label: "固件版本：",
      value: "1.2",
    },
  ];
  temperature = 30;
  humidity = 55;
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
.text {
  color: $gray;
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
