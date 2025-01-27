<template>
  <div class="lane-selector area-c" v-if="!rBau && bridgeType">
    <h3 class="lane-header">
      {{ $t('lanes') }}
      <q-icon class="cursor-pointer" :name="mdiInformationVariantCircleOutline" >
            <q-tooltip class="text-body1" html>
              <span v-html="$t('i6_desc')"></span></q-tooltip>
          </q-icon>
    </h3>
    <q-select
      v-model="selectedOption"
      :options="options"
      dense
      outlined
      class="q-mt-md lane-select"
      />
    <q-img fit="contain" :src="`/${selectedOption.value.toLowerCase()}.svg`" alt="one lane" class="track-image q-mt-md" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVerificationStore } from '../stores/verification-store';
import { mdiInformationVariantCircleOutline } from '@mdi/js';

const { t: $t } = useI18n();
const verificationStore = useVerificationStore();


const rBau = computed(() => verificationStore.rBau);

const selectedOption = computed({
  get: () => ({ 'label': $t(verificationStore.selectedLane.toLowerCase()), 'value': verificationStore.selectedLane }),
  set: (option) => {
    verificationStore.setLane(option.value)
  }
});

const bridgeType = computed(() => verificationStore.bridgeType);

const options = computed(() => {
  const result = [
        {label: $t('uni2l'), value: 'Uni2L'},
        {label: $t('bi2l'), value: 'Bi2L'},
      ]

  if (bridgeType.value === 'Box' || bridgeType.value === 'Slab') {
    result.push(
      {label: $t('bi4l'), value: 'Bi4L'})
  }

  return result;
})

</script>

<style scoped lang="scss">
@import 'src/css/mixins.scss';


.lane-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 0rem;
}
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
.lane-select {
  :deep(.q-field__native) {
    @include user-select(none);
  }
}
</style>
