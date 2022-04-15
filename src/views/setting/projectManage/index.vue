<template>
  <div class="main-wrapper">
    <div class="title">项目管理</div>
    <div class="content-box">
      <div class="menu-box">
        <el-tree
          ref="tree"
          class="filter-tree"
          highlight-current
          node-key="compyId"
          :expand-on-click-node="false"
          :data="companyList"
          :props="defaultProps"
          :default-checked-keys="treeCheckedKeys"
          :default-expanded-keys="treeExpandedKeys"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="table-box">
        <project-table :key="timer" :companyId="companyId"></project-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import projectTable from "./components/table.vue";
import service from "@/utils/request";
import TreeTable from "@/components/treeTable/index.vue";

interface TreeData {
  id?: any;
  label?: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: TreeData[];
}
@Component({
  components: {
    projectTable,
  },
})
export default class projectManage extends Vue {
  timer = "";
  companyId: any = "";
  companyList:any = [];
  treeExpandedKeys: string[] | number[] = [];
  treeCheckedKeys: string[] | number[] = [];
  private defaultProps = {
    children: "children",
    label: "compyName",
    id: "compyId"
  };

  created(): void{
    this.getCompanyList();
  }

  getCompanyList(): void{
    service({
      method: "get",
      url: "/api/business/EmsCompany/treeList",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          console.log(res.data, 111);
          let list = res.data.data || [];
          if(list.length > 0){
            let arr:any = [];
            arr.push(list[0].compyId, list[0].children[0].compyId);
            this.treeExpandedKeys = arr; // 默认展开第一个
            this.treeCheckedKeys = [list[0].compyId]; // 默认选中第一个
            this.companyId = list[0].compyId;
            this.$nextTick(() => {
              (this.$refs["tree"] as any).setCheckedKeys(this.treeCheckedKeys);
            })
            console.log(this.treeExpandedKeys, "treeExpandedKeys", this.treeCheckedKeys);
          }
          this.companyList = list;
          // console.log("公司列表", this.companyList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleNodeClick(data: any): void {
    this.treeExpandedKeys = [data.parentId, data.compyId];
    this.treeCheckedKeys = [data.compyId];
    this.companyId = data.compyId;
    this.timer = new Date().getTime().toString();
    console.log(this.treeExpandedKeys, this.treeCheckedKeys, '点击树型选项');
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  height: 100%;
  background: $white;
  padding: 20px 0 20px 20px;
  // padding-top: 10px;
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
    .table-box {
      flex: 1;
    }
  }
}
</style>
