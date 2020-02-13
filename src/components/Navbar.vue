<template>
  <div id="navbar">
    <header>
      <div class="container">
        <div id="placeholder-header" class="row"></div>
        <div class="row">
          <div class="col text-center">
            <h1 class="display-3">
              <span class="text-bluesense">Blue</span>Sense
            </h1>
            <p>Sense of the <span class="text-bluesense-sub">Blue</span> Sky.
            </p>
          </div>
        </div>
        <div class="row justify-content-center sense-nav">
          <div class="col-5 text-right d-none d-md-block">
            <ul class="list-unstyled">
              <li>Data</li>
              <li>Subscribe</li>
              <li>BlueSense</li>
            </ul>
          </div>
          <div class="col-md-7 text-md-left text-center">
            <ul class="list-unstyled">
              <li>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="javascript:" v-on:click="syncedRoute='realtime'" v-bind:class="{ active: syncedRoute == 'realtime' }">&gt; Realtime</a></li>
                  <li class="list-inline-item"><a href="javascript:" v-on:click="syncedRoute='archive'" v-bind:class="{ active: syncedRoute == 'archive' }">&gt; Archive (WIP)</a></li>
                </ul>
              </li>
              <li>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="https://t.me/thebluesense">&gt; Mr. Sans on Telegram</a></li>
                </ul>
              </li>
              <li>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="https://github.com/skyzh/BlueSense">&gt; GitHub</a></li>
                  <li class="list-inline-item"><a href="https://skyzh.xyz">&gt; Alex Chi</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <p class="text-muted small text-center">An open-source project by Alex Chi</p>
            <p class="text-muted small text-center">We're actively working on this next generation of BlueSense.</p>
            <hr class="mx-1">
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
  @PropSync('route', {type: String}) syncedRoute!: string
}
</script>

<style scoped lang="scss">
@import "../assets/global";
#placeholder-header {
  display: block;
  height: 30vh;
  max-width: 100%;
}
.sense-nav {
  a {
    color: $gray-600 !important;
    text-decoration: dotted underline;

    &.active {
      color: $gray-800 !important;
      text-decoration: solid underline;
    }
  }
}
</style>
