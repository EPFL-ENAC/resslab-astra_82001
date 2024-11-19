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
      :label="transLabel"
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
import type { Selected, SelectedKeys, SelectedValues, TrafficClass, Option, Options } from '../types/Selected';


const props = defineProps<{
  modelValue: Selected
}>();

const transLabel = computed(() => {
  // Multi === poutres longitudinales
  // Slab === Transversal
  // others === Longitudinal p0 (box and Twin)
  // don't forget to i18n all this!
  if (props.modelValue.Type === 'Box' || props.modelValue.Type === 'Twin') {
    return 'Longitudinal'; // p0
  } else if (props.modelValue.Type === 'Multi') {
    return 'Longitudinal (Poutres)'; // P1,P2,P3
  } else if (props.modelValue.Type === 'Slab') {
    return 'Longitudinal'; // p1,p2,p3
  } else {
    return 'Transverse'; // default value ? ask the client how to handle this
  }
});

// const hideTrans = computed(() => props.modelValue.Type === 'Box' || props.modelValue.Type === 'Twin');

const TypeOptions = computed(() => Array.from(new Set(data.map(x => x.Type))).sort());

const generateSubTypeOptions = (type: string) => Array.from(new Set(data.filter(x => x.Type === type).map(x => x.SubType)));
const SubTypeOptions = computed(() =>
  generateSubTypeOptions(props.modelValue.Type as string)
);



function generateWidthOptions(subType: string): Options {
  const MapOfWidths: Record<string, string> = {
    'Wid108': '9m',
  };

  return (Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === subType
  ).map(x => x.Width))).sort())
  .map(x => ({ value: x, label: MapOfWidths[x] ?? x.replace('Wid', '') + 'm' }));
}
const WidthOptions = computed((): Options => {
  return generateWidthOptions(props.modelValue.SubType as string);
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
    x.Trans === props.modelValue?.Trans
  ).map(x => x.AE)))
);
const SpanOptions = computed(() =>
  Array.from(new Set(data.filter(x =>
    x.Type === props.modelValue.Type &&
    x.SubType === props.modelValue.SubType &&
    x.Width === (props.modelValue.Width as Option)?.['value'] &&
    x.Traffic === props.modelValue.Traffic &&
    x.Support === props.modelValue.Support &&
    x.Trans === props.modelValue?.Trans &&
    x.AE === props.modelValue.AE
  ).map(x => x.Span)))
);
const TrafficClassOptions = computed(() => [
  { value: 'ClassOW', label: 'Class+ (40T + Mobile Crane up to 96T)' },
  { value: 'Class', label: 'Standard Class (40T max)' }
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
  fieldOrder.slice(fieldIndex + 1).forEach(f => {
    // if (newValue === undefined) return;
    // if (f === 'Trans' && field === 'Type' && ( value === 'Box' || value === 'Twin')) {
    //   newValue[f] = 'p0';
    // } else {
    //   newValue[f] = undefined;
    // }
    // if (field === 'Type' && f === 'SubType') {
    //   // probably should retrieve subTypeOptions from the updated Field!
    //   const localSubTypeOptions = generateSubTypeOptions(value as string);
    //   newValue[f] = localSubTypeOptions[0];
    //   newValue = updateField('SubType', localSubTypeOptions[0], newValue);
    // } else if (field === 'SubType' && f === 'Width') {
    //   const localWidthOptions = generateWidthOptions(value as string);
    //   newValue[f] = localWidthOptions[0];
    //   newValue = updateField('Width', localWidthOptions[0], newValue);
    // } else if (field === 'Width' && f === 'Traffic') {
    //   newValue[f] = TrafficOptions.value[0];
    // } else if (field === 'Traffic' && f === 'Support') {
    //   newValue[f] = SupportOptions.value[0];
    // } else if (field === 'Support' && f === 'Trans') {
    //   newValue[f] = TransOptions.value[0];
    // }
    // else { // because of recursive we don't want to do that!
    newValue[f] = undefined;
    // }
  });
  // if (noEmits) return newValue;
  // else {
  //   return newValue
  // }
  emit('update:modelValue', newValue);
}

// Optional: Add a helper computed function to check if a field should be disabled
const isFieldDisabled = (field: SelectedKeys) => {
  const currentIndex = fieldOrder.indexOf(field);
  return fieldOrder.slice(0, currentIndex).some(f => !props.modelValue[f]);
};
</script>
