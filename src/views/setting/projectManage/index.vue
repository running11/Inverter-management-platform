<template>
  <div class="main-wrapper">
    <div class="title">项目管理</div>
    <div class="content-box">
      <div class="menu-box">
        <el-tree
          ref="tree2"
          :data="data2"
          :props="defaultProps"
          class="filter-tree"
          default-expand-all
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
  companyId = -1;
  private data2: TreeData[] = [
    {
      id: 1,
      label: "公司 one 1",
      children: [
        {
          id: 2,
          label: "公司 two 1-1",
          children: [
            {
              id: 3,
              label: "公司 three 1-1-1",
            },
            {
              id: 4,
              label: "公司 three 1-1-2",
            },
          ],
        },
        {
          id: 5,
          label: "公司 two 1-2",
          children: [
            {
              id: 6,
              label: "公司 three 1-2-1",
            },
            {
              id: 7,
              label: "公司 three 1-2-2",
            },
          ],
        },
      ],
    },
  ];
  private defaultProps = {
    children: "children",
    label: "label",
  };
  handleNodeClick(data: any): void {
    console.log(data.id);
    this.companyId = data.id;
    this.timer = new Date().getTime().toString();
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
