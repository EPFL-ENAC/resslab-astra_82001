<template>
  <q-page class="row items-center justify-center">
    <div class="grid-astra">
        <TrafficType />
        <BridgeSelector />
        <AlphaFooter />
        <LaneSelector />
        <LongitudinalVerification class="longitudinal-verification"/>
        <TransversalVerification />
    </div>
    <!-- <div class="container" style="max-width: 800px">
      <div class="row items-center justify-center">
        <div class="col col-6 form items-center justify-center flex q-gutter-sm">
          <BridgeSelectionForm v-model="selected" />
        </div>
        <div class="col col-6 results items-center justify-center flex">
          <AlphaValues
            :alpha-q1="alphaQ1"
            :alpha-q2="alphaQ2"
            :traffic-class="trafficClass"
            :selected-value="selectedValue"
            :phy-cal="phyCal.value"
            :beta="beta.value"
          />
        </div>
      </div>
    </div>
    <aside class="items-top justify-top">
      <q-select
        v-model="beta"
        :options="betaOptions"
        dense
        outlined
        class="q-mr-md white-options-and-label q-mb-sm"/>
        <q-select
        v-model="phyCal"
        :options="phyCalOptions"
        :disable="true"
        dense
        outlined
        class="q-mr-md white-options-and-label"/>
        <div class="alpha-footer">
      <q-toggle
      :false-value="false"
      :label="`${goodQualityRoad ? $t('good_quality_road') : $t('bad_quality_road')}`"
      :true-value="true"
      color="red"
      v-model="goodQualityRoad"
    />
    </div>
    </aside> -->
  </q-page>
</template>

<style lang="scss">
.grid-astra {
  display: grid;
  grid-template-areas:
    "a b b"
    "c f f"
    "c d e"
    "c d e"
    "c d e";
  grid-gap: 10px;
  // I wan to make the grid responsive and also having the first column to be 1fr and the second column to be 2fr
  // grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: auto;
  padding: 10px;
  margin: 10px;
  background-color: #f0f0f0;

  // but also column d and e taking at least 300px width each
  grid-template-columns: 1fr 2fr 2fr minmax(300px, 1fr);
}

.traffic-type { grid-area: a; }
.bridge-selector { grid-area: b; }
.lane-selector { grid-area: c; }
.longitudinal-verification { grid-area: d;
  display: flex;
  flex-direction:column;
}
.transversal-verification { grid-area: e; }
.alpha-footer { grid-area: f; }
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import data from '../assets/data/data.json';
import BridgeSelectionForm from '../components/BridgeSelectionForm.vue';
import AlphaValues from '../components/AlphaValues.vue';
import TrafficType from '../components/TrafficType.vue';
import BridgeSelector from '../components/BridgeSelector.vue';
import AlphaFooter from '../components/AlphaFooter.vue';
import LaneSelector from '../components/LaneSelector.vue';
import LongitudinalVerification from '../components/LongitudinalVerification.vue';
import TransversalVerification from '../components/TransversalVerification.vue';
import type { Selected, TrafficClass } from '../types/Selected';
import { useI18n } from 'vue-i18n';

let alphaQ2 = ref(0.35);
let alphaQ1 = ref(0.55);
const { t: $t } = useI18n();

const selected = ref<Selected>({
  Type: {value: 'Box', label: $t('box')},
  SubType: {value: 'Stand', label: $t('stand')},
  Width: undefined,
  Layout: undefined,
  Support: undefined,
  Trans: undefined,
  AE: undefined,
  Traffic: undefined,
  TrafficClass: undefined,
  Span: undefined
});


const selectedJson = computed<Record<TrafficClass|string, number|string|undefined>>(() => {
  console.log(selected.value.Width?.value)
  return data.filter(x =>
    x.Type === selected.value.Type?.value &&
    x.SubType === selected.value.SubType?.value &&
    x.Width === selected.value.Width?.value &&
    x.Traffic === selected.value.Traffic?.value &&
    x.Support === selected.value.Support?.value &&
    x.Trans === selected.value.Trans?.value &&
    x.AE === selected.value.AE?.value &&
    x.Span === Number(selected.value.Span?.value)
  )[0]
});

const trafficClass = computed(() => selected.value.TrafficClass?.value as TrafficClass);
const selectedValue = computed(() => selectedJson.value?.[trafficClass.value] as number);

const goodQualityRoad = ref(false);

// default is 4.2 we can change it to 4.7 for bridge of category 3
// cf 6.24 p 83 of 120 of the 82001f
const betaOptions = [
  { label: 'β4.20', value: 4.2 },
  { label: 'β4.70', value: 4.7 }, // cas le plus defavorable +2.2 à +7% pour les ponts de catégorie 3 (on utilise +7% for now)
  // III.1.2 Résultats pour deux voies de circulation, pour une bande de 1.4 m –
  // (Q1 + Q2)act cf p99/120
];
const beta = ref(betaOptions[0]);

// show phycal options for bridge with a span <= 20m
/*
** 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
** 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
** 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
** Par défaut c'est 1.00
*/
const defaultPhyCalOptions = [
  { label: 'Φ1.00', value: 1.00},
]

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
  let phyCalDynamicValue = defaultSmallRoadPhyCal - 0.015 * (selected.value.Span.value - 10);
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
  { label: `Φ${phyCalDynamicValue.toFixed(2)}`, value: phyCalDynamicValue}
]
});

// const phyCal = ref(phyCalOptions.value[0]);
const phyCal = computed(() => (phyCalOptions.value[0]));
</script>
