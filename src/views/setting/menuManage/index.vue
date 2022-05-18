<template>
  <div class="main-wrapper">
    <div class="title-box">
      <div class="title">{{ $t("menuManage.title") }}</div>
    </div>

    <div class="search-box">
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="78px"
      >
        <el-form-item :label="text.menuName" prop="menuName">
          <el-input
            v-model="queryParams.menuName"
            :placeholder="text.plaseMenuName"
            @keyup.enter.native="handleQuery"
          ></el-input>
        </el-form-item>

        <el-form-item :label="text.menuStatus" prop="status">
          <el-select
            v-model="queryParams.status"
            :placeholder="text.menuStatus"
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
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQuery"
            >{{ $t("common.search") }}</el-button
          >
          <el-button icon="el-icon-refresh" @click="resetQuery">{{
            $t("common.reset")
          }}</el-button>
        </el-form-item>
      </el-form>
      <div class="toolbar-right">
        <el-button type="primary" @click="handleNewAdd">{{
          $t("common.new")
        }}</el-button>
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          @click="toggleExpandAll"
          >{{ $t("menuManage.expand") }}</el-button
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
          :label="text.menuName"
          :show-overflow-tooltip="true"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="icon"
          :label="text.iconMenu"
          align="center"
          width="90"
        >
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="menuType"
          :label="text.typeMenu"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag
              type="danger"
              v-if="scope.row.menuType == 'M' && scope.row.isFrame == 1"
              >{{ $t("menuManage.linkText") }}</el-tag
            >
            <el-tag v-else-if="scope.row.menuType == 'C'">{{
              $t("menuManage.menuText")
            }}</el-tag>
            <el-tag type="success" v-else-if="scope.row.menuType == 'M'">{{
              $t("menuManage.catalogue")
            }}</el-tag>
            <el-tag type="warning" v-else-if="scope.row.menuType == 'F'">{{
              $t("menuManage.button")
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          :label="text.sortMenu"
          width="90"
          align="center"
        >
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
          :label="text.permissionId"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="path"
          :label="text.routerAddress"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="component"
          :label="text.componentUrl"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="visible" :label="text.show" width="90">
          <template slot-scope="scope">
            <dict-tag
              :options="visibleOptions"
              :value="scope.row.visible"
              :showValue="false"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="text.menuStatus"
          align="center"
          prop="status"
          width="90"
        >
          <template slot-scope="scope">
            <dict-tag
              :options="statusOptions"
              :value="scope.row.status"
              :showValue="false"
            />
          </template>
        </el-table-column>
        <el-table-column
          :label="text.operation"
          align="center"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
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
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-row>
          <el-col :lg="24">
            <el-form-item :label="text.superiorMenu">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                @select="handleTreeSelect"
                :placeholder="text.pleaseSelectMenu"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24">
            <el-form-item :label="text.typeMenu" prop="menuType">
              <el-radio-group size="mini" v-model="form.menuType">
                <el-radio-button label="M">{{
                  $t("menuManage.catalogue")
                }}</el-radio-button>
                <el-radio-button label="C">{{
                  $t("menuManage.menuText")
                }}</el-radio-button>
                <el-radio-button label="F">{{
                  $t("menuManage.button")
                }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item :label="text.menuName" prop="menuName">
              <el-input
                v-model="form.menuName"
                :placeholder="text.plaseMenuName"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item :label="text.sortMenu" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
                :value="999"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24" v-if="form.menuType != 'F'">
            <el-form-item :label="text.iconMenu" prop="icon">
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
                  :placeholder="text.selectIcon"
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
              :label="text.routerAddress"
              prop="path"
            >
              <span slot="label">
                <el-tooltip :content="text.routeTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.routerAddress }}
              </span>
              <el-input
                v-model="form.path"
                :placeholder="text.pleaseEnterRoute"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12" v-if="form.menuType == 'C'">
            <el-form-item :label="text.componentUrl" prop="component">
              <span slot="label">
                <el-tooltip :content="text.componentTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.componentUrl }}
              </span>
              <el-input
                v-model="form.component"
                :placeholder="text.pleaseEntercomponent"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item
              v-if="form.menuType != 'M'"
              :label="text.permissionId"
            >
              <span slot="label">
                <el-tooltip :content="text.permissionTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.permissionId }}
              </span>
              <el-input
                v-model="form.perms"
                :placeholder="text.pleasePermission"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'F'" :label="text.show">
              <span slot="label">
                <el-tooltip :content="text.showStatusTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.show }}
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
            <el-form-item v-if="form.menuType != 'F'" :label="text.isLink">
              <span slot="label">
                <el-tooltip :content="text.linkTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.isLink }}
              </span>
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">{{ $t("menuManage.yesText") }}</el-radio>
                <el-radio label="1">{{ $t("menuManage.noText") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item v-if="form.menuType != 'F'">
              <span slot="label">
                <el-tooltip :content="text.menuStatusTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.menuStatus }}
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
            <el-form-item v-if="form.menuType == 'C'" :label="text.isCache">
              <span slot="label">
                <el-tooltip :content="text.cacheTip" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
                {{ text.isCache }}
              </span>
              <el-radio-group v-model="form.isCache">
                <el-radio label="0">{{ $t("menuManage.cache") }}</el-radio>
                <el-radio label="1">{{ $t("menuManage.noCache") }}</el-radio>
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
// import { ITheadColums, ITableList } from "@/utils/interface";
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
import i18n from "@/language";
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
  text = {
    menuName: i18n.t("menuManage.menuName"),
    operation: i18n.t("common.operation"),
    menuStatus: i18n.t("menuManage.menuStatus"),
    plaseMenuName: i18n.t("menuManage.plaseMenuName"),
    iconMenu: i18n.t("menuManage.iconMenu"),
    typeMenu: i18n.t("menuManage.typeMenu"),
    sortMenu: i18n.t("menuManage.sortMenu"),
    permissionId: i18n.t("menuManage.permissionId"),
    routerAddress: i18n.t("menuManage.routerAddress"),
    componentUrl: i18n.t("menuManage.componentUrl"),
    show: i18n.t("menuManage.show"),
    superiorMenu: i18n.t("menuManage.superiorMenu"),
    isLink: i18n.t("menuManage.isLink"),
    isCache: i18n.t("menuManage.isCache"),
    pleaseSelectMenu: i18n.t("menuManage.pleaseSelectMenu"),
    selectIcon: i18n.t("menuManage.selectIcon"),
    pleaseEnterRoute: i18n.t("menuManage.pleaseEnterRoute"),
    routeTip: i18n.t("menuManage.routeTip"),
    componentTip: i18n.t("menuManage.componentTip"),
    pleaseEntercomponent: i18n.t("menuManage.pleaseEntercomponent"),
    permissionTip: i18n.t("menuManage.permissionTip"),
    pleasePermission: i18n.t("menuManage.pleasePermission"),
    linkTip: i18n.t("menuManage.linkTip"),
    menuStatusTip: i18n.t("menuManage.menuStatusTip"),
    showStatusTip: i18n.t("menuManage.showStatusTip"),
    cacheTip: i18n.t("menuManage.cacheTip"),
  };
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
      { required: true, message: i18n.t("menuManage.plaseMenuName") as string, trigger: "blur" },
    ],
    orderNum: [
      { required: true, message:i18n.t("menuManage.pleaseSortMenu") as string, trigger: "blur" },
    ],
    path: [{ required: true, message: i18n.t("menuManage.pleaseEntercomponent") as string, trigger: "blur" }],
  };
  created() {
    this.getList();
    getDicts("sys_show_hide").then((response) => {
      if (response && response.data.code === 200) {
        //console.log(response.data.data, "9999999");
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
        // console.log(response, "菜单列表");
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
        const menu: Imenu = { menuId: 0, menuName: i18n.t("menuManage.rootMenu") as string, children: [] };
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
    this.title = i18n.t("menuManage.addMenu") as string;
  }

  /** 新增按钮操作 */
  handleAdd(row: any) {
    this.reset();
    this.getTreeselect();
    this.form.parentId = row != null && row.menuId ? row.menuId : 0;
    this.open = true;
    this.title = i18n.t("menuManage.addMenu") as string;
  }
  /** 修改按钮操作 */
  handleUpdate(row: any) {
    this.reset();
    this.getTreeselect();
    getMenu(row.menuId).then((response) => {
      if (response && response.data.code === 200) {
        this.form = response.data.data;
        this.open = true;
        this.title = i18n.t("menuManage.editMenu") as string;
      }
    });
  }
  /** 删除按钮操作 */
  handleDelete(row: any) {
    this.$confirm(
      (i18n.t(`menuManage.deleMenu`) as string) + ' "' + row.menuName + '"?',
      i18n.t(`common.prompt`) as string,
      {
        confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
        cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
        type: "warning",
      }
    ).then(() => {
      delMenu(row.menuId).then((response) => {
        if (response && response.data.code === 200) {
          this.$message({
            message: i18n.t(`common.deleteSuccess`) as string,
            type: "success",
          });
          this.getList();
        }
      });
    });
  }

  //保存排序
  handleChangeSort(item: any) {
    this.editIndex = -1;
    changeMenuSort({ orderNum: item.orderNum, menuId: item.menuId }).then(
      (response) => {
        if (response && response.data.code === 200) {
          this.$message({
            type: "success",
            message: i18n.t(`common.editSuccess`) as string,
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
                message: i18n.t(`common.editSuccess`) as string,
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
  .el-input__prefix {
    top: 6px;
    color: #000;
  }
}
</style>
