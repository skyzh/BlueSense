<template>
  <div id="app">
    <Navbar v-bind:route="route" />
    <RealtimeReport v-bind:realtimeReport="realtimeReport" />
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
  route = "realtime";

  mounted() {
    sense
      .ref(`checkpoint/changning/minute/`)
      .orderByChild("time")
      .limitToLast(1)
      .on("value", snapshot => {
        snapshot.forEach(child => {
          let val = child.val();
          this.realtimeReport = [
            roundDigit(val.temp, 2),
            roundDigit(val.hum, 2),
            roundDigit(val.pa, 0),
            roundDigit(val.pm25, 2),
            roundDigit(val.pm10, 2)
          ];
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
