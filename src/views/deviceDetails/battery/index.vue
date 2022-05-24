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
          <!-- <el-row>
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
          </el-row> -->
          <div class="item2" v-for="(item,index) in realTimeList" :key="index">
                <i class="iconImg"
                  ><img src="@/assets/images/sbzt.png" alt=""
                /></i>
                <span v-if=" item.propertyKey =='Status'">{{item.value | getStatusText}}</span>
                <span v-else>{{item.value}} <span class="unit">{{item.unit}}</span></span>
                <label>{{item.desc}}</label>
            </div>
        </div>
      </div>
      <!-- 电池簇数据 -->
      <div class="box-card">
        <span class="title"><b>电池簇数据</b></span>
        <div class="box">
          <!-- <el-card class="item-box" shadow="hover">
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
          </el-card> -->
          <el-card
            class="item-box"
            shadow="hover"
            v-for="(item, index) in batteryList"
            :key="index"
          >
            <div slot="header" class="header-text">
              <span>簇号{{index}}</span>
            </div>
            <div class="right">
              <div class="item" v-if="item.status">
                <label for="">{{item.status.desc}}</label>
                <span class="green">{{item.status.value| getStatusText}}</span>
              </div>
              <div class="item" v-if="item.voltage">
                <label for="">{{item.voltage.desc}}</label>
                <span>{{item.voltage.value}}<span>V</span></span>
              </div>
              <div class="item" v-if="item.current">
                <label for="">{{item.current.desc}}</label>
                <span>{{item.current.value}}<span>{{item.current.unit}}</span></span>
              </div>
              <!-- <div class="item">
                <label for="">电芯SOC</label>
                <span>20<span>%</span></span>
              </div> -->
              <div class="battery" v-if="item.Vmax && item.VmaxNo">
                <div class="item">
                  <label for="">{{item.Vmax.desc}}</label>
                  <span>{{item.Vmax.value}}<span>{{item.Vmax.unit}}</span></span>
                </div>
                <div class="item">
                  <label for="">{{item.VmaxNo.desc}}</label>
                  <span>{{item.VmaxNo.value}}</span>
                </div>
              </div>
              <div class="battery" v-if="item.Vmin && item.VminNo">
                <div class="item">
                  <label for="">{{item.Vmin.desc}}</label>
                  <span>{{item.Vmin.value}}<span>{{item.Vmin.unit}}</span></span>
                </div>
                <div class="item">
                  <label for="">{{item.VminNo.desc}}</label>
                  <span>{{item.VminNo.value}}</span>
                </div>
              </div>
              <div class="battery" v-if="item.Tmax && item.TmaxNo">
                <div class="item">
                  <label for="">{{item.Tmax.desc}}</label>
                  <span>{{item.Tmax.value}}<span>{{item.Tmax.unit}}</span></span>
                </div>
                <div class="item">
                  <label for="">{{item.TmaxNo.desc}}</label>
                  <span>{{item.TmaxNo.value}}</span>
                </div>
              </div>
              <div class="battery" v-if="item.Tmin && item.TminNo">
                <div class="item">
                  <label for="">{{item.Tmin.desc}}</label>
                  <span>{{item.Tmin.value}}<span>{{item.Tmin.unit}}</span></span>
                </div>
                <div class="item">
                  <label for="">{{item.TminNo.desc}}</label>
                  <span>{{item.TminNo.value}}</span>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicInfo from "../components/basicInfo.vue";
import service from "@/utils/request";
import i18n from "@/language";
import { handleArrDimension } from "@/utils";
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
  filters:{
    getStatusText: function(val:string | number){
      if (val =="0") return i18n.t(`BatteryDetails.StaVal0`);
      if (val =="1") return i18n.t(`BatteryDetails.StaVal1`);
      if (val =="2") return i18n.t(`BatteryDetails.StaVal2`);
      if (val =="3") return i18n.t(`BatteryDetails.StaVal3`);
      if (val =="4") return i18n.t(`BatteryDetails.StaVal4`);
    }
  }
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
  //参数表
  paramList: any = [
  "Status",
  "CapacityKwh",
  "Power",
  "Voltage",
  "Current",
  "SOC",
  "SOH",
  "Vmax",
  "Vmin",
  "Tmax",
  "Tmin",
  "GroupNum",
];
  //实时数据
  realTimeList: any = [];
  //电池数据
  batteryList: any = [];
  timer:any = null;
  created() {
  this.getProperList("1065602052005", this.paramList)
  // this.timer= setInterval(()=>{
  // this.getProperList("1065602052005", this.paramList)
  //    }, 3000);
    
  }
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
    
  }
//获取实时数据
  getProperList(sn: string, code: any): void {
    const paramsData = {
      sn: sn,
      code: code,
    };
    service({
      method: "post",
      url: "/pmapi/Third/Rtd/ProperList",
      data: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          //console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];
          console.log(list, "111");
          for (let i = 0, len = list.length; i < len; i++) {
            //console.log(list[i].propertyKey, "实时数据");
            this.$set(
              list[i],
              "desc",
              i18n.t(`BatteryDetails.${list[i].propertyKey}`)
            );
          }
          this.realTimeList = list;
          this.getEMSRealTimeData(sn, code);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getEMSRealTimeData(sn: string, code: any): void {
    service({
      method: "post",
      url: "/pmapi/Third/Rtd/DeviceData",
      data: {
        sn: sn,
        keys: code,
      },
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = JSON.parse(res.data.data) || [];
          let newList = handleArrDimension(list);
          // console.log(newList, "222");
          for (let i = 0, len = this.realTimeList.length; i < len; i++) {
            for (let j = 0, len2 = newList.length; j < len2; j++) {
              // 两个接口返回的值不一样，转为小写比较
              if (this.realTimeList[i]["propertyKey"].toLowerCase() ===newList[j]["key"].toLowerCase()) {
                this.$set(this.realTimeList[i], "value", newList[j]["value"]);
              }
            }
          }
        }
        console.log(this.realTimeList, `最终的实时数据`);
        this.createPointTable();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //生成点表，请求电池数据
  createPointTable() {
    let retarray: any = [];
    this.realTimeList.forEach((item: any) => {
      if (item.propertyKey == "GroupNum") {
        console.log(item.value, "电池组数量");
        for (let i = 1; i <= 4; i++) {
          retarray.push("_" + i + "_status");
          retarray.push("_" + i + "_voltage");
          retarray.push("_" + i + "_current");
          retarray.push("_" + i + "_VmaxNo");
          retarray.push("_" + i + "_Vmax");
          retarray.push("_" + i + "_VminNo");
          retarray.push("_" + i + "_Vmin");
          retarray.push("_" + i + "_TmaxNo");
          retarray.push("_" + i + "_Tmax");
          retarray.push("_" + i + "_TminNo");
          retarray.push("_" + i + "_Tmin");
        }
      }
    });
    console.log(retarray);
    this.getBatteryList("1065602052005", retarray);
  }
  //获取电池数据
  getBatteryList(sn: string, code: any): void {
    const paramsData = {
      sn: sn,
      code: code,
    };
    service({
      method: "post",
      url: "/pmapi/Third/Rtd/ProperList",
      data: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];
          console.log(list, "电池数据111");
          for (let i = 0, len = list.length; i < len; i++) {
            //console.log(list[i].propertyKey, "电池key111111");
            let subPropertyKey = list[i].propertyKey.substring(list[i].propertyKey.indexOf('_', 1) + 1);
            this.$set(
              list[i],
              "desc",
              i18n.t(`BatteryDetails.${subPropertyKey}`)
              
            );
            this.$set(
              list[i],
              "mykey",
              subPropertyKey
            );
          }
          //this.batteryList = list;
          this.getBatteryData(sn, code, list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBatteryData(sn: string, code: any, btList: any): void {
    service({
      method: "post",
      url: "/pmapi/Third/Rtd/DeviceData",
      data: {
        sn: sn,
        keys: code,
      },
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = JSON.parse(res.data.data) || [];
          // console.log(list, "电池222");
          let newList = handleArrDimension(list);
          // console.log(newList, "电池2222");
          for (let i = 0, len = btList.length; i < len; i++) {
            for (let j = 0, len2 = newList.length; j < len2; j++) {
              // 两个接口返回的值不一样，转为小写比较
              if (
                btList[i]["propertyKey"].toLowerCase() ===
                newList[j]["key"].toLowerCase()
              ) {
                this.$set(btList[i], "value", newList[j]["value"]);
              }
            }
          }
        }

        this.batteryList = this.dataFormat(btList);
        // console.log(this.batteryList, `最终的数据电池数据`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //数据整理数据格式
  dataFormat(arr: any) {
    let newArr: any = []; //存结果
    let newArrStr = []; //存索引
    for (let i = 0; i < arr.length; i++) {
      let idxstr = arr[i].propertyKey;
      idxstr = idxstr.substring(0, idxstr.indexOf("_", 1));
      if (newArrStr.indexOf(idxstr) < 0) {
        newArrStr.push(idxstr);
        newArr.push({});
      }
      this.$set(newArr[newArrStr.indexOf(idxstr)], arr[i].mykey, arr[i]);
      //newArr[newArrStr.indexOf(idxstr)].push(arr[i]);
    }
    return newArr;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
.data-box{
  .item2{
    width:20% !important;
  }
}
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
