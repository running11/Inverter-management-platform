<template>
  <div class="">
    <div class="table-wrapper">
      <div class="search-box">
        <el-form :inline="true" :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="toolbar-right">
          <el-button type="primary" @click="showDialog('add')">新增</el-button>
        </div>
      </div>
      <table-custom
        :theadColumns="theadColumns"
        :tableList="list"
        ref="table"
        @bindDeleteBtn="handleDeleteBtn"
        @bindEditBtn="handleModify"
      >
        <template slot="setup">
          <el-button type="primary" plain @click="passwordReset"
            >密码重置</el-button
          >
        </template>
      </table-custom>

      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
    <user-dialog
      ref="userDialog"
      :title="dialogType"
      :current-user="currentUser"
    ></user-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";
import TableCustom from "@/components/table/index.vue";
import userDialog from "@/views/setting/userManage/components/dialog.vue";
interface IUser {
  userName: string;
  role: string;
  companyName: string;
  mail: string;
  phone: string;
  status: string;
  [propName: string]: any;
}
@Component({
  components: {
    TableCustom,
    userDialog,
  },
})
export default class userTable extends Vue {
  @Prop(Number) readonly companyId!: number;
  form: any = {
    name: "",
    mail: "",
    phone: "",
  };
  dialogType = "新增用户";
  currentUser: IUser | any = {};
  theadColumns: ITheadColums[] = [
    {
      text: "用户名",
      field: "userName",
    },
    {
      text: "角色",
      field: "role",
    },
    {
      text: "公司名称",
      field: "companyName",
    },
    {
      text: "邮箱",
      field: "mail",
    },
    {
      text: "手机",
      field: "phone",
    },
    {
      text: "状态",
      field: "status",
    },
    {
      text: "设置",
      field: "setup",
      slot: true,
    },
  ];

  list: ITableList[] = [
    {
      userName: "张三",
      role: "普通用户",
      companyName: "正泰公司",
      mail: "zhangsan@ddd.com",
      phone: "15647895489",
      status: "离职",
    },
    {
      userName: "张三",
      role: "普通用户",
      companyName: "正泰公司",
      mail: "zhangsan@ddd.com",
      phone: "15647895489",
      status: "在职",
    },
  ];
  mounted(): void {
    this.$nextTick((): void => {
      (this.$refs.table as any).operationVisible = true;
    });
  }
  @Watch("companyId")
  getCompanyId(newval: number, oldval: number): void {
    if (newval !== oldval) {
      //初始化数据
      //  console.log(newval)
    }
  }
  //显示对话框
  showDialog(type: string, row: IUser): void {
    let obj: any = {
      add: "新增用户",
      edit: "修改用户",
    };
    this.dialogType = obj[type];
    this.currentUser = {};
    (this.$refs.userDialog as any).showDialog();
    type === "add" ? this.loadDailogData() : this.loadDailogData(row);
  }
  loadDailogData(row?: IUser): void {
    let defaultData: IUser = {
      userName: "",
      role: "",
      companyName: "",
      mail: "",
      phone: "",
      status: "",
    };
    this.currentUser = row || defaultData;
  }
  //修改
  handleModify(rows: IUser) {
    this.showDialog("edit", rows);
  }
  //删除
  handleDeleteBtn(item: ITableList): void {
    console.log(item, "删除");
  }
  //密码重置
  passwordReset(): void {
    console.log("密码重置");
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper {
  background: $white;
  padding: 10px 0;
  margin-bottom: 10px;
  .title {
    font-size: 18px;
    line-height: 36px;
  }
}
.table-wrapper {
  background: $white;
  padding: 10px 20px 20px;
  .search-box {
    padding: 0 0 20px;
    display: flex;
    justify-content: space-between;
    ::v-deep.el-form-item {
      margin-right: 20px;
    }
    .toolbar-right {
      padding-right: 5px;
      // display: flex;
      align-self: flex-end;
    }
  }
  .pagination-box {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
