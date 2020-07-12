<template>
  <div id="app">
    <Navbar :route.sync="route" />
    <RealtimeReport
      :realtimeReport="realtimeReport"
      :reportTime="reportTime"
      :ready="ready >= 2"
      v-if="route == 'realtime'"
    />
    <DataArchive v-if="route == 'archive'" />
    <Alerts v-if="route == 'realtime'" :pastHour="pastHour" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import RealtimeReport from "./components/RealtimeReport.vue";
import { getRealtimeReport, queryRange } from "./sense";
import { roundDigitVec } from "./utils";
import DataArchive from "./components/DataArchive.vue";
import Alerts from "./components/Alerts.vue";
import SenseCheckpoint from "./checkpoint";

@Component({
  components: {
    Navbar,
    RealtimeReport,
    DataArchive,
    Alerts
  }
})
export default class App extends Vue {
  realtimeReport = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
  ];
  reportTime = "When? I don't know :(";
  ready = 0;
  route = "realtime";
  pastHour: SenseCheckpoint[] = [];

  doUpdate() {
    this.ready = 0;
    getRealtimeReport().then(result => {
      const key = Object.keys(result);
      const val1 = result[key[0]];
      const val2 = result[key[1]];

      this.realtimeReport = [
        roundDigitVec([val1.temp, val2.temp], 2),
        roundDigitVec([val1.hum, val2.hum], 2),
        roundDigitVec([val1.pa, val2.pa], 0).map(x => x / 1000),
        roundDigitVec([val1.pm25, val2.pm25], 2),
        roundDigitVec([val1.pm10, val2.pm10], 2)
      ];
      this.reportTime = new Date(val2.time * 1000).toLocaleString();
      this.ready += 1;
    });
    queryRange(new Date(Date.now() - 3600 * 1000), new Date()).then(result => {
      this.pastHour = result;
      this.ready += 1;
    });
  }

  mounted() {
    this.doUpdate();
    setInterval(() => this.doUpdate(), 1000 * 5);
  }
}
</script>

<style lang="scss">
@import "./assets/global";
@import "./assets/bootstrap";
@import "./assets/home";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
