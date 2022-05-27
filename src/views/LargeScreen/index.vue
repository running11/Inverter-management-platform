<template>
  <div class="big_screen">
    <div class="header_box">
      <img src="@/assets/images/ztlogo.png" alt="" />
      <span>{{ title }}</span>
    </div>
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
    <div class="con_box">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="flex_box">
            <div class="box">
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
            </div>
            <div class="box">
              <div class="title">光伏日发电量</div>
              <div class="text_box">
                <histogram-chart :colors="colors1" :seriesData="seriesDataPower"></histogram-chart>
              </div>
            </div>
            <div class="box">
              <div class="title">
                {{ projectVal ? "实时功率 " : "项目状态" }}
              </div>
              <div class="text_box">
                <line-chart v-if="projectVal" :seriesData="seriesDataKw" :xAxisData="timeList" :legendData="legendDataKw" unit="kw"></line-chart>
                <pie-chart v-else :seriesData="projrctStatus"></pie-chart>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="center_box" id="container"></div>
        </el-col>
        <el-col :span="5">
          <div class="flex_box">
            <div class="box">
              <div class="title">{{ projectVal ? "收益" : "实时功率" }}</div>
              <div class="text_box">
                <pie-chart v-if="projectVal" :seriesData="income" ></pie-chart>
                <line-chart v-else :seriesData="seriesDataKw" :xAxisData="timeList" :legendData="legendDataKw" unit="kw"></line-chart>
              </div>
            </div>
            <div class="box">
              <div class="title">储能日吞吐量</div>
              <div class="text_box">
                <histogram-chart :colors="colors2" :seriesData="seriesDataStorage"></histogram-chart>
              </div>
            </div>
            <div class="box">
              <div class="title">{{ projectVal ? "电池SOC" : "环保收益" }}</div>
              <div class="text_box">
                <line-chart v-if="projectVal" :colors="colors1" :seriesData="seriesDataSoc" :xAxisData="timeList" unit="%"></line-chart>
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
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AMapLoader from "@amap/amap-jsapi-loader";
import LineChart from "./echartLine.vue";
import histogramChart from "./histogramChart.vue";
import pieChart from "./pieChart.vue";

@Component({
  components: {
    LineChart,
    histogramChart,
    pieChart,
  },
})
export default class largescreen extends Vue {
  title = "智慧光储监控云平台";
  map = null;
  colors1 = ["rgb(58,186,255)"];
  colors2 = ["rgb(252,144,78)"];
  projectVal = "";
  options = [
    { value: "1", label: "项目1" },
    { value: "2", label: "项目2" },
    { value: "3", label: "项目3" },
  ];
  locationList = [
    { name: "乐清", longitude: 120.99761, latitude: 28.112589 },
    { name: "温州", longitude: 120.693426, latitude: 27.998366 },
    { name: "台州", longitude: 121.42951, latitude: 28.599316 },
    { name: "杭州", longitude: 120.242986, latitude: 30.349495 },
    { name: "松江", longitude: 121.250982, latitude: 31.025011 },
  ];
  projrctStatus = [
    { value: "12", name: "正常" },
    { value: "2", name: "故障" },
    { value: "7", name: "EMS离线" },
  ];
  //收益
  income = [
    { value: "420", name: "光伏发电" },
    { value: "200", name: "削峰填谷" },
    { value: "105", name: "需量调节" },
  ];
  //光伏储能数据
   legendDataKw= ["光伏", "储能"];
   timeList:any= [];
   seriesDataKw:any=  [
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
      ]
  //电池SOC数据
  seriesDataSoc:any =[
      {
          name: "电池SOC",
          data: [],
          type: "line",
          smooth: true,
        }
  ]
  //光伏日发电量
  seriesDataPower:any= [
        {
          name: "光伏日发电量",
          type: "bar",
          barWidth: "60%",
          data: [
            330, 252, 200, 334, 390, 330, 220, 100, 152, 190, 234, 390, 330, 220, 290,
          ],
        },
      ]
//储能日吞吐量
  seriesDataStorage:any= [
        {
          name: "储能日吞吐量",
          type: "bar",
          barWidth: "60%",
          data: [
            230, 252, 200, 334, 300, 330, 220, 320, 352, 290, 234, 390, 330, 220, 290,
          ],
        },
      ]
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap();
    this.initData()
  }
  initMap(): void {
    (window as any)._AMapSecurityConfig = {
      securityJsCode: "265793d1d10afca511bb65e9df68a9fe",
    };
    AMapLoader.load({
      key: "bceca8051745424edbbc92707896613e", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        this.map = new AMap.Map("container", {
          //设置地图容器id
          // viewMode: "3D", //是否为3D地图模式
          zoom: 5, //初始化地图级别
          center: [105.602725, 37.076636], //初始化地图中心点位置
          mapStyle: "amap://styles/a553025ba8c995afb0060776a83b1543",
        });

        if (this.map) {
          let mkicon = new AMap.Icon({
            size: new AMap.Size(32, 32), //图标大小
            image: require("@/assets/images/location.png"), // Icon
            imageOffset: new AMap.Pixel(0, 0), //用于雪碧图的偏移量控制
            imageSize: new AMap.Size(32, 32), //图片大小
          });

          this.locationList.forEach((element) => {
            // 创建一个 Marker 实例：
            let marker = new AMap.Marker({
              position: new AMap.LngLat(element.longitude, element.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              offset: new AMap.Pixel(-16, -32),
              title: element.name,
              icon: mkicon,
            });

            // 将创建的点标记添加到已有的地图实例：
            (this.map as any).add(marker);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  initData(){
      let guangfuDataList:any = [];
      let chunengDataList :any= [];
      let socList:any =[];
      for(let i = 0; i < 12*24; i++) {  
       let hour = Math.floor(i/12);
       if((hour < 8)|| (hour > 17))
       {
          guangfuDataList.push(0);
          chunengDataList.push(0);
       }
       else
       {
          let rizhao = hour - 13;//日照强度 -5 -> 4
          if(rizhao > 0) {rizhao *= (-1);}
          rizhao += 6;
          let guanfu = Math.floor(Math.random() * 80) + (80 * rizhao);
          let chuneng = Math.floor(Math.random() * 70) + (60 * rizhao);
          if(chuneng >= guanfu) { chuneng -= 30; }
          guangfuDataList.push(guanfu);
          chunengDataList.push(chuneng);
       }
       socList.push(Math.floor(Math.random() * 10) + 80);
       this.timeList.push(hour + '');  
    }
   
    this.$set(this.seriesDataKw[0], "data", guangfuDataList)
    this.$set(this.seriesDataKw[1], "data", chunengDataList)
    this.$set(this.seriesDataSoc[0], "data",socList)
    
  }
}
</script>
<style lang="scss" scoped>
.big_screen {
  width: 100%;
  height: 100%;
  background: #151a59;
  box-sizing: border-box;
  .header_box {
    height: 56px;
    line-height: 56px;
    background: #1d53ac;
    border-bottom: 4px solid #2ac2ff;
    color: #fff;
    text-align: center;
    position: relative;
    img {
      height: 27px;
      position: absolute;
      left: 20px;
      top: 15px;
    }
    span {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .select_box {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    ::v-deep .el-input__inner {
      background-color: transparent !important;
      color: #d9d9d9;
      height: 30px;
    }
    /**修改边框和字体颜色 */
    ::v-deep .el-select {
      position: relative;
      width: 250px;
      .el-input {
        input {
          height: 30px;
          border-color: rgba(44, 137, 229, 0.5);
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
  .con_box {
    padding: 0 20px 20px 20px;
    height: calc(100% - 100px);
    // background: #151a59;
    box-sizing: border-box;
    ::v-deep .el-row,
    .el-col {
      height: 100%;
    }
    .flex_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .box {
      height: 32%;
      border: 1px solid #1e61bc;
      background: -webkit-linear-gradient(
        top,
        rgb(27, 68, 150),
        rgb(23, 29, 99)
      );
      .zl_item {
        display: flex;
        // justify-content: center;
        align-items: center;
        height: 28px;
        p {
          width: 64%;
          color: #c9d7f8;
          text-align: right;
          font-size: 16px;
        }
        span {
          width: 36%;
          text-align: left;
          font-size: 18px;
          color: #1bcffc;
          b {
            color: #95b2f0;
            font-size: 14px;
          }
        }
      }
      .text_box {
        height: calc(100% - 36px);
        .t_text {
          height: 45%;
          background: url("../../assets/images/zl_flash.png") no-repeat 15px
            center;
          background-size: 50px 50px;
        }
        .b_text {
          height: 55%;
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
            img{
                width: 44px;
                height: 44px;
            }
            b{
                margin: 10px 0;
                font-size: 22px;
            }
            span{
                font-size:14px;
                color:#95b2f0;
            }
          }
         
        }
      }
    }
    .center_box {
      border: 1px solid #1e61bc;
      height: 100%;
      background: -webkit-linear-gradient(
        top,
        rgb(27, 68, 150),
        rgb(23, 29, 99)
      );
    }
    .title {
      height: 36px;
      line-height: 36px;
      padding-left: 10px;
      text-align: left;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      background: linear-gradient(
        to right,
        rgba(30, 97, 188, 0.8) 0%,
        rgba(27, 68, 150, 0.1) 100%
      );
    }
  }
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
</style>