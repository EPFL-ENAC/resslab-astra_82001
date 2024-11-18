<template>
  <q-page class="row items-center justify-center">
    <div class="container" style="max-width: 800px">
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
            :phy-cal="phyCal"
            :beta="beta"
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
        class="q-mr-md white-options-and-label"/>
        <q-select
        v-model="phyCal"
        :options="phyCalOptions"
        dense
        outlined
        class="q-mr-md white-options-and-label"/>
    </aside>
  </q-page>


</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import data from '../assets/data/data.json';
import BridgeSelectionForm from '../components/BridgeSelectionForm.vue';
import AlphaValues from '../components/AlphaValues.vue';

type TrafficClass = 'ClassOW' | 'Class';
type TrafficClassOption = { value: TrafficClass, label: string };
type Option = { value: string, label: string };

let alphaQ2 = ref(0.35);
let alphaQ1 = ref(0.55);
interface Selected {
  Type: string;
  SubType: string;
  Width?: Option;
  Layout?: string;
  Support?: string;
  Trans?: string;
  AE?: string;
  Traffic?: string;
  TrafficClass?: TrafficClassOption;
  Span?: number;
}
const selected = ref<Selected>({
  Type: 'Box',
  SubType: 'Stand',
  Width: undefined,
  Layout: undefined,
  Support: undefined,
  Trans: undefined,
  AE: undefined,
  Traffic: undefined,
  TrafficClass: undefined,
  Span: undefined
});

const selectedJson = computed<Record<TrafficClass|string, number|string>>(() => {
  return data.filter(x =>
    x.Type === selected.value.Type &&
    x.SubType === selected.value.SubType &&
    x.Width === `Wid${selected.value.Width}` &&
    x.Traffic === selected.value.Traffic &&
    x.Support === selected.value.Support &&
    x.Trans === selected.value.Trans &&
    x.AE === selected.value.AE &&
    x.Span === selected.value.Span
  )[0]
});

const trafficClass = computed(() => selected.value.TrafficClass?.value as TrafficClass);
const selectedValue = computed(() => selectedJson.value?.[trafficClass.value] as number);


// default is 4.2 we can change it to 4.7 for bridge of category 3
// cf 6.24 p 83 of 120 of the 82001f
const betaOptions = [
  { label: 'β4.2', value: 4.2 },
  { label: 'β4.7', value: 4.7 }, // cas le plus defavorable +2.2 à +7% pour les ponts de catégorie 3 (on utilise +7% for now)
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
const phyCalOptions = [
  { label: 'Φ1.0', value: 1.0},
  { label: 'Φ1.15', value: 1.15},
]

const phyCal = ref(phyCalOptions[0]);
</script>
