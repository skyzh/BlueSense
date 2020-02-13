<template>
  <div id="app">
    <Navbar v-bind:route="route" />
    <RealtimeReport v-bind:realtimeReport="realtimeReport" v-bind:reportTime="reportTime" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import RealtimeReport from "./components/RealtimeReport.vue";
import { getRealtimeReport } from "./sense";
import { roundDigit } from "./utils";

@Component({
  components: {
    Navbar,
    RealtimeReport
  }
})
export default class App extends Vue {
  realtimeReport = [0, 0, 0, 0, 0];
  reportTime = "";
  route = "realtime";

  doUpdate() {
    getRealtimeReport().then(result => {
        const key = Object.keys(result)
        const val = result[key[0]]
        this.realtimeReport = [
          roundDigit(val.temp, 2),
          roundDigit(val.hum, 2),
          roundDigit(val.pa, 0) / 1000,
          roundDigit(val.pm25, 2),
          roundDigit(val.pm10, 2)
        ];
        this.reportTime = new Date(val.time * 1000).toString();
      });
  }

  mounted() {
    this.doUpdate()
    setInterval(() => this.doUpdate(), 1000 * 30);
  }
}
</script>

<style lang="scss">
@import "./assets/global";
@import "./assets/bootstrap";
@import "./assets/home";
</style>
