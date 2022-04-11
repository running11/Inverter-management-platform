<template>
  <div class="chart-el" ref="echartsDom"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IPieChartData } from "@/utils/interface";

@Component({})
export default class PieChart extends Vue {
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
          "rgb(203,155,255)",
          "rgb(149,162,255)",
          "rgb(58,186,255)",
          "rgb(119,168,249)",
          "rgb(235,161,159)",
        ];

    this.chart.setOption({
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 30,
      },
      legend: {
        data: this.legendData,
        orient: "vertical",
        x: "right",
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 10,
        top: "middle",
        align: "left",
        icon: "circle",
        formatter: function (name: string) {
          let index: any;
          data.forEach((item: IPieChartData, i: number) => {
            if (item.name === name) {
              index = Number(i);
            }
          });
          return `${name}： ${data[index].value}`;
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}：{c} ({d}%)",
      },
      color: color, //颜色
      series: [
        {
          name: "",
          type: "pie",
          radius: ["50%", "65%"],
          center: [70, "50%"], //图的位置，距离左跟上的位置
          stillShowZeroSum: false,
          avoidLabelOverlap: false,
          zlevel: 1,
          data: data,
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
      ],
    });

    window.addEventListener("resize", () => {
      this.chart && this.chart.resize();
    });
  }
}
</script>
<style lang="scss" scoped>
.chart-el {
  height: 190px;
}
</style>
