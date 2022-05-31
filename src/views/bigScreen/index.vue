<template>
  <div class="screen-wrapper">
    <div class="header-wrapper">
      <div class="logo-box">
        <img class="logo" src="@/assets/images/ztlogo.png" alt="logo" />
      </div>
      <div class="title">智慧光储监控云平台</div>
      <div class="time">{{ currentTime }}</div>
    </div>

    <div class="main-wrapper">
      <div class="select_box">
        <el-select v-model="projectVal" clearable placeholder="请选择项目">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="main-box">
        <div class="left-part">
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
              <div class="title">总览</div>
              <div class="text_box">
                <div class="v_flex t_text">
                  <div class="zl_item">
                    <p>储能部署容量：</p>
                    <span>221.1 <b>kWh</b></span>
                  </div>
                  <div class="zl_item">
                    <p>光伏部署容量：</p>
                    <span>100 <b>kWh</b></span>
                  </div>
                </div>
                <div class="v_flex b_text">
                  <div class="zl_item">
                    <p>累积收益：</p>
                    <span>212098 <b>元</b></span>
                  </div>
                  <div class="zl_item">
                    <p>光伏累积发电量：</p>
                    <span>19694 <b>kWh</b></span>
                  </div>
                  <div class="zl_item">
                    <p>储能累积吞吐量：</p>
                    <span>201294 <b>kWh</b></span>
                  </div>
                </div>
              </div>
            </dv-border-box-8>
          </div>
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
              <div class="title">光伏日发电量</div>
              <div class="text_box">
                <histogram-chart
                  :colors="colors1"
                  :seriesData="seriesDataPower"
                ></histogram-chart>
              </div>
            </dv-border-box-8>
          </div>
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
               <div class="title">{{ projectVal ? "实时功率 " : "项目状态" }}</div>
              <div class="text_box">
                <line-chart
                  v-if="projectVal"
                  :seriesData="seriesDataKw"
                  :xAxisData="timeList"
                  :legendData="legendDataKw"
                  unit="kw"
                ></line-chart>
                <ring-chart v-else :seriesData="projrctStatus"></ring-chart>
              </div>
            </dv-border-box-8>
          </div>
        </div>
        <div class="right-part">
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
               <div class="title">{{ projectVal ? "收益" : "实时功率" }}</div>
              <div class="text_box">
                <ring-chart v-if="projectVal" :seriesData="income"></ring-chart>
                <line-chart
                  v-else
                  :seriesData="seriesDataKw"
                  :xAxisData="timeList"
                  :legendData="legendDataKw"
                  unit="kw"
                ></line-chart>
              </div>
            </dv-border-box-8>
          </div>
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
              <div class="title">储能日吞吐量</div>
              <div class="text_box">
                <histogram-chart :colors="colors2" :seriesData="seriesDataStorage"></histogram-chart>
              </div>
            </dv-border-box-8>
          </div>
          <div class="box-wrapper">
            <dv-border-box-8 class="box">
              <div class="title">{{ projectVal ? "电池SOC" : "环保收益" }}</div>
              <div class="text_box">
                <line-chart
                  v-if="projectVal"
                  :colors="colors1"
                  :seriesData="seriesDataSoc"
                  :xAxisData="timeList"
                  unit="%"
                ></line-chart>
                <div v-else class="h_flex wrap_box">
                  <div class="v_flex col_box">
                    <img src="@/assets/images/co2.png" alt="" />
                    <b>15.4</b>
                    <span>碳减排量(t)</span>
                  </div>
                  <div class="v_flex col_box">
                    <img src="@/assets/images/tree.png" alt="" />
                    <b>3066</b>
                    <span>等效植树(棵)</span>
                  </div>
                </div>
              </div>
            </dv-border-box-8>
          </div>
        </div>
        <screen-map></screen-map>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScreenMap from "@/components/screenMap/index.vue";
import moment from "moment";
import histogramChart from "./histogramChart.vue";
import RingChart from "./ringChart.vue";
import LineChart from "./echartLine.vue";

@Component({
  components: {
    ScreenMap,
    histogramChart,
    RingChart,
    LineChart,
  },
})
export default class BigScreen extends Vue {
  currentTime: any = null;
  projectVal = "";
  options = [
    { value: "1", label: "项目1" },
    { value: "2", label: "项目2" },
    { value: "3", label: "项目3" },
  ];
  colors1 = ["rgb(58,186,255)"];
  colors2 = ["rgb(252,144,78)"];
  projrctStatus = [
    { value: 10, name: "正常" },
    { value: 5, name: "故障" },
    { value: 7, name: "EMS离线" },
  ];
  //收益
  income = [
    { value: 420, name: "光伏发电" },
    { value: 200, name: "削峰填谷" },
    { value: 105, name: "需量调节" },
  ];
  //光伏日发电量
  seriesDataPower: any = [
    {
      name: "光伏日发电量",
      type: "bar",
      barWidth: "50%",
      data: [
        330, 252, 200, 334, 390, 330, 220, 100, 152, 190, 234, 390, 330, 220,
        290,
      ],
    },
  ];
  //光伏储能数据
  legendDataKw = ["光伏", "储能"];
  timeList: any = [];
  seriesDataKw: any = [
    {
      name: "光伏",
      data: [],
      type: "line",
      smooth: true,
    },
    {
      name: "储能",
      data: [],
      type: "line",
      smooth: true,
    },
  ];
  //储能日吞吐量
  seriesDataStorage: any = [
    {
      name: "储能日吞吐量",
      type: "bar",
      barWidth: "50%",
      data: [
        230, 252, 200, 334, 300, 330, 220, 320, 352, 290, 234, 390, 330, 220,
        290,
      ],
    },
  ];
  //电池SOC数据
  seriesDataSoc: any = [
    {
      name: "电池SOC",
      data: [],
      type: "line",
      smooth: true,
    },
  ];

  mounted(): void {
    this.$nextTick(function () {
      this.currentTime = moment().format("YYYY/MM/DD HH:mm:ss");
    });
    this.initData();
  }

  created(): void {
    this.handleTime();
  }

  handleTime() {
    setInterval(() => {
      this.currentTime = moment().format("YYYY/MM/DD HH:mm:ss");
    }, 1000);
  }

  initData() {
    let guangfuDataList: any = [];
    let chunengDataList: any = [];
    let socList: any = [];
    for (let i = 0; i < 12 * 24; i++) {
      let hour = Math.floor(i / 12);
      if (hour < 8 || hour > 17) {
        guangfuDataList.push(0);
        chunengDataList.push(0);
      } else {
        let rizhao = hour - 13; //日照强度 -5 -> 4
        if (rizhao > 0) {
          rizhao *= -1;
        }
        rizhao += 6;
        let guanfu = Math.floor(Math.random() * 80) + 80 * rizhao;
        let chuneng = Math.floor(Math.random() * 70) + 60 * rizhao;
        if (chuneng >= guanfu) {
          chuneng -= 30;
        }
        guangfuDataList.push(guanfu);
        chunengDataList.push(chuneng);
      }
      socList.push(Math.floor(Math.random() * 10) + 80);
      this.timeList.push(hour + "");
    }

    this.$set(this.seriesDataKw[0], "data", guangfuDataList);
    this.$set(this.seriesDataKw[1], "data", chunengDataList);
    this.$set(this.seriesDataSoc[0], "data", socList);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.screen-wrapper {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(180deg, #151b59 24%, #2a2d5a 88%);
  .header-wrapper {
    height: 54px;
    background-color: #237ae4;
    border-bottom: 5px solid #25c1ff;
    display: flex;
    padding: 0 30px;
    .logo-box {
      flex: 0 0 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 90px;
        height: auto;
      }
    }
    .title {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #fff;
      font-weight: bold;
    }
    .time {
      flex: 0 0 200px;
      font-size: 15px;
      color: #fff;
      line-height: 54px;
      text-align: right;
    }
  }
  .main-wrapper {
    height: calc(100vh - 59px);
    position: relative;
    .select_box {
      height: 44px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      top: 0;
      right: 16px;
      z-index: 99;
      box-sizing: border-box;
      ::v-deep .el-input__inner {
        background-color: rgb(27, 68, 150) !important;
        color: #fff;
        height: 30px;
      }
      /**修改边框和字体颜色 */
      ::v-deep .el-select {
        position: relative;
        width: 250px;
        .el-input {
          input {
            height: 30px;
            border-color: transparent;
            color: #fff;
          }
        }
      }
      /**修改下拉图标颜色 */
      ::v-deep .el-input__suffix {
        display: flex;
        align-items: center;
        .el-input__suffix-inner {
          .el-icon-arrow-up:before {
            color: #2ac2ff;
          }
        }
      }
    }
    .main-box {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .h_flex {
        display: flex;
        align-items: center;
      }
      .v_flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .left-part {
      box-sizing: border-box;
      width: 370px;
      height: calc(100vh - 103px);
      padding: 0 15px;
      // border: 1px solid red;
      position: absolute;
      top: 44px;
      left: 0;
      z-index: 99;
    }
    .right-part {
      box-sizing: border-box;
      width: 370px;
      height: calc(100vh - 103px);
      padding: 0 15px;
      // border: 1px solid red;
      position: absolute;
      top: 44px;
      right: 0;
      z-index: 99;
    }
    .title {
      height: 48px;
      line-height: 48px;
      padding-left: 20px;
      text-align: left;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .box-wrapper {
    height: 33.3%;
    padding-bottom: 12px;
    box-sizing: border-box;
    .box {
      background: -webkit-linear-gradient(
        top,
        rgb(27, 68, 150),
        rgb(23, 29, 99)
      );
      .zl_item {
        display: flex;
        align-items: center;
        height: 35px;
        p {
          width: 64%;
          color: #c9d7f8;
          text-align: right;
          font-size: 15px;
        }
        span {
          width: 36%;
          text-align: left;
          font-size: 16px;
          color: #1bcffc;
          b {
            color: #95b2f0;
            font-size: 15px;
          }
        }
      }
      .text_box {
        height: calc(100% - 48px);
        // padding: 5px 0;
        box-sizing: border-box;
        .t_text {
          height: 32%;
          background: url("../../assets/images/zl_flash.png") no-repeat 15px
            center;
          background-size: 50px 50px;
          margin-bottom: 5%;
        }
        .b_text {
          height: 50%;
          background: url("../../assets/images/zl_time.png") no-repeat 15px
            center;
          background-size: 50px 50px;
        }
        .wrap_box {
          color: #fff;
          height: 100%;
          .col_box {
            width: 50%;
            height: 100%;
            align-items: center;
            img {
              width: 50px;
              height: 50px;
            }
            b {
              margin: 10px 0;
              font-size: 22px;
            }
            span {
              font-size: 14px;
              color: #95b2f0;
            }
          }
        }
      }
    }
  }
}
</style>
