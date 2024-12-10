<template>
<container class="transversal-verification">
    <section class="transversal-header" aria-labelledby="transversal-title">
      <h3 id="transversal-title" class="verification-title">
        <q-toggle
        :false-value="false"
        :label="`${verificationStore.transversal.isEnabled ? $t('transversal_verification_enabled') : $t('transversal_verification_disabled')}`"
        :true-value="true"
        color="blue"
        v-model="isEnabled"
      />

      </h3>
    </section>

    <section class="transversal-inputs" aria-labelledby="transversal-title" v-if="isEnabled">

    </section>
    <section class="transversal-image" aria-label="transversal-image" v-if="isEnabled">
      <img src="/public/box-transversal.svg" alt="transversal Verification" />
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

const isEnabled = computed({
  get: () => verificationStore.transversal.isEnabled,
  set: (value) => verificationStore.setTransversalEnabled(value)
});

</script>

<style scoped>
.transversal-verification {
  grid-area: e;
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


</style>
