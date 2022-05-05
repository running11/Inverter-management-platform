<template>
  <div class="main-wrapper">
    <el-row :gutter="12">
      <el-col :span="6">
        <div class="grid-content">
          <div class="img-box">
            <img src="@/assets/images/icon_electricity.png" alt="发电量" />
          </div>
          <div class="list-box">
            <div class="item">
              <!-- <label>当日发电量</label> -->
              <label>{{$t("homePage.dayPowerGeneration")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <!-- <label>累计发电量</label> -->
              <label>{{$t("homePage.cumulativePowerGeneration")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="img-box">
            <img src="@/assets/images/icon_electricity.png" alt="发电量" />
          </div>
          <div class="list-box">
            <div class="item">
              <!-- <label>当日充电电量</label> -->
              <label>{{$t("homePage.dayChargeQuantity")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <!-- <label>当日放电电量</label> -->
              <label>{{$t("homePage.dayDischargeCapacity")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="img-box">
            <img src="@/assets/images/icon_electricity.png" alt="发电量" />
          </div>
          <div class="list-box">
            <div class="item">
              <!-- <label>累计充电电量</label> -->
              <label>{{$t("homePage.accumulatedChargeCapacity")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <!-- <label>累计放电电量</label> -->
              <label>{{$t("homePage.accumulatedDischargeCapacity")}}</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="img-box">
            <img src="@/assets/images/icon_electricity.png" alt="发电量" />
          </div>
          <div class="list-box">
            <div class="item">
              <!-- <label>当日收益</label> -->
              <label>{{$t("homePage.dayIncome")}}</label>
              <span class="num">120</span>
              <span class="unit">元</span>
            </div>
            <div class="item">
              <!-- <label>累计收益</label> -->
              <label>{{$t("homePage.cumulativeIncome")}}</label>
              <span class="num">120</span>
              <span class="unit">元</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="table-wrapper">
      <div class="search-box">
        <div class="title">项目列表</div>
        <div class="toolbar-right">
          <el-button type="primary" @click="showDialog">新增</el-button>
          <popover-column
            :columnsAllList="theadColumns"
            :selectedCloumns="theadSelectedColumns"
            @getCheckedColumns="getCheckedColumns"
          ></popover-column>
        </div>
      </div>
      <e-table
        :loading="listLoading"
        :tableCloumns="theadSelectedColumns"
        :tableData="list"
      ></e-table>
      <div class="pagination-box">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :page-size="pageSize"
          :current-page="page"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <home-dialog ref="homeDialog" :title="dialogTitle" @fetchData="fetchData"></home-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TableCustom from "@/components/table/index.vue";
import PopoverColumn from "@/components/popoverColumn/index.vue";
import ETable from "@/components/eTable/index.vue";
import HomeDialog from "@/views/home/components/dialog.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
import service from "@/utils/request";

@Component({
  components: {
    TableCustom,
    PopoverColumn,
    ETable,
    HomeDialog,
  },
})
export default class Home extends Vue {
  private dialogTitle = "新增项目";
  private listLoading = false;
  private total = 0;
  private page = 1;
  private pageSize = 10;
  theadColumns: ITheadColums[] = [
    {
      text: "状态",
      field: "status",
      slot: true,
      disabled: true,
      width: 56,
      render: (h: any, params: any) => {
        if (params.row.status) {
          return h(
            "i",
            {
              class: "iconfont icon-bianzu online",
            },
            ``
          );
        } else {
          return h(
            "i",
            {
              class: "iconfont icon-bianzu",
            },
            ``
          );
        }
      },
    },
    {
      text: "项目名称",
      field: "projectName",
    },
    {
      text: "光伏装机容量(kW)",
      field: "pvCapacity",
      sortable: true,
    },
    {
      text: "储能装机容量(kW)",
      field: "batteryCapacity",
      sortable: true,
    },
    {
      text: "储能装机能量(kWh)",
      field: "batteryEnergy",
    },
    {
      text: "当日收益(万元)",
      field: "dailyIncome",
      sortable: true,
    },
    {
      text: "当日发电电量(kWh)",
      field: "dailyGeneration",
    },
    {
      text: "当日充电电量(kWh)",
      field: "dailyCharge",
    },
    {
      text: "当日放电电量(kWh)",
      field: "dailyDischarge",
    },
    {
      text: "电池SOC(%)",
      field: "batterySoc",
    },
    {
      text: "累计收益",
      field: "totalIncome",
    },
    {
      text: "累计发电电量(MWh)",
      field: "totalGeneration",
    },
    {
      text: "累计充电电量(MWh)",
      field: "totalCharge",
    },
    {
      text: "累计放电电量(MWh)",
      field: "totalDischarge",
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [h("el-button", {
          class: "el-button--primary is-plain",
          on: {
            click: () => {
              // console.log(`点击了`, params);
              this.toProjectDetails(params);
            },
          },
        }, "详情")]);
      },
    },
  ];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: "状态",
      field: "status",
      disabled: true,
      slot: true,
      width: 56,
      render: (h: any, params: any) => {
        if (params.row.status) {
          return h(
            "i",
            {
              class: "iconfont icon-bianzu online",
            },
            ``
          );
        } else {
          return h(
            "i",
            {
              class: "iconfont icon-bianzu",
            },
            ``
          );
        }
      },
    },
    {
      text: "项目名称",
      field: "projectName",
    },
    {
      text: "光伏装机容量(kW)",
      field: "pvCapacity",
      sortable: true,
    },
    {
      text: "储能装机容量(kW)",
      field: "batteryCapacity",
      sortable: true,
    },
    {
      text: "储能装机能量(kWh)",
      field: "batteryEnergy",
    },
    {
      text: "当日收益(万元)",
      field: "dailyIncome",
      sortable: true,
    },
    {
      text: "当日发电电量(kWh)",
      field: "dailyGeneration",
    },
    {
      text: "当日充电电量(kWh)",
      field: "dailyCharge",
    },
    {
      text: "当日放电电量(kWh)",
      field: "dailyDischarge",
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        return h("div", {}, [h("el-button", {
          class: "el-button--primary is-plain",
          on: {
            click: () => {
              // console.log(`点击了`, params);
              this.toProjectDetails(params);
            },
          },
        }, "详情")]);
      },
    },
  ];
  private list: ITableList[] = [];

  created(): void {
    this.fetchData();
  }

  fetchData(): void {
    const paramsData = {
      PageNum: this.page,
      PageSize: this.pageSize,
      Sort: "pvCapacity, batteryCapacity",
      SortType: "ascending", // "ascending" "descending"
    };
    this.listLoading = true;
    service({
      method: "get",
      url: "/api/business/EmsProject/homelist",
      params: paramsData,
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          // console.log("项目列表", res.data);
          this.list = res.data.data.result || [];
          this.total = res.data.data.totalNum || 0;
        }
        this.listLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleCurrentChange(val: number): void {
    this.page = val;
    this.fetchData();
  }
  del(params: any): void{
    console.log(`删除`, params);
    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        service({
          method: "delete",
          url: `/api/business/EmsProject/${params.row.projectId}`,
        }).then((res) => {
          if (res && res.data.code === 200) {
            this.$message({
              message: "删除成功",
              center: true,
              type: "success"
            });
            this.fetchData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      });
  }
  getCheckedColumns(list: Array<ITheadColums>) {
    this.theadSelectedColumns = list;
    console.log(this.theadSelectedColumns);
  }
  toProjectDetails(params: any): void {
    const { href } = this.$router.resolve({
      path: "/projectDetails",
      query: { id: params.row.projectId},
    });
    window.open(href, "_blank");
  }
  showDialog(): void {
    (this.$refs.homeDialog as any).showDialog();
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  min-width: 900px;
  ::v-deep.el-row {
    margin-bottom: 20px;
    .grid-content {
      padding: 10px 5px;
      background-color: $white;
      border-radius: 4px;
      display: flex;
      .img-box {
        width: 32%;
        min-height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 78%;
          height: auto;
        }
      }
      .list-box {
        margin: 15px 0 0 10px;
        .item {
          margin-bottom: 10px;
          line-height: 36px;
          label {
            font-size: 15px;
            color: $gray;
          }
          .num {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.85);
            margin: 0 2px;
          }
          .unit {
            font-size: 10px;
            color: #333333;
          }
        }
      }
    }
  }
  .table-wrapper {
    background-color: $white;
    padding: 20px 20px;
    .search-box {
      padding: 0 0 20px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
        line-height: 36px;
      }
      .toolbar-right {
        padding-right: 5px;
        display: flex;
      }
    }
    .pagination-box {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
<style lang="scss">
.icon-bianzu {
  font-size: 18px;
  color: #cccccc;
}
.online {
  color: #00cc00;
}
</style>
