<template>
  <div class="mh1 ba b--black br2 sqr32" @click="$emit('expandCollapse')">
    <svg-img :name="'c' + modelValue" width="29" height="29" />
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
    <svg-img :name="'c' + s" width="29" height="29" />
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
<style></style>
