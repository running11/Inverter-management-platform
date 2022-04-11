<template>
  <div class="project-config-wrapper">
    <div class="table-wrapper">
      <div class="title-box">
        <div class="title">
          电站组串总容量（KWP）：<span>{{ totalValue }}</span>
        </div>
        <!-- <div class="toolbar-right">
          <el-button type="primary" @click="handleSetting"
            >组串容量设置</el-button
          >
        </div> -->
      </div>
      <table-custom :theadColumns="theadColumns" :tableList="list">
        <template slot="id" slot-scope="scope">
          <el-button type="primary" plain @click="handleSetting(scope.row)"
            >设置</el-button
          >
        </template>
      </table-custom>
      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
    <set-dialog ref="setDialog" :title="dialogTitle"></set-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";
import TableCustom from "@/components/table/index.vue";
import SetDialog from "./components/dialog.vue";
@Component({
  components: {
    SetDialog,
    TableCustom,
  },
})
export default class stringCapacity extends Vue {
  dialogTitle = "";

  theadColumns: ITheadColums[] = [
    {
      text: "设备名称",
      field: "deviceName",
    },
    {
      text: "设备类型",
      field: "deviceType",
    },
    {
      text: "设备型号",
      field: "deviceModel",
    },
    {
      text: "SN号",
      field: "snNumber",
    },
    {
      text: "组串容量（KWP）",
      field: "stringCapacity",
    },
    {
      text: "组串容量设置",
      field: "id",
      slot: true,
    },
  ];
  //当前的table数据
  list: ITableList[] = [
    {
      id: "1",
      deviceName: "HVB04636",
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
      stringCapacity: "1.25",
    },
    {
      id: "2",
      deviceName: "HVB04889",
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
      stringCapacity: "1.25",
    },
    {
      id: "3",
      deviceName: "HVB04555",
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
      stringCapacity: "1.53",
    },
  ];

  // 组串总容量
  get totalValue() {
    let value = 0;
    this.list.forEach((item: any) => {
      value += parseFloat(item.stringCapacity);
    });
    // console.log(value);
    return value.toFixed(2);
  }

  // 设置
  handleSetting(rows: ITableList): void {
    (this.$refs.setDialog as any).showDialog();
    //  console.log(rows)
    this.dialogTitle = rows.deviceName + "组串容量设置";
  }
}
</script>
<style lang="scss" scoped>
.project-config-wrapper {
  padding: 20px 0;
  .table-wrapper {
    background: $white;
    padding: 20px;
    .title-box {
      // padding: 20px 20px 0 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        line-height: 36px;
      }
    }
    .pagination-box {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
