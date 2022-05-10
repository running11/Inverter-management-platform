<template>
  <div class="main-wrapper">
    <div class="title-box">
      <div class="title">菜单管理</div>
    </div>

    <div class="search-box">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="78px"
      >
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="queryParams.menuName"
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
        <el-button type="primary" @click="handleNewAdd">新增</el-button>
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          @click="toggleExpandAll"
          >展开</el-button
        >
      </div>
    </div>
    <div class="table-box">
      <el-table
        v-if="refreshTable"
        v-loading="loading"
        :data="menuList"
        :default-expand-all="isExpandAll"
        row-key="menuId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :header-cell-style="{
          background: 'rgb(237, 239, 242)',
          color: '#000',
          fontWeight: 'normal',
        }"
      >
        <el-table-column
          prop="menuName"
          label="菜单名称"
          :show-overflow-tooltip="true"
          width="160"
        ></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="80">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="menuType" label="类型" align="center" width="80">
          <template slot-scope="scope">
            <el-tag
              type="danger"
              v-if="scope.row.menuType == 'M' && scope.row.isFrame == 1"
              >链接</el-tag
            >
            <el-tag v-else-if="scope.row.menuType == 'C'">菜单</el-tag>
            <el-tag type="success" v-else-if="scope.row.menuType == 'M'"
              >目录</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.menuType == 'F'"
              >按钮</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="orderNum" label="排序" width="90" align="center">
          <template slot-scope="scope">
            <span
              v-show="editIndex != scope.$index"
              @click="editCurrRow(scope.$index, 'rowkeY')"
              >{{ scope.row.orderNum }}</span
            >
            <el-input
              :id="scope.$index + 'rowkeY'"
              size="mini"
              v-show="editIndex == scope.$index"
              v-model="scope.row.orderNum"
              @blur="handleChangeSort(scope.row)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="perms"
          label="权限标识"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="path"
          label="路由地址"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="component"
          label="组件路径"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="visible" label="显示" width="70">
          <template slot-scope="scope">
            <dict-tag
              :options="visibleOptions"
              :value="scope.row.visible"
              :showValue="false"
            />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status" width="70">
          <template slot-scope="scope">
            <dict-tag
              :options="statusOptions"
              :value="scope.row.status"
              :showValue="false"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="280" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              ></el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
              ></el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              ></el-button
            > -->
            <i class="icon el-icon-edit" @click="handleUpdate(scope.row)"></i>
            <i class="icon el-icon-delete" @click="handleDelete(scope.row)"></i>
            <i class="icon el-icon-plus" @click="handleAdd(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <new-dialog
      width="48%"
      :show="open"
      :title="title"
      :on-close="cancel"
      :on-submit="submitForm"
    >
      <el-form ref="form" :model="form" label-width="110px" :rules="rules">
        <el-row>
          <el-col :lg="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                @select="handleTreeSelect"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group size="mini" v-model="form.menuType">
                <el-radio-button label="M">目录</el-radio-button>
                <el-radio-button label="C">菜单</el-radio-button>
                <el-radio-button label="F">按钮</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
                :value="999"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24" v-if="form.menuType != 'F'">
            <el-form-item label="菜单图标" prop="icon">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input
                  slot="reference"
                  v-model="form.icon"
                  placeholder="点击选择图标"
                  clearable=""
                  readonly
                >
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px; width: 16px"
                  />
                  <i
                    v-else
                    slot="prefix"
                    class="el-icon-search el-input__icon"
                  ></i>
                </el-input>
              </el-popover>

              <!-- <el-link type="danger" @click="form.icon = ''">清空</el-link> -->
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item
              v-if="form.menuType != 'F'"
              label="路由地址"
              prop="path"
            >
              <span slot="label">
                <el-tooltip
                  content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                路由地址
              </span>
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <span slot="label">
                <el-tooltip
                  content="访问的组件路径，如：`system/user/index`，默认在`views`目录下"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                组件路径
              </span>
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'M'" label="权限标识">
              <span slot="label">
                <el-tooltip
                  content="控制器中定义的权限字符，如：[ActionPermissionFilter(Permission = 'system:user:delete')])"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                权限字符
              </span>
              <el-input
                v-model="form.perms"
                placeholder="权限名，规范([分类]:[页面]:[动作])"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'F'" label="显示状态">
              <span slot="label">
                <el-tooltip
                  content="选择隐藏则路由将不会出现在侧边栏也不可以访问"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                显示状态
              </span>
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in visibleOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'F'" label="是否外链">
              <span slot="label">
                <el-tooltip
                  content="选择是外链则路由地址需要以`http(s)://`开头"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                是否外链
              </span>
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'F'">
              <span slot="label">
                <el-tooltip
                  content="选择停用则路由将不会出现在侧边栏，也不能被访问"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                菜单状态
              </span>
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
          <el-col :lg="12">
            <el-form-item v-if="form.menuType == 'C'" label="是否缓存">
              <span slot="label">
                <el-tooltip
                  content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
                  placement="top"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
                是否缓存
              </span>
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">缓存</el-radio>
                <el-radio label="1">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import TreeTable from "@/components/treeTable/index.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
import {
  listMenu,
  getMenu,
  delMenu,
  addMenu,
  changeMenuSort,
  updateMenu,
} from "@/api/menu/menu";
import { getDicts } from "@/api/dict/data";
import IconSelect from "@/components/IconSelect/index.vue";
// import "@/assets/icons/index";
import { Form } from "element-ui";
import DictTag from "@/components/DictTag/index.vue";
import NewDialog from "@/components/newDialog/index.vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
interface Imenu {
  menuId: number;
  menuName: string;
  [propName: string]: any;
  children: Array<any>;
}
@Component({
  components: {
    Treeselect,
    NewDialog,
    DictTag,
    IconSelect,
  },
})
export default class menuManage extends Vue {
  open = false;
  title = "";
  loading = false;
  // 显示状态数据字典
  visibleOptions = [];
  statusOptions = [];
  queryParams = {
    menuName: undefined,
    status: undefined,
  };
  // currentSelectedRow: any = null;
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
  list: ITableList = [
    {
      compyName: "5555",
      address: "tttttt",
      contactPerson: "88888",
      contactMethod: "77777",
      compyDescription: "0000000",
    },
    {
      compyName: "5555",
      address: "tttttt",
      contactPerson: "88888",
      contactMethod: "77777",
      compyDescription: "0000000",
    },
    {
      compyName: "5555",
      address: "tttttt",
      contactPerson: "88888",
      contactMethod: "77777",
      compyDescription: "0000000",
    },
  ];
  // 菜单表格树数据
  menuList = [];
  // 重新渲染表格状态
  refreshTable = true;
  // 是否展开，默认全部折叠
  isExpandAll = false;
  editIndex = -1;
  // 表单参数
  form: any = {};
  menuOptions: Array<Imenu> = [];
  // 表单校验
  rules = {
    menuName: [
      { required: true, message: "菜单名称不能为空", trigger: "blur" },
    ],
    orderNum: [
      { required: true, message: "菜单顺序不能为空", trigger: "blur" },
    ],
    path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }],
  };
  created() {
    this.getList();
    getDicts("sys_show_hide").then((response) => {
      if (response && response.data.code === 200) {
        console.log(response.data.data, "9999999");
        this.visibleOptions = response.data.data;
      }
    });
    getDicts("sys_normal_disable").then((response: any) => {
      if (response && response.data.code === 200) {
        this.statusOptions = response.data.data;
      }
    });
  }
  /** 查询菜单列表 */
  getList() {
    this.loading = true;
    listMenu(this.queryParams).then((response) => {
      if (response && response.data.code === 200) {
        console.log(response, "菜单列表");
        this.menuList = response.data.data;
        // this.menuList = this.handleTree(response.data, "menuId");
      }
      this.loading = false;
    });
  }
  /** 查询菜单下拉树结构 */
  getTreeselect() {
    listMenu().then((response) => {
       if (response && response.data.code === 200) {
      this.menuOptions = [];
      const menu: Imenu = { menuId: 0, menuName: "根菜单", children: [] };
      menu.children = response.data.data;
      //menu.children = this.handleTree(response.data, "menuId");
      this.menuOptions.push(menu);
       }
    });
  }
  //查询
  handleQuery() {
    this.getList();
  }
  //重置
  resetQuery() {
    this.resetForm("queryForm");
    this.handleQuery();
  }
  resetForm(refName: string) {
    if (this.$refs[refName]) {
      (this.$refs[refName] as Form).resetFields();
    }
  }
  // 表单重置
  reset() {
    // this.btnSubmitVisible = true;
    this.form = {
      menuId: undefined,
      parentId: 0,
      menuName: undefined,
      icon: undefined,
      menuType: "M",
      orderNum: 999,
      isFrame: "0",
      isCache: "0",
      visible: "0",
      status: "0",
    };
    this.resetForm("form");
  }
  //新增
  handleNewAdd() {
    this.reset();
    this.getTreeselect();

    // this.form.parentId = row != null && row.menuId ? row.menuId : 0;
    this.open = true;
    this.title = "新增菜单";
  }

  /** 新增按钮操作 */
  handleAdd(row: any) {
    this.reset();
    this.getTreeselect();
    this.form.parentId = row != null && row.menuId ? row.menuId : 0;
    this.open = true;
    this.title = "添加菜单";
  }
  /** 修改按钮操作 */
  handleUpdate(row: any) {
    this.reset();
    this.getTreeselect();
    getMenu(row.menuId).then((response) => {
      if (response && response.data.code === 200) {
        this.form = response.data.data;
        this.open = true;
        this.title = "修改菜单";
      }
    });
  }
  /** 删除按钮操作 */
  handleDelete(row: any) {
    this.$confirm('是否确认删除名称为"' + row.menuName + '"的数据项?', "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      delMenu(row.menuId).then((response) => {
        if (response && response.data.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getList();
        }
      });
    });
  }

  /**
   * 保存排序
   */
  handleChangeSort(item: any) {
    this.editIndex = -1;
    changeMenuSort({ orderNum: item.orderNum, menuId: item.menuId }).then(
      (response) => {
        if (response && response.data.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.getList();
        }
      }
    );
  }
  // 显示编辑排序
  editCurrRow(rowId: any, str: string) {
    this.editIndex = rowId;
    // let id = rowId + str;
    // setTimeout(() => {
    //   console.log(id);
    //     document.getElementById(id).focus();

    // }, 100);
  }
  handleTreeSelect(node: any) {
    //如果是链接隐藏提交按钮
    console.log("99999");
    // this.btnSubmitVisible = node.menuType == "L" ? false : true;
  }
  /** 转换菜单数据结构 */
  normalizer(node: any) {
    if (node.children && !node.children.length) {
      delete node.children;
    }
    return {
      id: node.menuId,
      label: node.menuName,
      children: node.children,
    };
  }
  // 选择图标
  selected(name: any) {
    this.form.icon = name;
  }
  cancel() {
    this.open = false;
  }
  submitForm() {
    // console.log("提交表单");
    (this.$refs["form"] as Form).validate((valid) => {
      if (valid) {
        if (this.form.menuId != undefined) {
          updateMenu(this.form).then((response) => {
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
          addMenu(this.form).then((response) => {
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
  //展开/折叠操作
  toggleExpandAll() {
    this.refreshTable = false;
    this.isExpandAll = !this.isExpandAll;
    this.$nextTick(() => {
      this.refreshTable = true;
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
    ::v-deep .el-button {
      padding: 0;
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
  ::v-deep .vue-treeselect__single-value {
    padding-top: 4px;
  }
  ::v-deep .vue-treeselect__placeholder {
    padding-top: 4px;
  }
  .el-input__prefix{
    top:6px;
    color: #000;
  }
}
</style>
