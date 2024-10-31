<template>
  <div class="alpha-values">
    <div class="alpha-header">
      Alpha values
    </div>
    <div class="alpha-item">
      &alpha;<sub>Q1</sub> &equals; {{ alphaQ1 }}
    </div>
    <div class="alpha-item">
      &alpha;<sub>Q2</sub> &equals; {{ alphaQ2 }}
    </div>
    <div class="alpha-item">
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

<style scoped>
.alpha-values {
  border: 1px solid #FFB6C1;
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background: #fff;
  transition: all 0.3s ease;

  /* Mobile first approach */
  width: 90%;
  max-width: 300px;
  margin: 0 auto;

  /* Tablet */
  @media (min-width: 768px) {
    width: 350px;
    max-width: 350px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    width: 400px;
    max-width: 400px;
  }

  /* Large Desktop */
  @media (min-width: 1440px) {
    width: 450px;
    max-width: 450px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
}

.alpha-header {
  background-color: #FFE4E1;
  padding: 0.625rem;
  margin: -1.25rem -1.25rem 1.25rem;
  border-radius: 8px 8px 0 0;
  text-align: center;
  font-weight: 600;
}

.alpha-item {
  line-height: 1.4;
}
</style>
