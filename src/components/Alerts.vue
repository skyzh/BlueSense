<template>
  <div id="alerts">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <Alert
            v-for="item in items"
            v-bind:key="item.title"
            :title="item.title"
            :color="item.color"
            :content="item.content"
          ></Alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Alert from "./Alert.vue";
import { AlertData } from "./alert";
import SenseCheckpoint from "../checkpoint";

@Component({
  components: {
    Alert
  }
})
export default class Alerts extends Vue {
  items: AlertData[] = [];
  @Prop({ default: [] }) readonly pastHour!: SenseCheckpoint[];

  mounted() {
    if (this.pastHour.length > 0) this.updateAlerts(this.pastHour);
  }

  @Watch("pastHour")
  onData(val: SenseCheckpoint[]) {
    this.updateAlerts(val);
  }

  updateAlerts(val: SenseCheckpoint[]) {
    const lastCheckpoint = val[val.length - 1];
    const availability = Math.round(
      (Math.max(lastCheckpoint.time - (Date.now() / 1000 - 3600), 0) / 3600) *
        100
    );
    if (availability >= 90) {
      this.items = [
        {
          title: "Fully Operational",
          color: "success",
          content:
            "Data reporting system fully operational in the past hour. Realtime data is available."
        }
      ];
    } else if (availability >= 80) {
      this.items = [
        {
          title: "Minor Outage",
          color: "warning",
          content: `Minor outage is observed in data reporting system in the past hour. (${availability}%)`
        }
      ];
    } else {
      this.items = [
        {
          title: "Major Outage",
          color: "danger",
          content: `Realtime data is not available. (${availability}%)`
        }
      ];
    }
  }
}
</script>

<style scoped lang="scss">
</style>
