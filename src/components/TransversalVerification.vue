<template>
  <main class="transversal-verification-container row3" v-if="!rBau && bridgeType">
    <section class="transversal-verification transversal-inputs" aria-labelledby="transversal-title" v-if="isEnabled">
      <h3 class="transversal-header">{{ $t('transversal_verification') }}</h3>

      <div clsss="row q-mt-sm" v-if="bridgeType != 'Slab'">
        <q-btn-toggle v-model="isCantileverEnabled" spread class="isCantileverEnabled-toggle" no-caps rounded
          toggle-color="primary" color="white" text-color="black" :options="[
            { label: $t('cantilever'), value: true },
            { label: $t('slab-between-beams'), value: false }
          ]" />
      </div>
      <div class="row q-mt-sm transversal-image" v-if="bridgeType != 'Slab'">
        <q-img v-if="isCantileverEnabled" src="/slab-cantilever.svg" style="height: 150px;" alt="cantilever"
          fit="contain"></q-img>
        <q-img v-else src="/slab-between-beams.svg" style="height: 150px;" alt="cantilever" fit="contain"></q-img>
      </div>
      <div v-else>
        <q-img src="/slab-transversal.svg" style="height: 250px;" alt="slab" fit="contain"></q-img>
      </div>

      <div class="row q-mt-sm dimension items-center" v-if="bridgeType != 'Slab'">
        <div class="col-2">
          <q-badge color="secondary">
            {{ $t("L") }}
          </q-badge>
        </div>
        <div class="col-7">
          <q-slider class="transversal-slider" v-model="span" type="number" :min="minSpan" :max="maxSpan" :suffix="`m`"
            :step="0.01" />
        </div>
        <div class="col-3">
          <q-input v-model.number="span" type="number" :min="minSpan" :max="maxSpan" :suffix="`m`" :step="0.1" dense
            outlined />
        </div>
      </div>
    </section>
    <section class="transversal-support">
        <h3 class="transversal-header">{{ $t('support') }}</h3>
        <q-btn-toggle class="support-toggle" v-model="supportType" color="primary" flat padding="md" :options="supportOptions">
          <template v-slot:one>
            <div class="col items-center no-wrap">
              <q-img  fit="contain" class="transversal-support-image" :src="`/${transversalTypeName}-1.svg`" alt="support type" />
            </div>
          </template>

          <template v-slot:two>
            <div class="col items-center no-wrap">
              <q-img  fit="contain" class="transversal-support-image" :src="`/${transversalTypeName}-2.svg`" alt="support type" />

            </div>
          </template>
          <template v-slot:three>
            <div class="col items-center no-wrap">
              <q-img  fit="contain" class="transversal-support-image" :src="`/${transversalTypeName}-3.svg`" alt="support type" />

            </div>
          </template>
        </q-btn-toggle>
    </section>
  </main>

  <section class="transversal-verification-result transversal-results alpha-footer" aria-lable="" v-if="isEnabled">
      <!-- {{ alphaTrans }} -->
      <!-- show three values: alphaq sub V,M-,M+ -->
      <ul class="alpha-list" v-if="bridgeType != 'Slab'">
        <li class="alpha-item">
          &alpha;<sub>q,V</sub> &equals; {{  roundCeilWith2Decimals(alphaTrans?.V?.[0]?.[selectedClass]) }}
        </li>
        <li class="alpha-item" v-if="!isCantileverEnabled">
          &alpha;<sub>q,M-</sub> &equals; {{  roundCeilWith2Decimals(alphaTrans?.Mn?.[0]?.[selectedClass]) }}
        </li>
        <li class="alpha-item" v-else>
          &alpha;<sub>q,M</sub> &equals; {{  roundCeilWith2Decimals(alphaTrans?.M?.[0]?.[selectedClass]) }}
        </li>
        <li class="alpha-item" v-if="!isCantileverEnabled">
          &alpha;<sub>q,M+</sub> &equals; {{ roundCeilWith2Decimals(alphaTrans?.Mp?.[0]?.[selectedClass]) }}
        </li>
      </ul>
      <ul class="alpha-list" v-else>
        <!-- / -->
        <li class="alpha-item">
          &alpha;<sub>q,Mx,Mid</sub> &equals; {{ roundCeilWith2Decimals(alphaLong?.MxMid?.[0]?.[selectedClass])  }}
        </li>
        <li class="alpha-item">
          &alpha;<sub>q,Mx,Medge</sub> &equals; {{ roundCeilWith2Decimals(alphaLong?.MxEdg?.[0]?.[selectedClass])  }}
        </li>
      </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();


const roundCeilWith2Decimals = (value: number) => Math.ceil(value * 100) / 100;


const verificationStore = useVerificationStore();

const alphaTrans = computed(() => verificationStore.getTransversalAlpha);
const alphaLong = computed(() => verificationStore.getLongitudinalAlpha);
const rBau = computed(() => verificationStore.rBau);
const bridgeType = computed(() => verificationStore.bridgeType);
const selectedClass = computed(() => verificationStore.selectedClass === 'Class' ? 'qG' : 'qG+');


const transversalTypeName = computed({
  get: () => verificationStore.transversal.isCantileverEnabled ? 'cantilever' : 'slab-between-beams',
  set: () => null,
});


const supportOptions = computed(() => {
  const options = [
          { slot: 'one', label: $t('PENC'), value: 'Simp' },
          { slot: 'two', label: $t('SENC'), value: 'Fixed' },
        ];

  if (bridgeType.value !== 'Slab') {

// options.push(
//   { slot: 'three', label: $t('Semi'), value: 'Semi' })
//   }
    if (transversalTypeName.value === 'cantilever') {
      // AR-0 is Simp, AR-2 is Fixed and BR-1 is Semi
      return [
        { slot: 'one', label: $t('AR-0'), value: 'Simp' },
        { slot: 'two', label: $t('AR-2'), value: 'Fixed' },
        { slot: 'three', label: $t('BR-1'), value: 'Semi' }
      ];
    } else {
      // PENC is Simp, SENC is Fixed and SMPL is Semi
      return [
        { slot: 'one', label: $t('PENC'), value: 'Simp' },
        { slot: 'two', label: $t('SENC'), value: 'Fixed' },
        { slot: 'three', label: $t('SMPL'), value: 'Semi' }
      ];
    }
  }
  return options;
});


const isEnabled = computed({
  get: () => verificationStore.transversal.isEnabled,
  set: (value) => verificationStore.setTransversalEnabled(value)
});


const isCantileverEnabled = computed({
  get: () => verificationStore.transversal.isCantileverEnabled,
  set: (value) => verificationStore.setTransversalCantileverEnabled(value)
});

const supportType = computed({
  get: () => verificationStore.transversal.supportType,
  set: (value) => verificationStore.setTransversalSupportType(value)
});

const maxSpan = 9;
const minSpan = 2;

const span = computed({
  get: () => verificationStore.transversal.span,
  set: (value) => verificationStore.setTransversalSpan(value)
})

const transversalTrans = computed({
  get: () => verificationStore.transversal.trans,
  set: (value) => verificationStore.setTransversalTrans(value)
});

</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.transversal-slider {
  width: 90%;
}



.transversal-support-image {
  max-width: 100px;
  min-width: 100px;

  // padding: 1rem;
  border: 1px solid var(--q-color-grey-3);
}

.transversal-image {
  // padding: 1rem;
  border: 1px solid var(--q-color-grey-3);

  /* set maximum and min width to avoid flickering of screen */
  img {
    // max-width: 300px;
    min-width: 300px;
    height: 100px;
    width: stretch;
  }
}

.transversal-verification-container {
  grid-area: e;
  display: grid;
  // grid-template-rows: auto 1fr auto;
  grid-template-areas: "transversal support";
  grid-template-columns: 1fr 1fr;
  min-height: 100%; // This is important
  height: 100%; // This ensures full height
  gap: 1rem;
}
.transversal-header {
  // grid-area: header;
}
.transversal-inputs {
  // grid-area: content;
}

.transversal-verification {
  grid-area: transversal;
}
.transversal-support {
  grid-area: support;
}

.transversal-results {
  // grid-area: footer;
  align-self: end;
}


.transversal-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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

.transversal-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 0rem;
}


.support-toggle {
  display: inline-grid;
  grid-auto-flow: column;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  background-color: white;
  border-radius: $button-border-radius;
  margin-bottom: 1rem;
  :deep(.q-btn > .q-btn__content) {
    display: flex;
    flex-direction: column-reverse;


  }
    :deep(.q-btn[aria-pressed="true"]) {
    background-color: rgba($primary, 0.1);
    color: $secondary;

    .block {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  :deep(.q-btn[aria-pressed="false"]) {
    .block {
      color: #000;
      font-size: 1rem;
      font-weight: normal;
    }
  }
}





</style>
