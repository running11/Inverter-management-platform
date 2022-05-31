<template>
  <div class="main-wrapper">
    <div class="details-wrapper">
      <div class="box-card">
        <span class="title"><b>{{$t("EmsDetails.basicInfo")}}</b></span>
        <basic-info :List="basicData"></basic-info>
      </div>
      <div class="box-card">
        <span class="title"><b>{{$t("EmsDetails.realTimeData")}}</b></span>
        <div class="data-box">
          <el-row :gutter="10">
            <el-col :span="item.colNum" v-for="(item, index) in list" :key="index">
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
  list: any = [
    {
      name: "current",
      colNum: 5,
      arr: [
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
        }
      ]
    },
    {
      name: "voltage",
      colNum: 5,
      arr: [
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
        }
      ]
    },
    {
      name: "power",
      colNum: 5,
      arr: [
        {
          lable: "Ps",
          iconUrl: require("@/assets/images/kw.png"),
        },
        {
          lable: "Qs",
          iconUrl: require("@/assets/images/kw.png"),
        },
        {
          lable: "Pa",
          iconUrl: require("@/assets/images/kw.png"),
        }
      ]
    },
        {
      name: "energy",
      colNum: 5,
      arr: [
        {
          lable: "EpP",
          iconUrl: require("@/assets/images/dianl.png"),
        },
        {
          lable: "EpR",
          iconUrl: require("@/assets/images/dianl.png"),
        }
      ]
    },
    {
      name: "frequency",
      colNum: 4,
      arr: [
        {
          lable: "Pf",
          iconUrl: require("@/assets/images/pl.png"),
        },
        {
          lable: "Fre",
          iconUrl: require("@/assets/images/pl.png"),
        }
      ]
    }
  ];
  realTimeList: any = [];
  timer: any = null;
  destroyed(): void {
    clearTimeout(this.timer);
  }

  created(): void {
    this.getProperList();
  }

  getProperList(): void{
    const paramsData = {
      sn: "1065602052003",
      code: ["Ia", "Ib", "Ic", "Uab", "Ubc", "Uca", "Ps", "Qs", "Pa", "Fre", "Pf", "EpP", "EpR"],
      pageNum: 1,
      pageSize: 100
    };
    service({
      method: "post",
      url: "/dmapi/business/Proxy/ProperList",
      data: paramsData
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];
          for (let i = 0, len = list.length; i < len; i++) {
            this.$set(list[i], 'desc', i18n.t(`electricityMeterDetails.${list[i].propertyKey}`));
          }
          this.realTimeList = list;
          clearTimeout(this.timer);
          this.getRealTimeData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getRealTimeData(): void {
    service({
      method: "post",
      url: "/dmapi/business/Proxy/DeviceData",
      data: {
        sn: "1065602052003",
        keys: ["Ia", "Ib", "Ic", "Uab", "Ubc", "Uca", "Ps", "Qs", "Pa", "Fre", "Pf", "EpP", "EpR"]
      }
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = JSON.parse(res.data.data) || [];
          if (!list.length) return;
          let newList = handleArrDimension(list);
          for (let i = 0, len = this.realTimeList.length; i < len; i++) {
            for (let j = 0, len2 = newList.length; j < len2; j++) {
              // 两个接口返回的值不一样，转为小写比较
              if (this.realTimeList[i]["propertyKey"].toLowerCase() === newList[j]["key"].toLowerCase()) {
                this.$set(this.realTimeList[i], 'value', newList[j]["value"]);
              }
            }
          }
        }
        this.handleRealData();
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.getRealTimeData();
        }, 60 * 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleRealData(): void {
    for (let i = 0, len = this.list.length; i < len; i++) {
      for (let j = 0, len2 = this.list[i].arr.length; j < len2; j++) {
        for(let z = 0, len3 = this.realTimeList.length; z < len3; z++) {
          if (this.realTimeList[z]["propertyKey"].toLowerCase() === this.list[i].arr[j]["lable"].toLowerCase()) {
            this.list[i].arr[j] = Object.assign({}, this.list[i].arr[j], this.realTimeList[z]);
          }
        }
      }
    }
    // console.log(this.list, `llllll`);
    this.$forceUpdate();
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
</style>
