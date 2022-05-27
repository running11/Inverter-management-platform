<template>
  <div class="screen-wrapper">
    <div class="header-wrapper">
      <div class="logo-box">
        <img class="logo" src="@/assets/images/logo.png" alt="logo"/>
      </div>
      <div class="title">大数据监控平台</div>
      <div class="time">2022-05-25 14:20:34</div>
    </div>
    <div class="main-wrapper">
      <screen-map></screen-map>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ScreenMap from "@/components/screenMap/index.vue";

@Component({
  components: {
    ScreenMap
  },
})
export default class BigScreen extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.screen-wrapper{
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(180deg,#151b59 24%,#2a2d5a 88%);
  .header-wrapper{
    height: 54px;
    background-color: #237ae4;
    border-bottom: 5px solid #25c1ff;
    display: flex;
    padding: 0 30px;
    .logo-box{
      flex:0 0 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo{
        width: 100px;
        height: auto;
      }
    }
    .title{
      display:flex; 
      flex:1;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }
    .time{
      flex:0 0 200px;
      font-size: 15px;
      color: #fff;
      line-height: 54px;
      text-align: right;
    }
  }
  .main-wrapper{
    height: calc(100vh - 59px);
  }
}

</style>