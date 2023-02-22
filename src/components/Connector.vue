<template>
  <div class="flex justify-center">
    <img :src="imageSrc" />
  </div>
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";
import { computed } from "vue";

const props = defineProps<{
  storyElement: IColourStoryElement;
}>();

const imageSrc = computed(() => `img/c${props.storyElement.shape}.svg`);
</script>

<style></style>
