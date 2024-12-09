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
        {value: 'one', slot: 'one'},
        {value: 'two', slot: 'two'},
        {value: 'three', slot: 'three'},
      ]">
      <template v-slot:one>
        <div class="row items-center no-wrap">
          <div class="text-center">
            1
          </div>
          <img :src="`/public/images/uni2l.png`" alt="one lane" class="track-image" />
        </div>
      </template>
      <template v-slot:two>
        <div class="row items-center no-wrap">
          <div class="text-center">
            2
          </div>
          <img src="/public/images/bi2l.png" alt="two lanes" class="track-image" />
        </div>
        </template>
      <template v-slot:three>
        <div class="row items-center no-wrap">
          <div class="text-center">
            3
          </div>
          <img src="/public/images/bi4l.png" alt="three lanes" class="track-image" />
        </div>
        </template>
    </q-btn-toggle>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script>

<style scoped>
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
