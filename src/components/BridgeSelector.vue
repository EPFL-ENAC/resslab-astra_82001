<template>
  <div class="bridge-selector">
    <h3 class="bridge-header">{{ $t('type_of_bridge') }}</h3>
    <q-btn-toggle
        class="bridge-toggle"
        v-model="bridgeToggle"
        color="primary"
        flat
        padding="md"
        :options="[
          {value: 'Box', slot: 'one'},
          {value: 'Twin', slot: 'two'},
          {value: 'Multi', slot: 'three'},
          {value: 'Slab', slot: 'four'},
        ]"
      >
        <template v-slot:one="">
          <div class="col items-center no-wrap" :title="$t('box')">
            <q-img fit="contain" src="/box.svg" alt="box" class="track-image"/>
            <div class="text-center bridge-text" >
              {{ $t('box') }}
            </div>
          </div>
        </template>

        <template v-slot:two>
          <div class="col items-center no-wrap" :title="$t('twin-girder')">
            <q-img fit="contain" src="/twin-girder.svg" alt="twin girder" class="track-image" />
            <div class="text-center bridge-text">
              {{$t('twin-girder')}}
            </div>
          </div>
        </template>
        <template v-slot:three>
          <div class="col items-center no-wrap" :title="$t('multi-girder')">
            <q-img fit="contain" src="/multi-girder.svg" alt="multi girder" class="track-image" />
            <div class="text-center bridge-text">
              {{$t('multi-girder')}}
            </div>
          </div>
        </template>
        <template v-slot:four>
          <div class="col items-center no-wrap"  :title="$t('slab')">
            <q-img fit="contain" src="/slab.svg" alt="slab" class="track-image" />
            <div class="text-center bridge-text">
              {{$t('slab')}}
            </div>
          </div>
        </template>
      </q-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';

const verificationStore = useVerificationStore();

const bridgeToggle = computed({
  get: () => verificationStore.bridgeType,
  set: (value) => verificationStore.setBridgeType(value)
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';
.bridge-selector {
  grid-area: b;
  // grid-area: row1;
}
.bridge-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0rem;
  margin-bottom: 0rem;
  text-align: left;
}
.bridge-toggle {
  display: grid;
  // grid-auto-flow: column;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  background-color: white;
  border-radius: $button-border-radius;

  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row dense;
  //for tablet
  @media screen and (min-width: $breakpoint-sm) and (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  // for mobile
  @media screen and (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }

}
.bridge-text {
  margin-top: 0.8rem;
}

:deep(.q-btn[aria-pressed="true"]) {
  background-color: rgba($primary, 0.1);
  color: $secondary;

  .bridge-text {
    font-size: 1rem;
    font-weight: bold;
  }
}
:deep(.q-btn[aria-pressed="false"]) {
  .bridge-text {
    color: #000;
    font-size: 1rem;
    font-weight: normal;
  }
}

.track-image {
  height: 50px;
}
</style>
