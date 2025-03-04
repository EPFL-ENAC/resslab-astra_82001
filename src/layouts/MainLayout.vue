<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-h6 q-pa-md q-mt-lg">ASTRA 82001</span>
          <span class="text-caption">v{{ version }}</span>
          <span class="text-caption q-mx-md">|</span>
          <span class="text-caption"
            >{{ $t('data_version') }}: {{ dataVersion }}</span
          >
        </q-toolbar-title>

        <q-btn-toggle
          v-model="lang"
          color="dark"
          text-color="dark"
          toggle-color="dark"
          toggle-text-color="primary"
          class="q-mr-md"
          flat
          :options="langOptions"
        />
        <AboutDialog />
        <q-btn
          flat
          round
          :href="linksToAstra82001fPDF[lang]"
          target="_blank"
          download
          class="q-ml-md"
        >
          <template #default>
            <q-img
              height="24px"
              fit="contain"
              src="/epfl-designed/Canard/svg/c-info.svg"
              :alt="$t('download_reference_documentation')"
            />
            <q-tooltip class="text-body1">
              <span>{{ $t('download_reference_documentation') }} </span>
            </q-tooltip>
          </template>
        </q-btn>
        <q-btn
          flat
          round
          :href="linksToAstraAnnex82001fPDF[lang]"
          target="_blank"
          download
          class="q-ml-md"
        >
          <template #default>
            <q-img
              height="24px"
              fit="contain"
              src="/epfl-designed/Canard/svg/c-annex.svg"
              :alt="$t('i13')"
            />
            <q-tooltip class="text-body1">
              <span>{{ $t('i13') }} </span>
            </q-tooltip>
          </template>
        </q-btn>
        <q-btn
          flat
          round
          :href="linkToCSV"
          target="_blank"
          :download="downloadFileName"
          class="q-ml-md"
        >
          <template #default>
            <q-img
              height="24px"
              fit="contain"
              src="/epfl-designed/Canard/svg/c-csv.svg"
              :alt="$t('download_reference_data')"
            />
            <q-tooltip class="text-body1">
              <span>{{ $t('download_reference_data') }} </span>
            </q-tooltip>
          </template>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container container class="layout-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { version } from '../../package.json';
import { dataVersion } from 'src/utils/constants';
import { getNavigatorLanguage } from 'src/boot/i18n';
import AboutDialog from 'src/components/AboutDialog.vue';

const { locale } = useI18n();

const langOptions = [
  { label: 'EN', value: 'en' },
  { label: 'DE', value: 'de' },
  { label: 'FR', value: 'fr' },
  { label: 'IT', value: 'it' },
];
const lang: Ref<string> = ref(getNavigatorLanguage().split('-')[0]);
const downloadFileName = `data-astra-82001f_${dataVersion}.csv`;

watch(lang, (newLang) => {
  locale.value = newLang;
});

const linkToCSV = '/src/assets/data/data.csv';

const linksToAstra82001fPDF: Record<string, string> = {
  en: 'https://www.astra.admin.ch/dam/astra/fr/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001e.pdf',
  de: 'https://www.astra.admin.ch/dam/astra/de/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf',
  fr: 'https://www.astra.admin.ch/dam/astra/fr/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf',
  it: 'https://www.astra.admin.ch/dam/astra/fr/dokumente/standards_fuer_nationalstrassen/astra_82001_ueberpruefungbestehenderstrassenbruecken2006.pdf.download.pdf/astra_82001f.pdf',
};

const linksToAstraAnnex82001fPDF: Record<string, string> = {
  en: '/Documentation.Annexe.n.306891-2.2024.V1.03.pdf',
  de: '/Documentation.Annexe.n.306891-2.2024.V1.03.pdf',
  fr: '/Documentation.Annexe.n.306891-2.2024.V1.03.pdf',
  it: '/Documentation.Annexe.n.306891-2.2024.V1.03.pdf',
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  max-width: 1800px;
  margin: auto;
}
</style>
