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
import { unit } from "mathjs";

@Component
export default class App extends Vue {
  freqnency = 17;

  get brightnessTemperature() {
    const freqnency = unit(this.freqnency, "GHz");
    return Math.floor(
      calcTotalBrightnesstemperature(freqnency, atmosphereModel)
    );
  }
}
</script>
