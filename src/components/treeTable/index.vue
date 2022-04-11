<template>
  <div class="tree-table">
    <el-table
      :header-cell-style="{
        background: '#EDEFF2',
        color: '#000',
        fontWeight: 'normal',
      }"
      :data="tableList"
      style="width: 100%"
      row-key="id"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        v-for="(item, i) in theadColumns"
        :key="i"
        :label="item.text"
        :prop="item.field"
      >
      </el-table-column>
      <el-table-column label="操作" v-if="isOperate">
        <template slot-scope="scope">
          <slot :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component
export default class TreeTable extends Vue {
  @Prop({ type: Boolean, default: false }) readonly isOperate!: boolean;
  @Prop(Array) theadColumns!: ITheadColums;
  @Prop(Array) tableList!: ITableList;
  tableData1: any = [
    {
      id: 1,
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      id: 2,
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
      hasChildren: true,
    },
    {
      id: 4,
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ];

  @Emit("getLoadList")
  load(tree: ITableList, treeNode: any, resolve: any): void {
    return resolve;
  }

  handleEdit(): void {
    console.log(11);
  }
}
</script>
<style lang="scss" scoped>
.tree-table {
  /deep/.el-table thead {
    background-color: $theadTrBg;
  }
  /deep/.el-table__row > td {
    border: none;
  }
  /deep/.el-table::before {
    height: 0;
  }
  /deep/.el-table .el-table__cell {
    padding: 0;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: $gray;
    text-align: center;
  }
  /deep/.el-table tr:nth-child(even) {
    background: $tbodyTrBg;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: $tbodyTrActiveBg;
  }
}
</style>
