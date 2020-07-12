<template>
  <div id="app">
    <Navbar :route.sync="route" />
    <RealtimeReport
      :realtimeReport="realtimeReport"
      :reportTime="reportTime"
      :ready="ready"
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
import { roundDigit } from "./utils";
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
  realtimeReport = [0, 0, 0, 0, 0];
  reportTime = "Unknown";
  ready = false;
  // route = "archive";
  route = "realtime";
  pastHour: SenseCheckpoint[] = [];

  doUpdate() {
    setTimeout(() => {
    getRealtimeReport().then(result => {
      const key = Object.keys(result);
      const val = result[key[0]];
      this.realtimeReport = [
        roundDigit(val.temp, 2),
        roundDigit(val.hum, 2),
        roundDigit(val.pa, 0) / 1000,
        roundDigit(val.pm25, 2),
        roundDigit(val.pm10, 2)
      ];
      this.reportTime = new Date(val.time * 1000).toString();
      this.ready = true;
    });
    queryRange(new Date(Date.now() - 3600 * 1000), new Date()).then(result => {
      this.pastHour = result;
      this.ready = true;
    });
    }, 3000);
  }

  mounted() {
    this.doUpdate();
    setInterval(() => this.doUpdate(), 1000 * 10);
  }
}
</script>

<style lang="scss">
@import "./assets/global";
@import "./assets/bootstrap";
@import "./assets/home";

.fade-enter-active, .fade-leave-active {
  transition: opacity max-height .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
