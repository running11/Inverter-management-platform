<template>
  <div class="main-wrapper">
    <div class="title">用户管理</div>
    <div class="content-box">
      <div class="left">
        <el-input
          v-model="deptName"
          placeholder="请输入部门名称"
          clearable
          prefix-icon="el-icon-search"
          class="mt"
        />

        <el-tree
          :data="deptOptions"
          :props="defaultProps"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          ref="tree"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </div>
      <div class="right">
        <div class="search-box">
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            label-width="78px"
          >
            <el-form-item label="用户名称">
              <el-input
                v-model="queryParams.userName"
                placeholder="请输入用户名"
                class="wd"
              ></el-input>
            </el-form-item>

            <el-form-item label="手机">
              <el-input
                v-model="queryParams.phonenumber"
                placeholder="请输入手机号"
                class="wd"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="queryParams.status"
                placeholder="用户状态"
                clearable
                class="wd"
              >
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="dateRange"
                class="wd"
                style="margin-right: 30px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="table-box">
          <div class="toolbar">
            <div class="toolbar-left">
              <el-button type="info" plain icon="el-icon-upload2"
                >导入</el-button
              >
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                >导出
              </el-button>
            </div>
            <div class="toolbar-right">
              <el-button type="primary">新增</el-button>
              <popover-column
                :columnsAllList="theadColumns"
                :selectedCloumns="theadSelectedColumns"
                @getCheckedColumns="getCheckedColumns"
              ></popover-column>
            </div>
          </div>
          <!-- <el-row :gutter="20" class="pd">
            <el-col :span="1.5">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
                v-hasPermi="['system:user:add']"
                >新增</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="success"
                plain
                icon="el-icon-edit"
                size="mini"
                :disabled="single"
                @click="handleUpdate"
                v-hasPermi="['system:user:edit']"
                >修改</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="handleDelete"
                v-hasPermi="['system:user:remove']"
                >删除</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="info"
                plain
                icon="el-icon-upload2"
                size="mini"
                @click="handleImport"
                v-hasPermi="['system:user:import']"
                >导入</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                v-hasPermi="['system:user:export']"
                >导出
              </el-button>
            </el-col>
            <right-toolbar
              :showSearch.sync="showSearch"
              @queryTable="getList"
              :columns="columns"
            ></right-toolbar>
          </el-row> -->

          <!-- <user-table :loading="listLoading"></user-table> -->
          <e-table
            :loading="listLoading"
            :tableCloumns="theadSelectedColumns"
            :tableData="list"
          ></e-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import userTable from "./components/userTable.vue";
import PopoverColumn from "@/components/popoverColumn/index.vue";
import ETable from "@/components/eTable/index.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import service from "@/utils/request";
import { addDateRange } from "@/utils/ruoyi";

import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  exportUser,
  resetUserPwd,
  changeUserStatus,
} from "@/api/user/user";
import { getDicts } from "@/api/dict/data";
interface TreeData {
  id?: any;
  label?: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: TreeData[];
}
@Component({
  components: {
    Treeselect,
    ETable,
    PopoverColumn,
  },
})
export default class userManage extends Vue {
  defaultProps = {
    children: "children",
    label: "label",
  };
  private listLoading = false;
  // 总条数
  total = 0;
  // 用户表格数据
  userList = [];
  // 弹出层标题
  title = "";
  // 部门名称
  deptName = "";
  // 部门树选项
  deptOptions: TreeData[] = [];
  // 日期范围
  dateRange = [];
  // 状态数据字典
  statusOptions = [];
  // 表单参数
  form = {};
  // 查询参数
  queryParams = {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phonenumber: undefined,
    status: undefined,
    deptId: undefined,
  };
  private list: ITableList[] = [{
    num:1,userName:"admin",nickName:"管理员",avatar:"",deptName:"888",phonenumber:"1234588899955",status:"停用",create_time:"2021-02-02"
  },{
    num:1,userName:"admin",nickName:"管理员",avatar:"",deptName:"9999",phonenumber:"1234588899955",status:"停用",create_time:"2021-02-02"
  }];
  theadColumns: ITheadColums[] = [
    {
      text: "编号",
      field: "num",
    },
    {
      text: "登录名",
      field: "userName",
    },
    {
      text: "昵称",
      field: "nickName",
      
    },
    {
      text: "头像",
      field: "avatar",
    },
    {
      text: "部门",
      field: "deptName",
    },
    {
      text: "手机号码",
      field: "phonenumber",
      
    },
    {
      text: "用户状态",
      field: "status",
    },
    {
      text: "创建时间",
      field: "create_time",
       sortable: true,
    },
    {
      text: "操作",
      field: "specialOperation",
      width:"220px",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "修改"
          ),
           h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "删除"
          ),
           h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "重置密码"
          ),
        ]);
      },
    },
  ];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: "编号",
      field: "num",
      disabled: true,
      width: 56,
     
    },
    {
      text: "登录名",
      field: "userName",
    },
    {
      text: "昵称",
      field: "nickName",
      
    },
    {
      text: "头像",
      field: "avatar",
     
    },
    {
      text: "部门",
      field: "deptName",
    },
    {
      text: "手机号码",
      field: "phonenumber",
     
    },
    {
      text: "用户状态",
      field: "status",
    },
    {
      text: "创建时间",
      field: "create_time",
       sortable: true,
    },
   
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
       width:"220px",
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "修改"
          ),
          h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "删除"
          ),
           h(
            "el-button",
            {
              class: "el-button--primary is-plain",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  // this.toProjectDetails(params);
                },
              },
            },
            "重置密码"
          ),
        ]);
     
      },
    },
  ];
  @Watch("deptName")
  getDeptName(val: any) {
    (this.$refs.tree as any).filter(val);
    console.log(val);
  }
  created() {
    this.getList();
    this.getTreeselect();
    getDicts("sys_normal_disable").then((response: any) => {
      this.statusOptions = response.data.data;
    });
  }
  /** 查询用户列表 */
  getList() {
    this.listLoading = true;
    listUser(addDateRange(this.queryParams, this.dateRange)).then(
      (response) => {
        // this.userList = response.data.result;
        // this.total = response.data.totalNum;
        console.log(response, "列表");
        this.listLoading = false;
      }
    );
  }
  /** 查询部门下拉树结构 */
  getTreeselect() {
    service({
      url: "/api/system/dept/treeselect",
      method: "get",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log("用户", res.data.data);
          this.deptOptions = res.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // 筛选节点
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
  }
  //节点点击事件
  handleNodeClick(data: any): void {
    console.log(data.id);
    this.deptName = data.label;
    this.queryParams.deptId = data.id;
    // this.timer = new Date().getTime().toString();
  }
  /** 搜索按钮操作 */
  handleQuery() {
    this.queryParams.pageNum = 1;
    console.log(this.queryParams);
    this.getList();
  }
  // 表单重置
  reset() {
    this.form = {
      userId: undefined,
      deptId: undefined,
      userName: undefined,
      nickName: undefined,
      password: undefined,
      phonenumber: undefined,
      email: undefined,
      sex: undefined,
      status: "0",
      remark: undefined,
      postIds: [],
      roleIds: [],
    };
    // this.resetForm("form");
  }
  /** 重置按钮操作 */
  resetQuery() {
    this.dateRange = [];
    this.queryParams.deptId = undefined;
    // this.resetForm("queryForm");
    // this.handleQuery();
  }

  getCheckedColumns(list: Array<ITheadColums>) {
    this.theadSelectedColumns = list;
    console.log(this.theadSelectedColumns);
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  height: 100%;
  background: $white;
  padding: 20px 0 20px 20px;
  .title {
    font-size: 18px;
    line-height: 36px;
  }
  .content-box {
    display: flex;
    .menu-box {
      width: 260px;
      box-sizing: border-box;
      padding: 20px 0;
    }
    .left {
       width: 260px;
      box-sizing: border-box;
      padding: 20px 0;
      .mt {
        margin-bottom: 20px;
      }
    }
    
    .right {
      flex: 1;
      .wd {
        width: 240px;
      }
      .pd {
        padding-left: 20px;
      }
      .table-box{
         padding: 0 10px;
          .toolbar {
        display: flex;
        justify-content: space-between;
       padding: 10px;
        div {
          display: flex;
        }
      }
      }
    
    }
  }
}
</style>
