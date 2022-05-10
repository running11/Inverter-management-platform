<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.dictValue)">
        <span v-if="item.listClass == 'default' || item.listClass == ''" :key="item.dictValue" :index="index" :class="item.cssClass">
          {{ item.dictLabel }} <i v-if="showValue">#{{item.dictValue}}</i></span>
        <el-tag size="mini" v-else :disable-transitions="true" :key="item.dictValue" :index="index"
          :type="item.listClass == 'primary' ? '' : item.listClass" :class="item.cssClass">
          {{ item.dictLabel }}<i v-if="showValue">#{{item.dictValue}}</i>
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {Component,Vue,Prop} from "vue-property-decorator";
@Component
export default class DictTag extends Vue {
  @Prop(Array) options!:[];
  @Prop() value!:any;
  @Prop(Boolean) showValue!: false;
  get values() {
      if (this.value !== null && typeof this.value !== "undefined") {
        return Array.isArray(this.value) ? this.value : [String(this.value)];
      } else {
        return [];
      }
    }
}
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
