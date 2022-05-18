<template>
  <div class="tree-table">
    <!-- <div @click="clearSelectedRow">清除行</div> -->
    <el-table
      ref="singleTable"
      :header-cell-style="{
        background: '#EDEFF2',
        color: '#000',
        fontWeight: 'normal',
        textAlign: 'left'
      }"
      :cell-style="{textAlign: 'left'}"
      :data="tableList"
      style="width: 100%"
      highlight-current-row
      :row-key="rowKey"
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @row-click="handleRowClick"
    >
      <template slot="empty">
        <img class="empty-img" src="@/assets/images/icon_no_data.png"/>
        <p class="empty-text">{{$t("common.noData")}}</p>
      </template>
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
import { Component, Prop, Emit, Watch, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component
export default class TreeTable extends Vue {
  @Prop({ type: String, default: "id"}) rowKey!: string;
  @Prop({ type: Boolean, default: false }) readonly isOperate!: boolean;
  @Prop(Object) currentSelectedRow!: any;
  @Prop(Array) theadColumns!: ITheadColums;
  @Prop(Array) tableList!: ITableList;
  tableData1: any = [];

  @Watch("currentSelectedRow", { immediate: true, deep: true })
  getCurrentSelectedRow(newVal: any, oldVal: any) {
    this.$nextTick(() => {
      const currentRow = this.getRow(this.tableList, newVal);
      if(this.$refs.singleTable as any) (this.$refs.singleTable as any).setCurrentRow(currentRow, true);
    });
  }

  @Emit("getLoadList")
  load(tree: ITableList, treeNode: any, resolve: any): void {
    return resolve;
  }

  @Emit("selectedRow")
  handleRowClick(row: any){
    return row;
  }

  setSelectedRow(row: any): void{
    this.$nextTick(() => {
      const currentRow = this.getRow(this.tableList, row);
      // console.log(this.tableList, currentRow, 'ccccccccccccccc');
      if(this.$refs.singleTable as any) (this.$refs.singleTable as any).setCurrentRow(currentRow, true);
    });
  }

  getRow(list: any, row: any): any {
    if(!list || !list.length || !row) return;

    let resultItem;
    for(let i = 0, len = list.length; i < len; i++){
      let item = list[i];
      if(item['compyId'] === row['compyId']){
        resultItem = item;
        return resultItem;
      }
      if(item.children && item.children.length){
        resultItem = this.getRow(item.children, row)
        if (resultItem) return resultItem;
      }
    }
    return resultItem
  }

  clearSelectedRow(): void{ // 取消行选中
    // 是个嵌套数组， children可能有无数级
    this.$nextTick(() => {
      if(this.$refs.singleTable as any) (this.$refs.singleTable as any).setCurrentRow();
    });
  }
}
</script>
<style lang="scss" scoped>
.tree-table {
  ::v-deep.el-table thead {
    background-color: $theadTrBg;
  }
  .el-table .current-row > td {
    background: transparent !important;
  }
  .empty-img{
    display: block;
    width: 100px;
    height: auto;
    margin: 20px auto;
  }
  .empty-text{
    line-height: 30px;
    margin: 0 0 15px;
  }
}
</style>
