<template>
  <div
    class="box z-1 tc b pointer"
    :class="[
      'shape' + boxModel.shape,
      'shader' + boxModel.shader,
      'palette' + boxModel.palette,
      boxModel.foreground,
    ]"
  >
    {{ boxModel.text }}
  </div>
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";

defineProps<{
  boxModel: IColourStoryElement;
}>();
</script>

<style>
.box * {
  padding: 1.8rem;
}
</style>
