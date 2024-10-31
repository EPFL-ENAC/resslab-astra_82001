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
      label="Width"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Layout"
      @update:model-value="updateField('Layout', $event)"
      :options="LayoutOptions"
      :disable="isFieldDisabled('Layout')"
      label="Layout"
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
      label="Trans"
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
      label="Span"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Traffic"
      @update:model-value="updateField('Traffic', $event)"
      :options="TrafficOptions"
      :disable="isFieldDisabled('Traffic')"
      label="Traffic Class"
      style="width: 200px" />
  </q-form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import data from '../assets/data/data.json';

type Traffic = 'All' | 'ClassOW' | 'Class';

const props = defineProps<{
  modelValue: Record<string, string|number|null>
}>();

const TypeOptions = computed(() => Array.from(new Set(data.map(x => x.Type))).sort());
const SubTypeOptions = computed(() =>
  Array.from(new Set(data.filter(x => x.Type === props.modelValue.Type).map(x => x.SubType)))
);
const WidthOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType
  ).map(x => x.Width)))
);
const LayoutOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === props.modelValue.Width
  ).map(x => x.Layout)))
);
const SupportOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === props.modelValue.Width &&
    x.Layout === props.modelValue.Layout
  ).map(x => x.Support)))
);
const TransOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === props.modelValue.Width &&
    x.Layout === props.modelValue.Layout &&
    x.Support === props.modelValue.Support
  ).map(x => x.Trans)))
);
const AEOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === props.modelValue.Width &&
    x.Layout === props.modelValue.Layout &&
    x.Support === props.modelValue.Support &&
    x.Trans === props.modelValue.Trans
  ).map(x => x.AE)))
);
const SpanOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === props.modelValue.Width &&
    x.Layout === props.modelValue.Layout &&
    x.Support === props.modelValue.Support &&
    x.Trans === props.modelValue.Trans &&
    x.AE === props.modelValue.AE
  ).map(x => x.Span)))
);
const TrafficOptions = computed(() => ['All', 'ClassOW', 'Class'] as Traffic[]);

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string|number|null>]
}>();

const fieldOrder = ['Type', 'SubType', 'Width', 'Layout', 'Support', 'Trans', 'AE', 'Span', 'Traffic'];

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
