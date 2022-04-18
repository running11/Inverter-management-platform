<template>
  <div class="map-wrapper">
    <div id="container"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({
  components: {}
})
export default class MapTest extends Vue {
  map: any = null;
  markets: any = [];
  markersPosition: number[] = [121.227577, 31.101471];
  protected AMap: any = (window as any).AMap;
  protected AMapUI: any = (window as any).AMapUI;

  mounted(): void{
    this.initMap();
  }

  initMap(): void{
    this.map = new this.AMap.Map('container', {
      center: this.markersPosition, // 中心点坐标
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 10, // 初始化地图层级，可以理解为缩放比例
      draggable: true,
      showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
    });

    this.handlerMapClick();

    //加载SimpleInfoWindow，loadUI的路径参数为模块名中 'ui/' 之后的部分
    // this.AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow: any) => {
    //   let marker = new this.AMap.Marker({
    //     map: map,
    //     zIndex: 9999999,
    //     position: map.getCenter(),
    //   });

    //   let infoWindow = new SimpleInfoWindow({
    //     infoTitle: '<strong>这里是标题</strong>',
    //     infoBody: '<p>这里是内容。</p>',
    //     offset: new this.AMap.Pixel(0, -31), // 文本定位偏移
    //   });
    //   //显示在map上
    //   function openInfoWin() {
    //     infoWindow.open(map, marker.getPosition());
    //   }
    //   marker.on('click', (e: any) => {
    //     console.log(e, 11)
    //     openInfoWin(); // 点击标记时显示文本
    //   });
    //   openInfoWin();
    // });
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
