<template>
  <main class="transversal-verification" v-if="!rBau && bridgeType">
    <h3 class="transversal-header">{{ $t('transversal_verification') }}</h3>
    <section class="transversal-inputs" aria-labelledby="transversal-title" v-if="isEnabled">

      <div clsss="row q-mt-md" v-if="bridgeType != 'Slab'">
        <q-btn-toggle v-model="isCantileverEnabled" spread class="isCantileverEnabled-toggle" no-caps rounded
          toggle-color="primary" color="white" text-color="black" :options="[
            { label: $t('cantilever'), value: true },
            { label: $t('slab-between-beams'), value: false }
          ]" />
      </div>
      <div class="row q-mt-md transversal-image" v-if="bridgeType != 'Slab'">
        <q-img v-if="isCantileverEnabled" src="/slab-cantilever.svg" style="height: 150px;" alt="cantilever"
          fit="contain"></q-img>
        <q-img v-else src="/slab-between-beams.svg" style="height: 150px;" alt="cantilever" fit="contain"></q-img>
      </div>
      <div v-else>
        <q-img src="/slab-transversal.svg" style="height: 300px;" alt="slab" fit="contain"></q-img>
      </div>

      <div class="row q-mt-md dimension items-center" v-if="bridgeType != 'Slab'">
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
      <div class="col q-mt-md support items-center">
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
      </div>

      <!-- DEPRECATED because AR0 is Simp, AR2 is Fixed and BR1 is Semi -->
      <!-- <div class="transversal-points" v-if="bridgeType != 'Slab'">

        <div class="row transversal-inputs transversal-radio" aria-label="point" v-if="isCantileverEnabled">
          <q-radio dense v-model="transversalTrans" val="AR0" label="AR0" />
          <q-radio dense v-model="transversalTrans" val="AR2" label="AR2" />
          <q-radio dense v-model="transversalTrans" val="BR1" label="BR1" />
        </div>
        <div class="row transversal-inputs transversal-radio" aria-label="point" v-if="!isCantileverEnabled">
          <q-radio dense v-model="transversalTrans" val="PENC" label="PENC" />
          <q-radio dense v-model="transversalTrans" val="SENC" label="SENC" />
          <q-radio dense v-model="transversalTrans" val="SMPL" label="SMPL" />
        </div>
      </div> -->
    </section>
    <section class="transversal-results alpha-footer" aria-lable="" v-if="isEnabled">
      <!-- {{ alphaTrans }} -->
      <!-- show three values: alphaq sub V,M-,M+ -->
      <ul class="alpha-list" v-if="bridgeType != 'Slab'">
        <li class="alpha-item">
          &alpha;<sub>q,V</sub> &equals; {{  alphaTrans?.V?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
        <li class="alpha-item">
          &alpha;<sub>q,M-</sub> &equals; {{  alphaTrans?.Mn?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
        <li class="alpha-item" v-if="!isCantileverEnabled">
          &alpha;<sub>q,M+</sub> &equals; {{ alphaTrans?.Mp?.[0]?.[selectedClass]?.toFixed(2) }}
        </li>
      </ul>
      <ul class="alpha-list" v-else>
        <!-- / -->
        <li class="alpha-item">
          &alpha;<sub>q,Mx,Mid</sub> &equals; {{ alphaLong?.MxMid?.[0]?.[selectedClass]?.toFixed(2)  }}
        </li>
        <li class="alpha-item">
          &alpha;<sub>q,Mx,Medge</sub> &equals; {{ alphaLong?.MxEdg?.[0]?.[selectedClass]?.toFixed(2)  }}
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const verificationStore = useVerificationStore();

const alphaTrans = computed(() => verificationStore.getTransversalAlpha);
const alphaLong = computed(() => verificationStore.getLongitudinalAlpha);
const rBau = computed(() => verificationStore.rBau);
const bridgeType = computed(() => verificationStore.bridgeType);
const selectedClass = computed(() => verificationStore.selectedClass === 'Class' ? 'qG' : 'qG+');

const supportOptions = computed(() => {
  const options = [
          { slot: 'one', label: $t('Simp'), value: 'Simp' },
          { slot: 'two', label: $t('Fixed'), value: 'Fixed' },
        ];

  if (bridgeType.value !== 'Slab') {
options.push(
  { slot: 'three', label: $t('Semi'), value: 'Semi' })
  }
    return options;
});

const transversalTypeName = computed({
  get: () => verificationStore.transversal.isCantileverEnabled ? 'cantilever' : 'slab-between-beams',
  set: () => null,
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
  width: 312px;
  padding-right: 1rem;
}

.transversal-verification {
  grid-area: e;
}


.transversal-support-image {
  max-width: 100px;
  min-width: 100px;

  padding: 1rem;
  border: 1px solid var(--q-color-grey-3);
}

.transversal-image {
  padding: 1rem;
  border: 1px solid var(--q-color-grey-3);

  /* set maximum and min width to avoid flickering of screen */
  img {
    // max-width: 300px;
    min-width: 300px;
    height: 100px;
    width: stretch;
  }
}

.transversal-verification {
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
.transversal-header {
  grid-area: header;
}
.transversal-inputs {
  grid-area: content;
}
.transversal-results {
  grid-area: footer;
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
