<template>
  <div class="bridge-selector">
    <q-btn-toggle
        class="traffic-toggle"
        v-model="trafficToggle"
        push
        rounded
        glossy
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
            <div class="text-center" >
              <!-- Box -->
              {{ $t('box') }}
            </div>
          </div>
        </template>

        <template v-slot:two>
          <div class="col items-center no-wrap" :title="$t('twin-girder')">
            <img src="/twin-girder.svg" alt="twin girder" class="track-image" />
            <div class="text-center">
              <!-- Twin Girder -->{{$t('twin-girder')}}
            </div>
          </div>

        </template>
        <template v-slot:three>
          <div class="col items-center no-wrap" :title="$t('multi-girder')">
            <img src="/multi-girder.svg" alt="multi girder" class="track-image" />
            <div class="text-center">
              <!-- Multi Girder -->{{$t('multi-girder')}}
            </div>
          </div>
        </template>
        <template v-slot:four>
          <div class="col items-center no-wrap"  :title="$t('slab')">
            <img src="/slab.svg" alt="slab" class="track-image" />
            <div class="text-center">
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

<style scoped>
.bridge-selector {
  grid-area: b;
}
.track-image {
  width: 50px;
  height: 50px;
}
</style>
