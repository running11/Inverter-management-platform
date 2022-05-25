<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ScreenMap extends Vue {
  map: any = null;
  markets: any = [];
  markersPosition: number[] = [116.397428, 39.90923];
  protected AMap: any = (window as any).AMap;
  protected AMapUI: any = (window as any).AMapUI;

  mounted(): void{
    this.initMap();
  }

  initMap(): void{
    this.map = new this.AMap.Map('map', {
      mapStyle: 'amap://styles/a553025ba8c995afb0060776a83b1543',
      center: this.markersPosition, // 中心点坐标
      resizeEnable: true, // 是否监控地图容器尺寸变化
      zoom: 9, // 初始化地图层级，可以理解为缩放比例
      draggable: true,
      showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      offset: new this.AMap.Pixel(-13, -30)
    });

    var markers = [{
      position: [116.205467, 39.907761],
    }, {
      position: [116.368904, 39.913423],
    }, {
      position: [116.305467, 39.807761],
    }];
    markers.forEach(marker => {
      var icon = new this.AMap.Icon({
        image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        size: new this.AMap.Size(24, 31)
      })
      let m = new this.AMap.Marker({
        map: this.map,
        icon: icon,
        position: [marker.position[0], marker.position[1]],
        anchor: "bottom-center",
        offset: new this.AMap.Pixel(0, 0)
      });
      m.on("click", (e: any) => {
        console.log(e.target, 111)
      })
    });

    this.map.setFitView();
    
    var center = this.map.getCenter();
    console.log(center.getLng(), center.getLat(), `中心点的经纬度`);
  }
}
</script>
<style lang="scss" scoped>
.map-wrapper{
  height: calc(100vh - 59px);
}
#map {
  width: 100%;
  height: calc(100vh - 59px);
}
</style>

