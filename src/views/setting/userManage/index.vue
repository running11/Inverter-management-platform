<template>
  <div class="main-wrapper">
    <div class="title">{{$t("userManage.title")}}</div>
    <div class="content-box">
      <div class="left">
        <el-input
          v-model="compyName"
          :placeholder="text.pleaseEnterCompanyName"
          clearable
          prefix-icon="el-icon-search"
          class="mt"
        />

        <el-tree
          :data="compyOptions"
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
            label-width="120px"
          >
            <el-form-item :label="text.userName" prop="userName">
              <el-input
                v-model="queryParams.userName"
                :placeholder="text.pleaseUserName"
                class="wd"
              ></el-input>
            </el-form-item>

            <el-form-item :label="text.phone" prop="phonenumber">
              <el-input
                v-model="queryParams.phonenumber"
                :placeholder="text.pleasePhone"
                class="wd"
              ></el-input>
            </el-form-item>
            <el-form-item :label="text.userStatus" prop="status">
              <el-select
                v-model="queryParams.status"
                :placeholder="text.userStatus"
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
            <el-form-item :label="text.createTime">
              <el-date-picker
                v-model="dateRange"
                class="wd"
                style="margin-right: 30px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                :start-placeholder="text.startTime"
                :end-placeholder="text.endTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleQuery"
                >{{$t("common.search")}}</el-button
              >
              <el-button icon="el-icon-refresh" @click="resetQuery"
                >{{$t("common.reset")}}</el-button
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
                >{{$t("common.importBtn")}}</el-button
              >
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                
                @click="handleExport"
                >{{$t("common.exportBtn")}}
              </el-button>
            </div>
            <div class="toolbar-right">
              <el-button type="primary" @click="handleAdd">{{$t("common.new")}}</el-button>
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
            <el-pagination
              background
              layout="prev, pager, next, total"
              :page-size="queryParams.pageSize"
              :current-page="queryParams.pageNum"
              :total="total"
              @current-change="handleCurrentChange"
            />
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
          label-width="120px"
          class="form"
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-row v-if="form.userId == undefined">
            <el-col :lg="12">
              <el-form-item :label="text.userName" prop="userName">
                <el-input
                  :disabled="form.userId != undefined"
                  v-model="form.userName"
                  :placeholder="text.pleaseUserName"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item  :label="text.userPassword" prop="password">
                <el-input
                  :disabled="form.userId != undefined"
                  v-model="form.password"
                  :placeholder="text.pleaseUserPassword"
                  type="password"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="12">
              <el-form-item :label="text.nickName" prop="nickName">
                <el-input
                  v-model="form.nickName"
                  :placeholder="text.pleaseNickName"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item :label="text.company" prop="compyId">
                <treeselect
                  :normalizer="normalizer"
                  v-model="form.compyId"
                  :options="compyOptions"
                  :show-count="true"
                  :placeholder="text.pleaseCompany"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12">
              <el-form-item :label="text.phone" prop="phonenumber">
                <el-input
                  v-model="form.phonenumber"
                  :placeholder="text.pleasePhone"
                  maxlength="11"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item :label="text.email">
                <el-input
                  v-model="form.email"
                  :placeholder="text.pleaseEmail"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :lg="12">
              <el-form-item :label="text.sex">
                <el-select v-model="form.sex" :placeholder="text.please">
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
              <el-form-item :label="text.userStatus">
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
              <el-form-item :label="text.post">
                <el-select v-model="form.postIds" multiple :placeholder="text.please">
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
              <el-form-item :label="text.role">
                <el-select
                  v-model="form.roleIds"
                  multiple
                  :placeholder="text.please"
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
              <el-form-item :label="text.remark">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  :placeholder="text.pleaseContent"
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
// interface TreeData {
//   id?: any;
//   label?: string;
//   disabled?: boolean;
//   isLeaf?: boolean;
//   children?: TreeData[];
// }
import i18n from "@/language";
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
  text = {
    userName : i18n.t('userManage.userName'),
    pleaseEnterCompanyName:i18n.t('companyManage.pleaseEnterCompanyName'),
    pleaseUserName: i18n.t('userManage.pleaseUserName'),
    phone:i18n.t('userManage.phone'),
    userStatus:i18n.t('userManage.userStatus'),
    createTime:i18n.t('userManage.createTime'),
    resetPassword:i18n.t('userManage.resetPassword'),
    pleasePhone:i18n.t('userManage.pleasePhone'),
    nickName:i18n.t('userManage.nickName'),
    userPassword:i18n.t('userManage.userPassword'),
    pleaseUserPassword:i18n.t('userManage.pleaseUserPassword'),
    pleaseNickName: i18n.t('userManage.pleaseNickName'),
    company: i18n.t('userManage.company'),
    pleaseCompany: i18n.t('userManage.pleaseCompany'),
    email: i18n.t('userManage.email'),
    startTime: i18n.t('userManage.startTime'),
    endTime: i18n.t('userManage.endTime'),
    sex: i18n.t('userManage.sex'),
    please: i18n.t('userManage.please'),
    role:i18n.t('userManage.role'),
    post:i18n.t('userManage.post'),
    remark:i18n.t('userManage.remark'),
    pleaseContent:i18n.t('userManage.pleaseContent'),
    pleaseEmail:i18n.t('userManage.pleaseEmail')
  }
  defaultProps = {
    children: "children",
    label: "compyName",
  };
  listLoading = false;
  // 总条数
  total = 0;
  // 用户表格数据
  userList: ITableList = [];
  // 弹出层标题
  title = "";
  //是否显示弹出层
  open = false;
  // 选中userId数组
  ids = [];
  // 部门名称
  compyName = "";
  // 部门树选项
  compyOptions = [];
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
    compyId: undefined,
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
      { required: true, message: i18n.t('userManage.pleaseUserName') as string, trigger: "blur" },
    ],
    nickName: [
      { required: true, message: i18n.t('userManage.pleaseNickName') as string, trigger: "blur" },
    ],
    compyId: [
      { required: true, message: i18n.t('userManage.pleaseCompany') as string, trigger: "change" },
    ],
    password: [
      { required: true, message:i18n.t('userManage.pleaseUserPassword') as string, trigger: "blur" },
    ],
    email: [
      { required: false, message: i18n.t('userManage.pleaseEmail') as string, trigger: "blur" },
      {
        type: "email",
        message: i18n.t('userManage.pleaseEmail') as string,
        trigger: ["blur", "change"],
      },
    ],
    phonenumber: [
      { required: false, message: i18n.t('userManage.pleasePhone') as string, trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: i18n.t('userManage.pleasePhone') as string,
        trigger: "blur",
      },
    ],
  };
  theadColumns: ITheadColums[] = [
    {
      text: i18n.t('userManage.number') as string,
      field: "userId",
      disabled: true,
      width: 60,
      // slot: true,
      // render: (h: any, params: any) => {
      //   return h("div", {}, [h("span", {}, `${params.index + 1}`)]);
      // },
    },
    {
      text: i18n.t('userManage.loginName') as string,
      field: "userName",
    },
    {
      text: i18n.t('userManage.nickName') as string,
      field: "nickName",
    },
    {
      text: i18n.t('userManage.avatar') as string,
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
      text: i18n.t('userManage.company') as string,
      field: "compyName",
    },
    {
      text: i18n.t('userManage.phone') as string,
      field: "phonenumber",
    },
    {
      text: i18n.t('userManage.userStatus') as string,
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
              change: () => {
                this.handleStatusChange(params.row);
              },
            },
          }),
        ]);
      },
    },
    {
      text: i18n.t('userManage.createTime') as string,
      field: "createTime",
      sortable: true,
      width: "180",
    },
    {
      text: i18n.t('userManage.config') as string,
      field: "passwordConfig",
      slot: true,
      width: "180",
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
            this.text.resetPassword

          ),
        ]);
      },
    },
    {
      text: i18n.t('common.operation') as string,
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
      text: i18n.t('userManage.loginIp') as string,
      field: "loginIP",
    },
    {
      text: i18n.t('userManage.lastTime') as string, 
      field: "loginDate",
    },

    {
      text: i18n.t('userManage.creatPeople') as string, 
      field: "createBy",
    },
    {
      text: i18n.t('userManage.remark') as string, 
      field: "remark",
    },
  ];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: i18n.t('userManage.number') as string,
      field: "userId",
      disabled: true,
      width: 60,
      // slot: true,
      // render: (h: any, params: any) => {
      //   return h("div", {}, [h("span", {}, `${params.index + 1}`)]);
      // },
    },
    {
      text: i18n.t('userManage.loginName') as string,
      field: "userName",
    },
    {
      text: i18n.t('userManage.nickName') as string,
      field: "nickName",
    },
    {
      text: i18n.t('userManage.avatar') as string,
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
      text: i18n.t('userManage.company') as string,
      field: "compyName",
    },
    {
      text:  i18n.t('userManage.phone') as string,
      field: "phonenumber",
    },
    {
      text: i18n.t('userManage.userStatus') as string,
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
              change: () => {
                this.handleStatusChange(params.row);
              },
            },
          }),
        ]);
      },
    },
    {
      text: i18n.t('userManage.createTime') as string,
      field: "createTime",
      sortable: true,
      width: "180",
    },
    {
      text: i18n.t('userManage.config') as string,
      field: "passwordConfig",
      width:"180",
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
             this.text.resetPassword
           
          ),
        ]);
      },
    },
    {
      text: i18n.t('common.operation') as string,
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
  @Watch("compyName")
  getcompyName(val: any) {
    (this.$refs.tree as any).filter(val);
    // console.log(val);
  }
  created() {
    this.getList();
    this.getTreeselect();
    getDicts("sys_normal_disable").then((response: any) => {
      // console.log("用户状态", response.data.data);
      if (response && response.data.code === 200) {
        this.statusOptions = response.data.data;
      }
    });
    getDicts("sys_user_sex").then((response: any) => {
      if (response && response.data.code === 200) {
        this.sexOptions = response.data.data;
      }
    });
    getConfigKey("sys.user.initPassword").then((response: any) => {
      // console.log(response.data,"getConfigKey")
      if (response && response.data.code === 200) {
        this.initPassword = response.data.data;
      }
    });
  }
  //treeSelect配置
  normalizer(node: any) {
    if (node.children && !node.children.length) {
      delete node.children;
    }
    return {
      id: node.compyId,
      label: node.compyName,
      children: node.children,
    };
  }
  /** 查询用户列表 */
  getList() {
    this.listLoading = true;
    listUser(addDateRange(this.queryParams, this.dateRange)).then(
      (response) => {
        if (response && response.data.code === 200) {
          this.userList = response.data.data.result;
          this.total = response.data.data.totalNum;
          //console.log(this.userList, "列表");
        }
        this.listLoading = false;
      }
    );
  }
  /** 查询公司下拉树结构 */
  getTreeselect() {
    service({
      url: "/api/business/EmsCompany/treeList",
      method: "get",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          //console.log("公司", res.data.data);
          this.compyOptions = res.data.data;
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
    this.queryParams.compyId = data.compyId;
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
      compyId: undefined,
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
    this.queryParams.compyId = undefined;
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
    this.$prompt(i18n.t(`userManage.tipsContent`) as string,i18n.t(`common.prompt`) as string, {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
      inputPattern: /^\S{6,}$/,
      inputErrorMessage: i18n.t(`userManage.inputErrorMessage`) as string,
    })
      .then((res: any) => {
        console.log(res.value);
        resetUserPwd(row.userId, res.value).then((response) => {
          if (response && response.data.code === 200) {
            this.$message({
              type: "success",
              message: i18n.t(`common.editSuccess`) as string,
            });
          }
        });
      })
      .catch(() => {
        // this.$message({
        //   type: "info",
        //   message: "取消输入",
        // });
      });
  }
  /** 新增按钮操作 */
  handleAdd() {
    this.reset();
    this.getTreeselect();
    getUser(0).then((response: any) => {
      // console.log(response);
      if (response && response.data.code === 200) {
        this.postOptions = response.data.data.posts;
        this.roleOptions = response.data.data.roles;
        this.open = true;
        this.title = i18n.t(`userManage.addCompany`) as string;
      }
      this.form.password = this.initPassword;
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
        //console.log(data, "xiugai");
        this.form = {
          userId: data.user.userId,
          compyId: data.user.compyId,
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
        this.title = i18n.t(`userManage.editCompany`) as string;
        // console.log(this.form.roleIds);
      }
    });
  }
  /** 删除按钮操作 */
  handleDelete(row: IUser) {
    const userId = row.userId;
    this.$confirm(
       i18n.t(`userManage.deleContent`) as string +' '+row.userName + '?',
      i18n.t(`common.prompt`) as string,
      {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
        type: "warning",
      }
    )
      .then(() => {
        delUser(userId).then((res: any) => {
          if (res && res.data.code === 200) {
            this.$message({
              showClose: true,
              message: i18n.t(`common.deleteSuccess`) as string,
              type: "success",
            });
            this.getList();
          }
        });
      })
      // .catch(() => {
      //   // this.$message({
      //   //   type: "info",
      //   //   message: "已取消删除",
      //   // });
      // });
  }
  // 用户状态修改
  handleStatusChange(row: any) {
    let text = row.status == "0" ? i18n.t(`userManage.stop`) as string :  i18n.t(`userManage.startUsing`) as string;
    this.$confirm(i18n.t(`userManage.isSure`) as string + text + '"' + row.userName + '?',  i18n.t(`common.prompt`) as string, {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
      type: "warning",
    })
      .then(() => {
        row.status = row.status === "0" ? "1" : "0";
        changeUserStatus(row.userId, row.status).then((res) => {
          if (res && res.data.code === 200) {
            this.$message({
              type: "success",
              message: text + i18n.t(`userManage.succ`) as string ,
            });
            this.getList();
          }
        });
      })

      // .catch(() => {
      //   // console.log(row.status);
      // });
  }
  /** 导出按钮操作 */
  handleExport() {
    const queryParams = this.queryParams;
    this.$confirm( i18n.t(`userManage.tipExport`) as string, i18n.t(`common.prompt`) as string, {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
      type: "warning",
    })
      .then(() => {
        exportUser(queryParams).then((response: any) => {
          console.log(response);
          if (response && response.data.code === 200) {
            download(response.data.data.path);
          } 
        });
      })
      // .catch(() => {
      //   // this.$message({
      //   //   type: "info",
      //   //   message: "已取消导出",
      //   // });
      // });
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
                message: i18n.t(`common.editSuccess`) as string,
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
                message: i18n.t(`common.addSuccess`) as string,
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
      width: 240px;
      padding-right: 20px;
      box-sizing: border-box;

      .mt {
        margin-bottom: 20px;
      }
    }
    .right {
      flex: 1;
      overflow: hidden;
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
