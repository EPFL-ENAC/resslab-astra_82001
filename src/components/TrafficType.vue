<template>
  <div class="traffic-type">
    <h3 class="traffic-title">
      {{ $t('traffic') }}
      <q-icon class="cursor-pointer" :name="mdiInformationVariantCircleOutline">
        <q-tooltip class="text-body1" html>
          <span v-html="$t('i1_desc')"></span
        ></q-tooltip>
      </q-icon>
    </h3>
    <q-btn-toggle
      v-model="trafficToggle"
      class="traffic-toggle"
      color="primary"
      flat
      padding="sm"
      :options="[
        { value: 'Class', slot: 'one' },
        { value: 'Class+', slot: 'two' },
      ]"
    >
      <template #one>
        <div class="col items-center no-wrap">
          <q-img
            fit="contain"
            position="top left"
            :src="classImage"
            alt="class"
            class="track-image"
          />
          <div class="text-center text-subtitle2">class</div>
        </div>
      </template>

      <template #two>
        <div class="col items-center no-wrap">
          <q-img
            fit="contain"
            position="top left"
            :src="classPlusImage"
            alt="class plus"
            class="track-image"
          />
          <div class="text-center text-subtitle2">class+</div>
        </div>
      </template>
    </q-btn-toggle>
    <div class="traffic-toggle-sub">
      <q-toggle
        v-model="beta"
        class="good-road-quality"
        :left-label="false"
        color="primary"
        :true-value="4.7"
        :false-value="4.2"
      >
        <template #default>
          {{
            (beta === 4.7 ? $t('type_3') + ' ' : $t('type_2') + ' ') +
            `(β=${beta.toFixed(2)})`
          }}
          <q-icon
            class="cursor-pointer"
            :name="mdiInformationVariantCircleOutline"
          >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i7_desc')"></span
            ></q-tooltip>
          </q-icon>
        </template>
      </q-toggle>
      <!-- <q-select
        v-model="beta"
        :options="betaOptions"
        dense
        outlined
        class="q-mr-md"
      >
      <template #selected>
        β={{
          beta.toFixed(2)
        }}
        <q-icon class="cursor-pointer" :name="mdiInformationVariantCircleOutline" >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i7_desc')"></span></q-tooltip>
          </q-icon>
      </template>
      </q-select> -->

      <q-toggle
        v-model="goodQualityRoad"
        class="good-road-quality"
        :false-value="false"
        :true-value="true"
        :left-label="false"
        color="primary"
      >
        <template #default>
          {{
            goodQualityRoad ? $t('good_quality_road') : $t('bad_quality_road')
          }}
          <q-icon
            class="cursor-pointer"
            :name="mdiInformationVariantCircleOutline"
          >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i2_desc')"></span
            ></q-tooltip>
          </q-icon>
        </template>
      </q-toggle>
      <q-select
        v-model="phi"
        :options="[phi]"
        :disable="true"
        dense
        outlined
        class="q-mr-md"
      >
        <template #selected>
          Φ={{ phi.toFixed(2) }}
          <q-tooltip class="description phi">
            {{ $t('phi_desc') }}
          </q-tooltip>
        </template>
      </q-select>
      <!-- `Φ${phyCalDynamicValue.toFixed(2)}` -->
      <q-toggle
        v-model="rBau"
        class="r-bau"
        :false-value="false"
        :true-value="true"
        :left-label="false"
        color="secondary"
      >
        <template #default>
          {{ $t('r_bau') }}
          <q-icon
            class="cursor-pointer"
            :name="mdiInformationVariantCircleOutline"
          >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i3_desc')"></span
            ></q-tooltip>
          </q-icon>
        </template>
      </q-toggle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';
import { mdiInformationVariantCircleOutline } from '@mdi/js';

import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

// Remove /public from the path as it's automatically handled by Vite
const classImage = '/class.svg';
const classPlusImage = '/class-plus.svg';

const verificationStore = useVerificationStore();

const trafficToggle = computed({
  get: () => verificationStore.selectedClass,
  set: (value) => verificationStore.setSelectedClass(value),
});
const goodQualityRoad = computed({
  get: () => verificationStore.goodQualityRoad,
  set: (value) => verificationStore.setGoodQualityRoad(value),
});
const rBau = computed({
  get: () => verificationStore.rBau,
  set: (value) => verificationStore.setRBAU(value),
});

const beta = computed({
  get: () => verificationStore.beta,
  set: (value) => verificationStore.setBeta(value),
});

const phi = computed({
  get: () => verificationStore.getPhi,
  set: (value) => verificationStore.setPhi(value),
});

// default is 4.2 we can change it to 4.7 for bridge of category 3
// cf 6.24 p 83 of 120 of the 82001f
// const betaOptions = [4.2, 4.7];
// { label: 'β=4.20', value: 4.2 },
// { label: 'β=4.70', value: 4.7 }, // cas le plus defavorable +2.2 à +7% pour les ponts de catégorie 3 (on utilise +7% for now)
// III.1.2 Résultats pour deux voies de circulation, pour une bande de 1.4 m –
// (Q1 + Q2)act cf p99/120
// ];
// const beta = ref(betaOptions[0]);
</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.traffic-title {
  font-size: 1.5rem;
  font-weight: bold;
  // line-height: 2rem;
  line-height: 3.125rem;
  padding: 0;
  margin: 0rem;
}
.traffic-toggle {
  display: inline-grid;
  grid-auto-flow: column;
  :deep(button) {
    text-transform: none;
  }
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  background-color: white;
  border-radius: $button-border-radius;
  border: 1px solid $black;
  @media screen and (max-width: 600px) {
    grid-auto-flow: row;
  }
}

:deep(.q-btn[aria-pressed='true']) {
  background-color: rgba($primary, 0.1);
  color: $secondary;
  .bridge-text {
    font-size: 1rem;
    font-weight: bold;
  }
}
:deep(.q-btn[aria-pressed='false']) {
  .bridge-text {
    color: #000;
    font-size: 1rem;
    font-weight: normal;
  }
}

.traffic-type {
  grid-area: a;
  display: flex;
  flex-direction: column;

  // border: 1px solid var(--q-color-primary);
  // padding: 1rem;
  // border-radius: 0.5rem;
}

.toggle-image {
  width: 40px;
  height: px;
}

.toggle-track {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px; /* Add some spacing between text and icon */
}

.track-image {
  width: 100px;
  height: 40px;
  /* Remove fill as it's not needed for img tags */
  padding: 4px; /* Add some padding inside the button */
}

/* Add some spacing between text and icon in the button */
.row.items-center.no-wrap {
  gap: 4px;
}

.traffic-toggle-sub {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  display: grid;
  padding-top: 10px;
  grid-gap: 10px 0px;
}
</style>
