<template>
  <div class="main-wrapper">
    <div class="title-box">
      <div class="title">角色管理</div>
    </div>

    <div class="search-box">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="78px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
            @keyup.enter.native="handleQuery"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="角色状态"
            clearable
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="toolbar-right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          @click="handleExport"
          >导出
        </el-button>
      </div>
    </div>
    <div class="table-box">
      <e-table
        :loading="loading"
        :tableCloumns="theadSelectedColumns"
        :tableData="roleList"
      ></e-table>

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

    <!-- 添加或修改角色配置对话框 -->
    <new-dialog
      width="28%"
      :show="open"
      :title="title"
      :on-close="cancel"
      :on-submit="submitForm"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col>
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="权限字符" prop="roleKey">
              <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="角色顺序" prop="roleSort">
              <el-input-number
                v-model="form.roleSort"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col >
            <el-form-item label="数据范围">
              <el-select
                v-model="form.dataScope"
                @change="dataScopeSelectChange"
              >
                <el-option
                  v-for="item in dataScopeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item label="状态" prop="status">
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
          <!-- <el-col :lg="24">
            <el-form-item label="数据权限" v-show="form.dataScope == 2">
              <el-checkbox
                v-model="deptExpand"
                @change="handleCheckedTreeExpand($event, 'dept')"
                >展开/折叠</el-checkbox
              >
              <el-checkbox
                v-model="deptNodeAll"
                @change="handleCheckedTreeNodeAll($event, 'dept')"
                >全选/全不选</el-checkbox
              >
              <el-checkbox
                v-model="form.deptCheckStrictly"
                @change="handleCheckedTreeConnect($event, 'dept')"
                >父子联动</el-checkbox
              >
              <el-tree
                class="tree-border"
                :data="deptOptions"
                show-checkbox
                default-expand-all
                ref="dept"
                node-key="id"
                :check-strictly="!form.deptCheckStrictly"
                empty-text="加载中，请稍候"
                :props="defaultProps"
              ></el-tree>
            </el-form-item>
          </el-col> -->
          <el-col :lg="24">
            <el-form-item label="备注" prop="remark">
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
    <config-dialog ref="configDialog" :data="currentRow"></config-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ETable from "@/components/eTable/index.vue";
import NewDialog from "@/components/newDialog/index.vue";
import { ITheadColums } from "@/utils/interface";
import { getDicts } from "@/api/dict/data";
import { addDateRange } from "@/api/user/ruoyi";
import { Form } from "element-ui";
import ConfigDialog from "@/views/setting/roleManage/components/dialog.vue";
import {
  listRole,
  getRole,
  delRole,
  addRole,
  updateRole,
  exportRole,
  // dataScope,
  changeRoleStatus,
  download,
} from "@/api/role/role";
@Component({
  components: {
    ETable,
    NewDialog,
    ConfigDialog,
  },
})
export default class RoleManage extends Vue {
  loading = false;
  open = false;
  total = 0;
  dateRange = [];
  queryParams = {
    pageNum: 1,
    pageSize: 10,
    roleName: undefined,
    roleKey: undefined,
    status: undefined,
  };
  statusOptions = [];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: "编号",
      field: "roleId",
      disabled: true,
    },
    {
      text: "角色名称",
      field: "roleName",
    },
    {
      text: "权限字符",
      field: "roleKey",
    },
    {
      text: "状态",
      field: "status",
      slot: true,
      render: (h: any, params: any) => {
        if (params.row.roleId != 1) {
          return h("div", {}, [
            h("el-switch", {
              props: {
                value: params.row.status,
                "active-value": "0",
                "inactive-value": "1",
              },
              on: {
                change: (value: any) => {
                  console.log(value, "改变");
                  this.handleStatusChange(params.row, value);
                },
              },
            }),
          ]);
        } else {
          return h("div", {}, [
            h("el-switch", {
              props: {
                value: params.row.status,
                "active-value": "0",
                "inactive-value": "1",
                disabled: true,
              },
            }),
          ]);
        }
      },
    },
    {
      text: "创建时间",
      field: "createTime",
      sortable: true,
    },
    {
      text: "备注",
      field: "remark",
    },
    {
      text: "设置",
      field: "passwordConfig",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        if (params.row.roleId != 1) {
          return h("div", {}, [
            h(
              "el-button",
              {
                class: "el-button--primary is-plain",
                on: {
                  click: () => {
                    // console.log(params.row);
                    this.handleDataScope(params.row);
                  },
                },
              },
              "数据权限"
            ),
          ]);
        }
      },
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        if (params.row.roleId != 1) {
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
                    // console.log(`点击了`, params);
                  },
                },
              },
              ``
            ),
          ]);
        }
      },
    },
  ];

  roleList = [];
  title = "";
  //当前的用户Id
  currentRow = {};
  // 表单参数
  form:any = {};

  // 表单校验
  rules = {
    roleName: [
      { required: true, message: "角色名称不能为空", trigger: "blur" },
    ],
    roleKey: [{ required: true, message: "权限字符不能为空", trigger: "blur" }],
    roleSort: [
      { required: true, message: "角色顺序不能为空", trigger: "blur" },
    ],
  };
  created() {
    this.getList();
    getDicts("sys_normal_disable").then((response: any) => {
      if (response && response.data.code === 200) {
        this.statusOptions = response.data.data;
      }
    });
  }
  /** 查询角色列表 */
  getList() {
    this.loading = true;
    listRole(addDateRange(this.queryParams, this.dateRange)).then(
      (response) => {
        if (response && response.data.code === 200) {
          console.log(response.data, "角色");
          this.roleList = response.data.data.result;
          this.total = response.data.data.totalNum;
        }
        this.loading = false;
      }
    );
  }
  //分页按钮操作
  handleCurrentChange(val: number): void {
    this.queryParams.pageNum = val;
    this.getList();
  }
  // 角色状态修改
  handleStatusChange(row: any, val: any) {
    console.log(row.status, "*******");
    let text = row.status == "0" ? "停用" : "启用";
    this.$confirm("确认要" + text + '"' + row.roleName + '"用户吗?', "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        changeRoleStatus(row.roleId, val).then((res) => {
          if (res && res.data.code === 200) {
            this.$message({
              type: "success",
              message: text + "成功",
            });
            this.getList();
          }
        });
      })

      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        });
      });
  }
  /** 删除按钮操作 */
  handleDelete(row: any) {
    const roleId = row.roleId;
    this.$confirm(
      '是否确认删除用户编号为"' + row.roleName + '"的数据项?',
      "警告",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        delRole(roleId).then((res: any) => {
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
  // 表单重置
  reset() {
    this.form = {
      roleId: undefined,
      roleName: undefined,
      roleKey: undefined,
      roleSort: 0,
      status: "0",
      menuIds: [],
      // deptIds: [],
      dataScope: "1",
      remark: undefined,
    };
    this.resetForm("form");
  }
  resetForm(refName: string) {
    if (this.$refs[refName]) {
      (this.$refs[refName] as Form).resetFields();
    }
  }
  /** 搜索按钮操作 */
  handleQuery() {
    this.queryParams.pageNum = 1;
    this.getList();
  }
  /** 重置按钮操作 */
  resetQuery() {
    this.dateRange = [];
    this.resetForm("queryForm");
    this.handleQuery();
  }
  /** 新增按钮操作 */
  handleAdd() {
    this.reset();
    this.open = true;
    this.title = "添加角色";
  }
  /** 修改按钮操作 ok */
  handleUpdate(row: any) {
    this.reset();
    const roleId = row.roleId;
    getRole(roleId).then((response) => {
      if (response && response.data.code === 200) {
        this.form = response.data.data;
      }
      this.open = true;
      this.title = "修改角色";
    });
  }
  /** 提交按钮 */
  submitForm() {
    (this.$refs["form"] as Form).validate((valid) => {
      if (valid) {
        if (this.form.roleId != undefined && this.form.roleId > 0) {
          updateRole(this.form).then((response) => {
            if (response && response.data.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.open = false;
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: response.data.msg,
              });
            }
          });
        } else {
          addRole(this.form).then((response) => {
            if (response && response.data.code === 200) {
              this.$message({
                type: "success",
                message: "新增成功",
              });
              this.open = false;
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: response.data.msg,
              });
            }
          });
        }
      }
    });
  }
  //关闭弹出框,取消按钮
  cancel() {
    this.open = false;
    this.reset();
  }
  /** 分配角色权限按钮操作 */
  // 新增 和上面代码基本相同
  handleDataScope(row: any) {
    this.currentRow = row;
    this.$nextTick(() => {
      (this.$refs.configDialog as any).showDialog();
    });
  }
  //导出
  handleExport() {
    const queryParams = this.queryParams;
    this.$confirm("是否确认导出所有角色数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(function () {
        return exportRole(queryParams);
      })
      .then((response) => {
        if (response && response.data.code === 200) {
          download(response.data.data.path);
        }
      });
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  height: 100%;
  background: $white;
  padding: 20px 0 20px 20px;
  .title-box {
    display: flex;
    padding: 0 20px 20px 0;
    justify-content: space-between;
    .title {
      font-size: 18px;
      line-height: 36px;
    }
  }
  .search-box {
    padding: 0 20px 0 0;
    display: flex;
    justify-content: space-between;
  }
  .table-box {
    padding-right: 10px;
    .toolbar {
      display: flex;
      justify-content: flex-end;
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
