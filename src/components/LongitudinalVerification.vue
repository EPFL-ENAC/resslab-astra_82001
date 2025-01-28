<template>
  <section v-if="!rBau && bridgeType"  class="longitudinal-verification row2">

    <section class="longitudinal-content">
      <section class="longitudinal-inputs" aria-labelledby="longitudinal-inputs">

      <h3 class="longitudinal-header">{{ $t('longitudinal_verification') }}</h3>
        <div class="row q-mt-sm dimension items-center">
          <div class="col-2">
            <q-badge color="secondary">
              {{ $t("span") }}
            </q-badge>
          </div>
          <div class="col-7">
            <q-slider
v-model="span" class="longitudinal-slider" type="number" :min="minSpan" :max="maxSpan"
              :suffix="`m`" :step="0.1" />
          </div>
          <div class="col-3">
            <q-input
v-model.number="span" class="longitudinal-slider-input" type="number" :min="minSpan" :max="maxSpan"
              :suffix="`m`" :step="0.1" dense outlined />
          </div>
        </div>

        <div class="row q-mt-sm dimension items-center">
          <div class="col-2">
            <q-badge color="secondary">
              {{ $t("width") }}
            </q-badge>
          </div>
          <div class="col-7">
            <q-slider
v-model="width" class="longitudinal-slider" type="number" :min="minWidth" :max="maxWidth"
              :step="0.1" />
          </div>
          <div class="col-3">
            <q-input
v-model.number="width" class="longitudinal-slider-input" type="number" :min="minWidth"
              :max="maxWidth" :step="0.1" :suffix="`m`" dense outlined />
          </div>
        </div>
        <div v-if="bridgeType === 'Twin'" class="q-mt-sm">
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
      <section class="longitudinal-image" aria-label="longitudinal-image">
        <h3 v-if="bridgeType === 'Slab' || bridgeType === 'Multi'"  class="longitudinal-image-header">
          {{ $t('trans')}} <!-- cf https://github.com/EPFL-ENAC/resslab-astra_82001/issues/43 -->
          <q-icon  v-if="bridgeType === 'Multi'" class="cursor-pointer" :name="mdiInformationVariantCircleOutline" >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i12_desc')"></span></q-tooltip>
          </q-icon>
        </h3>
        <q-img
v-if="bridgeType === 'Box'" src="/box-longitudinal.svg" alt="Longitudinal Verification"
          style="height: 150px;" fit="contain" /> <!-- this is the image -->
        <q-img
v-else-if="bridgeType === 'Twin' && bridgeComposition === 'Composite'" src="/twin-girder-longitudinal-composite.svg"
          alt="Twin girder composite" style="height: 150px;" fit="contain" />
        <q-img
v-else-if="bridgeType === 'Twin' && bridgeComposition === 'Concrete'" src="/twin-girder-longitudinal-concrete.svg"
          alt="twin girder concrete" style="height: 150px;" fit="contain" />
        <p v-else-if="bridgeType === 'Multi'">
          <q-img src="/multi-girder-longitudinal-1.svg" alt="Multi girder " style="height: 125px;" fit="contain" />
          <q-img src="/multi-girder-longitudinal-2.svg" alt="Multi girder " style="height: 125px;" fit="contain" />
        </p>
        <q-img
v-else-if="bridgeType === 'Slab'" src="/slab-longitudinal.svg" alt="Slab" fit="contain"
          style="height:150px" />

          <section v-if="bridgeType === 'Multi'" class="longitudinal-inputs longitudinal-radio q-mt-sm" aria-label="beams">
            <q-radio v-model="longitudinalTrans" dense val="P1" label="Beam 1" />
            <q-radio v-model="longitudinalTrans" dense val="P2" label="Beam 2" />
            <q-radio v-model="longitudinalTrans" dense val="P3" label="Beam 3" />
          </section>
          <section v-if="bridgeType === 'Slab'" class="longitudinal-inputs longitudinal-radio q-mt-sm" aria-label="point">
            <q-radio v-model="longitudinalTrans" dense val="p1" label="p1" />
            <q-radio v-model="longitudinalTrans" dense val="p2" label="p2" />
            <q-radio v-model="longitudinalTrans" dense val="p3" label="p3" />
          </section>
      </section>

    </section>
  </section>

  <section v-if="!rBau && bridgeType" class="longitudinal-verification-result longitudinal-results alpha-footer" aria-lable="">
      <!-- show three values: alphaq sub V,M-,M+ -->
      <q-icon class="cursor-pointer top-right-absolute q-pa-md" :name="mdiInformationVariantCircleOutline" >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i9_desc')"></span></q-tooltip>
          </q-icon>
      <ul class="alpha-list">
        <li class="alpha-item">
          &alpha;<sub>q,V</sub> &equals; {{ roundCeilWith2Decimals(alpha?.V?.[selectedClass]) }}


        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.V?.[selectedClass]))">
          <q-img height="24px" width="24px" fit="contain" src="/mdi-icons/content_copy.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
        </li>
        <li class="alpha-item">
          &alpha;<sub>q,M-</sub> &equals; {{ roundCeilWith2Decimals(alpha?.Mn?.[selectedClass]) }}


        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.Mn?.[selectedClass]))">
          <q-img height="24px" width="24px" fit="contain" src="/mdi-icons/content_copy.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
        </li>
        <li class="alpha-item">
          &alpha;<sub>q,M+</sub> &equals; {{ roundCeilWith2Decimals(alpha?.Mp?.[selectedClass]) }}


        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.Mp?.[selectedClass]))">
          <q-img height="24px" width="24px" fit="contain" src="/mdi-icons/content_copy.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
        </li>
      </ul>
    </section>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { BridgeType, classResult, useVerificationStore } from '../stores/verification-store';
import { roundCeilWith2Decimals } from '../utils/math';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { copyText } from '../utils/clipboard';
import { mdiInformationVariantCircleOutline } from '@mdi/js';

const { t: $t } = useI18n();
const $q = useQuasar();

const verificationStore = useVerificationStore();


const maxSpan = computed(() => verificationStore.getMaxSpan);
const minSpan = computed(() => verificationStore.getMinSpan);
const maxWidth = computed(() => verificationStore.getMaxWidth);
const minWidth = computed(() => verificationStore.getMinWidth);


const alpha = computed(() => verificationStore.getLongitudinalAlpha);
const rBau = computed(() => verificationStore.rBau);
// Create computed properties for two-way binding


const span = computed({
  get: () => verificationStore.span,
  set: (value) => verificationStore.setLongitudinalSpan(value)
});

const width = computed({
  get: () => verificationStore.width,
  set: (value) => verificationStore.setLongitudinalWidth(value)
});

const bridgeType = computed({
  get: () => verificationStore.bridgeType,
  set: (value: BridgeType) => verificationStore.setBridgeType(value)
});
const bridgeComposition = computed(() => verificationStore.bridgeComposition);
const isConcrete = computed({
  get: () => verificationStore.bridgeComposition === 'Concrete',
  set: (value) => verificationStore.setBridgeComposition(value ? 'Concrete' : 'Composite')
});
const selectedClass: ComputedRef<classResult> = computed(() => verificationStore.selectedClass === 'Class' ? 'qG' : 'qG+');

const longitudinalTrans = computed({
  get: () => verificationStore.trans,
  set: (value) => verificationStore.setLongitudinalTrans(value)
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.longitudinal-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.longitudinal-slider {
  // width: 312px;
  // padding-right: 1rem;
  width: 90%;
}

.longitudinal-verification {
  display: grid;
  grid-template-rows: auto 1fr;
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

  // grid-area: header;
}

.longitudinal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}



.longitudinal-results {
  align-self: end;
}

.longitudinal-image-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 0rem;

  display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.longitudinal-image {
  display: grid;
  grid-auto-rows: auto;

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


</style>
