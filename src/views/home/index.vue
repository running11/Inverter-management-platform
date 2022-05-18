<template>
  <div class="main-wrapper">
    <el-row :gutter="12">
      <el-col :span="6" v-for="(item, index) in statisticsList" :key="index">
        <div class="grid-content">
          <div class="img-box">
            <img :src="item.image" alt="发电量" />
          </div>
          <div class="list-box">
            <div class="item" v-for="(rol, i) in item.list" :key="i">
              <label>{{rol.newDesc}}</label>
              <span class="num">{{rol.value}}</span>
              <span class="unit">{{rol.unit}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="table-wrapper">
      <div class="search-box">
        <div class="title">{{$t("homePage.projectList")}}</div>
        <div class="toolbar-right">
          <el-button type="primary" @click="showDialog">{{$t("common.new")}}</el-button>
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
          v-if="list.length"
          background
          layout="prev, pager, next, total"
          :page-size="pageSize"
          :current-page="page"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <home-dialog
      ref="homeDialog"
      :title="dialogTitle"
      :currentProject="currentProject"
      @fetchData="fetchData">
    </home-dialog>
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
import i18n from "@/language";

@Component({
  components: {
    TableCustom,
    PopoverColumn,
    ETable,
    HomeDialog,
  },
})
export default class Home extends Vue {
  currentProject: any = {};
  private statisticsList:any = []; // 统计对象
  private dialogTitle = i18n.t(`projectManage.addProject`); // 新增项目
  private listLoading = false;
  private total = 0;
  private page = 1;
  private pageSize = 10;
  theadColumns: ITheadColums[] = [
    {
      text: i18n.t(`homePage.status`) as string, // 状态
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
      text: i18n.t(`homePage.projectName`) as string, // 项目名称
      field: "projectName",
    },
    {
      text: `${i18n.t("homePage.pvCapacity")}(kW)` as string, // 光伏装机容量(kW)
      field: "pvCapacity",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.batteryCapacity")}(kW)` as string, // 储能装机容量(kW)
      field: "batteryCapacity",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.batteryEnergy")}(kWh)` as string, // 储能装机能量(kWh)
      field: "batteryEnergy",
    },
    {
      text: `${i18n.t("homePage.dailyIncome")}(万元)` as string, // 当日收益(万元)
      field: "dailyIncome",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.dailyGeneration")}(kWh)` as string, // 当日发电电量(kWh)
      field: "dailyGeneration",
    },
    {
      text: `${i18n.t("homePage.dailyCharge")}(kWh)` as string, // 当日充电电量(kWh)
      field: "dailyCharge",
    },
    {
      text: `${i18n.t("homePage.dailyDischarge")}(kWh)` as string, // 当日放电电量(kWh)
      field: "dailyDischarge",
    },
    {
      text: `${i18n.t("homePage.dailyDischarge")}(%)` as string, // 电池SOC(%)
      field: "batterySoc",
    },
    {
      text: i18n.t(`homePage.totalIncomeTable`) as string, // 累计收益
      field: "totalIncome",
    },
    {
      text: `${i18n.t("homePage.totalGenerationTable")}(MWh)` as string, // 累计发电电量(MWh)
      field: "totalGeneration",
    },
    {
      text: `${i18n.t("homePage.totalChargeTable")}(MWh)` as string, // 累计充电电量(MWh)
      field: "totalCharge",
    },
    {
      text: `${i18n.t("homePage.totalDischargeTable")}(MWh)` as string, // 累计放电电量(MWh) 
      field: "totalDischarge",
    },
    {
      text: i18n.t(`common.operation`) as string, // 操作
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
        }, i18n.t(`common.details`))]);
      },
    },
  ];
  theadSelectedColumns: ITheadColums[] = [
    {
      text: i18n.t(`homePage.status`) as string, // 状态
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
      text: i18n.t(`homePage.projectName`) as string, // 项目名称
      field: "projectName",
    },
    {
      text: `${i18n.t("homePage.pvCapacity")}(kW)` as string, // 光伏装机容量(kW)
      field: "pvCapacity",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.batteryCapacity")}(kW)` as string, // 储能装机容量(kW)
      field: "batteryCapacity",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.batteryEnergy")}(kWh)` as string, // 储能装机能量(kWh)
      field: "batteryEnergy",
    },
    {
      text: `${i18n.t("homePage.dayIncome")}(万元)` as string, // 当日收益(万元)
      field: "dayIncome",
      sortable: true,
    },
    {
      text: `${i18n.t("homePage.dayGeneration")}(kWh)` as string, // 当日发电电量(kWh)
      field: "dayGeneration",
    },
    {
      text: `${i18n.t("homePage.dayDischarge")}(kWh)` as string, // 当日放电电量(kWh)
      field: "dayCharge",
    },
    {
      text: `${i18n.t("homePage.dayDischarge")}(kWh)` as string, // 当日放电电量(kWh)
      field: "dayDischarge",
    },
    {
      text: i18n.t(`common.operation`) as string, // 操作
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
        }, i18n.t(`common.details`))]);
      },
    },
  ];
  private list: ITableList[] = [];

  created(): void {
    this.getStatisticsData();
    this.fetchData();
  }

  getStatisticsData(): void{ // 获取首页统计数据
    service({
      method: "get",
      url: "/api/business/Statistics/homeData",
    })
      .then((res) => {
        if (res && res.data.code === 200) {
          let list = res.data.data || [],
              newList = [],
              j = -1,
              images = [
                require("@/assets/images/icon_electricity.png"),
                require("@/assets/images/icon_electricity.png"),
                require("@/assets/images/icon_electricity.png"),
                require("@/assets/images/icon_electricity.png")
              ];
          for(let i = 0, len = list.length; i < len; i++){
            list[i]['newDesc'] = i18n.t(`homePage.${list[i].code}`);
          }
          for(let i = 0, len = list.length; i < len; i+=2){
            j++;
            newList.push({
              image: images[j],
              list: list.slice(i, i+2)
            });
          }
          this.statisticsList = newList;
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    this.$confirm(i18n.t(`common.deletePrompt`) as string, i18n.t(`common.prompt`) as string, {
      confirmButtonText: i18n.t(`common.confirmButtonText`) as string,
      cancelButtonText: i18n.t(`common.cancelButtonText`) as string,
        type: "warning"
      }).then(() => {
        service({
          method: "delete",
          url: `/api/business/EmsProject/${params.row.projectId}`,
        }).then((res) => {
          if (res && res.data.code === 200) {
            this.$message({
              message: i18n.t(`common.deleteSuccess`) as string,
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
    let defaultData: any = {
      compyId: undefined,
      compyName: "",
      projectId: undefined,
      projectName: "",
      plantName: "",
      gridConnectionDate: "",
      address: "",
      contactPerson: "",
      contactMethod: "",
      plantImage: "",
      region: "中国",
      longitude: 0,
      latitude: 0,
      zone: "",
      safeRunDate: "",
      remark: ""
    };
    this.currentProject = defaultData;
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
        width: 30%;
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
            font-size: 14px;
            color: $gray;
          }
          .num {
            font-size: 22px;
            color: rgba(0, 0, 0, 0.85);
            margin: 0 2px;
          }
          .unit {
            font-size: 9px;
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
