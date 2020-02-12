<template>
  <div id="realtime-report">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card sense-card mb-3">
            <div class="card-body">
              <p>Changning, Shanghai</p>
              <dl class="mt-1 row">
                <dt class="col-6 col-xl-3 text-uppercase">Temperature</dt>
                <dd class="col-6 col-xl-9">{{ realtimeReport[0] }} °C</dd>
                <dt class="col-6 col-xl-3 text-uppercase">Humidity</dt>
                <dd class="col-6 col-xl-9">{{ realtimeReport[1] }} %</dd>
                <dt class="col-6 col-xl-3 text-uppercase">Pressure</dt>
                <dd class="col-6 col-xl-9">{{ realtimeReport[2] }} Pa</dd>
                <dt class="col-6 col-xl-3 text-uppercase">PM2.5</dt>
                <dd class="col-6 col-xl-9">
                  {{ realtimeReport[3] }} µg/m
                  <sup>3</sup>
                </dd>
                <dt class="col-6 col-xl-3 text-uppercase">PM10</dt>
                <dd class="col-6 col-xl-9">
                  {{ realtimeReport[4] }} µg/m
                  <sup>3</sup>
                </dd>
              </dl>
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
  @Prop() readonly realtimeReport = [0, 0, 0, 0, 0];
}
</script>

<style scoped lang="scss">
.sense-card {
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 8px 13px rgba(0, 0, 0, 0.1);
}
</style>
