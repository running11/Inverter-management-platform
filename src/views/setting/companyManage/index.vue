<template>
  <div class="company-manage-wrapper">
    <div class="title-box">
      <div class="title">公司管理</div>
      <div class="toolbar-right">
        <el-button type="primary" @click="showDialog('add')">新增</el-button>
      </div>
    </div>
    <tree-table
      :theadColumns="theadColumns"
      :tableList="list"
      :isOperate="true"
      @getLoadList="getLoadList"
    >
      <template slot-scope="data">
        <i class="icon el-icon-edit" @click="showDialog('edit', data.row)"></i>
        <i class="icon el-icon-delete" @click="handleDetele(data.row)"></i>
        <i class="iconfont icon-yonghu" @click="toUserManage"></i>
        <i class="iconfont icon-xiangmu" @click="toProjectManage"></i>
      </template>
    </tree-table>

    <company-dialog
      ref="companyDialog"
      :title="companyDialogTitle"
      :current-company="currentCompany"
    ></company-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TreeTable from "@/components/treeTable/index.vue";
import CompanyDialog from "@/views/setting/companyManage/components/dialog.vue";
import { ITheadColums, ITableList } from "@/utils/interface";

interface ICompany {
  companyName: string;
  companyAddress: string;
  phoneNumber: string;
  companyDesc: string;
  [propName: string]: any;
}

@Component({
  components: {
    TreeTable,
    CompanyDialog,
  },
})
export default class CompanyManage extends Vue {
  companyDialogTitle = "新增用户";
  currentCompany: ICompany | any = null;
  theadColumns: ITheadColums[] = [
    {
      text: "公司名称",
      field: "companyName",
    },
    {
      text: "公司地址",
      field: "companyAddress",
    },
    {
      text: "联系方式",
      field: "phoneNumber",
    },
    {
      text: "公司描述",
      field: "companyDesc",
    },
  ];
  list: ITableList = [
    {
      id: 1,
      companyName: "松江电源",
      companyAddress: "上海市松江区松江区",
      phoneNumber: "18801964521",
      companyDesc: "电源电源电源电源电源电源电源电源",
      hasChildren: true,
    },
    {
      id: 2,
      companyName: "松江电源",
      companyAddress: "上海市松江区松江区",
      phoneNumber: "18801964521",
      companyDesc: "电源电源电源电源电源电源电源电源",
      hasChildren: true,
    },
    {
      id: 3,
      companyName: "松江电源",
      companyAddress: "上海市松江区松江区",
      phoneNumber: "18801964521",
      companyDesc: "电源电源电源电源电源电源电源电源",
    },
    {
      id: 4,
      companyName: "松江电源",
      companyAddress: "上海市松江区松江区",
      phoneNumber: "18801964521",
      companyDesc: "电源电源电源电源电源电源电源电源",
    },
    {
      id: 5,
      companyName: "松江电源",
      companyAddress: "上海市松江区松江区",
      phoneNumber: "18801964521",
      companyDesc: "电源电源电源电源电源电源电源电源",
    },
  ];

  toUserManage(): void {
    this.$router.push("/setting/userManage");
  }
  toProjectManage(): void {
    this.$router.push("/setting/projectManage");
  }

  getLoadList(resolve: any): void {
    let num: any = parseInt((Math.random() * 100).toString());
    setTimeout(() => {
      resolve([
        {
          id: Math.random(),
          companyName: `松江电源${num}`,
          companyAddress: "上海市松江区松江区",
          phoneNumber: "18801964521",
          companyDesc: "电源电源电源电源电源电源电源电源",
          hasChildren: true,
        },
        {
          id: Math.random(),
          companyName: "松江电源12",
          companyAddress: "上海市松江区松江区",
          phoneNumber: "18801964521",
          companyDesc: "电源电源电源电源电源电源电源电源",
        },
      ]);
    }, 1000);
  }
  handleDetele(row: ICompany): void {
    this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      // console.log(row, `删除`);
    });
  }

  showDialog(type: string, row: ICompany): void {
    let obj: any = {
      add: "新增公司",
      edit: "修改公司",
    };
    this.companyDialogTitle = obj[type];
    this.currentCompany = {};
    (this.$refs.companyDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(row);
  }
  loadDailogData(row?: ICompany): void {
    let defaultData: ICompany = {
      companyName: "",
      companyAddress: "",
      phoneNumber: "",
      companyDesc: "",
    };
    this.currentCompany = row || defaultData;
  }
}
</script>
<style lang="scss" scoped>
.company-manage-wrapper {
  background-color: $white;
  padding: 20px 20px;
  .title-box {
    padding: 0 0 20px;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      line-height: 36px;
    }
  }
  .icon,
  .iconfont {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
  }
  .el-icon-edit {
    color: $main-color;
  }
  .el-icon-delete {
    color: #ff4d4f;
  }
}
</style>
