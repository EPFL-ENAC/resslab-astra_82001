<template>
  <div class="traffic-type">
    <title>Traffic type <q-info> What's traffic type you say ?</q-info></title>
    <q-btn-toggle
        class="traffic-toggle"
        v-model="trafficToggle"
        push
        rounded
        glossy
        :options="[
          {value: 'class', slot: 'one'},
          {value: 'class-plus', slot: 'two'},
        ]"
      >
        <template v-slot:one>
          <div class="row items-center no-wrap">
            <div class="text-center">
             class
            </div>
            <img :src="classImage" alt="class" class="track-image" />
          </div>
        </template>

        <template v-slot:two>
          <div class="row items-center no-wrap">
            <div class="text-center">
              class+
            </div>
            <img :src="classPlusImage" alt="class plus" class="track-image" />
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
    <q-toggle
      class="r-bau"
      :false-value="false"
      :label="`${rBau ? $t('r_bau_enabled') : $t('r_bau_disabled')}`"
      :true-value="true"
      color="blue"
      v-model="rBau"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const goodQualityRoad = ref(false);
const rBau = ref(false);

// Remove /public from the path as it's automatically handled by Vite
const classImage = '/public/class.svg';
const classPlusImage = '/public/class-plus.svg';
const trafficToggle = ref('class'); // Change initial value to match option value
</script>

<style scoped>
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
  width: 40px;
  height: 40px;
  /* Remove fill as it's not needed for img tags */
  padding: 4px; /* Add some padding inside the button */
}

/* Add some spacing between text and icon in the button */
.row.items-center.no-wrap {
  gap: 8px;
}
</style>
