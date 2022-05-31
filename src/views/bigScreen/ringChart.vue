<template>
  <dv-active-ring-chart :config="config" style="width: 100%; height: 100%" />
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class RingChart extends Vue {
  @Prop(Array) seriesData?: any;

  config: any = {
    radius: "58%",
    activeRadius: "43%",
    data: [],
    digitalFlopStyle: {
      fontSize: 16,
    },
    showOriginValue: true,
    color: ["#3087E9", "#EF9C4F", "#5BCD6A"]
  };

  created(): void {
    // console.log(this.seriesData, `seriesDataseriesDataseriesData`);
    this.$set(this.config, "data", this.seriesData);
  }
}
</script>
