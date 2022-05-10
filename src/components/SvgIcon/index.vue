<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts">
import { Component,Prop, Vue } from "vue-property-decorator";
@Component
export default class SvgIcon extends Vue {
  @Prop({required:true}) iconClass!: string;
  @Prop(String) className!: string;

  get iconName() {
      return `#icon-${this.iconClass}`
    }
  get svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
}

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

作者：litongqian
链接：https://juejin.cn/post/6844903695478439949
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。