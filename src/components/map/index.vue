<template>
  <div class="map-wrapper">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import AMapLoader from '@amap/amap-jsapi-loader';

@Component({
  components: {}
})
export default class MapTest extends Vue {
  map: any = null;
  markets: any = [];
  markersPosition: number[] = [121.227577, 31.101471];

  mounted(): void{
    this.initMap();
  }

  initMap(): void{
    AMapLoader.load({
      "key": "bceca8051745424edbbc92707896613e",              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
      this.map = new AMap.Map('container', {
        center: this.markersPosition, // 中心点坐标
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 10, // 初始化地图层级，可以理解为缩放比例
        draggable: true,
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      });

      this.handlerMapClick(AMap);
    });
    
  }
  handlerMapClick(AMap: any): void{
    this.map.on("click", (e: any) => {
      this.markersPosition = [e.lnglat.lng, e.lnglat.lat];
      
      this.removeMarket();
      // 设置新的标记
      this.setMapMarket(AMap);
    })
  }
  // 设置点击位置的标记
  @Emit("getLngAndLat")
  setMapMarket(AMap: any){
    let market = new AMap.Marker({
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
