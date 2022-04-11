<template>
  <div id="app">
    <router-view v-if="routerAlive"></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";

@Component
export default class App extends Vue {
  routerAlive = true;

  @Provide("routerRefresh")
  routerRefresh(): void {
    this.routerAlive = false;
    this.$nextTick(() => {
      this.routerAlive = true;
    });
  }
}
</script>

<style lang="scss"></style>
