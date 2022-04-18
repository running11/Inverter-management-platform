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
      :row-key="rowKey"
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
  @Prop({ type: String, default: "id"}) rowKey!: string;
  @Prop({ type: Boolean, default: false }) readonly isOperate!: boolean;
  @Prop(Array) theadColumns!: ITheadColums;
  @Prop(Array) tableList!: ITableList;
  tableData1: any = [];

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
  ::v-deep.el-table thead {
    background-color: $theadTrBg;
  }
  ::v-deep.el-table__row > td {
    border: none;
  }
  ::v-deep.el-table::before {
    height: 0;
  }
  ::v-deep.el-table .el-table__cell {
    padding: 0;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: $gray;
    text-align: center;
  }
  ::v-deep.el-table tr:nth-child(even) {
    background: $tbodyTrBg;
  }
  ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: $tbodyTrActiveBg;
  }
}
</style>
