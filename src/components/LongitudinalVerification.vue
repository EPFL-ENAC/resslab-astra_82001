<template>
  <section class="longitudinal-verification">

    <h3 class="longitudinal-header">{{ $t('longitudinal_verification') }}</h3>
    <section class="longitudinal-content">
      <section class="longitudinal-inputs" aria-labelledby="longitudinal-title" v-if="isEnabled">
        <div class="row q-mt-md dimension items-center">
          <div class="col-2">
            <q-badge color="secondary">
              {{ $t("span") }}
            </q-badge>
          </div>
          <div class="col-7">
            <q-slider class="longitudinal-slider" v-model="span" type="number" :min="minSpan" :max="maxSpan"
              :suffix="`m`" :step="0.1" />
          </div>
          <div class="col-3">
            <q-input class="longitudinal-slider-input" v-model.number="span" type="number" :min="minSpan" :max="maxSpan"
              :suffix="`m`" :step="0.1" dense outlined />
          </div>
        </div>

        <div class="row q-mt-md dimension items-center">
          <div class="col-2">
            <q-badge color="secondary">
              {{ $t("width") }}
            </q-badge>
          </div>
          <div class="col-7">
            <q-slider class="longitudinal-slider" v-model="width" type="number" :min="minWidth" :max="maxWidth"
              :step="0.1" />
          </div>
          <div class="col-3">
            <q-input class="longitudinal-slider-input" v-model.number="width" type="number" :min="minWidth"
              :max="maxWidth" :step="0.1" :suffix="`m`" dense outlined />
          </div>
        </div>
        <div class="q-mt-md" v-if="bridgeType === 'Twin'">
          <!-- select between composite and concrete -->
          <q-btn-toggle
            v-model="isConcrete"
            spread
            no-caps
            rounded
            toggle-color="primary"
            color="white"
            text-color="black"
            :options="[
              {label: $t('concrete'), value: true},
              {label: $t('composite'), value: false}
            ]"
          />
        </div>
      </section>
      <section class="longitudinal-image" aria-label="longitudinal-image" v-if="isEnabled">
        <q-img src="/box-longitudinal.svg" alt="Longitudinal Verification" v-if="bridgeType === 'Box'"
          style="height: 150px;" fit="contain" /> <!-- this is the image -->
        <q-img src="/twin-girder-longitudinal-composite.svg" alt="Twin girder composite"
          v-else-if="bridgeType === 'Twin' && bridgeComposition === 'Composite'" style="height: 150px;" fit="contain" />
        <q-img src="/twin-girder-longitudinal-concrete.svg" alt="twin girder concrete"
          v-else-if="bridgeType === 'Twin' && bridgeComposition === 'Concrete'" style="height: 150px;" fit="contain" />
        <p v-else-if="bridgeType === 'Multi'">
          <q-img src="/multi-girder-longitudinal-1.svg" alt="Multi girder " style="height: 150px;" fit="contain" />
          <q-img src="/multi-girder-longitudinal-2.svg" alt="Multi girder " style="height: 150px;" fit="contain" />
        </p>
        <q-img v-else-if="bridgeType === 'Slab'" src="/slab-longitudinal.svg" alt="Slab" fit="contain"
          style="height:150px" />

      </section>

    </section>
    <section class="longitudinal-results alpha-footer" aria-lable="" v-if="isEnabled">
      <!-- show three values: alphaq sub V,M-,M+ -->
      <ul class="alpha-list">
        <li class="alpha-item">
          &alpha;<sub>V</sub> &equals; {{ alpha.V?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
        <li class="alpha-item">
          &alpha;<sub>M-</sub> &equals; {{ alpha.Mn?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
        <li class="alpha-item">
          &alpha;<sub>M+</sub> &equals; {{ alpha.Mp?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();

const maxSpan = 80;
const minSpan = 4;

const maxWidth = 18;
const minWidth = 9;

const alpha = computed(() => verificationStore.getLongitudinalAlpha);
// Create computed properties for two-way binding
const isEnabled = computed({
  get: () => verificationStore.longitudinal.isEnabled,
  set: (value) => verificationStore.setLongitudinalEnabled(value)
});

const span = computed({
  get: () => verificationStore.longitudinal.span,
  set: (value) => verificationStore.setLongitudinalSpan(value)
});

const width = computed({
  get: () => verificationStore.longitudinal.width,
  set: (value) => verificationStore.setLongitudinalWidth(value)
});

const bridgeType = computed({
  get: () => verificationStore.bridgeType,
  set: (value) => verificationStore.setBridgeType(value)
});
const bridgeComposition = computed(() => verificationStore.bridgeComposition);
const isConcrete = computed({
  get: () => verificationStore.bridgeComposition === 'Concrete',
  set: (value) => verificationStore.setBridgeComposition(value ? 'Concrete' : 'Composite')
});
const selectedClass = computed(() => verificationStore.selectedClass === 'Class' ? 'qG' : 'qG+');
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.longitudinal-slider {
  width: 100%;
  padding-right: 1rem;
}

.longitudinal-verification {
  // padding: 1rem;
  // border: 1px solid var(--q-color-grey-3);
  /* set maximum and min width to avoid flickering of screen */
  /* max-width: 400px;
  min-width: 400px; */

  //.parent
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "content"
    "footer"
  ;
  min-height: 100%; // This is important
  height: 100%; // This ensures full height
  gap: 1rem;
}


.longitudinal-header {
  // child-1
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 0rem;

  // grid-row: 1;
  grid-area: header;
}

.longitudinal-content {
  // child-2
  grid-area: content;
}


.longitudinal-inputs {
  // grid-row: 2;
}


.longitudinal-image {
  // grid-row: 3;
}

.longitudinal-results {
  // grid-row: 4;
  grid-area: footer;
  align-self: end;
  /* Align child-4 to the bottom */
}



.longitudinal-image {
  grid-row: 3;
  padding: 1rem;
  border: 1px solid var(--q-color-grey-3);

  /* set maximum and min width to avoid flickering of screen */
  img {
    max-width: 300px;
    min-width: 300px;
    width: stretch;
  }
}


.verification-title {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.dimension {
  display: flex;
  flex-direction: row;
  flex: auto;
  width: 100%;
}

.col-2 {
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
}

.col-8 {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
}

.items-center {
  align-items: center;
}


.alpha-footer {
  padding: 1rem;
  border: 1px solid $primary;
  border-radius: 8px;
  background: #fff;
}

.alpha-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
}

.alpha-item {
  line-height: 1.4;
}
</style>
