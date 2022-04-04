<template>
  <div class="wrapper">
    <button
      type="button"
      class="btn btn-tool tc absolute pointer z-999 bg-white bn br-pill btn-top btn-right"
      v-if="selected"
      @click="$emit('delete')"
    >
      ❌
    </button>
    <button
      type="button"
      class="btn btn-tool tc absolute pointer z-999 bg-white bn br-pill btn-mid btn-left"
      v-if="selected"
    >
      〰
    </button>
    <button
      type="button"
      class="btn btn-tool tc absolute pointer z-999 bg-white bn br-pill btn-mid btn-right"
      v-if="selected"
    >
      〰
    </button>
    <button
      type="button"
      class="btn btn-tool tc absolute pointer z-999 bg-white bn br-pill btn-top btn-left"
      v-if="selected"
      @click="$emit('changeType')"
    >
      ✨
    </button>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  selected: boolean;
}>();
</script>

<style>
.btn-tool {
  box-shadow: 0px 4px 16px rgba(5, 0, 56, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 1.9rem;
  height: 1.9rem;
}

.btn-top {
  top: -1rem;
}

.btn-mid {
  top: 2rem;
}

.btn-left {
  left: -0.9rem;
}

.btn-right {
  right: -0.9rem;
}
</style>
