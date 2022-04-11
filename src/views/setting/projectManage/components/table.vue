<template>
  <div class="details-wrapper">
    <div class="title-box">
      <div class="title"></div>
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
        <template slot="setup">
          <el-button type="primary" plain @click="toProjectConfig"
            >项目配置</el-button
          >
        </template>
      </table-custom>

      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
    <project-dialog
      ref="projectDialog"
      :title="dialogType"
      :current-project="currentProject"
    ></project-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";
import TableCustom from "@/components/table/index.vue";
import projectDialog from "./dialog.vue";
interface IProject {
  projectName: string;
  companyName: string;
  powerStationName: string;
  connectionTime: string;
  contacts: string;
  phone: string;
}
@Component({
  components: {
    TableCustom,
    projectDialog,
  },
})
export default class projectTable extends Vue {
  currentProject: IProject | any = {};
  dialogType = "新增项目";

  theadColumns: ITheadColums[] = [
    {
      text: "项目名称",
      field: "projectName",
    },
    {
      text: "所属公司",
      field: "companyName",
    },
    {
      text: "电站名称",
      field: "powerStationName",
    },
    {
      text: "并网时间",
      field: "connectionTime",
    },
    {
      text: "联系人",
      field: "contacts",
    },
    {
      text: "联系方式",
      field: "phone",
    },
    {
      text: "设置",
      field: "setup",
      slot: true,
    },
  ];

  list: ITableList[] = [
    {
      projectName: "001",
      companyName: "正泰公司",
      powerStationName: "滨江园区测试站",
      connectionTime: "2020-10-21",
      contacts: "张三",
      phone: "15647895489",
    },
    {
      projectName: "002",
      companyName: "正泰公司",
      powerStationName: "滨江园区测试站",
      connectionTime: "2020-10-21",
      contacts: "李四",
      phone: "15647895489",
    },
    {
      projectName: "003",
      companyName: "正泰公司",
      powerStationName: "滨江园区测试站",
      connectionTime: "2020-06-21",
      contacts: "李四",
      phone: "15647895489",
    },
  ];
  mounted(): void {
    this.$nextTick((): void => {
      (this.$refs.table as any).operationVisible = true;
    });
  }
  //显示对话框
  showDialog(type: string, row?: IProject): void {
    let obj: any = {
      add: "新增项目",
      edit: "修改项目",
    };
    this.dialogType = obj[type];
    this.currentProject = {};
    (this.$refs.projectDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(row);
  }
  loadDailogData(row?: IProject): void {
    let defaultData: IProject = {
      projectName: "",
      companyName: "",
      powerStationName: "",
      connectionTime: "",
      contacts: "",
      phone: "",
    };
    this.currentProject = row || defaultData;
  }
  //修改
  handleModify(item: IProject) {
    // console.log(item, "修改");
    this.showDialog("edit", item);
  }
  //删除
  handleDeleteBtn(item: IProject): void {
    // console.log(item, "删除");
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
  //项目配置
  toProjectConfig(): void {
    this.$router.push("/projectConfig");
  }
}
</script>
<style lang="scss" scoped>
.details-wrapper {
  padding: 0 20px 20px 20px;
  background-color: $white;
  .title-box {
    padding: 0 0 20px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      line-height: 36px;
    }
  }
  .table-wrapper {
    background: $white;
    padding: 0 0 20px;
    .pagination-box {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
