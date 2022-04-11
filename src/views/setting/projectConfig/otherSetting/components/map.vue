<template>
  <baidu-map class="bm-view" ak="YOUR_APP_KEY"> </baidu-map>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
export default {
  components: {
    BaiduMap,
  },
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 600px;
}
</style>
