<template>
  <input type="datetime-local" v-model="datetimeISO" />
</template>

<script lang="ts">
import { Component, Ref, Vue, PropSync } from "vue-property-decorator";

@Component
export default class DatetimeControl extends Vue {
  @PropSync('datetime', { type: Date }) _datetime!: Date
  get datetimeISO() {
    const d = this._datetime
    const year = `${d.getFullYear()}`.padStart(4, '0')
    const month = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDate()}`.padStart(2, '0')
    const hour = `${d.getHours()}`.padStart(2, '0')
    const minute = `${d.getMinutes()}`.padStart(2, '0')

    return `${year}-${month}-${day}T${hour}:${minute}`
  }

  set datetimeISO(d) {
    const year = parseInt(d.slice(0, 4))
    const month = parseInt(d.slice(5, 7)) - 1
    const day = parseInt(d.slice(8, 10))
    const hour = parseInt(d.slice(11, 13))
    const minute = parseInt(d.slice(14, 16))

    this._datetime = new Date(year, month, day, hour, minute, 0)
  }
}
</script>

<style scoped lang="scss">
</style>
