<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          ASTRA 82001
        </q-toolbar-title>

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
import { ref } from 'vue';

const beta = ref('1.0');
const langOptions = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Français', value: 'fr' },
  { label: 'Italiano', value: 'it' },
];
const lang = ref(langOptions[0]);
const betaOptions = [
  { label: '1.0', value: '1.0' },
  { label: '1.1', value: '1.1' },
];
const linkToCSV = '/src/assets/data/data.csv';
const linkToAstra82001fPDF = 'https://www.astra.admin.ch/dam/astra/de/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf';
</script>

<style lang="scss" scoped>
.white-options-and-label {
  :deep(.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input) {
    color: white;
  }
}
</style>
