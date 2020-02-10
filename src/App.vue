<template>
  <div id="app">
    <div class="text-center" style="margin: 10rem 0">
      <h1 class="display-2"><span class="bs-logo-blue">Blue</span>Sense</h1>
      Sense of the Blue Sky
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/shadow.scss";
</style>
