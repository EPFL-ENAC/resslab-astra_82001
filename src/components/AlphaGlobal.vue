<template>
  <div class="alpha-footer alpha-global"  v-if="rBau || bridgeType">
    <ul class="alpha-list" v-if="!rBau && bridgeType">
      <li class="alpha-item">
        &alpha;<sub>Q1, global</sub> &equals; {{ alpha.V?.[0]?.Q1G }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q1, local</sub> &equals; {{ alpha.V?.[0]?.Q1L }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2, global</sub> &equals; {{ alpha.V?.[0]?.Q2G }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2, local</sub> &equals; {{ alpha.V?.[0]?.Q2L }}
      </li>
    </ul>
    <ul class="alpha-list" v-if="rBau">
      <li class="alpha-item">
        &alpha;<sub>act,unique </sub> &equals; 0.60
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();
const rBau = computed(
  () => verificationStore.rBau
);
const bridgeType = computed(
  () => verificationStore.bridgeType
);
const alpha = computed(() => verificationStore.getLongitudinalAlpha);


</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.alpha-global {
  grid-area: f;
  // grid-area: row1;
  display: flex;
}
</style>
