<template>
  <div class="e-table-wrapper table-box">
    <el-table :data="list" v-loading="loading">
      <template slot="empty">
        <img class="empty-img" src="@/assets/images/icon_no_data.png"/>
        <p class="empty-text">{{$t("common.noData")}}</p>
      </template>
      <el-table-column
        v-for="(item, index) in tableCloumns"
        :key="index"
        :prop="item.field ? item.field : null"
        :label="item.text ? item.text : null"
        :width="item.width ? item.width : null"
        :sortable="item.sortable ? true : false"
      >
        <template slot-scope="scope">
          <ex-slot
            v-if="item.render"
            :render="item.render"
            :row="scope.row"
            :index="scope.$index"
            :cloumn="item"
          ></ex-slot>
          <span v-else-if="item.slot">
            <!-- 自定义内容，有的需要显示，把值传给父级 -->
            <slot
              :name="item.field"
              :value="scope.row[item.field]"
              :row="item"
            ></slot>
          </span>
          <span v-else>{{ scope.row[item.field] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";

var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h: any, data: any) => {
    const params: any = {
      row: data.props.row,
      index: data.props.index,
    };
    if (data.props.column) params.column = data.props.column;
    return data.props.render(h, params);
  },
};

@Component({
  components: {
    exSlot,
  },
})
export default class ETable extends Vue {
  @Prop(Boolean) loading!: false;
  @Prop(Array) tableCloumns!: ITheadColums;
  @Prop(Array) tableData!: ITableList;
  list: any = this.tableData;

  @Watch("tableData", { immediate: true, deep: true })
  getTableData(newVal: any, oldVal: any){
    this.list = newVal;
  }
}
</script>
<style lang="scss" scoped>
.e-table-wrapper {
  ::v-deep.el-table__header .cell{
    padding: 0 4px;
    text-overflow: unset;
    white-space: nowrap;
  }
  ::v-deep.el-table .cell{
    padding: 0 4px;
  }
  ::v-deep.el-table .el-table__header tr th {
    background-color: #edeff2;
  }
  ::v-deep.el-table th.el-table__cell > .cell {
    font-weight: normal;
    color: #000;
  }
  ::v-deep.el-table td.el-table__cell,
  ::v-deep.el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }
  ::v-deep.el-table::before {
    height: 0;
  }
  ::v-deep.el-table .el-table__row:nth-child(even) {
    background: $tbodyTrBg;
  }
  ::v-deep.el-table tbody tr:hover > td {
    background: $tbodyTrActiveBg !important;
  }
  ::v-deep.el-table .sort-caret {
    border: 8px solid transparent;
  }
  ::v-deep.el-table .sort-caret.ascending {
    border-bottom-color: #c0c4cc;
    top: 0;
  }
  ::v-deep.el-table .sort-caret.descending {
    border-top-color: #c0c4cc;
    bottom: 0;
  }
  ::v-deep.el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409eff;
  }
  ::v-deep.el-table .descending .sort-caret.descending {
    border-top-color: #409eff;
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
