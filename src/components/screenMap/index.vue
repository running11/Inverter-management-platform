<template>
  <div class="map-wrapper">
    <div class="search-box">
      <el-input placeholder="请输入电站名称"></el-input>
    </div>
    <div id="map"></div>
    <!-- <div class="info-box" ref="infoBox">
      <div class="title" v-if="info">{{info.name}}</div>
      <div class="content">
        <div class="img-box">
          <img src="@/assets/images/icon_electricity.png"/>
        </div>
        <div class="list-box">
          <div class="item">电站地址：22</div>
          <div class="item">经纬度：</div>
          <div class="item">并网时间：</div>
          <div class="item">运行天数：</div>
          <div class="item">电站时区：</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AMapLoader from '@amap/amap-jsapi-loader';
import markIcon from "@/assets/images/icon_normal.png";
import img from "@/assets/images/icon_electricity.png";

@Component({
  components: {},
})
export default class ScreenMap extends Vue {
  map: any = null;
  markets: any = [];
  markersPosition: number[] = [116.397428, 39.90923];
  infoWindow: any = null;

  mounted(): void{
    this.init();
  }

  init(): void {
    (window as any)._AMapSecurityConfig = {securityJsCode:"265793d1d10afca511bb65e9df68a9fe"};
    AMapLoader.load({
      "key": "bceca8051745424edbbc92707896613e",              // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap)=>{
      this.map = new AMap.Map('map',  {
        // mapStyle: 'amap://styles/a553025ba8c995afb0060776a83b1543',
        mapStyle: "amap://styles/darkblue",
        center: this.markersPosition, // 中心点坐标
        resizeEnable: true, // 是否监控地图容器尺寸变化
        zoom: 12, // 初始化地图层级，可以理解为缩放比例
        draggable: true,
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        offset: new AMap.Pixel(-13, -30),
        closeWhenClickMap: true // 随意点击关闭
      });

      var markers = [{
        position: [116.205467, 39.907761],
        info: {
          name: "电站1",
          address: "上海市松江区1111"
        }
      }, {
        position: [116.368904, 39.913423],
        info: {
          name: "电站2",
          address: "上海市松江区2222"
        }
      }, {
        position: [116.305467, 39.807761],
        info: {
          name: "电站3",
          address: "上海市松江区3333"
        }
      }];
      markers.forEach(marker => {
        var icon = new AMap.Icon({
          // image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          image: markIcon,
          size: new AMap.Size(24, 34),
          imageSize: new AMap.Size(24, 34)
        })
        let m = new AMap.Marker({
          map: this.map,
          icon: icon,
          position: [marker.position[0], marker.position[1]],
          anchor: "bottom-center",
          offset: new AMap.Pixel(0, 0),
          // label:{
          //   offset: new AMap.Pixel(10, 5),  //设置文本标注偏移量
          //   content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
          //   direction: 'right' //设置文本标注方位
          // }
        });

        // 给 m 添加属性
        m.setExtData(marker);
        m.on("click", (e: any) => {
          const info = e.target.getExtData().info;
          this.createInfoWindow(AMap, info);
          this.infoWindow.open(this.map, m.getPosition());
          // console.log(e.target.getExtData(), this.infoWindow, 11);
        })
      });

      // this.map.setFitView();
    }).catch(e => {
        console.log(e);
    })
  }

  createInfoWindow(AMap: any, info: any): void{
    let content = [
      '<div class="info-box" style="background: #fff" ref="infoBox">',
        '<div class="title">'+info.name+'',
          // '<i class="icon el-icon-close" @click="'+this.closeInfoWindow()+'"></i>',
        '</div>',
        '<div class="content">',
          '<div class="img-box">',
            '<img src="'+img+'"/>',
          '</div>',
          '<div class="list-box">',
            '<div class="item">电站地址：'+info.address+'</div>',
            '<div class="item">经纬度：</div>',
            '<div class="item">并网时间：</div>',
            '<div class="item">运行天数：</div>',
            '<div class="item">电站时区：</div>',
          '</div>',
        '</div>',
      '</div>',
    ];
    this.infoWindow = new AMap.InfoWindow({
      isCustom: true, // 使用自定义窗体
      autoMove: true,
      content: content.join(''),
      closeWhenClickMap: true,
      offset: new AMap.Pixel(20, -120)
    })
  }

  closeInfoWindow(): void{
    console.log(11);
    this.map.clearInfoWindow();
  }
}
</script>
<style lang="scss" scoped>
.map-wrapper{
  position: relative;
  height: calc(100vh - 59px);
  position: relative;
}
#map {
  width: 100%;
  height: calc(100vh - 59px);
}
.search-box{
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 99999;
}
</style>
<style lang="scss">
.info-box{
  width: 540px;
  background-color: $white;
  border-radius: 2px;
  position: absolute;
  top: 0;
  .title{
    line-height: 40px;
    font-size: 15px;
    padding: 0 20px;
    border-bottom: 1px solid $border-color;
    .icon{
      float: right;
      font-size: 22px;
      font-weight: bold;
      color: $gray;
      cursor: pointer;
      line-height: 40px;
    }
  }
  .content{
    padding: 20px;
    display: flex;
    // justify-content: space-between;
    .img-box{
      width: 200px;
      height: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 180px;
        height: auto;
      }
    }
    .list-box{
      padding-left: 20px;
      padding-top: 10px;
      .item{
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
}
</style>
