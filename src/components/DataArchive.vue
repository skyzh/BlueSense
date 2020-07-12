<template>
  <div id="data-archive">
    <div class="container-fluid d-flex flex-column align-items-center">
      <div>
        <DatetimeControl :datetime.sync="fromTime" />~
        <DatetimeControl :datetime.sync="toTime" />
      </div>
      <transition name="fade">
        <Loading v-if="!ready"></Loading>
      </transition>
      <canvas id="chart-canvas" ref="chart-canvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { setupCanvas, drawCall } from "../chart";
import { queryRange } from "../sense";
import DatetimeControl from "./DatetimeControl.vue";
import Loading from "./Loading.vue";

@Component({
  components: {
    DatetimeControl,
    Loading
  }
})
export default class DataArchive extends Vue {
  @Ref("chart-canvas") readonly canvas!: HTMLCanvasElement;
  fromTime = new Date(Date.now() - 86400 * 1000);
  toTime = new Date(Date.now());
  ctx!: CanvasRenderingContext2D;
  ready = false;

  mounted() {
    this.ctx = setupCanvas(this.canvas);
    drawCall(this.ctx, 800, 800, []);
    this.onTimeChanged();
  }

  onTimeChanged() {
    this.ready = false;
    queryRange(this.fromTime, this.toTime).then(d => {
      this.ready = true;
      drawCall(this.ctx, 800, 800, d);
    });
  }

  @Watch("fromTime")
  onFromTimeChanged() {
    this.onTimeChanged();
  }

  @Watch("toTime")
  onToTimeChanged() {
    this.onTimeChanged();
  }
}
</script>

<style scoped lang="scss">
#chart-canvas {
  width: 800px;
  height: 800px;
}
</style>
