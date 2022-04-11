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
              <label>当日发电量</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <label>累计发电量</label>
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
              <label>当日充电电量</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <label>当日放电电量</label>
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
              <label>累计充电电量</label>
              <span class="num">120</span>
              <span class="unit">kWh</span>
            </div>
            <div class="item">
              <label>累计放电电量</label>
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
              <label>当日收益</label>
              <span class="num">120</span>
              <span class="unit">元</span>
            </div>
            <div class="item">
              <label>累计收益</label>
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
      <e-table :tableCloumns="theadSelectedColumns" :tableData="list"></e-table>
      <!-- <table-custom :theadColumns="theadSelectedColumns" :tableList="list">
        <template slot="status" slot-scope="scope">
          <i :class="['iconfont icon-bianzu', { online: scope.value }]"></i>
        </template>
        <template slot="specialOperation">
          <el-button type="primary" plain @click="toProjectDetails">
            详情
          </el-button>
        </template>
      </table-custom> -->
      <div class="pagination-box">
        <el-pagination background layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>

    <home-dialog ref="homeDialog" :title="dialogTitle"></home-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TableCustom from "@/components/table/index.vue";
import PopoverColumn from "@/components/popoverColumn/index.vue";
import ETable from "@/components/eTable/index.vue";
import HomeDialog from "@/views/home/components/dialog.vue";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component({
  components: {
    TableCustom,
    PopoverColumn,
    ETable,
    HomeDialog,
  },
})
export default class Home extends Vue {
  dialogTitle = "新增项目";
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
      field: "PVInstalledCapacity",
      sortable: true,
    },
    {
      text: "储能装机容量(kW)",
      field: "EMSInstalledCapacity",
      sortable: true,
    },
    {
      text: "储能装机能量(kWh)",
      field: "EMSInstalledEnergy",
    },
    {
      text: "当日收益(万元)",
      field: "dayIncome",
      sortable: true,
    },
    {
      text: "当日发电电量(kWh)",
      field: "dayPowerGeneration",
    },
    {
      text: "当日充电电量(kWh)",
      field: "dayPowerCharge",
    },
    {
      text: "当日放电电量(kWh)",
      field: "dayPowerDisCharge",
    },
    {
      text: "电池SOC(%)",
      field: "SOC",
    },
    {
      text: "累计收益",
      field: "accumulatedIncome",
    },
    {
      text: "累计发电电量(MWh)",
      field: "cumulativeElectricity",
    },
    {
      text: "累计充电电量(MWh)",
      field: "cumulativeCharge",
    },
    {
      text: "累计放电电量(MWh)",
      field: "cumulativeDischarge",
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        return h(
          "el-button",
          {
            class: "el-button--primary is-plain",
            on: {
              click: () => {
                // console.log(`点击了`, params);
                this.toProjectDetails();
              },
            },
          },
          `详情`
        );
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
      field: "PVInstalledCapacity",
      sortable: true,
    },
    {
      text: "储能装机容量(kW)",
      field: "EMSInstalledCapacity",
      sortable: true,
    },
    {
      text: "储能装机能量(kWh)",
      field: "EMSInstalledEnergy",
    },
    {
      text: "当日收益(万元)",
      field: "dayIncome",
      sortable: true,
    },
    {
      text: "当日发电电量(kWh)",
      field: "dayPowerGeneration",
    },
    {
      text: "当日充电电量(kWh)",
      field: "dayPowerCharge",
    },
    {
      text: "当日放电电量(kWh)",
      field: "dayPowerDisCharge",
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
      render: (h: any, params: any) => {
        return h(
          "el-button",
          {
            class: "el-button--primary is-plain",
            on: {
              click: () => {
                this.toProjectDetails();
              },
            },
          },
          `详情`
        );
      },
    },
  ];
  list: ITableList[] = [
    {
      status: true,
      projectName: "松江储能",
      PVInstalledCapacity: 1111,
      EMSInstalledCapacity: 11,
      EMSInstalledEnergy: 111,
      dayIncome: 300,
      dayPowerGeneration: 111,
      dayPowerCharge: 111,
      dayPowerDisCharge: 222,
      SOC: 10,
      accumulatedIncome: 100320,
      cumulativeElectricity: 4444,
      cumulativeCharge: 455,
      cumulativeDischarge: 454,
    },
    {
      status: false,
      projectName: "松江储能",
      PVInstalledCapacity: 1111,
      EMSInstalledCapacity: 111,
      EMSInstalledEnergy: 111,
      dayIncome: 400,
      dayPowerGeneration: 111,
      dayPowerCharge: 111,
      dayPowerDisCharge: 222,
      SOC: 10,
      accumulatedIncome: 100320,
      cumulativeElectricity: 4444,
      cumulativeCharge: 455,
      cumulativeDischarge: 454,
    },
  ];

  getCheckedColumns(list: Array<ITheadColums>) {
    this.theadSelectedColumns = list;
    console.log(this.theadSelectedColumns, 1111111);
  }
  toProjectDetails(): void {
    const { href } = this.$router.resolve({
      path: "/projectDetails",
      query: { id: "22" },
    });
    window.open(href, "_blank");
  }
  showDialog(): void{
    (this.$refs.homeDialog as any).showDialog();
  }
}
</script>
<style lang="scss" scoped>
.main-wrapper {
  /deep/.el-row {
    margin-bottom: 20px;
    .grid-content {
      padding: 10px 5px;
      background-color: $white;
      border-radius: 4px;
      display: flex;
      .img-box {
        width: 36%;
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
