<template>
  <div id="alert">
    <div class="card sense-card mb-3">
      <div class="card-body text-white" v-bind:class="['bg-'+color]">
        <blockquote class="card-blockquote d-flex flex-row align-items-center my-1">
          <div class="d-flex flex-col">
            <check-icon size="100"></check-icon>
          </div>
          <div class="ml-3">
            <h3 class="text-uppercase">{{ title }}</h3>
            <span>{{ content }}</span>
          </div>
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CheckIcon } from "vue-feather-icons";

@Component({
  components: { CheckIcon }
})
export default class Alerts extends Vue {
  @Prop({ default: "" }) readonly title!: string;
  @Prop({ default: "" }) readonly content!: string;
  @Prop({ default: "" }) readonly color!: string;
}
</script>

<style scoped lang="scss">
.sense-alert-icon {
  display: block;
  height: 100%;
}
</style>
