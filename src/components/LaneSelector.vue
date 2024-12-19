<template>
  <div class="lane-selector">
    <h3 style="font-size: medium; display: none">
      {{ $t('lane-selector') }}: {{ selectedLane }}
    </h3>
    <q-btn-toggle
      class="lane-toggle"
      v-model="selectedLane"
      color="primary"
      flat
      dense
      :options="[
        {value: 'Uni2L', slot: 'one'},
        {value: 'Bi2L', slot: 'two'},
        {value: 'Bi4L', slot: 'three'},
      ]">
      <template v-slot:one>
        <div class="col items-center no-wrap q-pa-md">
          <div class="text-center lane-text text-small">
            {{ $t('uni2l') }}
          </div>
          <img :src="`/images/uni2l.png`" alt="one lane" class="track-image" />
          <!-- <span v-if="selectedLane === 'uni2l'">(–)</span> -->
        </div>
      </template>
      <template v-slot:two>
        <div class="col items-center no-wrap">
          <div class="text-center lane-text text-small">
            {{ $t('bi2l') }}
          </div>
          <img src="/images/bi2l.png" alt="two lanes" class="track-image" />
          <!-- <span v-if="selectedLane === 'bi2l'">(–)</span> -->

        </div>
        </template>
      <template v-slot:three>
        <div class="col items-center no-wrap">
          <div class="text-center lane-text text-small">
            {{  $t('bi4l') }}
          </div>
          <img src="/images/bi4l.png" alt="three lanes" class="track-image" />
          <!-- <span v-if="selectedLane === 'bi4l'">(–)</span> -->
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

:deep(.q-btn[aria-pressed="true"]) {
    background-color: #dcdcdc;
    border-radius: 6px;
    .lane-text {
      color: $primary;
      font-size: 0.5rem;
      font-weight: bold;
    }
}
:deep(.q-btn[aria-pressed="false"]) {
    .lane-text {
      color: #000;
      font-size: 0.5rem;
      font-weight: normal;
    }
}
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
