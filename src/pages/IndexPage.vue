<template>
  <q-page class="row items-center justify-center">
    <div class="container" style="max-width: 800px">
      <div class="row items-center justify-center">
        <div class="col col-6 form items-center justify-center flex">
          <BridgeSelectionForm v-model="selected" />
        </div>
        <div class="col col-6 results items-center justify-center flex">
          <AlphaValues
            :alpha-q1="alphaQ1"
            :alpha-q2="alphaQ2"
            :traffic="(selected.Traffic as string)"
            :selected-value="selectedJson?.[selected.Traffic as string]"
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

type Traffic = 'All' | 'ClassOW' | 'Class';

let alphaQ2 = ref(0.35);
let alphaQ1 = ref(0.55);
const selected = ref<Record<string, string|number|null>>({
  Type: null,
  SubType: null,
  Width: null,
  Layout: null,
  Support: null,
  Trans: null,
  AE: null,
  Traffic: null,
  Span: null,
  All: null,
  ClassOW: null,
  Class: null,
  BestFitAll: null,
  BestFitClassOW: null,
  BestFitClass: null
});

const selectedJson = computed<Record<Traffic|string, number|string>>(() => {
  return data.filter(x =>
    x.Type === selected.value.Type &&
    x.SubType === selected.value.SubType &&
    x.Width === selected.value.Width &&
    x.Layout === selected.value.Layout &&
    x.Support === selected.value.Support &&
    x.Trans === selected.value.Trans &&
    x.AE === selected.value.AE &&
    x.Span === selected.value.Span
  )[0]
});
</script>
