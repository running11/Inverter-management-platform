<template>
  <div class="power-curve-wrapper">
    <div class="search-wrapper">
      <div class="list">
        <div
          :class="['item', { active: item.value === timeType }]"
          v-for="item in timeList"
          :key="item.value"
          @click="changeTime(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <el-date-picker
        class="date-picker"
        v-model="timeValue"
        :type="timeType"
        :key="timeType"
        align="right"
        placeholder="选择日期"
      >
      </el-date-picker>
    </div>
    <line-chart
      height="400px"
      :yAxisName="poweryAxisName"
      :unit="powerUnit"
      :legendData="powerLegendData"
      :xAxisData="powerxAxisData"
      :seriesData="powerSeriesData"
    >
    </line-chart>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IOption } from "@/utils/interface";
import LineChart from "@/components/lineChart/index.vue";
import { ILineChartList } from "@/utils/interface";

@Component({
  components: {
    LineChart,
  },
})
export default class PowerCurve extends Vue {
  timeValue: any = "";
  timeType = "date";
  timeList: IOption[] = [
    {
      label: "日",
      value: "date",
    },
    {
      label: "月",
      value: "month",
    },
    {
      label: "年",
      value: "year",
    },
  ];
  poweryAxisName = "";
  powerUnit = "kW";
  powerLegendData: Array<string> = [
    "PV发电功率",
    "负载功率",
    "储能充电功率",
    "关口表功率",
  ];
  powerxAxisData: Array<string> = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
  ];
  powerSeriesData: ILineChartList[] = [
    {
      name: "PV发电功率",
      type: "line",
      smooth: true,
      data: [40, 20, 35, 60, 55, 10, 30],
    },
    {
      name: "负载功率",
      type: "line",
      smooth: true,
      data: [46, 21, 45, 70, 50, 18, 20],
    },
    {
      name: "储能充电功率",
      type: "line",
      smooth: true,
      data: [10, 26, 32, 30, 52, 15, 12],
    },
    {
      name: "关口表功率",
      type: "line",
      smooth: true,
      data: [45, 30, 40, 67, 15, 14, 13],
    },
  ];

  changeTime(value: string): void {
    this.timeType = value;
  }
}
</script>
<style lang="scss" scoped>
.power-curve-wrapper {
  margin-top: 20px;
  padding: 20px;
  background-color: $white;
  .search-wrapper {
    text-align: right;
    .list {
      display: inline-block;
      vertical-align: top;
      width: 170px;
      overflow: hidden;
      margin-right: 10px;
      .item {
        float: left;
        width: 54px;
        height: 38px;
        font-size: 13px;
        color: #606266;
        text-align: center;
        line-height: 38px;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        border-right: none;
      }
      .item:last-child {
        border-right: 1px solid #dcdfe6;
      }
      .active {
        background-color: $main-color;
        color: $white;
        border: 1px solid $main-color;
      }
    }
    .date-picker {
      display: inline-block;
      vertical-align: top;
      /deep/.el-input__icon {
        height: 40px;
      }
    }
  }
}
</style>
