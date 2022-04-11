<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import deviceTable from "@/views/deviceCenter/components/templateTable.vue";
import { ITheadColums, ITableList } from "@/utils/interface";

@Component({
  mixins: [deviceTable],
})
export default class AirConditioning extends Vue {
  titleText = "空调";
  deviceForm = {
    deviceName: "",
    snNumber: "",
  };
  list: ITableList[] = [
    {
      deviceName: "空调",
      snNumber: "110",
      communicateStatus: "离线",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "11111",
    },
    {
      deviceName: "空调",
      snNumber: "110",
      communicateStatus: "离线",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "22222",
    },
    {
      deviceName: "空调",
      snNumber: "110",
      communicateStatus: "离线",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "33333",
    },
  ];

  onSubmit(): void {
    // console.log(this.list);
  }
  toDetails(): void {
    this.$router.push("/deviceCenter/airConditionDetails");
  }
  toProjectDetails(): void {
    this.$router.push("/projectDetails");
  }
}
</script>
