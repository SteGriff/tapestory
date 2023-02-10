<template>
  <content-editable
    tag="h1"
    class="wordArt mv0 tc center"
    :class="['shader' + storyElement.shader, 'palette' + storyElement.palette]"
    :text="text"
    @input="$emit('textChange', mutate($event.target as HTMLInputElement))"
    :no-nl="true"
  />
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";
import contentEditable from "@/components/ContentEditable.vue";

const mutate = (eventTarget: HTMLInputElement) => {
  return eventTarget.textContent;
};

defineProps<{
  storyElement: IColourStoryElement;
  text: string;
}>();

defineEmits(["update:modelValue"]);
</script>
