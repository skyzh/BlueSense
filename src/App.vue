<template>
  <div id="app">
    <div class="col-6">
      <div class="embed-responsive embed-responsive-1by1">
        <div
          class="bs-logo-container embed-responsive-item d-flex flex-column align-item-center justify-content-center"
        >
          <h1 class="bs-logo-text">Sense</h1>
        </div>
      </div>
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
