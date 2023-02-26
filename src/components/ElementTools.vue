<template>
  <div class="wrapper">
    <button
      type="button"
      class="btn pa0 btn-tool tc absolute pointer z-1 bg-white bn br-pill btn-top btn-right"
      v-if="selected"
      @click="$emit('delete')"
    >
      ❌
    </button>
    <button
      type="button"
      class="btn pa0 btn-tool tc f6 absolute pointer z-1 bg-white bn br-pill btn-mid btn-left"
      v-if="selected && hasText"
      @click="$emit('editText')"
    >
      abc
    </button>
    <button
      type="button"
      class="btn pa0 btn-tool tc absolute pointer z-1 bg-white bn br-pill btn-mid btn-right"
      v-if="selected"
      @click="$emit('connectAfter')"
    >
      〰
    </button>
    <button
      type="button"
      class="btn pa0 btn-tool tc absolute pointer z-1 bg-white bn br-pill btn-top btn-left"
      v-if="selected && hasSparkles"
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
  hasText: boolean;
  hasSparkles: boolean;
}>();
</script>

<style>
@media (screen and (min-width: 30em)) {
  .btn-left {
    left: -0.9rem;
  }

  .btn-right {
    right: -0.9rem;
  }
}

.btn-top {
  top: -1rem;
}

.btn-mid {
  top: 2rem;
}

.btn-left {
  left: -0.4rem;
}

.btn-right {
  right: -0.4rem;
}
</style>
