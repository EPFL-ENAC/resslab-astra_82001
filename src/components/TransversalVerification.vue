<template>
  <main
    v-if="!rBau && bridgeType"
    class="transversal-verification-container row3"
  >
    <section
      class="transversal-verification transversal-inputs"
      aria-labelledby="transversal-title"
    >
      <h3 class="transversal-header">{{ $t('transversal_verification') }}</h3>

      <div v-if="bridgeType != 'Slab'" class="row q-mt-sm cantilever-toggle">
        <q-btn-toggle
          v-model="isCantileverEnabled"
          spread
          class="isCantileverEnabled-toggle"
          no-caps
          flat
          color="primary"
          :options="[
            { label: $t('cantilever'), value: true },
            { label: $t('slab-between-beams'), value: false },
          ]"
        />
        <q-icon
          class="cursor-pointer"
          :name="mdiInformationVariantCircleOutline"
        >
          <q-tooltip class="text-body1" html>
            <span v-html="$t('i8_desc')"></span
          ></q-tooltip>
        </q-icon>
      </div>
      <div v-if="bridgeType != 'Slab'" class="row q-mt-sm transversal-image">
        <q-img
          v-if="isCantileverEnabled"
          src="/slab-cantilever.svg"
          style="height: 150px"
          alt="cantilever"
          fit="contain"
        ></q-img>
        <q-img
          v-else
          src="/slab-between-beams.svg"
          style="height: 150px"
          alt="cantilever"
          fit="contain"
        ></q-img>
      </div>
      <div v-else>
        <q-img
          src="/slab-transversal.svg"
          style="height: 250px"
          alt="slab"
          fit="contain"
        ></q-img>
      </div>

      <div
        v-if="bridgeType != 'Slab'"
        class="row q-mt-sm dimension items-center"
      >
        <div class="col-2">
          <q-badge color="secondary">
            {{ $t('L') }}
          </q-badge>
        </div>
        <div class="col-7">
          <q-slider
            v-model="spanTransversal"
            class="transversal-slider"
            type="number"
            :min="minSpanTransversal"
            :max="maxSpanTransversal"
            :suffix="`m`"
            :step="0.01"
          />
        </div>
        <div class="col-3">
          <q-input
            v-model.number="spanTransversal"
            type="number"
            :min="minSpanTransversal"
            :max="maxSpanTransversal"
            :suffix="`m`"
            :step="0.1"
            dense
            outlined
          />
        </div>
      </div>
    </section>
    <section v-if="bridgeType != 'Slab'" class="transversal-support">
      <h3 class="transversal-header">
        {{ $t('support') }}
        <q-icon
          class="cursor-pointer"
          :name="mdiInformationVariantCircleOutline"
        >
          <q-tooltip class="text-body1" html>
            <span v-html="$t('i11_desc')"></span
          ></q-tooltip>
        </q-icon>
      </h3>
      <q-btn-toggle
        v-model="supportType"
        class="support-toggle"
        color="primary"
        flat
        padding="md"
        :options="supportOptions"
      >
        <template #one>
          <div class="col items-center no-wrap">
            <q-img
              :height="supportTypeHeightImage"
              fit="contain"
              position="50% 50%"
              class="transversal-support-image"
              :src="`/${transversalTypeName}-1.svg`"
              alt="support type"
            />
          </div>
        </template>

        <template #two>
          <div class="col items-center no-wrap">
            <q-img
              :height="supportTypeHeightImage"
              fit="contain"
              position="50% 50%"
              class="transversal-support-image"
              :src="`/${transversalTypeName}-2.svg`"
              alt="support type"
            />
          </div>
        </template>
        <template #three>
          <div class="col items-center no-wrap">
            <q-img
              :height="supportTypeHeightImage"
              fit="contain"
              position="50% 50%"
              class="transversal-support-image"
              :src="`/${transversalTypeName}-3.svg`"
              alt="support type"
            />
          </div>
        </template>
      </q-btn-toggle>
    </section>
    <section v-else>
      <div class="row q-mt-sm dimension items-center">
        <h3 class="transversal-header">{{ $t('support') }}</h3>
        <q-btn-toggle
          v-model="supportType"
          class="support-toggle"
          color="primary"
          flat
          padding="md"
          :options="supportOptions"
        >
          <template #one>
            <div class="col items-center no-wrap">
              M<sub>{{ $t('M_support') }}</sub> &LessSlantEqual; 50% M<sub>{{
                $t('M_fully_fixed')
              }}</sub>
            </div>
          </template>

          <template #two>
            <div class="col items-center no-wrap">
              50% M<sub>{{ $t('M_fully_fixed') }}</sub> &LessSlantEqual; M<sub
                >{{ $t('M_support') }}</sub
              >
              &LessSlantEqual; M<sub>{{ $t('M_fully_fixed') }}</sub>
            </div>
          </template>
          <template #three>
            <div class="col items-center no-wrap">
              M<sub>{{ $t('M_support') }}</sub> &equals; M<sub>{{
                $t('M_fully_fixed')
              }}</sub>
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </section>
  </main>

  <section
    v-if="!rBau && bridgeType"
    class="transversal-verification-result transversal-results alpha-footer"
    aria-lable=""
  >
    <!-- show three values: alphaq sub V,M-,M+ -->
    <q-icon
      class="cursor-pointer top-right-absolute q-pa-md"
      :name="mdiInformationVariantCircleOutline"
    >
      <q-tooltip class="text-body1" html>
        <span v-html="$t('i10_desc')"></span
      ></q-tooltip>
    </q-icon>
    <ul v-if="bridgeType != 'Slab'" class="alpha-list">
      <li class="alpha-item">
        &alpha;<sub>q,V</sub> &equals;
        {{ roundCeilWith2Decimals(alphaTrans?.V?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaTrans?.V?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li v-if="!isCantileverEnabled" class="alpha-item">
        &alpha;<sub>q,M-</sub> &equals;
        {{ roundCeilWith2Decimals(alphaTrans?.Mn?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaTrans?.Mn?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li v-else class="alpha-item">
        &alpha;<sub>q,M</sub> &equals;
        {{ roundCeilWith2Decimals(alphaTrans?.M?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaTrans?.M?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li v-if="!isCantileverEnabled" class="alpha-item">
        &alpha;<sub>q,M+</sub> &equals;
        {{ roundCeilWith2Decimals(alphaTrans?.Mp?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaTrans?.Mp?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
    </ul>
    <ul v-else class="alpha-list">
      <!-- / -->
      <li class="alpha-item">
        &alpha;<sub>q,Mx,Mid</sub> &equals;
        {{ roundCeilWith2Decimals(alphaLong?.MxMid?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaLong?.MxMid?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
      <li class="alpha-item">
        &alpha;<sub>q,Mx,Medge</sub> &equals;
        {{ roundCeilWith2Decimals(alphaLong?.MxEdg?.[selectedClass]) }}

        <q-btn
          flat
          padding="none"
          @click="
            () =>
              copyText(
                $q,
                $t,
                roundCeilWith2Decimals(alphaLong?.MxEdg?.[selectedClass])
              )
          "
        >
          <q-img
            height="24px"
            width="24px"
            fit="contain"
            src="/mdi-icons/content_copy.svg"
          />
          <q-tooltip>
            {{ $t('copy_to_clipboard') }}
          </q-tooltip>
        </q-btn>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationStore } from '../stores/verification-store';
import { useI18n } from 'vue-i18n';
import { roundCeilWith2Decimals } from '../utils/math';
import { useQuasar } from 'quasar';
import { copyText } from '../utils/clipboard';
import { mdiInformationVariantCircleOutline } from '@mdi/js';

const { t: $t } = useI18n();
const $q = useQuasar();

const verificationStore = useVerificationStore();

const maxSpanTransversal = computed(
  () => verificationStore.getMaxSpanTransversal
);
const minSpanTransversal = computed(
  () => verificationStore.getMinSpanTransversal
);
const alphaTrans = computed(() => verificationStore.getTransversalAlpha);
const alphaLong = computed(() => verificationStore.getLongitudinalAlpha);
const rBau = computed(() => verificationStore.rBau);
const bridgeType = computed(() => verificationStore.bridgeType);
const selectedClass = computed(() =>
  verificationStore.selectedClass === 'Class' ? 'qG' : 'qG+'
);

const supportTypeHeightImage = '50px';

const transversalTypeName = computed({
  get: () =>
    verificationStore.isCantileverEnabled ? 'cantilever' : 'slab-between-beams',
  set: () => null,
});

const supportOptions = computed(() => {
  if (bridgeType.value !== 'Slab') {
    if (transversalTypeName.value === 'cantilever') {
      // AR-0 is Fixed, AR-2 is Semi and BR-1 is Simp
      return [
        { slot: 'one', label: $t('AR-0'), value: 'Fixed' },
        { slot: 'two', label: $t('AR-2'), value: 'Semi' },
        { slot: 'three', label: $t('BR-1'), value: 'Simp' },
      ];
    } else {
      // PENC is Fixed, SENC is Semi and SMPL is Simp
      return [
        { slot: 'one', label: $t('PENC'), value: 'Fixed' },
        { slot: 'two', label: $t('SENC'), value: 'Semi' },
        { slot: 'three', label: $t('SMPL'), value: 'Simp' },
      ];
    }
  } else {
    return [
      { slot: 'one', value: 'Semi' }, //     M<sub>support</sub> &LessSlantEqual; 50% M<sub>fully fixed</sub>
      { slot: 'two', value: 'Simp' }, //     50% M<sub>fully fixed</sub>  &LessSlantEqual; M<sub>support</sub> &LessSlantEqual; M<sub>fully fixed</sub>
      { slot: 'three', value: 'Fixed' }, //       M<sub>support</sub> &equals; M<sub>fully fixed</sub>
    ];
  }
});

const isCantileverEnabled = computed({
  get: () => verificationStore.isCantileverEnabled,
  set: (value) => verificationStore.setTransversalCantileverEnabled(value),
});

const supportType = computed({
  get: () => verificationStore.supportType,
  set: (value) => verificationStore.setTransversalSupportType(value),
});

const spanTransversal = computed({
  get: () => verificationStore.spanTransversal,
  set: (value) => verificationStore.setTransversalSpan(value),
});
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';
@import 'src/css/mixins.scss';

.transversal-slider {
  width: 90%;
}

.transversal-support-image {
  max-width: 100px;
  min-width: 100px;

  // padding: 1rem;
  border: 1px solid var(--q-color-grey-3);
}

.transversal-image {
  // padding: 1rem;
  border: 1px solid var(--q-color-grey-3);

  /* set maximum and min width to avoid flickering of screen */
  img {
    // max-width: 300px;
    min-width: 300px;
    height: 100px;
    width: stretch;
  }
}

.transversal-verification-container {
  grid-area: e;
  display: grid;
  // grid-template-rows: auto 1fr auto;
  grid-template-areas: 'transversal support';
  grid-template-columns: 1fr 1fr;
  min-height: 100%; // This is important
  height: 100%; // This ensures full height
  gap: 1rem;
}
.transversal-verification {
  grid-area: transversal;
  @include user-select(none);
}
.transversal-support {
  grid-area: support;
  @include user-select(none);
}

.transversal-results {
  // grid-area: footer;
  align-self: end;
}

.transversal-radio {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.verification-title {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.dimension {
  display: flex;
  flex-direction: row;
  flex: auto;
  width: 100%;
}

.col-2 {
  flex: 0 0 16.666667%;
  max-width: 16.666667%;
}

.col-8 {
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
}

.items-center {
  align-items: center;
}
.transversal-header {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
  margin-bottom: 0rem;
}

.cantilever-toggle {
  display: flex;
  flex-direction: row;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.support-toggle,
.isCantileverEnabled-toggle {
  display: inline-grid;
  :deep(button) {
    text-transform: none;
  }
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;

  grid-auto-flow: row;
  background-color: white;
  border-radius: $button-border-radius;
  border: 1px solid $black;
  @media screen and (max-width: 600px) {
    grid-auto-flow: row;
  }
  :deep(.q-btn > .q-btn__content) {
    display: flex;
    flex-direction: row;
  }
  :deep(.q-btn[aria-pressed='true']) {
    background-color: rgba($primary, 0.1);
    color: $secondary;

    .block {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  :deep(.q-btn[aria-pressed='false']) {
    .block {
      color: #000;
      font-size: 1rem;
      font-weight: normal;
    }
  }
}

.isCantileverEnabled-toggle {
  grid-auto-flow: column;
}
.support-toggle {
  border: 0px;
}
</style>
