<template>
  <div>
		<new-dialog
      :show="isShow"
      :title="title"
      :on-close="closeDialog"
      :on-submit="submitForm"
    >
			<el-form
        label-width="100px"
        class="form"
        ref="form"
        v-if="device"
        :model="device"
        :rules="rules"
      >
        <el-form-item label="设备名称" prop="devName">
          <el-input
						v-model="device.devName"
            placeholder="请输入设备名称"
          />
        </el-form-item>
        <el-form-item label="设备sn" prop="devSn">
          <el-input
						v-model="device.devSn"
            placeholder="请输入设备sn"
          />
        </el-form-item>
        <el-form-item label="设备地址" prop="devAddress">
          <el-input
						v-model="device.devAddress"
            placeholder="请输入联系人"
          />
        </el-form-item>
        <el-form-item label="设备类型" prop="devType">
					<el-select v-model="device.devType" placeholder="请输入设备类型">
            <el-option
              v-for="item in deviceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备型号" prop="devModel">
          <el-input
						v-model="device.devModel"
            placeholder="请输入设备型号"
          />
        </el-form-item>
				<el-form-item label="生产厂家" prop="company">
          <el-input
						v-model="device.company"
            placeholder="请输入生产厂家"
          />
        </el-form-item>
				<el-form-item label="品牌" prop="brand">
          <el-input
						v-model="device.brand"
            placeholder="请输入品牌"
          />
        </el-form-item>
				<el-form-item label="安装时间" prop="installTime">
					<el-date-picker
						v-model="device.installTime"
						type="date"
						placeholder="请输入安装时间">
					</el-date-picker>
        </el-form-item>
				<el-form-item label="网关sn" prop="gatewaySn">
          <el-input
						v-model="device.gatewaySn"
            placeholder="请输入网关sn"
          />
        </el-form-item>
				<el-form-item label="设备分组" prop="devGroup">
					<el-select
						v-model="device.devGroup"
						allow-create
						default-first-option
						filterable
						placeholder="请选择设备分组"
						@change.native="selectDevGroup">
            <el-option
              v-for="item in deviceGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
		</new-dialog>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import NewDialog from "@/components/newDialog/index.vue";
import { IOption } from "@/utils/interface";
import service from "@/utils/request";
import moment from 'moment';
import { Form } from "element-ui";

interface IDevice {
  devName: string;
  devSn: string;
  devAddress: string;
  devType: undefined | number | string;
  devModel: string;
  [propName: string]: any;
}

@Component({
  components: {
    NewDialog,
  },
})
export default class DeviceDialog extends Vue {
	@Prop(String) title!: string;
  @Prop(Object) currentDevice!: IDevice;
  isShow = false;
	device: IDevice = this.currentDevice;
	deviceList: IOption[] = [
    {
      value: 1,
      label: "设备1",
    },
    {
      value: 2,
      label: "设备2",
    },
  ];
	deviceGroup: IOption[] = [
		{
			value: 1,
			label: "分组1"
		},
		{
			value: 2,
			label: "分组2"
		}
	]

	rules: any = {
    devName: [
      { required: true, message: "请输入设备名称", trigger: "blur" },
    ],
    devSn: [
      { required: true, message: "请输入设备Sn", trigger: "blur" },
    ],
    devAddress: [
      { required: true, message: "请输入设备地址", trigger: "blur" },
    ],
		devType: [
      { required: true, message: "请输入设备类型", trigger: "blur" },
    ],
		devModel: [
      { required: true, message: "请输入设备型号", trigger: "blur" },
    ],
  };

	@Watch("currentDevice", { immediate: true, deep: true })
  getCurrentDevice(newVal: any, oldVal: any) {
    this.device = newVal;
  }

	closeDialog(): void {
    this.isShow = false;
    (this.$refs["form"] as Form).resetFields();
  }
  showDialog(): void {
    this.isShow = true;
  }
	selectDevGroup(e: any): void{
		this.$set(this.device, 'devGroup', e.target.value);
	}
	submitForm(): void {
		(this.$refs["form"] as any).validate((valid: any) => {
      if(valid){
				console.log("11");
				if(this.currentDevice.devId != undefined){
          this.device.installTime = moment(this.device.installTime).valueOf();
          service({
            method: "put",
            url: "/api/business/EmsDevice",
            data: this.device,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.isShow = false;
              this.$emit("fetchData");
            }else{
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
				}else{
					this.device.installTime = moment(this.device.installTime).valueOf();
					service({
            method: "post",
            url: "/api/business/EmsDevice",
            data: this.device,
          })
          .then((res) => {
            if (res && res.data.code === 200) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.isShow = false;
              this.$emit("fetchData");
            }else{
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
				}
			}
		});
	}
}
</script>
<style lang="scss" scoped>
.form {
  padding-right: 30px;
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>
