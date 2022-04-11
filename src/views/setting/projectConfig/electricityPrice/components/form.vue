<template>
  <div>
    <div class="form-box" v-for="(item, index) in arr" :key="index">
      <el-form
        :inline="true"
        :model="item"
        label-position="right"
        label-width="80px"
      >
        <div>
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="item.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-button
            type="primary"
            plain
            @click="addTime(index)"
            style="float: right"
            icon="el-icon-plus"
          ></el-button>
        </div>
        <div v-for="(i, n) in item.timeArr" :key="n">
          <el-form-item label="起始时间">
            <el-time-select
              v-model="i.startTime"
              placeholder="选择起始时间"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-time-select
              v-model="i.endTime"
              placeholder="选择结束时间"
              :picker-options="{
                minTime: i.startTime,
                start: '00:00',
                step: '00:30',
                end: '24:00',
              }"
            >
            </el-time-select>
          </el-form-item>
          <el-form-item label="电价">
            <el-input v-model="i.price" style="width: 100px"></el-input>
            <span class="ml">CNY/kwh</span>
          </el-form-item>
          <el-form-item>
            <el-button @click="dele(index, n)">删除</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
interface IArr {
  date: string;
  timeArr: IObj[];
}
interface IObj {
  startTime: string;
  endTime: string;
  price: string;
}
@Component
export default class myForm extends Vue {
  @Prop(Array) dataArr!: IArr[];
  arr = this.dataArr;
  // @Watch("dataArr", { immediate: true, deep: true })
  // getDataArr(newVal: any, oldVal: any) {
  //   this.arr = newVal;
  // }
  dele(index: number, n: number): void {
    this.arr[index].timeArr.splice(n, 1);
    if (this.arr[index].timeArr.length == 0) {
      this.arr.splice(index, 1);
    }
  }
  addTime(index: number) {
    let obj = {
      startTime: "",
      endTime: "",
      price: "",
    };
    this.arr[index].timeArr.push(obj);
  }
}
</script>
<style lang="scss" scoped>
.form-box {
  padding: 20px;
  border-bottom: 1px solid $border-color;
  /deep/ .el-form-item {
    margin-right: 5%;
  }
  .ml {
    margin-left: 10px;
    color: $gray;
  }
}
</style>
