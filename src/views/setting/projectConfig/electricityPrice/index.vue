<template>
  <div class="project-config-wrapper">
    <div class="details-wrapper bor">
      <div class="title-box">
        <div class="toolbar-right">
          <el-button type="primary" @click="defaultPrice"
            >使用默认电价</el-button
          >
          <el-button type="primary" @click="add">新增</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane label="上网电价" name="sellingPrice">
          <my-form :dataArr="sellingPriceArr"></my-form>
          <!-- <div
            class="form-box"
            v-for="(item, index) in sellingPriceArr"
            :key="index"
          >
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
                </el-form-item>
                <el-form-item>
                  <el-button @click="dele(index, n)">删除</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div> -->
        </el-tab-pane>
        <el-tab-pane label="购买电价" name="buyPrice">
          <my-form :dataArr="buyPriceArr"></my-form>
          <!-- <div
            class="form-box"
            v-for="(item, index) in buyPriceArr"
            :key="index"
          >
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
                </el-form-item>
                <el-form-item>
                  <el-button @click="dele(index, n)">删除</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="pad">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import myForm from "./components/form.vue";
@Component({
  components: {
    myForm,
  },
})
export default class electricityPrice extends Vue {
  activeName = "sellingPrice";
  handleClick(tab: any, event: any) {
    // console.log(this.activeName);
  }
  sellingPriceArr = [
    {
      date: "",
      timeArr: [
        {
          startTime: "",
          endTime: "",
          price: "0.5",
        },
        {
          startTime: "",
          endTime: "",
          price: "0.6",
        },
      ],
    },
  ];
  buyPriceArr = [
    {
      date: "",
      timeArr: [
        {
          startTime: "",
          endTime: "",
          price: "0.5",
        },
      ],
    },
  ];
  add(): void {
    let obj = {
      date: "",
      timeArr: [
        {
          startTime: "",
          endTime: "",
          price: "",
        },
      ],
    };
    if (this.activeName == "sellingPrice") {
      this.sellingPriceArr.push(obj);
    } else {
      this.buyPriceArr.push(obj);
    }
  }

  defaultPrice(): void {
    if (this.activeName == "sellingPrice") {
      this.sellingPriceArr.forEach((item) => {
        item.timeArr.forEach((i) => {
          i.price = "0.46";
        });
      });
    } else {
      this.buyPriceArr.forEach((item) => {
        item.timeArr.forEach((i) => {
          i.price = "0.46";
        });
      });
    }
  }

  save(): void {
    console.log(this.sellingPriceArr, "上网电价");
    console.log(this.buyPriceArr, "购买电价");
  }
}
</script>
<style lang="scss" scoped>
.project-config-wrapper {
  padding: 20px 0;

  .details-wrapper {
    background: $white;
    padding: 20px;
    position: relative;
    /deep/ .el-tabs__item:focus.is-active.is-focus:not(:active) {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    .title-box {
      // padding: 20px 20px 0 20px;
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 99;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        line-height: 36px;
      }
    }
    .form-box {
      padding: 20px;
      border-bottom: 1px solid $border-color;
      /deep/ .el-form-item {
        margin-right: 10%;
      }
    }
  }
  .pad {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .bor {
    margin-bottom: 20px;
  }
}
</style>
