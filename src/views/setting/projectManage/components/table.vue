<template>
  <div class="details-wrapper">
    <div class="title-box">
      <div class="title"></div>
      <div class="toolbar-right">
        <el-button type="primary" @click="showDialog('add')">{{$t("common.new")}}</el-button>
      </div>
    </div>
    <div class="table-wrapper">
      <e-table
        :loading="listLoading"
        :tableCloumns="theadColumns"
        :tableData="list"
      >
      </e-table>

      <div class="pagination-box">
        <el-pagination
          v-if="list.length"
          background
          layout="prev, pager, next, total"
          :page-size="pageSize"
          :current-page="page"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 跟首页的新增是公用的 -->
    <home-dialog
      ref="homeDialog"
      :title="dialogTitle"
      :currentProject="currentProject"
      @fetchData="getProjectList"
    >
    </home-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";
import ETable from "@/components/eTable/index.vue";
import HomeDialog from "@/views/home/components/dialog.vue";
import service from "@/utils/request";
import moment from "moment";
import i18n from "@/language";

interface IProject {
  projectName: string;
  plantName: string;
  address: string;
  contactPerson: string;
  contactMethod: string;
  [propName: string]: any;
}
@Component({
  components: {
    ETable,
    HomeDialog
  },
})
export default class projectTable extends Vue {
  @Prop(Number) companyId!: number;
  private listLoading = false;
  compyId = this.companyId;
  dialogTitle = i18n.t(`projectManage.addProject`); // 新增项目
  currentProject: IProject | any = {};
  private total = 0;
  private page = 1;
  private pageSize = 10;

  theadColumns: ITheadColums[] = [
    {
      text: i18n.t(`projectManage.projectName`) as string, // 项目名称
      field: "projectName",
    },
    {
      text: i18n.t(`projectManage.companyName`) as string, // 所属公司
      field: "companyName",
    },
    {
      text: i18n.t(`projectManage.plantName`) as string, // 电站名称
      field: "plantName",
    },
    {
      text: i18n.t(`projectManage.gridConnectionDate`) as string, // 并网时间
      field: "gridConnectionDate",
      slot: true,
      render: (h: any, params: any) => {
        if(params.row.gridConnectionDate.toString().length > 10) {
          return h('div', moment(params.row.gridConnectionDate).format("YYYY-MM-DD"))
        }else{
          return h('div', '')
        }
      }
    },
    {
      text: i18n.t(`projectManage.contactPerson`) as string, // 联系人
      field: "contactPerson",
    },
    {
      text: i18n.t(`projectManage.contactMethod`) as string, // 联系方式
      field: "contactMethod",
    },
    {
      text: i18n.t(`projectManage.setup`) as string, // 设置
      field: "setup",
      slot: true,
      render: (h: any, params: any) => {
        return h("div", {}, [h("el-button", {
          class: "el-button--primary is-plain",
          on: {
            click: () => {
              this.toProjectConfig();
            },
          },
        }, i18n.t(`projectManage.projectConfig`) as string)]); // 项目配置
      },
    },
    {
      text: i18n.t(`common.operation`) as string, // 操作
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
              this.handleDetele(params.row);
            },
          },
        })]);
      },
    },
  ];

  list: ITableList = [];
  mounted(): void {
    this.$nextTick((): void => {
      // (this.$refs.table as any).operationVisible = true;
    });
  }

  @Watch("companyId", { immediate: true, deep: true })
  getCompanyId(newVal: any, oldVal: any){
    this.compyId = newVal;
    if(this.companyId) {
      this.getProjectList();
    };
  }

  // 获取项目list table
  getProjectList(): void{
    const paramsData = {
      ProjectName: "",
      CompyId: this.compyId,
      PageNum: this.page,
      PageSize: this.pageSize,
      Sort: "",
      SortType: "ascending"
    }
    this.listLoading = true;
    service({
      method: "get",
      url: "/api/business/EmsProject/childlist",
      params: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          this.list = res.data.data.result || [];
          this.total = res.data.data.totalNum || 0;
        }
        this.listLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCurrentChange(val: number): void {
    this.page = val;
    this.getProjectList();
  }

  //显示对话框
  showDialog(type: string, row?: IProject): void {
    let obj: any = {
      add: i18n.t(`projectManage.addProject`), // 新增项目
      edit: i18n.t(`projectManage.editProject`), // 修改项目
    };
    this.dialogTitle = obj[type];
    (this.$refs.homeDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(row);
  }
  loadDailogData(row?: IProject): void {
    let defaultData: IProject = {
      compyId: this.compyId,
      compyName: "",
      projectId: undefined,
      projectName: "",
      plantName: "",
      gridConnectionDate: "",
      address: "",
      contactPerson: "",
      contactMethod: "",
      plantImage: "",
      region: "中国",
      longitude: 0,
      latitude: 0,
      zone: "",
      safeRunDate: "",
      remark: ""
    };
    this.currentProject = row || defaultData;
  }
  //删除
  handleDetele(row: any): void{
    this.$confirm(i18n.t(`common.deletePrompt`) as string, i18n.t(`common.prompt`) as string, {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
      type: "warning",
    }).then(() => {
      service({
        method: "delete",
        url: `/api/business/EmsProject/${row.projectId}`,
      }).then((res) => {
        if (res && res.data.code === 200) {
          this.$message({
            message: i18n.t(`common.deleteSuccess`) as string,
            center: true,
            type: "success"
          });
          this.getProjectList();
        }
      })
      .catch((err) => {
        console.log(err);
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
