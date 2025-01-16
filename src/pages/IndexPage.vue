<template>
  <q-page class="grid items-start">
    <div class="grid-astra">
      <TrafficType class="row1" />
      <BridgeSelector class="row1" />
      <AlphaGlobal class="row1" />
      <LaneSelector class="area-c" />
      <LongitudinalVerification class="longitudinal-verification row2" />
      <TransversalVerification class="transversal-verification row3" />
    </div>
  </q-page>
</template>

<style lang="scss">
@import 'src/css/quasar.variables.scss';
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
    // grid-template-rows: repeat(3, 1fr);
    grid-template-rows: auto repeat(2, 1fr);
    // but also column d and e taking at least 300px width each
    // grid-template-columns: 1fr 2fr 2fr;
    grid-template-columns: 1fr 0.8fr 2.8fr 1fr;
    // grid-template-columns: 1.2fr 1fr 3.2fr 1.2fr;
    // grid-template-columns: 2.2fr 3.2fr 1.2fr;
    grid-template-areas:
      'a a b f'
      'c d d g'
      'c e e h';
    // grid-template-areas:
    //   "row1 row1 row1"
    //   "row2 row2 row2"
    //   "row3 row3 row3";
    grid-gap: 10px;
    // I wan to make the grid responsive and also having the first column to be 1fr and the second column to be 2fr
    // grid-template-columns: 1fr 2fr 2fr;
    padding: 10px;
  }
}

/* Row 1 columns: 2.2fr 3.2fr 1.2fr */
// .grid-astra > *:nth-child(-n+3) {
//  display: grid;
//  grid-template-columns: 2.2fr 3.2fr 1.2fr;
// }

// /* Row 2 & 3 columns: 1.2fr 4.2fr 1.2fr */
// .grid-astra > *:nth-child(n+4) {
//  display: grid;
//  grid-template-columns: 1.2fr 4.2fr 1.2fr;
// }



// .row1, .row2 {
//   display: grid;
//   gap: 10px;
// }

// .row1 {
//   grid-template-columns: 2.2fr 3.2fr 1.2fr;
// }

// .row2 {
//   grid-template-columns: 1.2fr 4.2fr 1.2fr;
// }


/* nested */
// .row1 {
//   grid-area: row1;
//   display: grid;
//   grid-template-columns: 2.2fr 3.2fr 1.2fr;
// }

// .row2 {
//   grid-area: row2;
//   display: grid;
//   grid-template-columns: 1.2fr 4.2fr 1.2fr;
//   grid-template-areas: "c d g";  /* Define areas for row2 */
// }

// .row3 {
//   grid-area: row3;
//   display: grid;
//   grid-template-columns: 1.2fr 4.2fr 1.2fr;
//   grid-template-areas: "c e h";  /* Define areas for row3 */
// }

/* Targeting specific areas */
.area-g {
  grid-area: g;  /* This will place it in the last column of row2 */
}

.area-h {
  grid-area: h;  /* This will place it in the last column of row3 */
}
/* Row containers with subgrid */
// .row2 {
//   grid-row: 2;
//   grid-column: 1 / -1;
//   display: grid;
//   grid-template-rows: subgrid;
//   grid-template-columns: 2.2fr 3.2fr 1.2fr;
//   grid-template-areas: 'c d g';
// }

// .row3 {
//   grid-row: 3;
//   grid-column: 1 / -1;
//   display: grid;
//   // grid-template-columns: subgrid;
//   grid-template-rows: subgrid;
//   grid-template-columns: 2.2fr 3.2fr 1.2fr;
//   grid-template-areas: 'c e h';
// }

.traffic-type {
  grid-area: a;
}
.bridge-selector {
  grid-area: b;
}
.lane-selector {
  grid-area: c;
}
.longitudinal-verification {
  grid-area: d;
  display: flex;
  flex-direction: column;
}
.longitudinal-verification-result {
  grid-area: g;
  display: flex;
  height: 100%;
}
.transversal-verification {
  grid-area: e;
}
.transversal-verification-result {
  grid-area: h;
  display: flex;
  height: 100%;
}
.items-start {
  align-items: start;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import data from '../assets/data/data.json';
import TrafficType from '../components/TrafficType.vue';
import BridgeSelector from '../components/BridgeSelector.vue';
import AlphaGlobal from '../components/AlphaGlobal.vue';
import LaneSelector from '../components/LaneSelector.vue';
import LongitudinalVerification from '../components/LongitudinalVerification.vue';
import TransversalVerification from '../components/TransversalVerification.vue';
import type { Selected, TrafficClass } from '../types/Selected';
import { useI18n } from 'vue-i18n';

let alphaQ2 = ref(0.35);
let alphaQ1 = ref(0.55);
const { t: $t } = useI18n();

// DEPRECATED, should be moved to store

const selected = ref<Selected>({
  Type: { value: 'Box', label: $t('box') },
  SubType: { value: 'Stand', label: $t('stand') },
  Width: undefined,
  Layout: undefined,
  Support: undefined,
  Trans: undefined,
  AE: undefined,
  Traffic: undefined,
  TrafficClass: undefined,
  Span: undefined,
});

// const selectedJson = computed<Record<TrafficClass|string, number|string|undefined>>(() => {
//   return data.filter(x =>
//     x.Type === selected.value.Type?.value &&
//     x.SubType === selected.value.SubType?.value &&
//     x.Width === selected.value.Width?.value &&
//     x.Traffic === selected.value.Traffic?.value &&
//     x.Support === selected.value.Support?.value &&
//     x.Trans === selected.value.Trans?.value &&
//     x.AE === selected.value.AE?.value &&
//     x.Span === Number(selected.value.Span?.value)
//   )[0]
// });

// const trafficClass = computed(() => selected.value.TrafficClass?.value as TrafficClass);
// const selectedValue = computed(() => selectedJson.value?.[trafficClass.value] as number);

const goodQualityRoad = ref(false);

// default is 4.2 we can change it to 4.7 for bridge of category 3
// cf 6.24 p 83 of 120 of the 82001f
const betaOptions = [
  { label: 'β4.20', value: 4.2 },
  { label: 'β4.70', value: 4.7 }, // cas le plus defavorable +2.2 à +7% pour les ponts de catégorie 3 (on utilise +7% for now)
  // III.1.2 Résultats pour deux voies de circulation, pour une bande de 1.4 m –
  // (Q1 + Q2)act cf p99/120
];
// TODO: move that to the store
const beta = ref(betaOptions[0]);

// show phycal options for bridge with a span <= 20m
/*
 ** 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
 ** 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
 ** 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
 ** Par défaut c'est 1.00
 */

// TODO: move that to the traffic class store
const defaultPhyCalOptions = [{ label: 'Φ1.00', value: 1.0 }];

const defaultGoodRoadPhyCal = 1.0;
const defaultSmallRoadPhyCal = 1.15;
const phyCalOptions = computed(() => {
  if (selected.value.Span === null) {
    return defaultPhyCalOptions;
  }
  if (selected.value.Span === undefined) {
    return defaultPhyCalOptions;
  }
  // 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
  let phyCalDynamicValue =
    defaultSmallRoadPhyCal - 0.015 * (selected.value.Span.value - 10);
  if (selected.value.Span.value <= 10) {
    phyCalDynamicValue = defaultSmallRoadPhyCal; // 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
  }
  if (selected.value.Span.value >= 20) {
    phyCalDynamicValue = defaultGoodRoadPhyCal; // 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
  }

  if (goodQualityRoad.value === true) {
    phyCalDynamicValue = defaultGoodRoadPhyCal;
  }
  if (phyCalDynamicValue === undefined) {
    return defaultPhyCalOptions;
  }
  return [
    { label: `Φ${phyCalDynamicValue.toFixed(2)}`, value: phyCalDynamicValue },
  ];
});

// const phyCal = ref(phyCalOptions.value[0]);
const phyCal = computed(() => phyCalOptions.value[0]);
</script>
