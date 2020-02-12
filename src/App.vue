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
import sense from "./sense";
import { roundDigit } from "./utils";

@Component({
  components: {
    Navbar,
    RealtimeReport
  }
})
export default class App extends Vue {
  realtimeReport = [0, 0, 0, 0, 0];
  reportTime = ""
  route = "realtime";

  mounted() {
    sense
      .ref(`checkpoint/changning/minute/`)
      .orderByChild("time")
      .limitToLast(1)
      .on("value", snapshot => {
        snapshot.forEach(child => {
          const val = child.val();
          this.realtimeReport = [
            roundDigit(val.temp, 2),
            roundDigit(val.hum, 2),
            roundDigit(val.pa, 0) / 1000,
            roundDigit(val.pm25, 2),
            roundDigit(val.pm10, 2)
          ];
          this.reportTime = (new Date(val.time * 1000)).toString()
        });
      });
  }
}
</script>

<style lang="scss">
@import "./assets/global";
@import "./assets/bootstrap";
@import "./assets/home";
</style>
