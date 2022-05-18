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
              <span>{{ item.value }}</span>
              <label
                >{{ item.label
                }}<span>{{
                  item.unitName ? "（" + item.unitName + "）" : ""
                }}</span></label
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
import qs from "qs";
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
  created(): void {
    // console.log("123");
    this.getEMSRealTimeData();
  }

  getEMSRealTimeData(): void {
    service({
      method: "post",
      url: "/api2/api/Third/Rtd/DeviceData",
      params: {
        sn: "1065602052002"
      },
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log(JSON.parse(res.data.data), `第二个服务地址，前面加/api2`);
        }
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
