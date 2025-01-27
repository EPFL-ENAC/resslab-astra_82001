<template>
  <q-page class="grid items-start">
    <div class="grid-astra">
      <TrafficType  />
      <BridgeSelector  />
      <AlphaGlobal  />
      <LaneSelector  />
      <LongitudinalVerification  />
      <TransversalVerification />
    </div>
  </q-page>
</template>

<style lang="scss">
@import 'src/css/quasar.variables.scss';
@import 'src/css/mixins.scss';
// define breakpoint-md and breakpoint-sm
// $breakpoint-md: 1024px;
// $breakpoint-sm: 600px;
.grid {
  display: grid;
}
.grid-astra {
  display: grid;
  background-color: #fff;
  grid-gap: 1em;
  height: 100%;
}
// create a grid-astra layout but for tablet and mobile
//media for mobile < breakpoint-sm
@media only screen and (max-width: $breakpoint-sm) {
  .grid-astra {
    display: grid;
    grid-template-areas:
      'a'
      'b'
      'f'
      'c'
      'd'
      'g'
      'e'
      'h';
    grid-template-columns: 1fr;
    grid-gap: 10px;
    padding: 10px;
  }
}
// media for tablet > sm and < md
@media only screen and (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
  .grid-astra {
    grid-template-areas:
      'a b'
      'f f'
      'c c'
      'd d'
      'g g'
      'e e'
      'h h';
    grid-template-columns: 1fr 1fr;
  }
}

// media for desktop > md
@media only screen and (min-width: 1024px) {
  .grid-astra {
    display: grid;
    grid-template-rows: repeat(3, max-content);
    // grid-template-columns: 1fr  2.8fr 1fr;
    grid-template-columns: 1.4fr  2.8fr 1fr;
    grid-template-areas:
      'a b f'
      'c d g'
      'c e h';
    grid-gap: 10px;
    padding: 10px;
  }
}
.traffic-type {
  grid-area: a;
  @include user-select(none);
}
.bridge-selector {
  grid-area: b;
  @include user-select(none);
}
.lane-selector {
  grid-area: c;
  @include user-select(none);
}
.longitudinal-verification {
  grid-area: d;
  display: flex;
  flex-direction: column;
  @include user-select(none);
}
.longitudinal-verification-result {
  grid-area: g;
  display: flex;
  height: 100%;
  position: relative;
  @include user-select(text);
}
.transversal-verification {
  grid-area: e;
  @include user-select(none);
}
.transversal-verification-result {
  grid-area: h;
  display: flex;
  height: 100%;
  position: relative;
  @include user-select(text);
}
.items-start {
  align-items: start;
}
</style>

<script setup lang="ts">
import TrafficType from '../components/TrafficType.vue';
import BridgeSelector from '../components/BridgeSelector.vue';
import AlphaGlobal from '../components/AlphaGlobal.vue';
import LaneSelector from '../components/LaneSelector.vue';
import LongitudinalVerification from '../components/LongitudinalVerification.vue';
import TransversalVerification from '../components/TransversalVerification.vue';

</script>
