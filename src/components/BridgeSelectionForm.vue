<template>
  <q-form class="flex items-center justify-center">
    <q-select
      :model-value="modelValue.Type"
      @update:model-value="updateField('Type', $event)"
      :options="TypeOptions"
      label="Type of Bridge"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.SubType"
      @update:model-value="updateField('SubType', $event)"
      :options="SubTypeOptions"
      :disable="isFieldDisabled('SubType')"
      label="Bridge SubType"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Width"
      @update:model-value="updateField('Width', $event)"
      :options="WidthOptions"
      :disable="isFieldDisabled('Width')"
      :prefix="(modelValue.Width as Option)?.value === 'Wid108' ? '≥' : ''"
      :suffix="WidthSuffix"
      label="Width"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Traffic"
      @update:model-value="updateField('Traffic', $event)"
      :options="TrafficOptions"
      :disable="isFieldDisabled('Traffic')"
      label="Traffic"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Support"
      @update:model-value="updateField('Support', $event)"
      :options="SupportOptions"
      :disable="isFieldDisabled('Support')"
      label="Support"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Trans"
      @update:model-value="updateField('Trans', $event)"
      :options="TransOptions"
      :disable="isFieldDisabled('Trans')"
      label="Transversal or Longitudinal"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.AE"
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
      label="Span"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.TrafficClass"
      @update:model-value="updateField('TrafficClass', $event)"
      :options="TrafficClassOptions"
      :disable="isFieldDisabled('TrafficClass')"
      label="Traffic Class"
      style="width: 200px" />
  </q-form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import data from '../assets/data/data.json';

type TrafficClass = 'ClassOW' | 'Class';

type Option = {
  value: string;
  label: string;
}
type Options = Option[];

const props = defineProps<{
  modelValue: Record<string, string|number|null|Option>
}>();

const TypeOptions = computed(() => Array.from(new Set(data.map(x => x.Type))).sort());
const SubTypeOptions = computed(() =>
  Array.from(new Set(data.filter(x => x.Type === props.modelValue.Type).map(x => x.SubType)))
);
const WidthSuffix = computed(() => props.modelValue.Width ? 'm' : '');
const WidthOptions = computed((): Options => {

  const MapOfWidths: Record<string, string> = {
    'Wid108': '9',
  };

  return (Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType
  ).map(x => x.Width))).sort())
  .map(x => ({ value: x, label: MapOfWidths[x] ?? x.replace('Wid', '') }));
});
const TrafficOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value']
  ).map(x => x.Traffic)))
);
const SupportOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value'] &&
    x.Traffic === props.modelValue.Traffic
  ).map(x => x.Support)))
);
const TransOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value'] &&
    x.Traffic === props.modelValue.Traffic &&
    x.Support === props.modelValue.Support
  ).map(x => x.Trans)))
);
const AEOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value'] &&
    x.Traffic === props.modelValue.Traffic &&
    x.Support === props.modelValue.Support &&
    x.Trans === props.modelValue.Trans
  ).map(x => x.AE)))
);
const SpanOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value'] &&
    x.Traffic === props.modelValue.Traffic &&
    x.Support === props.modelValue.Support &&
    x.Trans === props.modelValue.Trans &&
    x.AE === props.modelValue.AE
  ).map(x => x.Span)))
);
const TrafficClassOptions = computed(() => [
  { value: 'ClassOW', label: 'Class+ (40T + Mobile Crane up to 96T)' },
  { value: 'Class', label: 'Standard Class (40T max)' }
] as { value: TrafficClass, label: string }[]);

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string|number|null>]
}>();

const fieldOrder = ['Type', 'SubType', 'Width', 'Traffic', 'Support', 'Trans', 'AE', 'Span', 'TrafficClass'];

function updateField(field: string, value: string|number|null) {
  const newValue = { ...props.modelValue };
  newValue[field] = value;

  // Reset all fields that come after the current field
  const fieldIndex = fieldOrder.indexOf(field);
  fieldOrder.slice(fieldIndex + 1).forEach(f => {
    newValue[f] = null;
  });

  emit('update:modelValue', newValue);
}

// Optional: Add a helper computed function to check if a field should be disabled
const isFieldDisabled = (field: string) => {
  const currentIndex = fieldOrder.indexOf(field);
  return fieldOrder.slice(0, currentIndex).some(f => !props.modelValue[f]);
};
</script>
