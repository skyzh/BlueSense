<template>
  <div id="realtime-report">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card sense-card mb-3">
            <div class="card-body">
              <p>Changning, Shanghai</p>
              <dl class="mt-1 row">
                <dt class="col-6 text-uppercase">Temperature</dt>
                <dd class="col-6">{{ realtimeReport[0] }} °C</dd>
                <dt class="col-6 text-uppercase">Humidity</dt>
                <dd class="col-6">{{ realtimeReport[1] }} %</dd>
                <dt class="col-6 text-uppercase">Pressure</dt>
                <dd class="col-6">{{ realtimeReport[2] }} kPa</dd>
                <dt class="col-6 text-uppercase">PM2.5</dt>
                <dd class="col-6">
                  {{ realtimeReport[3] }} µg/m
                  <sup>3</sup>
                </dd>
                <dt class="col-6 text-uppercase">PM10</dt>
                <dd class="col-6">
                  {{ realtimeReport[4] }} µg/m
                  <sup>3</sup>
                </dd>
              </dl>
              <div class="row">
                <div class="col">
                  <div class="text-muted small">{{ reportTime }}</div>
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

@Component
export default class RealtimeReport extends Vue {
  @Prop({ default: [null, null, null, null, null] }) readonly realtimeReport!: number[];
  @Prop({ default: "" }) readonly reportTime!: string;
}
</script>

<style scoped lang="scss">
</style>
