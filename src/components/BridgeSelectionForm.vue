<template>
  <q-form class="flex items-center justify-center">
    <q-select
      :model-value="modelValue.Type"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Type: $event })"
      :options="TypeOptions"
      label="Type of Bridge"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.SubType"
      @update:model-value="$emit('update:modelValue', { ...modelValue, SubType: $event })"
      :options="SubTypeOptions"
      label="Bridge SubType"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Width"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Width: $event })"
      :options="WidthOptions"
      label="Width"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Layout"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Layout: $event })"
      :options="LayoutOptions"
      label="Layout"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Support"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Support: $event })"
      :options="SupportOptions"
      label="Support"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Trans"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Trans: $event })"
      :options="TransOptions"
      label="Trans"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.AE"
      @update:model-value="$emit('update:modelValue', { ...modelValue, AE: $event })"
      :options="AEOptions"
      label="AE"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Span"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Span: $event })"
      :options="SpanOptions"
      label="Span"
      style="width: 200px" />
    <q-select
      :model-value="modelValue.Traffic"
      @update:model-value="$emit('update:modelValue', { ...modelValue, Traffic: $event })"
      :options="TrafficOptions"
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

defineEmits<{
  'update:modelValue': [value: Record<string, string|number|null>]
}>();
</script>
