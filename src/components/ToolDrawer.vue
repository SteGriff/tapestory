<template>
  <div
    class="z-99 drawer overflow-hidden"
    :class="{ expanded: expanded, collapsed: !expanded }"
  >
    <div
      class="overflow-x-none pv3 ph2 flex"
      :class="{ 'overflow-x-auto': expanded }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  expanded: boolean;
}>();
</script>

<style>
.drawer {
  left: 0.5rem;
  max-width: 4rem;
  transition: max-width 0.25s ease-out;
}
.collapsed:hover {
  max-width: 5rem;
}
.expanded {
  max-width: 32rem;
}
</style>
