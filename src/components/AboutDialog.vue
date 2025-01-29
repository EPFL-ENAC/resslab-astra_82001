<template>
  <q-btn flat round @click="() => openDialog()">
    <q-icon class="cursor-pointer" :name="mdiBookOpenBlankVariantOutline">
    </q-icon>
  </q-btn>
  <q-dialog v-model="isOpen" persisten full-width full-height>
    <q-card class="about-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t('about') }}</div>
        <q-space />
        <q-btn v-close-popup icon="close" flat round dense />
      </q-card-section>

      <q-card-section>
        <div v-if="loading" class="text-center q-pa-md">
          <q-spinner color="primary" size="2em" />
        </div>
        <div v-else-if="error" class="text-negative q-pa-md">
          {{ $t('about.error_loading') }}
        </div>
        <q-markdown v-else :src="contentHtml" class="about-content" />
        <!-- <div v-else v-html="contentHtml" class="about-content"></div> -->
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat :label="$t('common_close')" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { mdiBookOpenBlankVariantOutline } from '@mdi/js';

import about_en from 'src/assets/about_en.md';
import about_fr from 'src/assets/about_fr.md';
import about_de from 'src/assets/about_de.md';
import about_it from 'src/assets/about_it.md';

const { locale } = useI18n();
const isOpen = ref(false);
const contentHtml = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const about = ref({
  en: about_en,
  fr: about_fr,
  de: about_de,
  it: about_it,
});

const openDialog = () => {
  isOpen.value = true;
  contentHtml.value = about.value[locale.value];
};

defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped>
.about-dialog {
  min-width: 300px;
  max-width: 600px;

  .about-content {
    max-height: 70vh;
    overflow-y: auto;

    :deep(a) {
      color: var(--q-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    :deep(img) {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
