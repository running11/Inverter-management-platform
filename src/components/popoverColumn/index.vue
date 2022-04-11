<template>
  <div class="popover-wrapper">
    <el-popover
      placement="bottom-end"
      width="200"
      trigger="click"
      ref="popoverColumn"
      @show="handleShow"
    >
      <div class="column-wrapper">
        <div class="title-box">
          <div class="title">选择列</div>
          <i class="el-icon-close" @click="handleClose"></i>
        </div>
        <div class="content-box">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-scrollbar class="scrollbar">
            <el-checkbox-group
              v-model="checkedList"
              @change="handleCheckedColumnsChange"
            >
              <el-row>
                <el-col
                  :span="24"
                  v-for="item in columnsList"
                  :key="item.field"
                >
                  <el-checkbox
                    :label="item.field"
                    :key="item.field"
                    :disabled="item.disabled"
                  >
                    {{ item.text }}
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </el-scrollbar>
        </div>
        <div class="footer-box">
          <el-button plain @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </div>
      <i slot="reference" class="el-icon-setting"></i>
    </el-popover>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { ITheadColums } from "@/utils/interface";
import { deepClone } from "@/utils";

@Component
export default class PopoverColumn extends Vue {
  @Prop(Array) columnsAllList!: any;
  @Prop(Array) selectedCloumns!: any;
  checkAll = false;
  isIndeterminate = true;
  checkedList: Array<string> = [];
  columns: Array<string> = [];
  columnsList: any = [];

  created(): void {
    this.init();
  }

  init(): void {
    this.columnsList = deepClone(this.columnsAllList, []) || [];
    const checkedList = deepClone(this.selectedCloumns, []) || [];
    for (let i = 0; i < this.columnsList.length; i++) {
      this.columns.push(this.columnsList[i].field);
    }
    for (let i = 0; i < checkedList.length; i++) {
      this.checkedList.push(checkedList[i].field);
    }
  }
  handleCheckAllChange(val: boolean): void {
    this.checkedList = val ? this.columns : [];
    this.isIndeterminate = false;
  }
  handleCheckedColumnsChange(value: Array<string>): void {
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.columnsList.length;
    this.isIndeterminate =
      checkedCount > 0 && checkedCount < this.columnsList.length;
  }

  handleShow(): void {
    let list: Array<string> = [];
    for (let i = 0; i < this.selectedCloumns.length; i++) {
      list.push(this.selectedCloumns[i]["field"]);
    }
    this.checkedList = list;
  }

  handleClose(): void {
    (this.$refs["popoverColumn"] as any).doClose();
  }
  @Emit("getCheckedColumns")
  handleSubmit() {
    (this.$refs["popoverColumn"] as any).doClose();
    const list = [];
    for (let i = 0; i < this.columnsAllList.length; i++) {
      let item = this.columnsAllList[i];
      for (let j = 0; j < this.checkedList.length; j++) {
        if (item["field"] === this.checkedList[j]) {
          list.push(item);
        }
      }
    }
    return list;
  }
}
</script>
<style lang="scss" scoped>
.popover-wrapper {
  .el-icon-setting {
    margin-left: 20px;
    font-size: 22px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    line-height: 38px;
    vertical-align: top;
  }
}
.column-wrapper {
  position: relative;
  .title-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 5px 15px 10px;
    .title {
      font-size: 15px;
    }
    i {
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content-box {
    padding: 15px 0;
    .scrollbar {
      width: 100%;
      padding-bottom: 40px;
      height: 240px;
    }
    /deep/.el-scrollbar__wrap {
      overflow-y: scroll;
      overflow-x: hidden;
    }
    /deep/.el-col-24 {
      margin-top: 15px;
    }
  }
  .footer-box {
    width: 100%;
    // height: 40px;
    background-color: $white;
    text-align: right;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 99;
    /deep/.el-button {
      padding: 7px 14px;
    }
  }
}
</style>
