<template>
  <div
    class="chart-el"
    ref="echartsDom"
    :style="{ height: height ? height : '210px' }"
  ></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILineChartList } from "@/utils/interface";

@Component({})
export default class LineChart extends Vue {
  @Prop() height?: string;
  @Prop() yAxisName?: string;
  @Prop() unit?: string;
  @Prop(Array) colors?: Array<string>;
  @Prop(Array) legendData?: Array<string>;
  @Prop(Array) xAxisData?: Array<string>;
  @Prop(Array) seriesData?: Array<ILineChartList>;

  chart: any = null;

  mounted(): void {
    this.$nextTick((): void => {
      this.initChart();
    });
  }

  initChart(): void {
    this.chart = (this as any).$echarts.init(this.$refs.echartsDom);

    const color = this.colors
      ? this.colors
      : [
          "rgb(203,155,255)",
          "rgb(149,162,255)",
          "rgb(58,186,255)",
          "rgb(119,168,249)",
          "rgb(235,161,159)",
        ];

    this.chart.setOption({
      grid: {
        top: "30",
        left: "1%",
        right: "3%",
        bottom: "42",
        containLabel: true,
      },
      legend: {
        data: this.legendData,
        orient: "horizontal",
        bottom: "10",
        textStyle: {
          fontSize: 12,
          color: "#909399",
        },
        type: "scroll",
      },
      color: color,
      xAxis: {
        type: "category",
        axisLabel: {
          textStyle: {
            color: "#B0BCCE",
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#909399",
            width: 1,
          },
        },
        boundaryGap: false,
        data: this.xAxisData,
      },
      yAxis: {
        type: "value",
        name: `${this.yAxisName}(${this.unit})`,
        nameTextStyle: {
          color: "#666666",
          fontSize: 11,
        },
        axisLabel: {
          textStyle: {
            color: "#B0BCCE",
            fontSize: 11,
          },
        },
        axisLine: {
          lineStyle: {
            color: "#909399",
            width: 1,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params: Array<any>) => {
          let tip = "";
          if (params.length) {
            tip += `${params[0].name}<br/>`;
          }
          for (let i = 0, length = params.length; i < length; i++) {
            if (params[i].value) {
              tip += `${params[i].seriesName}：${params[i].value} ${this.unit}<br/>`;
            } else {
              tip += `${params[i].seriesName}: -<br/>`;
            }
          }
          return tip;
        },
      },
      series: this.seriesData,
    });

    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    });
  }
}
</script>
<style lang="scss" scoped>
.chart-el {
  // height: 235px;
}
</style>
