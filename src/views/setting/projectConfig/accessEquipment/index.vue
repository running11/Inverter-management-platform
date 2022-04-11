<template>
  <div class="project-config-wrapper">
    <div class="details-wrapper">
      <div class="title-box">
        <div class="title">接入设备列表</div>
        <div class="toolbar-right">
          <el-button type="primary" @click="showDialog('add')">新增</el-button>
        </div>
      </div>
      <div class="table-wrapper">
        <table-custom
          :theadColumns="theadColumns"
          :tableList="list"
          ref="table"
          @bindDeleteBtn="handleDeleteBtn"
          @bindEditBtn="handleModify"
        >
        </table-custom>

        <div class="pagination-box">
          <el-pagination background layout="prev, pager, next" :total="100">
          </el-pagination>
        </div>
      </div>
    </div>
    <device-dialog
      ref="deviceDialog"
      :title="dialogType"
      :current-device="currentDevice"
    ></device-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";
import TableCustom from "@/components/table/index.vue";
import deviceDialog from "./components/dialog.vue";
interface IDevice {
  snNumber: string;
  deviceType: string;
  deviceModel: string;
}
@Component({
  components: {
    TableCustom,
    deviceDialog,
  },
})
export default class accessEquipment extends Vue {
  currentDevice: IDevice | any = {};
  dialogType = "新增设备";
  theadColumns: ITheadColums[] = [
    {
      text: "SN号",
      field: "snNumber",
    },
    {
      text: "设备类型",
      field: "deviceType",
    },
    {
      text: "设备型号",
      field: "deviceModel",
    },
  ];

  list: ITableList[] = [
    {
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
    },
    {
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
    },
    {
      snNumber: "003",
      deviceType: "通信模块",
      deviceModel: "SDongleA-03",
    },
  ];
  mounted(): void {
    this.$nextTick((): void => {
      (this.$refs.table as any).operationVisible = true;
    });
  }
  //显示对话框
  showDialog(type: string, row?: IDevice): void {
    let obj: any = {
      add: "新增设备",
      edit: "修改设备",
    };
    this.dialogType = obj[type];
    this.currentDevice = {};
    (this.$refs.deviceDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(row);
  }
  loadDailogData(row?: IDevice): void {
    let defaultData: IDevice = {
      snNumber: "",
      deviceType: "",
      deviceModel: "",
    };
    this.currentDevice = row || defaultData;
  }
  //修改
  handleModify(rows: IDevice) {
    this.showDialog("edit", rows);
  }
  //删除
  handleDeleteBtn(rows: IDevice): void {
    this.$confirm("确认删除该设备吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
}
</script>
<style lang="scss" scoped>
.project-config-wrapper {
  padding: 20px 0;
  .details-wrapper {
    background: $white;
    .title-box {
      padding: 20px 20px 0 20px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        line-height: 36px;
      }
    }
    .table-wrapper {
      background: $white;
      padding: 20px;
      .pagination-box {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>
