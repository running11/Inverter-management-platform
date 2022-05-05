<template>
  <div>
    <div class="search-wrapper">
      <el-form :inline="true" :model="form" ref="searchForm">
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
          <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button class="add-btn" type="primary" @click="showDialog('add')">新增</el-button>
    </div>
    <div class="table-wrapper">
      <e-table
        :tableCloumns="theadColumns"
        :tableData="list"
      ></e-table>
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :page-size="pageSize"
          :current-page="page"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <device-dialog
      ref="deviceDialog"
      :title="deviceDialogTitle"
      :current-device="currentDevice"
      @fetchData="fetchData"
    ></device-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IOption, ITheadColums, ITableList } from "@/utils/interface";
import ETable from "@/components/eTable/index.vue";
import DeviceDialog from "@/views/projectDetails/deviceList/components/dialog.vue";
import service from "@/utils/request";
import moment from 'moment';
import { Form } from "element-ui";

interface IDevice {
  devName: string;
  devSn: string;
  devAddress: string;
  devType: undefined | number | string;
  devModel: string;
  [propName: string]: any;
}

@Component({
  components: {
    ETable,
    DeviceDialog
  },
})
export default class DeviceList extends Vue {
  private projectId:any = "";
  private total = 0;
  private page = 1;
  private pageSize = 10;
  deviceDialogTitle = '';
  currentDevice: any = null;
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
      text: "设备名称",
      field: "devName",
    },
    {
      text: "设备sn",
      field: "devSn",
    },
    {
      text: "设备地址",
      field: "devAddress",
    },
    {
      text: "设备类型",
      field: "devType",
    },
    {
      text: "设备型号",
      field: "devModel",
    },
    {
      text: "生产厂家",
      field: "company",
    },
    {
      text: "品牌",
      field: "brand",
    },
    {
      text: "安装时间",
      field: "installTime",
      slot: true,
      render: (h: any, params: any) => {
        if(params.row.installTime.toString().length > 10) {
          return h('div', moment(params.row.installTime).format("YYYY-MM-DD"))
        }else{
          return h('div', '')
        }
      }
    },
    {
      text: "网关sn",
      field: "gatewaySn",
    },
    {
      text: "设备分组",
      field: "devGroup",
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      render: (h: any, params: any) => {
        return h("div", {}, [h("i", {
          class: "icon el-icon-edit",
          on: {
            click: () => {
              this.showDialog('edit', params.row);
            },
          },
        }), h("i", {
          class: "icon el-icon-delete",
          on: {
            click: () => {
              console.log(params, `pppppp`)
              this.handleDetele(params.row);
            },
          },
        })]);
      },
    },
  ];
  list: ITableList[] = [];

  created(): void{
    this.projectId = this.$route.query.id; // projectId
    this.fetchData();
  }

  fetchData(): void{
    const paramsData = {
      DevId: 1,
      ProjectId: this.projectId || 1,
      DevName: this.form.deviceName,
      DevSn: this.form.SNNumber,
      DevAddress: "",
      DevType: "",
      DevModel: "",
      Company: "",
      Brand: "",
      InstallTime: "",
      GatewaySn: "",
      DevGroup: "",
      PageNum: this.page,
      PageSize: this.pageSize,
      Sort: "",
      SortType: "ascending"
    };
    service({
      method: "get",
      url: "/api/business/EmsDevice/list",
      params: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          this.list = res.data.data.result || [];
          this.total = res.data.data.totalNum || 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCurrentChange(val: number): void {
    this.page = val;
    this.fetchData();
  }
  resetForm(): void{
    this.form = {
      deviceType: "",
      deviceName: "",
      SNNumber: "",
    };
    if (this.$refs['searchForm']) {
      (this.$refs['searchForm'] as Form).resetFields();
    }
  }
  showDialog(type: string, row: IDevice): void {
    let obj: any = {
      add: "新增设备",
      edit: "修改设备",
    };
    this.deviceDialogTitle = obj[type];
    this.currentDevice = {};
    (this.$refs.deviceDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(JSON.parse(JSON.stringify(row)));
  }
  loadDailogData(row?: IDevice): void {
    let defaultData: IDevice = {
      devId: undefined,
      projectId: Number(this.projectId),
      devName: "",
      devSn: "",
      devAddress: "",
      devType: undefined,
      devModel: "",
      company: "",
      brand: "",
      installTime: undefined,
      gatewaySn: "",
      devGroup: ""
    };
    this.currentDevice = row || defaultData;
  }
  handleDetele(row: any): void{
    console.log(row, `rrrr`)
    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      service({
        method: "delete",
        url: `/api/business/EmsDevice/${row.devId}`,
      }).then((res) => {
        if (res && res.data.code === 200) {
          this.$message({
            message: "删除成功",
            center: true,
            type: "success"
          });
          this.fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  justify-content: space-between;
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
