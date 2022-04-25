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
            <el-form-item label="用户名称" prop="userName">
              <el-input
                v-model="queryParams.userName"
                placeholder="请输入用户名"
                class="wd"
              ></el-input>
            </el-form-item>

            <el-form-item label="手机" prop="phonenumber">
              <el-input
                v-model="queryParams.phonenumber"
                placeholder="请输入手机号"
                class="wd"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
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
              <el-button
                type="info"
                plain
                icon="el-icon-upload2"
                @click="handleImport"
                >导入</el-button
              >
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                >导出
              </el-button>
            </div>
            <div class="toolbar-right">
              <el-button type="primary" @click="handleAdd">新增</el-button>
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

          <e-table
            :loading="listLoading"
            :tableCloumns="theadSelectedColumns"
            :tableData="userList"
          ></e-table>
          <div class="pagination-box">
            <div class="pagination-box">
              <el-pagination
                background
                layout="prev, pager, next, total"
                :page-size="queryParams.pageSize"
                :current-page="queryParams.page"
                :total="total"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增修改弹框 -->
    <div>
      <new-dialog
        width="58%"
        :show="open"
        :title="title"
        :on-close="cancel"
        :on-submit="submitForm"
      >
        <el-form
          label-width="100px"
          class="form"
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-row v-if="form.userId == undefined">
            <el-col :lg="12">
              <el-form-item label="用户名" prop="userName">
                <el-input
                  :disabled="form.userId != undefined"
                  v-model="form.userName"
                  placeholder="请输入用户名(用于登陆)"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="用户密码" prop="password">
                <el-input
                  :disabled="form.userId != undefined"
                  v-model="form.password"
                  placeholder="请输入用户密码"
                  type="password"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="12">
              <el-form-item label="用户昵称" prop="nickName">
                <el-input
                  v-model="form.nickName"
                  placeholder="请输入用户昵称"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="归属部门" prop="deptId">
                <treeselect
                  v-model="form.deptId"
                  :options="deptOptions"
                  :show-count="true"
                  placeholder="请选择归属部门"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12">
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input
                  v-model="form.phonenumber"
                  placeholder="请输入手机号码"
                  maxlength="11"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="电子邮箱">
                <el-input
                  v-model="form.email"
                  placeholder="请输入邮箱"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12">
              <el-form-item label="用户性别">
                <el-select v-model="form.sex" placeholder="请选择">
                  <el-option
                    v-for="dict in sexOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="用户状态">
                <el-radio-group v-model="form.status">
                  <el-radio
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                    >{{ dict.dictLabel }}</el-radio
                  >
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12">
              <el-form-item label="岗位">
                <el-select v-model="form.postIds" multiple placeholder="请选择">
                  <el-option
                    v-for="item in postOptions"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId"
                    :disabled="item.status == 1"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="角色">
                <el-select
                  v-model="form.roleIds"
                  multiple
                  placeholder="请选择"
                  @change="selectRole($event)"
                >
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                    :disabled="item.status == 1"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="24">
              <el-form-item label="备注">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </new-dialog>
    </div>
    <!-- 导入弹出框 -->
    <upload-Dialog
      ref="uploadDialog"
      title="用户导入"
      @fetchData="getList"
    ></upload-Dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import PopoverColumn from "@/components/popoverColumn/index.vue";
import NewDialog from "@/components/newDialog/index.vue";
import ETable from "@/components/eTable/index.vue";
import uploadDialog from "@/views/setting/userManage/components/dialog.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
import service from "@/utils/request";
import { addDateRange } from "@/api/user/ruoyi";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { Form } from "element-ui";
import {
  listUser,
  getUser,
  getConfigKey,
  changeUserStatus,
  resetUserPwd,
  delUser,
  addUser,
  updateUser,
  exportUser,
  download,
} from "@/api/user/user";
import { getDicts } from "@/api/dict/data";
interface TreeData {
  id?: any;
  label?: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: TreeData[];
}
interface IUser {
  [propName: string]: any;
}
@Component({
  components: {
    ETable,
    PopoverColumn,
    NewDialog,
    Treeselect,
    uploadDialog,
  },
})
export default class userManage extends Vue {
  defaultProps = {
    children: "children",
    label: "label",
  };
  listLoading = false;
  // 总条数
  total = 0;
  // 用户表格数据
  userList = [];
  // 弹出层标题
  title = "";
  //是否显示弹出层
  open = false;
  // 选中userId数组
  ids = [];
  // 部门名称
  deptName = "";
  // 部门树选项
  deptOptions = [];
  // 默认密码
  initPassword = undefined;
  // 日期范围
  dateRange = [];
  // 状态数据字典
  statusOptions = [];
  // 表单参数
  form: IUser = {};
  // 查询参数
  queryParams = {
    pageNum: 1,
    pageSize: 10,
    userName: undefined,
    phonenumber: undefined,
    status: undefined, //0正常，1停用
    deptId: undefined,
  };
  //性别字典
  sexOptions = [];
  //岗位字典
  postOptions = [];
  //角色字典
  roleOptions = [];
  // 表单校验
  rules: any = {
    userName: [
      { required: true, message: "用户名称不能为空", trigger: "blur" },
    ],
    nickName: [
      { required: true, message: "用户昵称不能为空", trigger: "blur" },
    ],
    deptId: [
      { required: true, message: "归属部门不能为空", trigger: "change" },
    ],
    password: [
      { required: true, message: "用户密码不能为空", trigger: "blur" },
    ],
    email: [
      { required: false, message: "邮箱地址不能为空", trigger: "blur" },
      {
        type: "email",
        message: "'请输入正确的邮箱地址",
        trigger: ["blur", "change"],
      },
    ],
    phonenumber: [
      { required: false, message: "手机号码不能为空", trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
  };
  theadColumns: ITheadColums[] = [
    {
      text: "编号",
      field: "userId",
      disabled: true,
      width: 56,
      // slot: true,
      // render: (h: any, params: any) => {
      //   return h("div", {}, [h("span", {}, `${params.index + 1}`)]);
      // },
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
      slot: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h("el-avatar", {
            props: {
              src: params.row.avatar,
            },
          }),
        ]);
      },
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
      slot: true,
      width: "90",
      render: (h: any, params: any) => {
        return h("div", {}, [
          h("el-switch", {
            props: {
              value: params.row.status,
              "active-value": "0",
              "inactive-value": "1",
            },
            on: {
              change: (value: any) => {
                this.handleStatusChange(params.row);
              },
            },
          }),
        ]);
      },
    },
    {
      text: "创建时间",
      field: "createTime",
      sortable: true,
      width: "180",
    },
    {
      text: "设置",
      field: "passwordConfig",
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
                  this.handleResetPwd(params.row);
                },
              },
            },
            "重置密码"
          ),
        ]);
      },
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      width: "90px",
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h(
            "i",
            {
              class: "icon el-icon-edit",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  this.handleUpdate(params.row);
                },
              },
            },
            ``
          ),
          h(
            "i",
            {
              class: "icon el-icon-delete",
              on: {
                click: () => {
                  this.handleDelete(params.row);
                },
              },
            },
            ``
          ),
        ]);
      },
    },

    {
      text: "登录IP",
      field: "loginIP",
    },
    {
      text: "最后登录时间",
      field: "loginDate",
    },

    {
      text: "创建人",
      field: "createBy",
    },
    {
      text: "备注",
      field: "remark",
    },
  ];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: "编号",
      field: "userId",
      disabled: true,
      width: 56,
      // slot: true,
      // render: (h: any, params: any) => {
      //   return h("div", {}, [h("span", {}, `${params.index + 1}`)]);
      // },
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
      slot: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h("el-avatar", {
            props: {
              src: params.row.avatar,
            },
          }),
        ]);
      },
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
      slot: true,
      width: "90",
      render: (h: any, params: any) => {
        return h("div", {}, [
          h("el-switch", {
            props: {
              value: params.row.status,
              "active-value": "0",
              "inactive-value": "1",
            },
            on: {
              change: (value: any) => {
                this.handleStatusChange(params.row);
              },
            },
          }),
        ]);
      },
    },
    {
      text: "创建时间",
      field: "createTime",
      sortable: true,
      width: "180",
    },
    {
      text: "设置",
      field: "passwordConfig",
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
                  this.handleResetPwd(params.row);
                },
              },
            },
            "重置密码"
          ),
        ]);
      },
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      width: "90px",
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [
          h(
            "i",
            {
              class: "icon el-icon-edit",
              on: {
                click: () => {
                  // console.log(`点击了`, params);
                  this.handleUpdate(params.row);
                },
              },
            },
            ``
          ),
          h(
            "i",
            {
              class: "icon el-icon-delete",
              on: {
                click: () => {
                  this.handleDelete(params.row);
                },
              },
            },
            ``
          ),
        ]);
      },
    },
  ];
  @Watch("deptName")
  getDeptName(val: any) {
    (this.$refs.tree as any).filter(val);
    // console.log(val);
  }
  created() {
    this.getList();
    this.getTreeselect();
    getDicts("sys_normal_disable").then((response: any) => {
      // console.log("用户状态", response.data.data);
      this.statusOptions = response.data.data;
    });
    getDicts("sys_user_sex").then((response: any) => {
      this.sexOptions = response.data.data;
      console.log(this.sexOptions, "性别");
    });
    // getConfigKey("sys.user.initPassword").then((response:any) => {
    //   console.log(response)
    //   // this.initPassword = response.data;
    // });
  }
  /** 查询用户列表 */
  getList() {
    this.listLoading = true;
    listUser(addDateRange(this.queryParams, this.dateRange)).then(
      (response) => {
        if (response && response.data.code === 200) {
          this.userList = response.data.data.result;
          this.total = response.data.data.totalNum;
          // console.log(this.userList, "列表");
        }
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
          // console.log("用户", res.data.data);
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
    // console.log(data.id);
    this.queryParams.deptId = data.id;
    this.getList();
  }
  /** 搜索按钮操作 */
  handleQuery() {
    this.queryParams.pageNum = 1;
    // console.log(this.queryParams);
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
      status: undefined,
      remark: undefined,
      postIds: [],
      roleIds: [],
    };
    this.resetForm("form");
  }
  /** 重置按钮操作 */
  resetQuery() {
    this.dateRange = [];
    this.queryParams.deptId = undefined;
    this.resetForm("queryForm");
    console.log(this.queryParams);
    this.handleQuery();
  }
  resetForm(refName: string) {
    if (this.$refs[refName]) {
      (this.$refs[refName] as Form).resetFields();
    }
  }

  //筛选表格的列
  getCheckedColumns(list: Array<ITheadColums>) {
    this.theadSelectedColumns = list;
    // console.log(this.theadSelectedColumns);
  }
  //分页按钮操作
  handleCurrentChange(val: number): void {
    this.queryParams.pageNum = val;
    this.getList();
  }

  /** 重置密码按钮操作 */
  handleResetPwd(row: IUser) {
    this.$prompt("请输入新密码", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputPattern: /^\S{6,}$/,
      inputErrorMessage: '密码不少于六位数'
    })
      .then((res: any) => {
        console.log(res.value);
          resetUserPwd(row.userId, res.value).then((response) => {
            if (response && response.data.code === 200)
              this.$message({
                type: "success",
                message: "密码修改成功",
              });
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "取消输入",
        });
      });
  }
  /** 新增按钮操作 */
  handleAdd() {
    this.reset();
    this.getTreeselect();
    getUser(0).then((response: any) => {
      console.log(response);
      if (response && response.data.code === 200) {
        this.postOptions = response.data.data.posts;
        this.roleOptions = response.data.data.roles;
        this.open = true;
        this.title = "新增用户";
      }

      // this.form.password = this.initPassword;
    });
  }
  /** 修改按钮操作 */
  handleUpdate(row: any) {
    this.reset();
    this.getTreeselect();
    let userId = row.userId;
    getUser(userId).then((response) => {
      if (response && response.data.code === 200) {
        var data = response.data.data;
        this.form = {
          userId: data.user.userId,
          deptId: data.user.deptId,
          userName: data.user.userName,
          nickName: data.user.nickName,
          password: "",
          phonenumber: data.user.phonenumber,
          email: data.user.email,
          sex: data.user.sex,
          status: data.user.status,
          remark: data.user.remark,
          postIds: data.postIds,
          roleIds: data.roleIds,
        };
        this.roleOptions = response.data.data.roles;
        this.postOptions = response.data.data.posts;

        this.open = true;
        this.title = "修改用户";
        // console.log(this.form.roleIds);
      }
    });
  }
  /** 删除按钮操作 */
  handleDelete(row: IUser) {
    const userId = row.userId;
    this.$confirm(
      '是否确认删除用户编号为"' + row.userName + '"的数据项?',
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        delUser(userId).then((res: any) => {
          if (res && res.data.code === 200) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            this.getList();
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
  }
  // 用户状态修改
  handleStatusChange(row: any) {
    let text = row.status == "0" ? "停用" : "启用";
    this.$confirm("确认要" + text + '"' + row.userName + '"用户吗?', "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        row.status = row.status === "0" ? "1" : "0";
        changeUserStatus(row.userId, row.status).then((res) => {
          if (res && res.data.code === 200) {
            this.$message({
              type: "success",
              message: text + "成功",
            });
            this.getList();
          }
        });
      })

      .catch(()=> {
          // console.log(row.status);
      
      });
  }
  /** 导出按钮操作 */
  handleExport() {
    const queryParams = this.queryParams;
    this.$confirm("是否确认导出所有用户数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        exportUser(queryParams).then((response: any) => {
          console.log(response);
          if (response && response.data.code === 200 ) {
            this.$message({
              type: "success",
              message: "导出成功",
            });
            download(response.data.data.path);
          } else {
            this.$message({
              type: "error",
              message: "导出失败",
            });
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消导出",
        });
      });
  }

  //关闭弹出框,取消按钮
  cancel() {
    this.open = false;
    this.reset();
  }
  /** 提交按钮 */
  submitForm() {
    (this.$refs["form"] as Form).validate((valid: any) => {
      if (valid) {
        // console.log(JSON.stringify(this.form), "提交添加用户");

        if (this.form.userId != undefined) {
          updateUser(this.form).then((response) => {
            if (response && response.data.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.open = false;
              this.getList();
            }
          });
        } else {
          addUser(this.form).then((response) => {
            if (response && response.data.code === 200) {
              this.$message({
                type: "success",
                message: "新增成功",
              });

              this.open = false;
              this.getList();
            }
          });
        }
      }
    });
  }

  /** 解决编辑时角色选中不了问题*/
  selectRole(e: any) {
    console.log(e, JSON.stringify(this.form));
    this.$forceUpdate();
  }
  /** 导入按钮操作 */
  handleImport() {
    (this.$refs.uploadDialog as any).showDialog();
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

    .left {
      width: 260px;
      padding-right: 20px;
      box-sizing: border-box;

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
      .table-box {
        padding: 0 10px;
        .toolbar {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          div {
            display: flex;
          }
        }
        .pagination-box {
          margin-top: 20px;
          text-align: right;
        }
      }
    }
  }
  ::v-deep .icon {
    font-size: 20px;
    color: $main-color;
    font-weight: bold;
    cursor: pointer;
  }
  ::v-deep .el-icon-edit {
    margin-right: 8px;
  }
  ::v-deep .el-icon-delete {
    margin-left: 8px;
    color: #f56c6c;
  }
}
</style>
