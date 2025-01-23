<template>
  <div class="alpha-footer alpha-global"  v-if="rBau || bridgeType">
    <ul class="alpha-list" v-if="!rBau && bridgeType">
      <li class="alpha-item">
        &alpha;<sub>Q1, global</sub> &equals; {{ roundCeilWith2Decimals(alpha?.V?.Q1G) }}

        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.V?.Q1G))">
          <q-img height="24px" width="24px" fit="contain" src="/epfl-designed/Canard/svg/c-copy-paste.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q1, local</sub> &equals; {{ roundCeilWith2Decimals(alpha?.V?.Q1L) }}

        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.V?.Q1L))">
          <q-img height="24px" width="24px" fit="contain" src="/epfl-designed/Canard/svg/c-copy-paste.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2, global</sub> &equals; {{ roundCeilWith2Decimals(alpha?.V?.Q2G) }}
        <q-tooltip> {{ $t('i5_desc') }} </q-tooltip>

        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.V?.Q2G))">
          <q-img height="24px" width="24px" fit="contain" src="/epfl-designed/Canard/svg/c-copy-paste.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li class="alpha-item">
        &alpha;<sub>Q2, local</sub> &equals; {{ roundCeilWith2Decimals(alpha?.V?.Q2L) }}
        <q-tooltip> {{ $t('i4_desc') }} </q-tooltip>
        <q-btn flat padding="none" @click="() => copyText($q, $t, roundCeilWith2Decimals(alpha?.V?.Q2L))">
          <q-img height="24px" width="24px" fit="contain" src="/epfl-designed/Canard/svg/c-copy-paste.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
    </ul>
    <ul class="alpha-list" v-if="rBau">
      <li class="alpha-item">
        &alpha;<sub>act,unique </sub> &equals; 0.60


        <q-btn flat padding="none" @click="() => copyText($q, $t, 0.60)">
          <q-img height="24px" width="24px" fit="contain" src="/epfl-designed/Canard/svg/c-copy-paste.svg" />
          <q-tooltip >
            {{  $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';
import { roundCeilWith2Decimals } from '../utils/math';
import { useQuasar } from 'quasar'
import { copyText } from '../utils/clipboard';

import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const $q = useQuasar()

const verificationStore = useVerificationStore();
const rBau = computed(
  () => verificationStore.rBau
);
const bridgeType = computed(
  () => verificationStore.bridgeType
);
const alpha = computed(() => verificationStore.getLongitudinalAlpha);


</script>

<style scoped lang="scss">
@import 'src/css/quasar.variables.scss';

.alpha-global {
  grid-area: f;
  // grid-area: row1;
  display: flex;
}
</style>
