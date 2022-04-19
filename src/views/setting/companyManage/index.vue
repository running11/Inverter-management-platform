<template>
  <div class="company-manage-wrapper">
    <div class="title-box">
      <div class="title">公司管理</div>
      <div class="toolbar-right">
        <el-button type="primary" @click="showDialog('add')">新增</el-button>
      </div>
    </div>
    <tree-table
      rowKey="compyId"
      :theadColumns="theadColumns"
      :tableList="list"
      :isOperate="true"
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
      @fetchData="getList"
    ></company-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TreeTable from "@/components/treeTable/index.vue";
import CompanyDialog from "@/views/setting/companyManage/components/dialog.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
import service from "@/utils/request";

interface ICompany {
  compyName: string;
  address: string;
  contactPerson: string;
  contactMethod: string;
  compyDescription: string;
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
      field: "compyName",
    },
    {
      text: "公司地址",
      field: "address",
    },
    {
      text: "联系人",
      field: "contactPerson",
    },
    {
      text: "联系方式",
      field: "contactMethod",
    },
    {
      text: "公司描述",
      field: "compyDescription",
    },
  ];
  list: ITableList = [];

  created(): void{
    this.getList();
  }

  getList(): void{
     service({
      method: "get",
      url: "/api/business/EmsCompany/treeList",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log(res.data, 111);
          let list = res.data.data || [];
          this.list = list;
          console.log("公司列表", list);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  toUserManage(): void {
    this.$router.push("/setting/userManage");
  }
  toProjectManage(): void {
    this.$router.push("/setting/projectManage");
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
      compyId: undefined,
      parentId: 0,
      ancestors: "",
      compyName: "",
      compyDescription: "",
      address: "",
      contactPerson: "",
      contactMethod: "",
      orderNum: 0,
      website: "",
      status: "0",
      recordNumber: "",
      homeTitle: "",
      homeLogo: "",
      dashboardTitle: "",
      dashboardLogo: "",
      remark: ""
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
