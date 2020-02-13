<template>
  <div id="data-archive">
    <div class="container-fluid text-center">
      <canvas id="chart-canvas" ref="chart-canvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { setupCanvas, drawCall } from "../chart";
import { queryRange } from "../sense";

@Component
export default class DataArchive extends Vue {
  @Ref("chart-canvas") readonly canvas!: HTMLCanvasElement;

  mounted() {
    const ctx = setupCanvas(this.canvas)
    const endTime = new Date(Date.now())
    const startTime = new Date(Date.now() - 86400 * 1000)
    queryRange(startTime, endTime).then(d => drawCall(ctx, 800, 800, d))
  }
}
</script>

<style scoped lang="scss">
#chart-canvas {
  width: 800px;
  height: 800px;
}
</style>
