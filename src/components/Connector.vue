<template>
  <div class="flex justify-center connector">
    <svg-img :name="'c' + props.storyElement.shape" />
  </div>
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";
import svgImg from "@/components/SvgImg.vue";

const props = defineProps<{
  storyElement: IColourStoryElement;
  palette: number;
}>();
</script>
