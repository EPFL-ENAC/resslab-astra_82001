<template>
  <div class="traffic-type">
    <h3 class="traffic-title">{{ $t('traffic')}}<q-tooltip> description </q-tooltip></h3>
    <q-btn-toggle
        class="traffic-toggle"
        v-model="trafficToggle"
        color="primary"
        flat
        padding="md"
        :options="[
          {value: 'class', slot: 'one'},
          {value: 'class-plus', slot: 'two'},
        ]"
      >
        <template v-slot:one>
          <div class="col items-center no-wrap">
            <img :src="classImage" alt="class" class="track-image" />
            <div class="text-center">
             class
            </div>
          </div>
        </template>

        <template v-slot:two>
          <div class="col items-center no-wrap">
            <img :src="classPlusImage" alt="class plus" class="track-image" />
            <div class="text-center">
              class+
            </div>
          </div>
        </template>

      </q-btn-toggle>
    <q-toggle
      class="good-road-quality"
      :false-value="false"
      :label="`${goodQualityRoad ? $t('good_quality_road') : $t('bad_quality_road')}`"
      :true-value="true"
      color="red"
      v-model="goodQualityRoad"
    />
    <q-tooltip> description goodQualityRoad </q-tooltip>
    <q-toggle
      class="r-bau"
      :false-value="false"
      :label="`${rBau ? $t('r_bau_enabled') : $t('r_bau_disabled')}`"
      :true-value="true"
      color="blue"
      v-model="rBau"
    />
    <q-tooltip> description rBau </q-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const goodQualityRoad = ref(false);
const rBau = ref(false);

// Remove /public from the path as it's automatically handled by Vite
const classImage = '/class.svg';
const classPlusImage = '/class-plus.svg';
const trafficToggle = ref('class'); // Change initial value to match option value
</script>

<style scoped lang="scss">
.traffic-title {
  font-size: 1.5rem;
  font-weight: bold;
    line-height: 2rem;
    padding: 0;
    margin: 0rem 0rem 1rem 0rem;
}
.traffic-toggle {
    display: inline-grid;
    grid-auto-flow: column;
    /* width: -webkit-fill-available; */
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    :deep(.q-btn) {
      border-right: 1px solid $red-2;
    }
    :deep(.q-btn:last-of-type) {
      border-right: 0px;
    }
    background-color: white;
    border-radius: $button-border-radius;
    border: 1px solid $red-2;
}

:deep(.q-btn[aria-pressed="true"]) {
    background-color: $red-2;
    // border-radius: 6px;

    .bridge-text {
      // color: $secondary;
      font-size: 1rem;
      font-weight: bold;
    }
}
:deep(.q-btn[aria-pressed="false"]) {
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
}

.toggle-image {
  width: 40px;
  height: 40px;
}

.toggle-track {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px; /* Add some spacing between text and icon */
}

.track-image {
  width: 100px;
  height: var(--header-image-height);
  /* Remove fill as it's not needed for img tags */
  padding: 4px; /* Add some padding inside the button */
}

/* Add some spacing between text and icon in the button */
.row.items-center.no-wrap {
  gap: 8px;
}
</style>
