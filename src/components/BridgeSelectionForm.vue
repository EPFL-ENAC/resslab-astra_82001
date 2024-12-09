<template>
  <q-form class="flex items-center justify-center">
    <q-select
      :model-value="TypeOption"
      @update:model-value="updateField('Type', $event)"
      :options="TypeOptions"
      :label="$t('type_of_bridge')"
      style="width: 200px" />
    <q-select
      :model-value="SubTypeOption"
      @update:model-value="updateField('SubType', $event)"
      :options="SubTypeOptions"
      :disable="isFieldDisabled('SubType')"
       :label="$t('subtype_of_bridge')"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Width"
      @update:model-value="updateField('Width', $event)"
      :options="WidthOptions"
      :disable="isFieldDisabled('Width')"
      :prefix="(modelValue.Width as Option)?.value === 'Wid108' ? '≥' : ''"
      :label="$t('width')"
      style="width: 200px" />
    <q-select
      :model-value="TrafficOption"
      @update:model-value="updateField('Traffic', $event)"
      :options="TrafficOptions"
      :disable="isFieldDisabled('Traffic')"
      :label="$t('traffic')"
      style="width: 200px" />
    <q-select
      :model-value="SupportOption"
      @update:model-value="updateField('Support', $event)"
      :options="SupportOptions"
      :disable="isFieldDisabled('Support')"
      :label="$t('support')"
      style="width: 200px" />
    <q-select
      :model-value="TransOption"
      @update:model-value="updateField('Trans', $event)"
      :options="TransOptions"
      :disable="isFieldDisabled('Trans')"
      :label="transLabel"
      style="width: 200px" />
    <q-select
      :model-value="AEOption"
      @update:model-value="updateField('AE', $event)"
      :options="AEOptions"
      :disable="isFieldDisabled('AE')"
      label="AE"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Span"
      @update:model-value="updateField('Span', $event)"
      :options="SpanOptions"
      :disable="isFieldDisabled('Span')"
      suffix="m"
      :label="$t('span')"
      style="width: 200px" />
    <q-select
      :model-value="TrafficClassOption"
      @update:model-value="updateField('TrafficClass', $event)"
      :options="TrafficClassOptions"
      :disable="isFieldDisabled('TrafficClass')"
      :label="$t('traffic_class')"
      style="width: 200px" />
  </q-form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import data from '../assets/data/data.json';
import type { Selected, SelectedKeys, SelectedValues, TrafficClass, Option, Options, DataValueKeys, DataValue, Types } from '../types/Selected';

const dataValues: DataValues = data;

const props = defineProps<{
  modelValue: Selected
}>();
const { t: $t } = useI18n();

const transLabel = computed(() => {
  // Multi === poutres longitudinales
  // Slab === Transversal
  // others === Longitudinal p0 (box and Twin)
  // don't forget to i18n all this!
  if (props.modelValue.Type?.value === 'Box' || props.modelValue.Type?.value === 'Twin') {
    return $t('Longitudinal'.toLowerCase()); // p0
  } else if (props.modelValue.Type?.value === 'Multi') {
    return $t('Longitudinal (Poutres)'.toLowerCase()); // P1,P2,P3
  } else if (props.modelValue.Type?.value === 'Slab') {
    return $t('Longitudinal'.toLowerCase()); // p1,p2,p3
  } else {
    return $t('Transverse'.toLowerCase()); // default value ? ask the client how to handle this
  }
});

const TypeOption = computed(({
  // modelValue.Type
  get: () => ({
    value: props.modelValue.Type?.value,
    label: $t(props.modelValue.Type?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('Type', value)
}))


const generateTypeOptions = () => Array.from(new Set(dataValues.map((x: DataValue) => x.Type))).sort();
const TypeOptions = computed(() =>
  generateTypeOptions().map(x => ({ value: x, label: $t(x.toLowerCase()) }))
);



const SubTypeOption = computed(({
  // modelValue.SubType
  get: () => ({
    value: props.modelValue.SubType?.value,
    label: $t(props.modelValue.SubType?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('SubType', value)
}))

const generateTypeOfFieldOptions = (type: string, field: DataValueKeys) => Array.from(new Set(data.filter(x => x.Type === type).map((x) => x[field])));
const SubTypeOptions = computed(() =>
    generateTypeOfFieldOptions(props.modelValue.Type?.value as string, 'SubType')
      .filter(x => typeof x === 'string').map(x => ({ value: x, label: $t(x.toLowerCase()) }))
);



function generateWidthOptions(Type: string): Options {
  const MapOfWidths: Record<string, string> = {
    'Wid108': '9m',
  };
  return generateTypeOfFieldOptions(props.modelValue.Type?.value as string, 'Width')
  .filter(x => typeof x === 'string').map(x => ({ value: x, label: MapOfWidths[x] ?? x.replace('Wid', '') + 'm' }))
}
const WidthOptions = computed((): Options => {
  return generateWidthOptions(props.modelValue.Type?.value as string);
});


const TrafficOption = computed(({
  // modelValue.SubType
  get: () => ({
    value: props.modelValue.Traffic?.value,
    label: $t(props.modelValue.Traffic?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('Traffic', value)
}))


const TrafficOptions = computed(() => {

   return generateTypeOfFieldOptions(props.modelValue.Type?.value as string, 'Traffic')
    .filter(x => typeof x === 'string').map(x => ({ value: x, label: $t(x.toLowerCase()) }))
}
);


const SupportOption = computed(({
  // modelValue.SubType
  get: () => ({
    value: props.modelValue.Support?.value,
    label: $t(props.modelValue.Support?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('Support', value)
}))
const SupportOptions = computed(() =>
  generateTypeOfFieldOptions(props.modelValue.Type?.value as string, 'Support')
  .filter(x => typeof x === 'string').map(x => ({ value: x, label: $t(x.toLowerCase()) })));


const TransOption = computed(({
  // modelValue.SubType
  get: () => ({
    value: props.modelValue.Trans?.value,
    label: $t(props.modelValue.Trans?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('Trans', value)
}))

const TransOptions = computed(() =>
generateTypeOfFieldOptions(props.modelValue.Type?.value as string, 'Trans')
.filter(x => typeof x === 'string').map(x => ({ value: x, label: $t(x.toLowerCase()) })));

const AEOption = computed(({
  // modelValue.AE
  get: () => ({
    value: props.modelValue.AE?.value,
    label: $t(props.modelValue.AE?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('AE', value)
}))

  const AEOptions = computed(() =>
  generateTypeOfFieldOptions(props.modelValue.Type?.value as Types, 'AE')
  .filter(x => typeof x === 'string').map(x => ({ value: x, label: $t(x.toLowerCase()) })));

const SpanOptions = computed(() =>
generateTypeOfFieldOptions(props.modelValue.Type?.value as Types, 'Span')
.filter(x => typeof x === 'number').map(x => ({ value: x, label: x }))
);

const TrafficClassOption = computed(({
  // modelValue.SubType
  get: () => ({
    value: props.modelValue.TrafficClass?.value,
    label: $t(props.modelValue.TrafficClass?.value?.toLowerCase() ?? '')
  }),
  set: (value: Option) => updateField('TrafficClass', value)
}))

const TrafficClassOptions = computed(() => [
  { value: 'ClassOW', label: $t('classow') },
  { value: 'Class', label: $t('class') }
] as { value: TrafficClass, label: string }[]);

const emit = defineEmits<{
  'update:modelValue': [value: Selected]
}>();

const fieldOrder: SelectedKeys[] = ['Type', 'SubType', 'Width', 'Traffic', 'Support', 'Trans', 'AE', 'Span', 'TrafficClass'];

function updateField(field: SelectedKeys, value: SelectedValues, newValue?: Selected) {
  // let noEmits = true;
  // if (newValue === undefined) {
  //   noEmits = false;
  // }
  newValue = { ...props.modelValue };

  newValue[field] = value as Selected[typeof field] as never;

  // Reset all fields that come after the current field
  const fieldIndex = fieldOrder.indexOf(field);
  if (fieldIndex === -1) {
    console.error('Field not found in fieldOrder');
    return;
  }
  if (fieldIndex === 0) {
    fieldOrder.slice(fieldIndex + 1).forEach(f => {
    newValue[f] = undefined;
  });
  }

  emit('update:modelValue', newValue);
}

// Optional: Add a helper computed function to check if a field should be disabled
const isFieldDisabled = (field: SelectedKeys) => {
  return false;
  // const currentIndex = fieldOrder.indexOf(field);
  // return fieldOrder.slice(0, currentIndex).some(f => !props.modelValue[f]);
};
</script>
