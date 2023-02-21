<template>
  <img :src="imageSrc()" />
</template>

<script setup lang="ts">
import { type IColourStoryElement } from "@/types/IStoryElement";

defineProps<{
  storyElement: IColourStoryElement;
}>();

const imageSrc = () => `img/c${this.storyElement.shape}`;
</script>

<style></style>
