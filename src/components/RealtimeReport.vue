<template>
  <div id="realtime-report">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <transition name="fade">
            <Loading v-if="!initialized"></Loading>
          </transition>
          <div class="card sense-card mb-3">
            <div class="card-body">
              <dl class="mt-1 row">
                <dt class="col-6 font-italic">Temperature</dt>
                <dd class="col-6">
                  <Trend :ready="initialized" :trend="realtimeReport[0]"></Trend>&nbsp;°C
                </dd>
                <dt class="col-6 font-italic">Humidity</dt>
                <dd class="col-6">
                  <Trend :ready="initialized" :trend="realtimeReport[1]"></Trend>&nbsp;%
                </dd>
                <dt class="col-6 font-italic">Pressure</dt>
                <dd class="col-6">
                  <Trend :ready="initialized" :trend="realtimeReport[2]"></Trend>&nbsp;kPa
                </dd>
                <dt class="col-6 font-italic">PM2.5</dt>
                <dd class="col-6">
                  <Trend :ready="initialized" :trend="realtimeReport[3]"></Trend>&nbsp;
                  <span>
                    µg/m<sup>3</sup>
                  </span>
                </dd>
                <dt class="col-6 font-italic">PM10</dt>
                <dd class="col-6">
                  <Trend :ready="initialized" :trend="realtimeReport[4]"></Trend>&nbsp;
                  <span>
                    µg/m<sup>3</sup>
                  </span>
                </dd>
              </dl>
              <div class="row">
                <div class="col">
                  <span class="small">{{ reportTime }}</span>
                  <br />
                  <span class="text-muted small">
                    From
                    <em>Changning, Shanghai</em>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Loading from "./Loading.vue";
import Trend from "./Trend.vue";

@Component({
  components: { Loading, Trend }
})
export default class RealtimeReport extends Vue {
  @Prop({ default: [null, null, null, null, null] })
  readonly realtimeReport!: number[];
  @Prop({ default: "" }) readonly reportTime!: string;
  @Prop({ default: false }) readonly ready!: boolean;
  initialized = false;

  @Watch("ready")
  onReady(val: boolean) {
    this.initialized = this.initialized || val;
  }
}
</script>

<style scoped lang="scss">
.sense-card {
  dt {
    font-weight: inherit;
  }
}
</style>
