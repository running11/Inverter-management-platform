<template>
  <div class="table-box">
    <table>
      <thead>
        <tr>
          <td v-for="(column, index) in theadColumns" :key="index">
            {{ column.text }}
          </td>
          <td v-if="operationVisible">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableList" :key="index">
          <template v-for="(column, i) in theadColumns">
            <td :key="i" v-if="column.slot">
              <!-- 自定义内容，有的需要显示，把值传给父级 -->
              <slot
                :name="column.field"
                :value="item[column.field]"
                :row="item"
              ></slot>
            </td>
            <td :key="i" v-else>{{ item[column.field] }}</td>
          </template>
          <td v-if="operationVisible">
            <i class="icon el-icon-edit" @click="getEditBtn(item)"></i>
            <i class="icon el-icon-delete" @click="getDeleteBtn(item)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component({
  components: {},
})
export default class TableCustom extends Vue {
  @Prop(Array) theadColumns!: ITheadColums;
  @Prop(Array) tableList!: ITableList;
  operationVisible = false;

  @Emit("bindDeleteBtn")
  getDeleteBtn(item: any) {
    return item;
  }

  @Emit("bindEditBtn")
  getEditBtn(item: any) {
    return item;
  }
}
</script>
<style scoped lang="scss">
.table-box,
table {
  width: 100%;
  tr {
    height: 44px;
    td {
      font-size: 14px;
      color: $gray;
      text-align: center;
      line-height: 44px;
    }
    td:first-child {
      padding-left: 10px;
    }
    td:last-child {
      padding-right: 10px;
    }
  }
  tr:nth-child(even) {
    td {
      background: $tbodyTrBg;
    }
    td:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    td:last-child {
      border-bottom-right-radius: 2px;
      border-top-right-radius: 2px;
    }
  }
  thead {
    tr {
      td {
        font-size: 15px;
        color: #000;
        background-color: $theadTrBg;
      }
    }
  }
  tbody {
    tr:hover {
      td {
        background-color: $tbodyTrActiveBg;
      }
    }
  }
  .icon {
    font-size: 20px;
    color: $main-color;
    font-weight: bold;
    cursor: pointer;
  }
  .el-icon-edit {
    margin-right: 8px;
  }
  .el-icon-delete {
    margin-left: 8px;
    color: #f56c6c;
  }
}
</style>
