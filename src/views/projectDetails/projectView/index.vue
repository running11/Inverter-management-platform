<template>
  <div class="project-view-wrapper">
    <img src="@/assets/images/icon_test.png" alt="一次图" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProjectView extends Vue {}
</script>
<style lang="scss" scoped>
.project-view-wrapper {
  margin-top: 20px;
  padding: 20px;
  background-color: $white;
  img {
    display: block;
    width: 80%;
    height: auto;
    margin: 0 auto;
  }
}
</style>
