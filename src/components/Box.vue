<template>
  <div
    class="box z-1 pointer"
    :class="[
      'shape' + modelValue.shape,
      'shader' + modelValue.shader,
      'palette' + modelValue.palette,
      modelValue.foreground,
    ]"
  >
    <input
      type="text"
      class="w-100 h-100 bn bg-transparent tc b"
      :class="[modelValue.foreground]"
      :value="modelValue.text"
      @input="$emit('update:modelValue', mutate(modelValue, $event.target as HTMLInputElement))"
    />
  </div>
</template>

<script setup lang="ts">
import { type IStoryElement } from "@/types/IStoryElement";

const mutate = (element: IStoryElement, eventTarget: HTMLInputElement) => {
  const newting = { ...element, text: eventTarget.value };
  return newting;
};

defineProps<{
  modelValue: IStoryElement;
}>();

defineEmits(["update:modelValue"]);
</script>

<style>
.box * {
  padding: 1.8rem;
}
</style>
