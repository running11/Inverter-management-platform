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
          <div class="item-box">
            <div
              class="item2"
              v-for="(item, index) in realtimeData"
              :key="index"
            >
              <i class="iconImg"><img :src="item.iconUrl" alt="" /></i>
              <span>
                {{ item.value }}
                <span class="unit">{{item.unitName ? item.unitName : ""}}</span>
              </span>
              <label
                >{{ item.label
                }}</label
              >
            </div>
          </div>
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
export default class emsDetails extends Vue {
  basicData: DataItem[] = [
    {
      label: "EMS版本：",
      value: "1.2",
    },
    {
      label: "WEBAPI版本：",
      value: "1.2",
    },
    {
      label: "WEB界面版本：",
      value: "1.2",
    },
  ];
  realtimeData: DataItem[] = [
    {
      label: "EMS启停状态",
      value: "停用",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "储能离并网状态",
      value: "离网",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "储能充放电功率",
      value: "30",
      iconUrl: require("@/assets/images/kw.png"),
      unitName: "kw",
    },
    {
      label: "光伏发电功率",
      value: "30",
      iconUrl: require("@/assets/images/kw.png"),
      unitName: "kw",
    },
  ];
  realTimeList: any = [];

  created(): void {
    this.getProperList();
  }

  getProperList(): void{
    const paramsData = {
      sn: "1065602052001",
      code: ["VAi87", "VAi41", "VAi22", "VAi86"]
    };
    service({
      method: "post",
      url: "/api2/api/Third/Rtd/ProperList",
      data: paramsData
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];
          for (let i = 0, len = list.length; i < len; i++) {
            this.$set(list[i], 'desc', i18n.t(`EmsDetails.${list[i].propertyKey}`));
          }
          this.realTimeList = list;
          this.getEMSRealTimeData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getEMSRealTimeData(): void {
    service({
      method: "post",
      url: "/api2/api/Third/Rtd/DeviceData",
      data: {
        sn: "1065602052001",
        keys: ["VAi87", "VAi41", "VAi22", "VAi86"]
      }
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = JSON.parse(res.data.data) || [];
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
        console.log(this.realTimeList, `最终的数据`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/device.scss";
</style>
