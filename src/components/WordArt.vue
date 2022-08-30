<template>
  <content-editable
    tag="h1"
    class="wordArt mv0 tc center"
    :class="['shader' + modelValue.shader, 'palette' + modelValue.palette]"
    :text="modelValue.text"
    @input="$emit('update:modelValue', mutate(modelValue, $event.target as HTMLInputElement))"
    :no-nl="true"
  />
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";
import contentEditable from "@/components/ContentEditable.vue";

const mutate = (
  element: IColourStoryElement,
  eventTarget: HTMLInputElement
) => {
  const newbie = { ...element, text: eventTarget.textContent };
  console.log(eventTarget, newbie);
  return newbie;
};

defineProps<{
  modelValue: IColourStoryElement;
}>();

defineEmits(["update:modelValue"]);
</script>
