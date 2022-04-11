<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import deviceTable from "@/views/deviceCenter/components/templateTable.vue";
import { ITheadColums, ITableList } from "@/utils/interface";
@Component({
  mixins: [deviceTable],
})
export default class PCS extends Vue {
  titleText = "PCS";
  deviceForm = {
    deviceName: "",
    snNumber: "",
  };
  list: ITableList[] = [
    {
      deviceName: "PCS1",
      snNumber: "110",
      communicateStatus: "离线",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "11111",
    },
    {
      deviceName: "PCS2",
      snNumber: "110",
      communicateStatus: "离线",
      model: "12000",
      emsVersion: "2000",
      brand: "41022",
      manufactor: "上海",
      projectName: "22222",
    },
    {
      deviceName: "PCS3",
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
    this.$router.push("/deviceCenter/PcsDetails");
  }
  toProjectDetails(): void {
    this.$router.push("/projectDetails");
  }
}
</script>
