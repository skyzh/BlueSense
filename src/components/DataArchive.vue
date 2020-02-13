<template>
  <div id="data-archive">
    <div class="container-fluid d-flex flex-column align-items-center">
      <div>
        <DatetimeControl :datetime.sync="fromTime" />~
        <DatetimeControl :datetime.sync="toTime" />
      </div>
      <canvas id="chart-canvas" ref="chart-canvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
import { setupCanvas, drawCall } from "../chart";
import { queryRange } from "../sense";
import DatetimeControl from "./DatetimeControl.vue";
@Component({
  components: {
    DatetimeControl
  }
})
export default class DataArchive extends Vue {
  @Ref("chart-canvas") readonly canvas!: HTMLCanvasElement;
  fromTime = new Date(Date.now() - 86400 * 1000);
  toTime = new Date(Date.now());
  ctx!: CanvasRenderingContext2D;

  mounted() {
    this.ctx = setupCanvas(this.canvas);
    this.onTimeChanged()
  }

  onTimeChanged() {
    
    queryRange(this.fromTime, this.toTime).then(d =>
      drawCall(this.ctx, 800, 800, d)
    );
  }

  @Watch("fromTime")
  onFromTimeChanged(val: Date, oldVal: Date) {
    this.onTimeChanged();
  }

  @Watch("toTime")
  onToTimeChanged(val: Date, oldVal: Date) {
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
