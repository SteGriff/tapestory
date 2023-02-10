<template>
  <h1
    class="wordArt mv0 tc center"
    :class="['shader' + storyElement.shader, 'palette' + storyElement.palette]"
  >
    {{ storyElement.text }}
  </h1>
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";

defineProps<{
  storyElement: IColourStoryElement;
}>();
</script>
