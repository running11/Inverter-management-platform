<template>
  <div class="chart" ref="echartsDom" style="height: 100%"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ILineChartList } from "@/utils/interface";
@Component({})
export default class LineChart extends Vue {
  @Prop() yAxisName?: string;
  @Prop() unit?: string;
  @Prop(Array) colors?: Array<string>;
  @Prop(Array) legendData?: Array<string>;
  @Prop(Array) xAxisData?: Array<string>;
  @Prop(Array) seriesData?: Array<ILineChartList>;
  chart: any = null;
  mounted(): void {
    this.$nextTick((): void => {
      // console.log(this.xAxisData, this.seriesData, `this.seriesData`);
      this.initChart();
    });
  }
  initChart(): void {
    this.chart = (this as any).$echarts.init(this.$refs.echartsDom);
    const color =this.colors ? this.colors: [
      "rgb(155,255,174)",
      "rgb(252,144,78)",
      "rgb(58,186,255)",
      "rgb(119,168,249)",
      "rgb(235,161,159)",
    ];
    

    let option = {
      legend: {
        data:this.legendData,
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        x:'right',
        padding: [0, 10, 0, 0],
        textStyle: {
          color: "#fff",
          fontSize: 13,
        }
      },
      grid: {
        top: "12%",
        left: "4%",
        right: "4%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLabel: {
          interval: 24,
        },
        axisLine: {
          lineStyle: {
            color: "#c9d7f8",
          },
        },
        data: this.xAxisData,
      },
      yAxis: {
        type: "value",
        name:this.unit,
        axisLine: {
          lineStyle: {
            color: "#c9d7f8",
          },
        },
        splitLine: {
          show: false,
        },
      },
      color: color, //颜色
      series:this.seriesData,
    //    [
    //     {
    //       name: "光伏",
    //       data: guangfuDataList,
    //       type: "line",
    //       smooth: true,
    //     },
    //     {
    //       name: "储能",
    //       data: chunengDataList,
    //       type: "line",
    //       smooth: true,
    //     },
    //   ],
    };
    this.chart.setOption(option);
    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    });
  }
}
</script>
