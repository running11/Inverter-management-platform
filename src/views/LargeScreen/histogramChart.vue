<template>
  <div class="chart" ref="echartsDom" style="height: 100%"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class histogramChart extends Vue {
 @Prop(Array) colors?: Array<string>;
//  @Prop(Array) legendData?: Array<string>;
 @Prop(Array) seriesData?: Array<any>;
  chart: any = null;
  mounted(): void {
    this.$nextTick((): void => {
      this.initChart();
    });
  }
  initChart(): void {
    this.chart = (this as any).$echarts.init(this.$refs.echartsDom);
    const color = this.colors ? this.colors : [ "rgb(58,186,255)"];
    const data= this.seriesData || [];
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        // data:this.legendData,
        textStyle: {
          color: "#fff",
          fontSize: 16,
        },
        top:"10"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      color: color, //颜色
      xAxis: [
        {
          type: "category",
          data: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
          ],
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#c9d7f8",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name:"kwh",
          splitLine: {
            show: false,
          },
           axisLine: {
          lineStyle: {
            color: "#c9d7f8",
          },
        },
        },
      ],
      series: data
    //   [
    //     {
    //       name: "Direct",
    //       type: "bar",
    //       barWidth: "60%",
    //       data: [
    //         30, 52, 200, 334, 390, 330, 220, 100, 152, 190, 234, 390, 330, 220, 90,
    //       ],
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
