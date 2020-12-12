<template>
  <div id="app">
    <div>観測周波数(GHz)<input type="number" v-model="freqnency" /></div>
    <div>輝度温度(K): {{ brightnessTemperature }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { calcTotalBrightnesstemperature } from "./radTrans";
import { atmosphereModel } from "./selhorst2005";

@Component
export default class App extends Vue {
  freqnency = 17;

  get brightnessTemperature() {
    return Math.floor(
      calcTotalBrightnesstemperature(this.freqnency * 1e9, atmosphereModel)
    );
  }
}
</script>
