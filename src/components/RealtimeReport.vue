<template>
  <div id="realtime-report">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <transition name="fade">
            <Loading v-if="!ready"></Loading>
          </transition>
          <div class="card sense-card mb-3">
            <div class="card-body">
              <dl class="mt-1 row">
                <dt class="col-6 font-italic">Temperature</dt>
                <dd class="col-6">{{ realtimeReport[0] }} °C</dd>
                <dt class="col-6 font-italic">Humidity</dt>
                <dd class="col-6">{{ realtimeReport[1] }} %</dd>
                <dt class="col-6 font-italic">Pressure</dt>
                <dd class="col-6">{{ realtimeReport[2] }} kPa</dd>
                <dt class="col-6 font-italic">PM2.5</dt>
                <dd class="col-6">
                  {{ realtimeReport[3] }} µg/m
                  <sup>3</sup>
                </dd>
                <dt class="col-6 font-italic">PM10</dt>
                <dd class="col-6">
                  {{ realtimeReport[4] }} µg/m
                  <sup>3</sup>
                </dd>
              </dl>
              <div class="row">
                <div class="col">
                  <span class="small">{{ reportTime }}</span>
                  <br>
                  <span class="text-muted small">From <em>Changning, Shanghai</em></span>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "./Loading.vue";

@Component({
  components: { Loading }
})
export default class RealtimeReport extends Vue {
  @Prop({ default: [null, null, null, null, null] })
  readonly realtimeReport!: number[];
  @Prop({ default: "" }) readonly reportTime!: string;
  @Prop({ default: false }) readonly ready!: boolean;
}
</script>

<style scoped lang="scss">
</style>
