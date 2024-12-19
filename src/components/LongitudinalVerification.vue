<template>
  <container class="longitudinal-verification">
    <!-- <section class="longitudinal-header" aria-labelledby="longitudinal-title">
      <h3 id="longitudinal-title" class="verification-title">
        <q-toggle
        :false-value="false"
        :label="`${verificationStore.longitudinal.isEnabled ? $t('longitudinal_verification_enabled') : $t('longitudinal_verification_disabled')}`"
        :true-value="true"
        color="blue"
        v-model="isEnabled"
      />

      </h3>
    </section> -->
    <section>
      <h3 class="longitudinal-header">{{ $t('longitudinal-verification') }}</h3>
    </section>

    <section class="longitudinal-inputs" aria-labelledby="longitudinal-title" v-if="isEnabled">
      <div class="row q-mt-md dimension items-center">
        <div class="col-2">
          <q-badge color="secondary">
            {{ $t("span") }}
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

      <div class="row q-mt-md dimension items-center">
        <div class="col-2">
          <q-badge color="secondary">
            {{ $t("width") }}
          </q-badge>
        </div>
        <div class="col-7">
          <q-slider
            v-model="width"
            type="number"
            :min="minWidth"
            :max="maxWidth"
            :step="0.1"
          />
        </div>
        <div class="col-3">
          <q-input
            v-model.number="width"
            type="number"
            :min="minWidth"
            :max="maxWidth"
            :step="0.1"
            :suffix="`m`"
            dense
            outlined
          />
        </div>
      </div>
      <div class="row " v-if="bridgeType === 'Twin'">
        <!-- select between composite and concrete -->

      </div>
    </section>
    <section class="longitudinal-image" aria-label="longitudinal-image" v-if="isEnabled">
      <img src="/box-longitudinal.svg" alt="Longitudinal Verification" />
      </section>
    <section class="longitudinal-results alpha-footer" aria-lable=""  v-if="isEnabled">
      {{ alpha }}
      <!-- show three values: alphaq sub V,M-,M+ -->
      <ul class="alpha-list">
      <li class="alpha-item">
        &alpha;<sub>V</sub> &equals; {{ alpha.alphaV }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>M-</sub> &equals; {{ alpha.alphaMn }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>M+</sub> &equals; {{ alpha.alphaMp }}
      </li>
    </ul>
    </section>
  </container>
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

const bridgeType = computed(() => verificationStore.bridgeType);
</script>

<style lang="scss" scoped>

.longitudinal-image {
  padding: 1rem;
  border: 1px solid var(--q-color-grey-3);
  /* set maximum and min width to avoid flickering of screen */
  img {
    max-width: 300px;
    min-width: 300px;
    width: stretch;
  }
}

.longitudinal-verification {
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

.longitudinal-header {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
