<template>
  <span>
    <div class="spinner-border spinner-border-sm mx-3" v-if="!ready"></div>
    <span v-if="ready">
      <corner-right-up-icon size="16" v-if="trend[0] < trend[1]" class="text-success"></corner-right-up-icon>
      <corner-right-down-icon size="16" v-if="trend[0] > trend[1]" class="text-danger"></corner-right-down-icon>
      <arrow-right-icon size="16" v-if="trend[0] == trend[1]" class="text-muted"></arrow-right-icon>&nbsp;
      <span v-if="ready">{{ trend[1] }}</span>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  CornerRightUpIcon,
  CornerRightDownIcon,
  ArrowRightIcon
} from "vue-feather-icons";

@Component({
  components: { CornerRightUpIcon, CornerRightDownIcon, ArrowRightIcon }
})
export default class Trend extends Vue {
  @Prop({ default: [0, 0] }) readonly trend!: number;
  @Prop({ default: false }) readonly ready!: boolean;
}
</script>

<style scoped lang="scss">
</style>
