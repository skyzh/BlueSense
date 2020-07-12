<template>
  <div class="loading-container d-flex align-items-center p-3">
    <div class="spinner-border spinner-border-sm mx-3"></div>
    <em>Fetching latest information...</em>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {}
</script>

<style scoped lang="scss">
.loading-container {
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  z-index: 1000;
}
</style>
