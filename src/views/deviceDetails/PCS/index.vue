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
          <!-- <el-row :gutter="10">
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
                <label>总发电量<span>（kwh）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dianl.png" alt=""
                /></i>
                <span>30</span>
                <label>日发电量<span>（kwh）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>50</span>
                <label>直流电流<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>5</span>
                <label>A相电流<span>（A）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>6</span>
                <label>B相电流<span>（A）</span></label>
              </div>

              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dl.png" alt=""
                /></i>
                <span>7</span>
                <label>C相电流<span>（A）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>直流电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>AB线电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>BC线电压<span>（V）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/dy.png" alt=""
                /></i>
                <span>220</span>
                <label>CA线电压<span>（V）</span></label>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>30</span>
                <label>模块温度<span>（℃）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>35</span>
                <label>变压器温度 <span>（℃）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/wd.png" alt=""
                /></i>
                <span>32</span>
                <label>内部温度<span>（℃）</span></label>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/kw.png" alt=""
                /></i>
                <span>30</span>
                <label>有功功率<span>（kw）</span></label>
              </div>
              <div class="item2">
                <i class="iconImg"
                  ><img src="@/assets/images/pl.png" alt=""
                /></i>
                <span>100</span>
                <label>频率<span>（Hz）</span></label>
              </div>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="item.colNum" v-for="(item, index) in UIConfigList" :key="index">
              <div class="item2" v-for="(row, j) in item.arr" :key="j">
                <i class="iconImg">
                  <img :src="row.iconUrl" alt=""/>
                </i>
                <span>
                  {{row.value}}
                  <span class="unit">{{row.unit}}</span>
                </span>
                <label>{{row.desc}}</label>
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
})
export default class PcsDetails extends Vue {
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
  //界面配置
  UIConfigList: any = [
    {
      colNum: 4,
      arr: [
        {
          lable: "Battery_current",
          iconUrl: require("@/assets/images/dl.png"),
        },
        {
          lable: "Ia",
          iconUrl: require("@/assets/images/dl.png"),
        },
        {
          lable: "Ib",
          iconUrl: require("@/assets/images/dl.png"),
        },
        {
          lable: "Ic",
          iconUrl: require("@/assets/images/dl.png"),
        },
      ],
    },
    {
      colNum: 4,
      arr: [
        {
          lable: "Battery_voltage",
          iconUrl: require("@/assets/images/dy.png"),
        },
        {
          lable: "Uab",
          iconUrl: require("@/assets/images/dy.png"),
        },
        {
          lable: "Ubc",
          iconUrl: require("@/assets/images/dy.png"),
        },
        {
          lable: "Uca",
          iconUrl: require("@/assets/images/dy.png"),
        },
      ],
    },
    {
      colNum: 4,
      arr: [
        {
          lable: "T_charPkwh",
          iconUrl: require("@/assets/images/dianl.png"),
        },
        {
          lable: "T_discharPkwh",
          iconUrl: require("@/assets/images/dianl.png"),
        },
        {
          lable: "D_discharPkwh",
          iconUrl: require("@/assets/images/dianl.png"),
        },
      ],
    },
    {
      colNum: 4,
      arr: [
        {
          lable: "DC_power",
          iconUrl: require("@/assets/images/kw.png"),
        },
        {
          lable: "Ps",
          iconUrl: require("@/assets/images/kw.png"),
        },
        {
          lable: "Qs",
          iconUrl: require("@/assets/images/kw.png"),
        },
      ],
    },
    {
      colNum: 4,
      arr: [
        {
          lable: "Tamb",
          iconUrl: require("@/assets/images/wd.png"),
        },
        {
          lable: "Tmod",
          iconUrl: require("@/assets/images/wd.png"),
        },
      ],
    },
    {
      colNum: 4,
      arr: [
        {
          lable: "Frequent",
          iconUrl: require("@/assets/images/pl.png"),
        },
        {
          lable: "Pf",
          iconUrl: require("@/assets/images/pl.png"),
        },
      ],
    },
  ];
  realTimeList: any = [];
  created(): void {
    this.getProperList();
  }
  getProperList(): void {
    const paramsData = {
      sn: "1065602052002",
      code: [
        "T_charPkwh",
        "T_discharPkwh",
        "D_discharPkwh",
        "D_discharPkwh",
        "Ia",
        "Ib",
        "Ic",
        "Uab",
        "Ubc",
        "Uca",
        "Ps",
        "Qs",
        "Frequent",
        "Pf",
        "DC_power",
        "Battery_current",
        "Battery_voltage",
        "Tmod",
        "Tamb",
      ],
    };
    service({
      method: "post",
      url: "/api2/api/Third/Rtd/ProperList",
      data: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];

          for (let i = 0, len = list.length; i < len; i++) {
            // console.log(list[i].propertyKey,"111111")
            this.$set(
              list[i],
              "desc",
              i18n.t(`PcsDetails.${list[i].propertyKey}`)
            );
          }
          this.realTimeList = list;
          this.getPCSRealTimeData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getPCSRealTimeData(): void {
    service({
      method: "post",
      url: "/api2/api/Third/Rtd/DeviceData",
      data: {
        sn: "1065602052002",
        keys: [
          "T_charPkwh",
          "T_discharPkwh",
          "D_discharPkwh",
          "D_discharPkwh",
          "Ia",
          "Ib",
          "Ic",
          "Uab",
          "Ubc",
          "Uca",
          "Ps",
          "Qs",
          "Frequent",
          "Pf",
          "DC_power",
          "Battery_current",
          "Battery_voltage",
          "Tmod",
          "Tamb",
        ],
      },
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = JSON.parse(res.data.data) || [];
          let newList = handleArrDimension(list);
          console.log(newList, "2222");
          for (let i = 0, len = this.realTimeList.length; i < len; i++) {
            for (let j = 0, len2 = newList.length; j < len2; j++) {
              // 两个接口返回的值不一样，转为小写比较
              if (
                this.realTimeList[i]["propertyKey"].toLowerCase() ===
                newList[j]["key"].toLowerCase()
              ) {
                // this.$set(this.realTimeList[i], "value", newList[j]["value"].toFixed(1));
                let pointIdx = newList[j]["value"].toString().indexOf(".");
                this.$set(this.realTimeList[i], "value", (pointIdx >= 0)?(newList[j]["value"].toFixed(1)):(newList[j]["value"]));
              }
            }
          }
        }
        console.log(this.realTimeList, `最终的数据`);
        this.handleRealData();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //数据整理数据格式
  handleRealData(): void {
    for (let i = 0, len = this.UIConfigList.length; i < len; i++) {
      for (let j = 0, len2 = this.UIConfigList[i].arr.length; j < len2; j++) {
        // console.log(this.UIConfigList[i].arr[j], `jjjj`);
        for (let z = 0, len3 = this.realTimeList.length; z < len3; z++) {
          if (
            this.realTimeList[z]["propertyKey"].toLowerCase() ===
            this.UIConfigList[i].arr[j]["lable"].toLowerCase()
          ) {
            this.UIConfigList[i].arr[j] = Object.assign(
              {},
              this.UIConfigList[i].arr[j],
              this.realTimeList[z]
            );
          }
        }
      }
    }
    console.log(this.UIConfigList, `xxxxxxxxxx`);
    this.$forceUpdate();
  }
 
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";

</style>
