<template>
  <h1
    contenteditable="true"
    class="wordArt tc center"
    :class="['shader' + modelValue.shader, 'palette' + modelValue.palette]"
  >
    {{ modelValue.text }}
  </h1>
</template>

<script setup lang="ts">
import { type IStoryElement } from "@/types/IStoryElement";

// const mutate = (element: IStoryElement, eventTarget: HTMLInputElement) => {
//   const newting = { ...element, text: eventTarget.value };
//   return newting;
// };

defineProps<{
  modelValue: IStoryElement;
}>();

defineEmits(["update:modelValue"]);
</script>
