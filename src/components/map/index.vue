<template>
  <div class="map-wrapper">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import AMapLoader from '@amap/amap-jsapi-loader';

@Component({
  components: {}
})
export default class MapTest extends Vue {
  @Prop() lngandLat!: any;
  AMap: any = null;
  map: any = null;
  markets: any = [];
  markersPosition: number[] = this.lngandLat;

  @Watch("lngandLat", { immediate: true, deep: true })
  getLngAndLat(newVal: any){
    this.markersPosition = newVal;
  }

  mounted(): void{
    this.initMap();
  }

  initMap(): void{
    AMapLoader.load({
      "key": "bceca8051745424edbbc92707896613e",              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
      this.AMap = AMap;
      const defaultValue = [121.227577, 31.101471];
      let lngLatValue:any = [];
      if (this.markersPosition && this.markersPosition.length > 0) { // 修改有可能有标注，有可能没有
        lngLatValue = this.lngandLat;
      } else { // 新增
        lngLatValue = defaultValue;
      }

      this.map = new AMap.Map('container', {
        center: lngLatValue, // 中心点坐标
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 10, // 初始化地图层级，可以理解为缩放比例
        draggable: true,
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      });

      if (this.markersPosition && this.markersPosition.length > 0) { // 修改有标注
        this.setMapMarket();
      } else { // 新增没传过来值，所以默认没有标注
        this.removeMarket();
      }

      this.handlerMapClick();
    });
    
  }
  handlerMapClick(): void{
    this.map.on("click", (e: any) => {
      this.markersPosition = [e.lnglat.lng, e.lnglat.lat];
      
      this.removeMarket();
      // 设置新的标记
      this.setMapMarket();
    })
  }
  // 设置点击位置的标记
  @Emit("getLngAndLat")
  setMapMarket(){
    let market = new this.AMap.Marker({
      map: this.map,
      position: this.markersPosition,
      // showMarker: true
    });
    this.markets.push(market);
    this.map.add(market);
    this.map.setFitView();
    this.map.setZoomAndCenter(14, this.markersPosition);
    return {position: this.markersPosition};
  }
  removeMarket(): void{
    if(this.markets){
      this.map.remove(this.markets);
    }
  }
}
</script>
<style lang="scss" scoped>
#container{
  width: 100%;
  height: 500px;
}
</style>
