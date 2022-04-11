<template>
  <div class="main-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>设备中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{ titleText }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-box">
      <el-form :inline="true" :model="deviceForm" class="">
        <el-form-item label="设备名称" style="margin-right: 20px">
          <el-input
            v-model="deviceForm.deviceName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="SN号" style="margin-right: 20px">
          <el-input
            v-model="deviceForm.snNumber"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrapper">
      <table-custom :theadColumns="theadColumns" :tableList="list">
        <template slot="projectName" slot-scope="scope">
          <el-button type="text" @click="toProjectDetails">{{
            scope.value
          }}</el-button>
        </template>
        <template slot="specialOperation">
          <el-button type="primary" plain @click="toDetails">详情</el-button>
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
import TableCustom from "@/components/table/index.vue";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component({
  components: {
    TableCustom,
  },
})
export default class deviceTable extends Vue {
  theadColumns: ITheadColums[] = [
    {
      text: "通信状态",
      field: "communicateStatus",
    },
    {
      text: "设备名称",
      field: "deviceName",
    },
    {
      text: "SN号",
      field: "snNumber",
    },

    {
      text: "型号",
      field: "model",
    },

    {
      text: "品牌",
      field: "brand",
    },
    {
      text: "厂家",
      field: "manufactor",
    },
    {
      text: "项目",
      field: "projectName",
      slot: true,
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
    },
  ];
}
</script>
<style lang="scss" scoped>
.search-box {
  margin: 20px 0;
  background: $white;
  padding: 15px 20px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.table-wrapper {
  background-color: $white;
  padding: 20px;

  .pagination-box {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
