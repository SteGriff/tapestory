<template>
  <div
    :class="['palette' + modelValue]"
    class="mh1"
    @click="$emit('expandCollapse')"
  >
    <palette-chips class="selected" />
  </div>

  <div
    v-for="p in paletteList"
    :key="p"
    :class="['palette' + p]"
    class="mh1"
    @click="
      () => {
        $emit('expand');
        $emit('update:modelValue', p);
      }
    "
  >
    <palette-chips />
  </div>
</template>

<script setup lang="ts">
import { palettes } from "@/data/Constants";
import { computed } from "vue";
import paletteChips from "./PaletteChips.vue";

let paletteList = computed(() => [...palettes]);

defineProps<{
  modelValue: number;
}>();

defineEmits(["expand", "expandCollapse", "update:modelValue"]);
</script>
