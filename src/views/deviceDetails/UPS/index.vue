<template>
  <div class="main-wrapper">
    <div class="details-wrapper">
      <div class="box-card">
        <span class="title"><b>基本信息</b></span>
        <basic-info :List="basicData"></basic-info>
      </div>

      <div class="box-card">
        <span class="title"><b>实时数据</b></span>
        <div class="data-box">
          <el-row>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>50</span>
                <label>输入电压<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>50</span>
                <label>输出电压<span>（A）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>50</span>
                <label>输入电流<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>50</span>
                <label>输出电流<span>（A）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/time.png" alt=""
                /></i>
                <span>50</span>
                <label>电量恢复时间<span>（h）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/time.png" alt=""
                /></i>
                <span>50</span>
                <label>剩余运行时间<span>（h）</span></label>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dianl.png" alt=""
                /></i>
                <span>50</span>
                <label>剩余电量<span>（%）</span></label>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicInfo from "../components/basicInfo.vue";
interface DataItem {
  label: string;
  value: string;
  iconUrl?: string;
  unitName?: string;
}
@Component({
  components: {
    BasicInfo,
  },
})
export default class UPSDetails extends Vue {
  basicData: DataItem[] = [
    {
      label: "设备地址：",
      value: "1.2",
    },
    {
      label: "固件版本：",
      value: "1.2",
    },
  ];
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
</style>
