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
        <el-form-item :label="$t('deviceList.deviceName')" prop="devName">
          <el-input
						v-model="device.devName"
            :placeholder="$t('deviceList.pleaseEnterDeviceName')"
          />
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceSN')" prop="devSn">
          <el-input
						v-model="device.devSn"
            :placeholder="$t('deviceList.pleaseEnterDeviceSN')"
          />
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceAddress')" prop="devAddress">
          <el-input
						v-model="device.devAddress"
            :placeholder="$t('deviceList.pleaseEnterDeviceAddress')"
          />
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceType')" prop="devType">
					<el-select v-model="device.devType" :placeholder="$t('deviceList.pleaseSelectDeviceType')">
            <el-option
              v-for="item in deviceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('deviceList.deviceModel')" prop="devModel">
          <el-input
						v-model="device.devModel"
            :placeholder="$t('deviceList.pleaseEnterDeviceModel')"
          />
        </el-form-item>
				<el-form-item :label="$t('deviceList.manufacturer')" prop="company">
          <el-input
						v-model="device.company"
            :placeholder="$t('deviceList.pleaseEnterManufacturer')"
          />
        </el-form-item>
				<el-form-item :label="$t('deviceList.brand')" prop="brand">
          <el-input
						v-model="device.brand"
            :placeholder="$t('deviceList.pleaseEnterBrand')"
          />
        </el-form-item>
				<el-form-item :label="$t('deviceList.installTime')" prop="installTime">
					<el-date-picker
						v-model="device.installTime"
						type="date"
						:placeholder="$t('deviceList.pleaseSelectInstallTime')">
					</el-date-picker>
        </el-form-item>
				<el-form-item :label="$t('deviceList.gatewaySN')" prop="gatewaySn">
          <el-input
						v-model="device.gatewaySn"
            :placeholder="$t('deviceList.pleaseEnterGatewaySN')"
          />
        </el-form-item>
				<el-form-item :label="$t('deviceList.deviceGroup')" prop="devGroup">
					<el-select
						v-model="device.devGroup"
						allow-create
						default-first-option
						filterable
						:placeholder="$t('deviceList.pleaseSelectDeviceGroup')"
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
import i18n from '@/language';

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
      { required: true, message: i18n.t(`deviceList.pleaseEnterDeviceName`) as string, trigger: "blur" },
    ],
    devSn: [
      { required: true, message: i18n.t(`deviceList.pleaseEnterDeviceSN`) as string, trigger: "blur" },
    ],
    devAddress: [
      { required: true, message: i18n.t(`deviceList.pleaseEnterDeviceAddress`) as string, trigger: "blur" },
    ],
		devType: [
      { required: true, message: i18n.t(`deviceList.pleaseSelectDeviceType`) as string, trigger: "blur" },
    ],
		devModel: [
      { required: true, message: i18n.t(`deviceList.pleaseEnterDeviceModel`) as string, trigger: "blur" },
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
                message: i18n.t(`common.editSuccess`) as string,
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
                message: i18n.t(`common.addSuccess`) as string,
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
