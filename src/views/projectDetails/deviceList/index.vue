<template>
  <div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="form">
        <el-form-item label="设备类型">
          <el-select v-model="form.deviceType" placeholder="请选择">
            <el-option
              v-for="item in deviceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input
            v-model="form.deviceName"
            placeholder="请输入设备名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="SN">
          <el-input v-model="form.SNNumber" placeholder="请输入SN号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <table-custom :theadColumns="theadColumns" :tableList="list">
        <template slot="status" slot-scope="scope">
          <i :class="['iconfont icon-bianzu', { online: scope.value }]"></i>
        </template>
        <template slot="police" slot-scope="scope">
          <i :class="['iconfont icon-bianzu', { online: scope.value }]"></i>
        </template>
        <template slot="specialOperation">
          <el-button type="primary" plain>详情</el-button>
        </template>
      </table-custom>
      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IOption, ITheadColums, ITableList } from "@/utils/interface";
import TableCustom from "@/components/table/index.vue";

@Component({
  components: {
    TableCustom,
  },
})
export default class DeviceList extends Vue {
  form: any = {
    deviceType: "",
    deviceName: "",
    SNNumber: "",
  };
  deviceList: IOption[] = [
    {
      value: 1,
      label: "设备1",
    },
    {
      value: 2,
      label: "设备2",
    },
  ];
  theadColumns: ITheadColums[] = [
    {
      text: "通信状态",
      field: "status",
      slot: true,
    },
    {
      text: "设备名称",
      field: "deviceName",
    },
    {
      text: "设备类型",
      field: "deviceType",
    },
    {
      text: "软件版本号",
      field: "softwareVersion",
    },
    {
      text: "设备型号",
      field: "deviceModel",
    },
    {
      text: "生产厂家",
      field: "manufacturer",
    },
    {
      text: "SN",
      field: "SN",
    },
    {
      text: "所属网关",
      field: "gateway",
    },
    {
      text: "分组",
      field: "group",
    },
    {
      text: "报警",
      field: "police",
      slot: true,
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
    },
  ];
  list: ITableList[] = [
    {
      status: true,
      deviceName: "设备xxx",
      deviceType: "网关",
      softwareVersion: "V1.0.0",
      deviceModel: "设备型号",
      manufacturer: "正泰",
      SN: "SN",
      gateway: "网关",
      group: "组",
      police: true,
    },
    {
      status: false,
      deviceName: "设备xxx",
      deviceType: "网关",
      softwareVersion: "V1.0.0",
      deviceModel: "设备型号",
      manufacturer: "正泰",
      SN: "SN",
      gateway: "网关",
      group: "组",
      police: true,
    },
    {
      status: false,
      deviceName: "设备xxx",
      deviceType: "网关",
      softwareVersion: "V1.0.0",
      deviceModel: "设备型号",
      manufacturer: "正泰",
      SN: "SN",
      gateway: "网关",
      group: "组",
      police: true,
    },
  ];
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  margin: 20px 0;
  background: $white;
  padding: 15px 20px;
  ::v-deep.el-form-item {
    margin-bottom: 0;
    margin-right: 20px;
  }
}
.table-wrapper {
  background: $white;
  padding: 15px 20px;
  .icon-bianzu {
    font-size: 18px;
    color: #cccccc;
  }
  .online {
    color: #00cc00;
  }
  .pagination-box {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
