<template>
  <div class="main-wrapper">
    <div class="details-wrapper">
      <!-- 基本信息 -->
      <div class="box-card">
        <span class="title"><b>基本信息</b></span>
        <basic-info :List="basicData"></basic-info>
      </div>
      <!-- 实时数据 -->
      <div class="box-card">
        <span class="title"><b>实时数据</b></span>
        <div class="data-box">
          <el-row>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/sbzt.png" alt=""
                /></i>
                <span>停用</span>
                <label>运行状态</label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/gz.png" alt=""
                /></i>
                <span>xxx</span>
                <label>故障状态</label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dianl.png" alt=""
                /></i>
                <span>20</span>
                <label>额定容量：<span>（kwh）</span></label>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>5</span>
                <label>堆电流<span>（A）</span></label>
              </div>

              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/kw.png" alt=""
                /></i>
                <span>30</span>
                <label>堆功率<span>（kw）</span></label>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>最高电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>最低电压<span>（V）</span></label>
              </div>
            </el-col>

            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>30</span>
                <label>最高温度<span>（℃）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>35</span>
                <label>最低温度<span>（℃）</span></label>
              </div>
            </el-col>

            <el-col :span="4">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dc.png" alt=""
                /></i>
                <span>30</span>
                <label>SOC<span>（%）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dc.png" alt=""
                /></i>
                <span>35</span>
                <label>SOH<span>（%）</span></label>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 电池簇数据 -->
      <div class="box-card">
        <span class="title"><b>电池簇数据</b></span>
        <div class="box">
          <el-card class="item-box" shadow="hover">
            <div slot="header" class="header-text">
              <span>簇号0001</span>
            </div>
            <div class="right">
              <div class="item">
                <label for="">工作状态</label>
                <span class="green">运行</span>
              </div>
              <div class="item">
                <label for="">总电压</label>
                <span>703<span>V</span></span>
              </div>
              <div class="item">
                <label for="">电芯SOC</label>
                <span>20<span>%</span></span>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最大电压</label>
                  <span>3.151<span>V</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>3</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最小电压</label>
                  <span>3.151<span>V</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>4</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最高温度</label>
                  <span>35.1<span>℃</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>5</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最低温度</label>
                  <span>31<span>℃</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>6</span>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="item-box" shadow="hover">
            <div slot="header" class="header-text">
              <span>簇号0002</span>
            </div>
            <div class="right">
              <div class="item">
                <label for="">工作状态</label>
                <span class="red">停机</span>
              </div>
              <div class="item">
                <label for="">总电压</label>
                <span>703<span>V</span></span>
              </div>
              <div class="item">
                <label for="">电芯SOC</label>
                <span>20<span>%</span></span>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最大电压</label>
                  <span>3.151<span>V</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>3</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最小电压</label>
                  <span>3.151<span>V</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>4</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最高温度</label>
                  <span>35<span>℃</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>5</span>
                </div>
              </div>
              <div class="battery">
                <div class="item">
                  <label for="">最低温度</label>
                  <span>20<span>℃</span></span>
                </div>
                <div class="item">
                  <label for="">电芯号</label>
                  <span>6</span>
                </div>
              </div>
            </div>
          </el-card>
          <!-- <el-card class="item-box" shadow="hover">
            <div slot="header" class="header-text">
              <span>簇号0002</span>
            </div>
            <div class="right">
              <div class="item">
                <label for="">工作状态</label>
                <span class="red">停机</span>
              </div>
              <div class="item">
                <label for="">总电压</label>
                <span>703V</span>
              </div>
              <div class="item">
                <label for="">最大电压</label>
                <span>3.151V</span>
              </div>
              <div class="item">
                <label for="">电芯号</label>
                <span>3.151V</span>
              </div>
              <div class="item">
                <label for="">最小电压</label>
                <span>3.129V</span>
              </div>
              <div class="item">
                <label for="">电芯号</label>
                <span>3.151V</span>
              </div>
              <div class="item">
                <label for="">最高温度</label>
                <span>31℃</span>
              </div>
              <div class="item">
                <label for="">电芯号</label>
                <span>3.151V</span>
              </div>
              <div class="item">
                <label for="">最低温度</label>
                <span>31℃</span>
              </div>
              <div class="item">
                <label for="">电芯号</label>
                <span>3.151V</span>
              </div>
              <div class="item">
                <label for="">电芯SOC</label>
                <span>20%</span>
              </div>
            </div>
          </el-card> -->
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
export default class batteryDetails extends Vue {
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
  // dataList: DataItem[] = [
  //   {
  //     label: "工作状态",
  //     value: "停用",
  //   },
  //   {
  //     label: "总电压",
  //     value: "离网",
  //   },
  //   {
  //     label: "最大电压",
  //     value: "30",

  //     unitName: "kw",
  //   },
  //   {
  //     label: "电芯号",
  //     value: "30",
  //     unitName: "V",
  //   },
  // ];
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
.box {
  display: flex;
  padding: 20px 0;
  .item-box {
    width: 20%;
    margin-right: 1%;
    &:last-child {
      margin-right: 0;
    }
    ::v-deep.el-card__header{
      padding: 15px 20px;
    }
    ::v-deep.el-card__body{
      padding: 5px 20px 20px;
    }
    .header-text {
      span {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid $border-color;
      font-size: 15px;
      span {
        color: $main-color;
        span {
          color: $gray;
        }
      }
      &:last-child {
        border: none;
      }
      label {
        color: $gray;
      }
      .green {
        color: $main-color;
      }
      .red {
        color: red;
      }
    }
    .battery {
      display: flex;
      justify-content: space-between;
      .item {
        label {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
