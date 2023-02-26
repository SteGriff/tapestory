<template>
  <div class="mh1 ba b--black br-pill" @click="$emit('expandCollapse')">
    <svg-img :name="'c' + modelValue" width="32" height="32" />
  </div>

  <div
    v-for="s in shapeList"
    :key="s"
    class="mh1"
    @click="
      () => {
        $emit('expand');
        $emit('update:modelValue', s);
      }
    "
  >
    <svg-img :name="'c' + s" width="32" height="32" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import svgImg from "@/components/SvgImg.vue";

const props = defineProps<{
  modelValue: string;
  shapes: string[];
}>();

const shapeList = computed(() => [...props.shapes]);

defineEmits(["expand", "expandCollapse", "update:modelValue"]);
</script>
