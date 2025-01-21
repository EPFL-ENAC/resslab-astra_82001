<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>

        <q-toolbar-title>
          <span class="text-h6 q-pa-md q-mt-lg">ASTRA 82001</span>
          <span class="text-caption">v{{ version }}</span>
          <span class="text-caption q-mx-md">|</span>
          <span class="text-caption">data version: V7_PM_20250109</span>
        </q-toolbar-title>

        <q-btn-toggle  color="dark" text-color="dark" toggle-color="dark" toggle-text-color="primary" class="q-mr-md" v-model="lang" flat :options="langOptions" />
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
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { version } from '../../package.json'


const { locale } = useI18n();

const langOptions = [
  { label: 'EN', value: 'en' },
  { label: 'DE', value: 'de' },
  { label: 'FR', value: 'fr' },
  { label: 'IT', value: 'it' },
];
const lang = ref(langOptions[0].value);

watch(lang, (newLang) => {
  locale.value = newLang;
});

const linkToCSV = '/src/assets/data/data.csv';
const linkToAstra82001fPDF = 'https://www.astra.admin.ch/dam/astra/de/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf';

</script>

<style lang="scss" scoped>
</style>
