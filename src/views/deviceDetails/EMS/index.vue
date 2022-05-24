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
          <div class="item-box">
            <div
              class="item2"
              v-for="(item, index) in realTimeList"
              :key="index"
            >
              <i class="iconImg"><img :src="item.iconUrl" alt="" /></i>
              <!-- EMS启停状态 0-开启 1停止 -->
              <span v-if="item.propertyKey === 'VAi87'" style="fontSize: 18px;">
                {{ item.value === 0 ? $t("common.turnOn") : item.value === 1 ? $t("common.stop") : "" }}
              </span>
              <span v-else>
                {{ item.value }}
                <span class="unit">{{item.unit ? item.unit : ""}}</span>
              </span>
              <label>{{ item.desc }}</label>
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
  realTimeList: any = [];
  list: any = [
    {
      label: "VAi87",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "VAi41",
      iconUrl: require("@/assets/images/sbzt.png"),
    },
    {
      label: "VAi22",
      iconUrl: require("@/assets/images/kw.png"),
    },
    {
      label: "VAi86",
      iconUrl: require("@/assets/images/kw.png"),
    }
  ];
  timer: any = null;

  created(): void {
    this.getProperList();
  }
  destroyed(): void {
    clearTimeout(this.timer);
  }

  getProperList(): void{
    const paramsData = {
      sn: "1065602052001",
      code: ["VAi87", "VAi41", "VAi22", "VAi86"],
      pageNum: 1,
      pageSize: 100
    };
    service({
      method: "post",
      url: `/pmapi/Third/Rtd/ProperList`,
      data: paramsData
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log(res.data.data, `拿到point点`);
          let list = res.data.data.result || [];
          for (let i = 0, len = list.length; i < len; i++) {
            this.$set(list[i], 'desc', i18n.t(`EmsDetails.${list[i].propertyKey}`));
            for (let j = 0, len2 = this.list.length; j < len2; j++) {
              if (list[i].propertyKey === this.list[j].label) {
                this.$set(list[i], 'iconUrl', this.list[j].iconUrl);
              }
            }
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
      url: `/pmapi/Third/Rtd/DeviceData`,
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
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.getRealTimeData();
        }, 2 * 60 * 1000);
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
