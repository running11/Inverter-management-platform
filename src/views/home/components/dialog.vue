<template>
  <div>
    <new-dialog
      width="46%"
      :show="isShow"
      :title="title"
      :on-close="closeDialog"
      :on-submit="submitForm">
      <el-form
        label-width="130px"
        class="form"
        ref="form"
        :model="project"
        :rules="rules"
      >
        <el-form-item label="状态" prop="status">
          <el-radio v-model="project.status" label="false">在线</el-radio>
          <el-radio v-model="project.status" label="true">不在线</el-radio>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            placeholder="请输入项目名称"
            v-model="project.projectName"
          />
        </el-form-item>
        <el-form-item label="光伏装机容量" prop="PVInstalledCapacity">
          <el-input
            placeholder="请输入光伏装机容量"
            v-model="project.PVInstalledCapacity"
          />
          <span class="unit">kW</span>
        </el-form-item>
        <el-form-item label="储能装机容量" prop="EMSInstalledCapacity">
          <el-input
            placeholder="请输入储能装机容量"
            v-model="project.EMSInstalledCapacity"
          />
          <span class="unit">kW</span>
        </el-form-item>
        <el-form-item label="储能装机能量" prop="EMSInstalledEnergy">
          <el-input
            placeholder="请输入储能装机能量"
            v-model="project.EMSInstalledEnergy"
          />
          <span class="unit">kWh</span>
        </el-form-item>
        <el-form-item label="当日收益" prop="dayIncome">
          <el-input placeholder="请输入当日收益" v-model="project.dayIncome" />
          <span class="unit">万元</span>
        </el-form-item>
        <el-form-item label="当日发电电量" prop="dayPowerGeneration">
          <el-input
            placeholder="请输入当日发电电量"
            v-model="project.dayPowerGeneration"
          />
          <span class="unit">kWh</span>
        </el-form-item>
        <el-form-item label="当日充电电量" prop="dayPowerCharge">
          <el-input
            placeholder="请输入当日充电电量"
            v-model="project.dayPowerCharge"
          />
          <span class="unit">kWh</span>
        </el-form-item>
        <el-form-item label="当日放电电量" prop="dayPowerDisCharge">
          <el-input
            placeholder="请输入当日放电电量"
            v-model="project.dayPowerDisCharge"
          />
          <span class="unit">kWh</span>
        </el-form-item>
        <el-form-item label="电池SOC" prop="SOC">
          <el-input placeholder="请输入电池SOC" v-model="project.SOC" />
          <span class="unit">%</span>
        </el-form-item>
        <el-form-item label="累计收益" prop="accumulatedIncome">
          <el-input
            placeholder="请输入累计收益"
            v-model="project.accumulatedIncome"
          />
          <span class="unit">万元</span>
        </el-form-item>
        <el-form-item label="累计发电电量" prop="cumulativeElectricity">
          <el-input
            placeholder="请输入累计发电电量"
            v-model="project.cumulativeElectricity"
          />
          <span class="unit">MWh</span>
        </el-form-item>
        <el-form-item label="累计充电电量" prop="cumulativeCharge">
          <el-input
            placeholder="请输入累计充电电量"
            v-model="project.cumulativeCharge"
          />
          <span class="unit">MWh</span>
        </el-form-item>
        <el-form-item label="累计放电电量" prop="cumulativeDischarge">
          <el-input
            placeholder="请输入累计放电电量"
            v-model="project.cumulativeDischarge"
          />
          <span class="unit">MWh</span>
        </el-form-item>
      </el-form>
    </new-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";

interface IProject {
  status: boolean; // 状态
  projectName: string; // 项目名称
  PVInstalledCapacity: number | string; // 光伏装机容量(kW)
  EMSInstalledCapacity: number | string; // 储能装机容量(kW)
  EMSInstalledEnergy: number | string; // 储能装机能量(kWh)
  dayIncome: number | string; // 当日收益(万元)
  dayPowerGeneration: number | string; // 当日发电电量(kWh)
  dayPowerCharge: number | string; // 当日充电电量(kWh)
  dayPowerDisCharge: number | string; // 当日放电电量(kWh)
  SOC: number | string; // 电池SOC(%)
  accumulatedIncome: number | string; // 累计收益
  cumulativeElectricity: number | string; // 累计发电电量(MWh)
  cumulativeCharge: number | string; // 累计充电电量(MWh)
  cumulativeDischarge: number | string; // 累计放电电量(MWh)
}
@Component({
  components: {
    NewDialog,
  },
})
export default class HomeDialog extends Vue {
  @Prop(String) title!: string;
  isShow = false;

  project: IProject = {
    status: false,
    projectName: "",
    PVInstalledCapacity: "",
    EMSInstalledCapacity: "",
    EMSInstalledEnergy: "",
    dayIncome: "",
    dayPowerGeneration: "",
    dayPowerCharge: "",
    dayPowerDisCharge: "",
    SOC: "",
    accumulatedIncome: "",
    cumulativeElectricity: "",
    cumulativeCharge: "",
    cumulativeDischarge: "",
  };
  rules: any = {
    status: [{ required: true, message: "请选择状态", trigger: "blur" }],
    projectName: [
      { required: true, message: "请输入项目名称", trigger: "blur" },
    ],
    PVInstalledCapacity: [
      { required: true, message: "请输入光伏装机容量", trigger: "blur" },
    ],
    EMSInstalledCapacity: [
      { required: true, message: "请输入储能装机容量", trigger: "blur" },
    ],
    EMSInstalledEnergy: [
      { required: true, message: "请输入储能装机能量", trigger: "blur" },
    ],
    dayIncome: [{ required: true, message: "请输入当日收益", trigger: "blur" }],
    dayPowerGeneration: [
      { required: true, message: "请输入当日发电电量", trigger: "blur" },
    ],
    dayPowerCharge: [
      { required: true, message: "请输入当日充电电量", trigger: "blur" },
    ],
    dayPowerDisCharge: [
      { required: true, message: "请输入当日放电电量", trigger: "blur" },
    ],
    SOC: [{ required: true, message: "请输入电池SOC", trigger: "blur" }],
    accumulatedIncome: [
      { required: true, message: "请输入累计收益", trigger: "blur" },
    ],
    cumulativeElectricity: [
      { required: true, message: "请输入累计发电电量", trigger: "blur" },
    ],
    cumulativeCharge: [
      { required: true, message: "请输入累计充电电量", trigger: "blur" },
    ],
    cumulativeDischarge: [
      { required: true, message: "请输入累计放电电量", trigger: "blur" },
    ],
  };


  closeDialog(): void {
    this.isShow = false;
    (this.$refs["form"] as any).resetFields();
  }
  showDialog(): void {
    this.isShow = true;
  }
  submitForm(): void {
    (this.$refs["form"] as any).validate((valid: boolean) => {
      console.log(valid);
    });
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__body{
  padding: 30px 20px 10px;
}
.form {
  padding-right: 20px;
  overflow: hidden;
  .el-form-item{
    float: left;
    width: 50%;
  }
  .el-input{
    width: calc(100% - 40px);
  }
  .unit{
    width: 35px;
    margin-left: 3px;
    font-size: 13px;
  }
}
</style>
