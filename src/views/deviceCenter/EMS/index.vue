<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import deviceTable from "@/views/deviceCenter/components/templateTable.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
@Component({
  mixins: [deviceTable],
})
export default class EMS extends Vue {
  titleText = "EMS";
  deviceForm = {
    deviceName: "",
    snNumber: "",
  };
  theadColumns: ITheadColums[] = [
    {
      text: "通信状态",
      field: "communicateStatus",
    },
    {
      text: "设备名称",
      field: "deviceName",
    },
    {
      text: "SN号",
      field: "snNumber",
    },
    {
      text: "EMS版本",
      field: "emsVersion",
    },
    {
      text: "型号",
      field: "model",
    },

    {
      text: "品牌",
      field: "brand",
    },
    {
      text: "厂家",
      field: "manufactor",
    },
    {
      text: "项目",
      field: "projectName",
      slot: true,
    },
    {
      text: "操作",
      field: "specialOperation",
      slot: true,
      disabled: true,
    },
  ];
  list: ITableList[] = [
    {
      communicateStatus: "离线",
      deviceName: "EMS主机",
      snNumber: "110",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "项目一",
    },
    {
      communicateStatus: "离线",
      deviceName: "EMS主机",
      snNumber: "110",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "项目二",
    },
    {
      communicateStatus: "离线",
      deviceName: "EMS主机",
      snNumber: "110",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "项目三",
    },
  ];
  created(): void {
    // console.log(this.theadColumns);
  }
  onSubmit(): void {
    console.log(this.deviceForm);
  }
  toDetails(): void {
    this.$router.push("/deviceCenter/EmsDetails");
  }
  //   toDetails(): void {
  //   const { href } = this.$router.resolve({
  //     path: "/deviceCenter/EmsDetails",
  //     query: { id: "2" },
  //   });
  //   window.open(href, "_blank");
  // }
  toProjectDetails(): void {
    const { href } = this.$router.resolve({
      path: "/projectDetails",
      query: { id: "22" },
    });
    window.open(href, "_blank");
  }
}
</script>
