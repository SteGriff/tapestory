<template>
  <div
    :class="['shader' + modelValue, 'palette' + palette]"
    class="mh1 sqr32 br2 pointer selected"
    @click="$emit('expandCollapse')"
  ></div>

  <div
    v-for="s in shaders"
    :key="s"
    :class="['shader' + s, 'palette' + palette]"
    class="mh1 sqr32 br2 pointer"
    @click="
      () => {
        $emit('expand');
        $emit('update:modelValue', s);
      }
    "
  ></div>
</template>

<script setup lang="ts">
import { shaders } from "@/data/Constants";

defineProps<{
  modelValue: string;
  palette: number;
}>();

defineEmits(["expand", "expandCollapse", "update:modelValue"]);
</script>
