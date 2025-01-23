<template>
  <div class="traffic-type">
    <h3 class="traffic-title">
      {{ $t('traffic') }}<q-tooltip> {{ $t('i1_desc') }} </q-tooltip>
    </h3>
    <q-btn-toggle
      class="traffic-toggle"
      v-model="trafficToggle"
      color="primary"
      flat
      padding="sm"
      :options="[
        { value: 'Class', slot: 'one' },
        { value: 'Class+', slot: 'two' },
      ]"
    >
      <template v-slot:one>
        <div class="col items-center no-wrap">
          <q-img fit="contain" position="top left" :src="classImage" alt="class" class="track-image" />
          <div class="text-center text-subtitle2">class</div>
        </div>
      </template>

      <template v-slot:two>
        <div class="col items-center no-wrap">
          <q-img fit="contain" position="top left" :src="classPlusImage" alt="class plus" class="track-image" />
          <div class="text-center text-subtitle2">class+</div>
        </div>
      </template>
    </q-btn-toggle>
    <div class="traffic-toggle-sub">

      <q-select
        v-model="beta"
        :options="betaOptions"
        dense
        outlined
        class="q-mr-md"
      >
      <template #selected>
        {{
          beta.label
        }}
        <q-tooltip class="description beta">
          {{ $t('i7_desc') }}
        </q-tooltip>
      </template>
      </q-select>

      <q-toggle
        class="good-road-quality"
        :false-value="false"
        :true-value="true"
        :left-label="true"

        color="primary"
        v-model="goodQualityRoad"
      >
        <template #default>
          {{
            $t('good_quality_road') + ' ' + (goodQualityRoad ? $t('enabled') : $t('disabled'))
          }}
          <q-tooltip class="description good qualityRoad">
            {{ $t('i2_desc') }}
          </q-tooltip>
        </template>
      </q-toggle>
      <q-select
        v-model="phyCal"
        :options="phyCalOptions"
        :disable="true"
        dense
        outlined
        class="q-mr-md"
      />
      <q-toggle
        class="r-bau"
        :false-value="false"
        :true-value="true"
        :left-label="true"
        color="secondary"
        v-model="rBau"
      >
        <template #default>
          {{ rBau ? $t('r_bau_enabled') : $t('r_bau_disabled') }}
          <q-tooltip> {{ $t('i3_desc') }} </q-tooltip>
        </template>
      </q-toggle>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed,ref } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

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



// TODO: Move to store

// default is 4.2 we can change it to 4.7 for bridge of category 3
// cf 6.24 p 83 of 120 of the 82001f
const betaOptions = [
  { label: 'β=4.20', value: 4.2 },
  { label: 'β=4.70', value: 4.7 }, // cas le plus defavorable +2.2 à +7% pour les ponts de catégorie 3 (on utilise +7% for now)
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
  { label: 'Φ=1.00', value: 1.00},
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
  gap: 8px;
}

.traffic-toggle-sub {
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 1fr 1fr;
  display: grid;
  padding-top: 10px;
  grid-gap: 10px 0px;
}
</style>
