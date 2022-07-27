<template>
  <content-editable
    tag="h1"
    class="wordArt tc center"
    :class="['shader' + modelValue.shader, 'palette' + modelValue.palette]"
    :text="modelValue.text"
    @input="$emit('update:modelValue', mutate(modelValue, $event.target as HTMLInputElement))"
    :no-nl="true"
  />
  <!-- <h1
    contenteditable="true"
    class="wordArt tc center"
    :class="['shader' + modelValue.shader, 'palette' + modelValue.palette]"
  >
    {{ modelValue.text }}
  </h1> -->
</template>

<script setup lang="ts">
import { type IStoryElement } from "@/types/IStoryElement";
import contentEditable from "@/components/ContentEditable.vue";

const mutate = (element: IStoryElement, eventTarget: HTMLInputElement) => {
  const newbie = { ...element, text: eventTarget.textContent };
  console.log(eventTarget, newbie);
  return newbie;
};

defineProps<{
  modelValue: IStoryElement;
}>();

defineEmits(["update:modelValue"]);
</script>
