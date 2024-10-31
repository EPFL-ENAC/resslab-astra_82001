<template>
  <div class="alpha-values">
    <title>Alpha values</title>
    <div class="alphaQ1">
      &alpha;<sub>Q1</sub> &equals; {{ alphaQ1 }}
    </div>
    <div class="alphaQ2">
      &alpha;<sub>Q2</sub> &equals; {{ alphaQ2 }}
    </div>
    <div class="alphaQ">
      &alpha;<sub>q</sub> &equals;
      <span v-if="traffic">{{ selectedValue }}</span>
      <span v-else>0.40</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  alphaQ1: number;
  alphaQ2: number;
  traffic: string | null;
  selectedValue?: number | string;
}>();
</script>
