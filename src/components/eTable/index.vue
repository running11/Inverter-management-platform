<template>
  <div class="e-table-wrapper table-box">
    <el-table empty-text="暂无数据" :data="tableData" v-loading="loading">
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
          <span v-else>{{ scope.row[item.field] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
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

  created() {
    // console.log(this.tableCloumns, this.tableData);
  }
}
</script>
<style lang="scss" scoped>
.e-table-wrapper {
  /deep/.el-table .el-table__header tr th {
    background-color: #edeff2;
  }
  /deep/.el-table th.el-table__cell > .cell {
    font-weight: normal;
    color: #000;
  }
  /deep/.el-table td.el-table__cell,
  /deep/.el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }
  /deep/.el-table::before {
    height: 0;
  }
  /deep/.el-table .el-table__cell {
    padding: 6px 0;
  }
  /deep/.el-table .el-table__row:nth-child(even) {
    background: $tbodyTrBg;
  }
  /deep/.el-table tbody tr:hover > td {
    background: $tbodyTrActiveBg !important;
  }
  /deep/.el-table .sort-caret {
    border: 8px solid transparent;
  }
  /deep/.el-table .sort-caret.ascending {
    border-bottom-color: #c0c4cc;
    top: 0;
  }
  /deep/.el-table .sort-caret.descending {
    border-top-color: #c0c4cc;
    bottom: 0;
  }
  /deep/.el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409eff;
  }
  /deep/.el-table .descending .sort-caret.descending {
    border-top-color: #409eff;
  }
}
</style>
