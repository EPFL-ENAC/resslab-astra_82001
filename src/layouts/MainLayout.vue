<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          ASTRA 82001
        </q-toolbar-title>

        <q-select
        v-model="beta"
        :options="betaOptions"
        dense
        outlined
        class="q-mr-md white-options-and-label"/>
        <q-select
        v-model="phyCal"
        :options="phyCalOptions"
        :disable="true"
        dense
        outlined
        class="q-mr-md white-options-and-label"/>
        <q-select
          v-model="lang"
          :options="langOptions"
          dense
          outlined
          class="q-mr-md white-options-and-label"/>
        <q-btn
          flat
          round
          icon="download"
          :href="linkToAstra82001fPDF"
          target="_blank"
          download
          class="q-ml-md"
        />
        <q-btn
          flat
          round
          icon="insert_drive_file"
          :href="linkToCSV"
          target="_blank"
          download="data-astra-82001f.csv"
          class="q-ml-md"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="text-center ">
        <span class="text-h6 q-pa-md q-mt-lg">ASTRA 82001</span>
        <span class="text-caption">v0.0.1</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const langOptions = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Français', value: 'fr' },
  { label: 'Italiano', value: 'it' },
];
const lang = ref(langOptions[0]);

watch(lang, (newLang) => {
  locale.value = newLang.value;
});

const linkToCSV = '/src/assets/data/data.csv';
const linkToAstra82001fPDF = 'https://www.astra.admin.ch/dam/astra/de/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf';

// todo move to pinia store

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
  return defaultPhyCalOptions;
  // if (selected.value.Span === null) {
  //   return defaultPhyCalOptions;
  // }
  // if (selected.value.Span === undefined) {
  //   return defaultPhyCalOptions;
  // }
  // // 10 < 𝐿 ≤ 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.15 − 0.015 ∙ (𝐿 − 10)
  // let phyCalDynamicValue = defaultSmallRoadPhyCal - 0.015 * (selected.value.Span.value - 10);
  // if (selected.value.Span.value <= 10) {
  //   phyCalDynamicValue = defaultSmallRoadPhyCal; // 𝐿 ≤ 10 𝑚, 𝑐𝑎𝑙 = 1.15
  // }
  // if (selected.value.Span.value >= 20) {
  //   phyCalDynamicValue = defaultGoodRoadPhyCal; // 𝐿 > 20 𝑚, 𝜑𝑐𝑎𝑙 = 1.00
  // }

  // if (goodQualityRoad.value === true) {
  //   phyCalDynamicValue = defaultGoodRoadPhyCal;
  // }
  // if (phyCalDynamicValue === undefined) {
  //   return defaultPhyCalOptions;
  // }
//   return [
//   { label: `Φ${phyCalDynamicValue.toFixed(2)}`, value: phyCalDynamicValue}
// ]
});

// const phyCal = ref(phyCalOptions.value[0]);
const phyCal = computed(() => (phyCalOptions.value[0]));

</script>

<style lang="scss" scoped>
.white-options-and-label {
  :deep(.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input) {
    color: white;
  }
}
</style>
