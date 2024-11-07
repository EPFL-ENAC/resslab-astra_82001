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
            :traffic-class="selected.TrafficClass?.value as string"
            :selected-value="selectedJson?.[selected.TrafficClass?.value as string]"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import data from '../assets/data/data.json';
import BridgeSelectionForm from '../components/BridgeSelectionForm.vue';
import AlphaValues from '../components/AlphaValues.vue';

type TrafficClass = 'ClassOW' | 'Class';
type TrafficClassOptions = { value: TrafficClass, label: string }[];

let alphaQ2 = ref(0.35);
let alphaQ1 = ref(0.55);
interface Selected {
  Type: string;
  SubType: string;
  Width: number;
  Layout: string | null;
  Support: string | null;
  Trans: string | null;
  AE: string | null;
  Traffic: string | null;
  TrafficClass: TrafficClassOptions | null;
  Span: number | null;
}
const selected = ref<Selected>({
  Type: 'Box',
  SubType: 'Stand',
  Width: 12,
  Layout: null,
  Support: null,
  Trans: null,
  AE: null,
  Traffic: null,
  TrafficClass: null,
  Span: null
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
</script>
