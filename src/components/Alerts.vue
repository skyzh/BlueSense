<template>
  <div id="alerts">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
            <Alert v-for="item in items" v-bind:key="item.title" :title="item.title" :color="item.color" :content="item.content"></Alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Alert from "./Alert.vue";
import { AlertData }from "./alert";

@Component({
  components: {
    Alert
  }
})
export default class Alerts extends Vue {
    items: AlertData[] = [];
    mounted() {
        this.items = [{ title: "Fully Operational", color: "success", content: "Data reporting system fully operational in the past hour. Realtime data is available." },
        { title: "Fully Operational", color: "success", content: "Data reporting system fully operational in the past hour. Realtime data is available." },
        { title: "Fully Operational", color: "success", content: "Data reporting system fully operational in the past hour. Realtime data is available." }];
    }
}
</script>

<style scoped lang="scss">

</style>
