<template>
  <div class="content">
    <div class="img-box">
      <img src="@/assets/images/icon_electricity.png" alt="" />
    </div>
    <div class="list">
      <div class="left">
        <div class="item">
          <label>设备名称：</label>
          <span>ems主机</span>
        </div>
        <div class="item">
          <label>SN号：</label>
          <span>1212121</span>
        </div>
        <div class="item">
          <label>设备型号：</label>
          <span>888888888</span>
        </div>
        <div class="item">
          <label>品牌：</label>
          <span>某某</span>
        </div>
        <div class="item">
          <label>生产厂家：</label>
          <span>上海</span>
        </div>
        <!-- <template v-for="(item, i) in List">
          <div class="item" :key="i">
            <label>{{item.label}}</label>
            <span>{{item.value}}</span>
          </div>
        </template> -->
      </div>
      <div class="right">
        <template v-for="(item, i) in List">
          <div class="item" :key="i">
            <label>{{ item.label }}</label>
            <span>{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

interface DataItem {
  label: string;
  value: string;
}
@Component
export default class emsDetails extends Vue {
  @Prop(Array) List!: DataItem;
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  background-color: $white;
  .img-box {
    width: 220px;
    height: 200px;
    margin-right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 180px;
      height: 180px;
    }
  }
  .list {
    padding: 10px 0;
    width: calc(100% - 450px);
    overflow: hidden;
    display: flex;
    .left,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      .item {
        float: left;
        width: 100%;
        font-size: 15px;
        color: $gray;
        padding: 9px 0;
      }
    }
  }
}
</style>
