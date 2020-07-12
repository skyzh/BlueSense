<template>
  <div class="d-flex align-items-center my-3">
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
</style>
