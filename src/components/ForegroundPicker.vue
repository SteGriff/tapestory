<template>
  <div
    :class="['shader' + shader, 'palette' + palette, modelValue]"
    class="mh1 pa1 b br2 pointer selected"
    @click="$emit('expandCollapse')"
  >
    {{ modelValue }}
  </div>

  <div
    v-for="f in foregrounds"
    :key="f"
    :class="['shader' + shader, 'palette' + palette, f]"
    class="mh1 pa1 b br2 pointer"
    @click="
      () => {
        $emit('expand');
        $emit('update:modelValue', f);
      }
    "
  >
    {{ f }}
  </div>
</template>

<script setup lang="ts">
import { foregrounds } from "@/data/Constants";

defineProps<{
  modelValue: string;
  palette: number;
  shader: string;
}>();

defineEmits(["expand", "expandCollapse", "update:modelValue"]);
</script>
