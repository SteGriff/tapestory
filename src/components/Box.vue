<template>
  <div
    class="box z-1 tc b pointer"
    :class="[
      'shape' + storyElement.shape,
      'shader' + storyElement.shader,
      'palette' + storyElement.palette,
      storyElement.foreground,
    ]"
  >
    {{ storyElement.text }}
  </div>
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";

defineProps<{
  storyElement: IColourStoryElement;
}>();
</script>

<style>
.box * {
  padding: 1.8rem;
}
</style>
