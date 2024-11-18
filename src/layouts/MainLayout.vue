<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          ASTRA 82001
        </q-toolbar-title>

        <div>v0.0.1</div>

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
          download
          class="q-ml-md"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />


    </q-page-container>
    <q-footer>
      <div class="text-center">
        <span class="text-h6">ASTRA 82001</span>
        <br />
        <span class="text-caption">v0.0.1</span>
        <q-select v-model="lang" :options="langOptions" />
        <q-select v-model="beta" :options="betaOptions" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lang = ref('en');
const beta = ref('1.0');
const langOptions = [
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Français', value: 'fr' },
  { label: 'Italiano', value: 'it' },
];
const betaOptions = [
  { label: '1.0', value: '1.0' },
  { label: '1.1', value: '1.1' },
];
const linkToCSV = '/data.csv';
const linkToAstra82001fPDF = 'https://www.astra.admin.ch/dam/astra/de/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf';
</script>
