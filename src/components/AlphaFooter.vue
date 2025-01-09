<template>
  <div class="alpha-footer">
    <ul class="alpha-list">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();
// const props = defineProps<{
//   alphaQ1: number;
//   alphaQ2Global: number;
//   alphaQ2Local: number;
// }>();

const alpha = computed(() => verificationStore.getLongitudinalAlpha);


</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

</style>
