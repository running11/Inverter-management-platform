<template>
  <!-- 用户导入对话框 -->
  <new-dialog
    width="58%"
    :show="open"
    :title="title"
    :on-close="closeDialog"
    :on-submit="submitFileForm"
  >
    <el-form :model="form" label-width="120px" ref="form">
      <el-form-item :label="text.permissionCharacter">
        {{ form.roleKey }}
      </el-form-item>
      <el-form-item :label="text.dataAuthority">
        <el-checkbox
          v-model="menuExpand"
          @change="handleCheckedTreeExpand($event)"
          >{{$t("roleManage.openOrClose")}}</el-checkbox
        >
        <el-checkbox
          v-model="menuNodeAll"
          @change="handleCheckedTreeNodeAll($event)"
          >{{$t("roleManage.allOrNo")}}</el-checkbox
        >
        <el-checkbox
          v-model="form.menuCheckStrictly"
          @change="handleCheckedTreeConnect($event)"
          >{{$t("roleManage.linkage")}}</el-checkbox
        >
        <el-tree
          class="tree-border"
          :data="menuOptions"
          show-checkbox
          ref="menu"
          node-key="id"
          :check-strictly="!form.menuCheckStrictly"
          empty-text=""
          :filter-node-method="menuFilterNode"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
    </el-form>
  </new-dialog>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import {roleMenuTreeselect} from "@/api/menu/menu";
import { dataScope } from "@/api/role/role";
import i18n from "@/language";

interface IRole {
  [propName: string]: any;
}
@Component({
  components: {
    NewDialog,
  },
})
export default class RoleDialog extends Vue {
  @Prop(Object) data!: IRole;
  role = this.data;
  open = false;
  title = i18n.t('roleManage.dialogTitle') as string;
  text = {
    dataAuthority:i18n.t('roleManage.dataAuthority'),
    permissionCharacter:i18n.t('roleManage.permissionCharacter'),
  }
  menuExpand = false;
  menuNodeAll = false;
  form = {
    roleId: undefined,
    roleName: undefined,
    roleKey: undefined,
    roleSort: 99,
    status: "0",
    menuIds: [],
    dataScope: "1",
    menuCheckStrictly: true,
    remark: undefined,
  };
  defaultProps = {
    children: "children",
    label: "label",
  };
  // 菜单列表
  menuOptions = [];
  @Watch("data", { immediate: true, deep: true })
  getData(newVal: any) {
    this.role = newVal;
  }

  showDialog() {
    this.open = true;
    this.init();
  }
  closeDialog() {
    this.open = false;
    this.reset();
  }

  // 菜单筛选
  menuFilterNode(value: any, data: any) {
    if (!value) return true;
    return data.label.indexOf(value) !== -1;
  }
  // 所有菜单节点数据
  getMenuAllCheckedKeys() {
    // 目前被选中的菜单节点
    const checkedKeys = (this.$refs.menu as any).getCheckedKeys();
    // 半选中的菜单节点
    const halfCheckedKeys = (this.$refs.menu as any).getHalfCheckedKeys();
    checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
    return checkedKeys;
  }
  /** 根据角色ID查询菜单树结构 */
  getRoleMenuTreeselect(roleId: any) {
    return roleMenuTreeselect(roleId).then((response) => {
      if (response && response.data.code === 200) {
        this.menuOptions = response.data.data.menus;
        return response;
      }
    });
  }
  // 表单重置
  reset() {
     if (this.$refs.menu != undefined) {
      (this.$refs.menu as any).setCheckedKeys([]);
    }
    this.menuExpand = false;
    this.menuNodeAll = false;
    this.form.menuCheckStrictly = true;
  }
 
  init() {
    const row = this.role;
    this.form.roleId = row.roleId;
    this.form.roleName = row.roleName;
    this.form.roleKey = row.roleKey;  
    const roleMenu = this.getRoleMenuTreeselect(row.roleId);
    roleMenu.then((res) => {
      if (res && res.data.code === 200) {
        const checkedKeys = res.data.data.checkedKeys;
        checkedKeys.forEach((v: any) => {
          this.$nextTick(() => {
            (this.$refs.menu as any).setChecked(v, true, false);
          });
        });
      }
    });
  }
  // 树权限（展开/折叠）
  handleCheckedTreeExpand(value: any) {
      const treeList:any = this.menuOptions;
      // console.log(treeList, "treeList1111");
      for (let i = 0; i < treeList.length; i++) {
        (this.$refs.menu as any).store.nodesMap[treeList[i].id].expanded =
          value;
      }
   
  }
  // 树权限（全选/全不选）
  handleCheckedTreeNodeAll(value: any) {
    (this.$refs.menu as any).setCheckedNodes(value ? this.menuOptions : []);
  }
  // 树权限（父子联动）
  handleCheckedTreeConnect(value: any) {
      this.form.menuCheckStrictly = !!value;
  }
  /** 提交按钮（菜单数据权限） */
  submitFileForm() {
    if (this.form.roleId != undefined) {
      this.form.menuIds = this.getMenuAllCheckedKeys();
      dataScope(this.form).then((response) => {
        if (response && response.data.code === 200) {
          console.log(response.data.data);
          this.$message({
            type: "success",
            message: i18n.t('common.editSuccess') as string,
          });
          this.closeDialog();
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
