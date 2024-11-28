<template>
  <div class="alpha-values">
    <div class="alpha-header">
      {{$t('alpha_values')}}
    </div>
    <div class="alpha-item">
      &alpha;<sub>Q1</sub> &equals; {{ alphaQ1 }}
    </div>
    <div class="alpha-item">
      &alpha;<sub>Q2</sub> &equals; {{ alphaQ2 }}
    </div>
    <div class="alpha-item">
      <!-- beta: {{ beta }} // -->
      <!-- {{ finalAlphaQAsFixed }} // minAlphaQ = {{ minAlphaQ }} // trafficClass = {{ trafficClass }} || finalAlphaQ = {{ finalAlphaQ }} -->
      <!-- <br/> -->
      &alpha;<sub>q</sub>
      <span v-if="finalAlphaQ">
        <span v-if="finalAlphaQ <= minAlphaQ">
          &equals;
          {{ finalAlphaQAsFixed }}
        </span>
        <span v-else>
          &equals;
          {{ finalAlphaQAsFixed }}
        </span>
      </span>
      <span v-else>&equals; {{ minAlphaQ }}</span>
    </div>


  </div>
</template>

<script setup lang="ts">
import { TrafficClass } from 'src/types/Selected';
import { computed, ref } from 'vue';

const props = defineProps<{
  alphaQ1: number;
  alphaQ2: number;
  trafficClass?: TrafficClass;
  selectedValue?: number;
  phyCal?: number;
  beta?: number;
}>();


const minAlphaQ = computed(() => props.trafficClass === 'ClassOW' ? 0.3001 : 0.3001);

const finalAlphaQ = computed(() => {
  let alphaQ = props.selectedValue ?? minAlphaQ.value;
  if (props.phyCal) {
    alphaQ = props.phyCal * alphaQ;
  } else {
    console.error('phyCal should be provided to this component');
  }

  // todo: add a flag to know if the value is final or not or was modified
  if (alphaQ < minAlphaQ.value) {
    alphaQ = minAlphaQ.value;
  }
  // we apply the beta 4.7 factor after the minAlphaQ check
  if (props.beta && props.beta  === 4.7) {
    alphaQ = 1.07 * alphaQ; // 7% increase
  }

  return alphaQ;
});

const finalAlphaQAsFixed = computed(() => finalAlphaQ.value.toFixed(2));

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
