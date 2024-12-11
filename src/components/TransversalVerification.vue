<template>
<container class="transversal-verification">
    <!-- <section class="transversal-header" aria-labelledby="transversal-title">
      <h3 id="transversal-title" class="verification-title">
        <q-toggle
        :false-value="false"
        :label="`${verificationStore.transversal.isEnabled ? $t('transversal_verification_enabled') : $t('transversal_verification_disabled')}`"
        :true-value="true"
        color="blue"
        v-model="isEnabled"
      />

      </h3>
    </section> -->
    <section>
      <h3 class="transversal-header">{{ $t('transversal-verification') }}</h3>
    </section>

    <section class="transversal-inputs" aria-labelledby="transversal-title" v-if="isEnabled">

      <div clsss="row q-mt-md">
        <q-btn-toggle
        v-model="isCantileverEnabled"
        spread
        class="isCantileverEnabled-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: $t('cantilever'), value: true},
          {label: $t('slab-between-beams'), value: false}
        ]"
      />
      </div>
      <div class="row q-mt-md transversal-image">
        <img src="/slab-cantilever.svg" alt="cantilever" v-if="isCantileverEnabled" />
        <img src="/slab-between-beams.svg" alt="slab between beams" v-else />
      </div>

      <div class="row q-mt-md dimension items-center">
        <div class="col-2">
          <q-badge color="secondary">
            {{ $t("L") }}
          </q-badge>
        </div>
        <div class="col-7">
          <q-slider
            v-model="span"
            type="number"
            :min="minSpan"
            :max="maxSpan"

            :suffix="`m`"
            :step="0.1"
          />
        </div>
        <div class="col-3">
          <q-input
            v-model.number="span"
            type="number"
            :min="minSpan"
            :max="maxSpan"
            :suffix="`m`"
            :step="0.1"
            dense
            outlined
          />
        </div>
      </div>
      <div class="row q-mt-md support items-center">
        <q-option-group
              v-model="supportType"
              class="support-type"
              :options="[
                  {label: $t('Simp'), value: 'Simp'},
                  {label: $t('Fixed'), value: 'Fixed'},
                  {label: $t('Semi'), value: 'Semi'}
                ]"
              color="primary"
              inline
            >
          <template #label-0>
            <div class="label-container">

              <span>{{ $t('Simp') }}</span>
              <img class="transversal-support-image" :src="`/${transversalTypeName}-1.png`" alt="support type" />
            </div>
          </template>
          <template #label-1>
            <div class="label-container">

              <span>{{ $t('Fixed') }}</span>
              <img class="transversal-support-image" :src="`/${transversalTypeName}-2.png`" alt="support type" />
            </div>
          </template>
          <template #label-2>
            <div class="label-container">

              <span>{{ $t('Semi') }}</span>
              <img class="transversal-support-image" :src="`/${transversalTypeName}-3.png`" alt="support type" />
            </div>
          </template>
          </q-option-group>

      </div>
    </section>
    <section class="transversal-results alpha-footer" aria-lable=""  v-if="isEnabled">

      <!-- show three values: alphaq sub V,M-,M+ -->
      <ul class="alpha-list">
      <li class="alpha-item">
        &alpha;<sub>V</sub> &equals; {{ alphaQV }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>M-</sub> &equals; {{ alphaQMneg }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>M+</sub> &equals; {{ alphaQMpos }}
      </li>
    </ul>
    </section>
  </container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();

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

</script>

<style lang="scss" scoped>
.transversal-verification {
  grid-area: e;
}

:deep(.support-type > div > .q-radio) {
  display: flex;
  flex-direction: column;
  align-items: center;
  .q-radio__label {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: auto;
    .label-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      img {
        height: 60px;
      }
    }
  }
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
    max-width: 300px;
    min-width: 300px;
    width: fill;
  }
}

.transversal-verification {
  padding: 1rem;
  border: 1px solid var(--q-color-grey-3);
  /* set maximum and min width to avoid flickering of screen */
  /* max-width: 400px;
  min-width: 400px; */
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

.row {
  display: flex;
  flex-direction: row;
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
  grid-area: f;
  padding: 1rem;
  border: 1px solid #FFB6C1;
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

.transversal-header {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
