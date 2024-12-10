<template>
  <div class="lane-selector">
    <title>
      {{ $t('lane-selector') }}
    </title>
    <q-btn-toggle
      class="lane-toggle"
      v-model="selectedLane"
      color="primary"
      flat
      dense
      :options="[
        {value: 'uni2l', slot: 'one'},
        {value: 'bi2l', slot: 'two'},
        {value: 'bi4l', slot: 'three'},
      ]">
      <template v-slot:one>
        <div class="row items-center no-wrap">
          <div class="text-center">
          </div>
          <img :src="`/public/images/uni2l.png`" alt="one lane" class="track-image" />
          <span v-if="selectedLane === 'uni2l'">(–)</span>
        </div>
      </template>
      <template v-slot:two>
        <div class="row items-center no-wrap">
          <div class="text-center">
          </div>
          <img src="/public/images/bi2l.png" alt="two lanes" class="track-image" />
          <span v-if="selectedLane === 'bi2l'">(–)</span>

        </div>
        </template>
      <template v-slot:three>
        <div class="row items-center no-wrap">
          <div class="text-center">
          </div>
          <img src="/public/images/bi4l.png" alt="three lanes" class="track-image" />
          <span v-if="selectedLane === 'bi4l'">(–)</span>
        </div>
        </template>
    </q-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();


const selectedLane = computed({
  get: () => verificationStore.selectedLane,
  set: (value) => verificationStore.setLane(value)
});

</script>

<style scoped lang="scss">
/* have proper display color of selected lane */

.lane-selector {
  grid-area: c;
}
.lane-toggle {
  margin-top: 10px;
  flex-direction: column;
}
.track-image {
  width: 100px;
  height: 100px;
}
</style>
