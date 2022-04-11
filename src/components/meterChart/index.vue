<template>
  <div class="chart-el" ref="echartsDom"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class meterChart extends Vue {
  @Prop(Number) val: number | undefined;
  @Prop(String) chartName!: string;
  @Prop(String) chartUnit!: string;
  chart: any = null;

  mounted(): void {
    this.$nextTick((): void => {
      this.initChart();
    });
  }

  initChart(): void {
    this.chart = (this as any).$echarts.init(this.$refs.echartsDom);
    const val = this.val;
    const name = this.chartName;
    const unit = this.chartUnit;
    this.chart.setOption({
      series: [
        {
          type: "gauge",
          axisLine: {
            lineStyle: {
              width: 15,
              opacity: 1,
              color: [
                [0.2, "#2dcca9"],
                [0.8, "#4A90E2"],
                [1, "#FF5d5d"],
              ],
              //  color: [
              //     [0, '#2CFAFC'],
              //     [val < 34 ? val / 100 : 0.33, '#4BAEFD'],
              //     [val > 34 && val < 67 ? val / 100 : 0.67, val > 34 ? '#FFE24D' : '#0b275B'],
              //     [val > 67 ? val / 100 : 0.99, val > 67 ? '#F85C1D' : '#0b275B'],
              //     [1, '#0b275B'] // 底色
              //   ],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 1,
              color: "#fff",
            },
          },
          axisLabel: {
            distance: 10,
            // color: '#999',
            fontSize: 12,
          },

          detail: {
            valAnimation: true,
            fontSize: 55,
            offsetCenter: [0, "80%"],
            formatter: "{value}" + unit,
          },
          data: [
            {
              value: val,
              name: name,
            },
          ],
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
  height: 300px;
  // color: rgba($color: #000000, $alpha: 1.0);
}
</style>
