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
        <template v-slot:one>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Box
            </div>
            <img src="/public/images/box.png" alt="box" class="track-image" />
          </div>
        </template>

        <template v-slot:two>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Twin Girder
            </div>
            <img src="/public/images/twin-girder.png" alt="twin girder" class="track-image" />
          </div>

        </template>
        <template v-slot:three>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Multi Girder
            </div>
            <img src="/public/images/multi-girder.png" alt="multi girder" class="track-image" />
          </div>
        </template>
        <template v-slot:four>
          <div class="row items-center no-wrap">
            <div class="text-center">
              Slab
            </div>
            <img src="/public/images/slab.png" alt="slab" class="track-image" />
          </div>
          </template>


      </q-btn-toggle>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
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
