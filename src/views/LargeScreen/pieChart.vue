<template>
  <div class="chart" ref="echartsDom" style="height: 100%"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IPieChartData } from "@/utils/interface";
@Component({})
export default class pieChart extends Vue {
  @Prop(Array) colors?: Array<string>;
  @Prop(Array) legendData?: Array<string>;
  @Prop(Array) seriesData?: Array<IPieChartData>;
  chart: any = null;
  mounted(): void {
    this.$nextTick((): void => {
      this.initChart();
    });
  }
  initChart(): void {
    this.chart = (this as any).$echarts.init(this.$refs.echartsDom);
    const data: IPieChartData[] = this.seriesData || [];
     const color = this.colors
      ? this.colors
      : [
          "rgb(155,255,174)",
          // "rgb(252,78,82)",
          "rgb(252,144,78)",
          "rgb(58,186,255)",
          "rgb(119,168,249)",
          "rgb(235,161,159)",
        ];
    let option = {
       grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        data: this.legendData,
        orient: "vertical",
        right:"30",
        textStyle:{
          color:'#fff',
          fontSize:16
        },
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 10,
        top: "middle",
        align: "left",
        icon: "circle",
      },
      color: color, //颜色
      series: [
        {
          name: "",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["30%", "50%"], //图的位置，距离左跟上的位置
           stillShowZeroSum: false,
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "40",
          //     fontWeight: "bold",
          //   },
          // },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };

    this.chart.setOption(option);
    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    });
  }
}
</script>
