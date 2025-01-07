<template>
  <div class="alpha-footer">
    <ul class="alpha-list">
      <li class="alpha-item">
        &alpha;<sub>Q1</sub> &equals; {{ alphaQ1 }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2</sub> &equals; {{ alphaQ2Global }}
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2</sub> &equals; {{ alphaQ2Local }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  alphaQ1: number;
  alphaQ2Global: number;
  alphaQ2Local: number;
}>();

</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.alpha-footer {
  grid-area: f;
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
