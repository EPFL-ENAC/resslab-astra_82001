<template>
  <div class="bridge-selector">
    <q-btn-toggle
        class="traffic-toggle"
        v-model="trafficToggle"
        color="primary"
        flat
        padding="md"
        :options="[
          {value: 'box', slot: 'one'},
          {value: 'twin-girder', slot: 'two'},
          {value: 'multi-girder', slot: 'three'},
          {value: 'slab', slot: 'four'},
        ]"
      >
        <template v-slot:one="">
          <div class="col items-center no-wrap" :title="$t('box')">
            <img src="/box.svg" alt="box" class="track-image" />
            <div class="text-center bridge-text" >
              <!-- Box -->
              {{ $t('box') }}
            </div>
          </div>
        </template>

        <template v-slot:two>
          <div class="col items-center no-wrap" :title="$t('twin-girder')">
            <img src="/twin-girder.svg" alt="twin girder" class="track-image" />
            <div class="text-center bridge-text">
              <!-- Twin Girder -->{{$t('twin-girder')}}
            </div>
          </div>

        </template>
        <template v-slot:three>
          <div class="col items-center no-wrap" :title="$t('multi-girder')">
            <img src="/multi-girder.svg" alt="multi girder" class="track-image" />
            <div class="text-center bridge-text">
              <!-- Multi Girder -->{{$t('multi-girder')}}
            </div>
          </div>
        </template>
        <template v-slot:four>
          <div class="col items-center no-wrap"  :title="$t('slab')">
            <img src="/slab.svg" alt="slab" class="track-image" />
            <div class="text-center bridge-text">
              <!-- Slab -->{{$t('slab')}}
            </div>
          </div>
          </template>


      </q-btn-toggle>
  </div>
</template>

<script setup lang="ts">
// generate code based on above template
import { ref } from 'vue';

const trafficToggle = ref('box');


</script>

<style lang="scss" scoped>
.bridge-selector {
  grid-area: b;
}
.traffic-toggle {
  display: inline-grid;
    grid-auto-flow: column;
    /* width: -webkit-fill-available; */
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    :deep(.q-btn) {
      border-right: 1px solid $red-2;
    }
    :deep(.q-btn:last-of-type) {
      border-right: 0px;
    }
    background-color: white;
    border-radius: 4px;
    border: 1px solid grey;
}

:deep(.q-btn[aria-pressed="true"]) {
    background-color: $red-2;
    // border-radius: 6px;

    .bridge-text {
      // color: $secondary;
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
  width: 150px;
  height: 50px;
}
</style>
