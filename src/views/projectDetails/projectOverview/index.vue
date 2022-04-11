<template>
  <div class="project-overview-wrapper">
    <el-row class="top-wrapper">
      <div class="title">基本情况</div>
      <div class="content">
        <div class="img-box">
          <img src="@/assets/images/icon_electricity.png" alt="电站" />
        </div>
        <div class="list">
          <div class="item">
            <label>项目名称：</label>
            <span>松江储能系统</span>
          </div>
          <div class="item">
            <label>项目地址：</label>
            <span>上海市松江区思贤路xxx号</span>
          </div>
          <div class="item">
            <label>实时状态：</label>
            <span>在线</span>
          </div>
          <div class="item">
            <label>投动时间：</label>
            <span>2020-11-20</span>
          </div>
          <div class="item">
            <label>经纬度：</label>
            <span></span>
          </div>
          <div class="item">
            <label>时区：</label>
            <span>东八区</span>
          </div>
          <div class="item">
            <label>光伏装机容量(kW)：</label>
            <span>1111</span>
          </div>
          <div class="item">
            <label>储能装机容量(kW)：</label>
            <span>1111</span>
          </div>
          <div class="item">
            <label>储能装机能量(kWh)：</label>
            <span>21222</span>
          </div>
        </div>
      </div>
    </el-row>
    <el-row class="middle-wrapper common">
      <el-col :span="6">
        <div class="grid">
          <div class="title">运行策略</div>
          <div class="operation-list">
            <div class="item">并网运行：在线</div>
            <div class="item">离网运行：在线</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid">
          <div class="title">电量</div>
          <div class="electric-list">
            <div class="item">
              <img src="@/assets/images/icon_electricity.png" alt="电站" />
              <label>累计发电量</label>
            </div>
            <div class="item">
              <img src="@/assets/images/icon_electricity.png" alt="电站" />
              <label>累计发电量</label>
            </div>
            <div class="item">
              <img src="@/assets/images/icon_electricity.png" alt="电站" />
              <label>累计发电量</label>
            </div>
            <div class="item">
              <img src="@/assets/images/icon_electricity.png" alt="电站" />
              <label>累计发电量</label>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid">
          <div class="title">实时报警</div>
          <pie-chart
            :colors="alarmColors"
            :legendData="alarmLegendData"
            :seriesData="alarmSeriesData"
          >
          </pie-chart>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid">
          <div class="title">设备状态</div>
          <pie-chart
            :legendData="deviceLegendData"
            :seriesData="deviceSeriesData"
          >
          </pie-chart>
        </div>
      </el-col>
    </el-row>
    <div class="bottom-wrapper common">
      <el-col :span="12">
        <div class="grid">
          <div class="title">电池SOC</div>
          <line-chart
            :yAxisName="batteryyAxisName"
            :unit="batteryUnit"
            :colors="batteryColors"
            :legendData="batteryLegendData"
            :xAxisData="batteryxAxisData"
            :seriesData="batterySeriesData"
          >
          </line-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid">
          <div class="title">收益统计</div>
          <line-chart
            :yAxisName="incomeyAxisName"
            :unit="incomeUnit"
            :legendData="incomeLegendData"
            :xAxisData="incomexAxisData"
            :seriesData="incomeSeriesData"
          >
          </line-chart>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PieChart from "@/components/pieChart/index.vue";
import LineChart from "@/components/lineChart/index.vue";
import { IPieChartData, ILineChartList } from "@/utils/interface";

@Component({
  components: {
    PieChart,
    LineChart,
  },
})
export default class ProjectOverview extends Vue {
  alarmColors: Array<string> = [
    "#4A90E2",
    "#2DCCA9",
    "#FF5D5D",
    "#FFBE53",
    "#3E3F58",
    "#4f0202",
    "#ff7200",
  ];
  alarmLegendData: Array<string> = [
    "紧急告警",
    "重要告警",
    "次要告警",
    "提示告警",
  ];
  alarmSeriesData: IPieChartData[] = [
    { value: 25, name: "紧急告警" },
    { value: 24, name: "重要告警" },
    { value: 31, name: "次要告警" },
    { value: 40, name: "提示告警" },
  ];
  deviceLegendData: Array<string> = ["正常电站", "故障电站", "断连电站"];
  deviceSeriesData: IPieChartData[] = [
    { value: 2, name: "正常电站" },
    { value: 1, name: "故障电站" },
    { value: 3, name: "断连电站" },
  ];
  batteryyAxisName = "单位";
  batteryUnit = "%";
  batteryColors: Array<string> = ["#4A90E2", "#2DCCA9"];
  batteryLegendData: Array<string> = ["2021-12-01", "2021-12-02"];
  batteryxAxisData: Array<string> = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
  ];
  batterySeriesData: ILineChartList[] = [
    {
      name: "2021-12-01",
      type: "line",
      data: [40, 20, 35, 60, 55, 10, 90],
    },
    {
      name: "2021-12-02",
      type: "line",
      data: [600, 310, 200, 800, 400, 330, 400],
    },
  ];

  incomeyAxisName = "收益";
  incomeUnit = "万元";
  incomeLegendData: Array<string> = ["2021-12"];
  incomexAxisData: Array<string> = ["01", "02", "03", "04", "05", "06", "07"];
  incomeSeriesData: ILineChartList[] = [
    {
      name: "2021-12",
      type: "line",
      data: [40, 20, 35, 60, 55, 10, 30],
    },
  ];
}
</script>
<style lang="scss" scoped>
.project-overview-wrapper {
  margin-top: 20px;
  padding: 20px;
  background-color: $white;
  .title {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.7);
    padding: 10px 0;
  }
  .top-wrapper {
    .title {
      padding: 5px 15px;
    }
    .content {
      margin-top: 10px;
      display: flex;
      .img-box {
        width: 240px;
        height: 200px;
        margin-right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 180px;
          height: 180px;
        }
      }
      .list {
        width: calc(100% - 450px);
        overflow: hidden;
        .item {
          float: left;
          width: 50%;
          font-size: 15px;
          color: $gray;
          padding: 9px 0;
        }
      }
    }
  }
  .common {
    .el-col {
      padding: 5px;
    }
    .grid {
      padding: 0 20px;
      height: 220px;
      border: 1px solid #ccc;
      .operation-list {
        margin-top: 10px;
        .item {
          font-size: 16px;
          line-height: 40px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
      .electric-list {
        margin-top: 10px;
        overflow: hidden;
        .item {
          float: left;
          width: 50%;
          padding: 10px 0;
          img {
            width: 30px;
            height: 30px;
            margin-right: 4px;
          }
          label {
            font-size: 16px;
            line-height: 36px;
            color: rgba(0, 0, 0, 0.85);
            vertical-align: top;
            line-height: 30px;
          }
        }
      }
    }
  }
  .bottom-wrapper {
    overflow: hidden;
    .el-col {
      padding: 5px;
    }
    .grid {
      height: auto;
      // height: 270px;
    }
  }
}
</style>
