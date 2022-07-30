<template>
  <component
    :is="tag"
    :contenteditable="contenteditable"
    @input="update"
    @blur="update"
    @paste="onPaste"
    @keypress="onKeypress"
    ref="element"
  >
  </component>
</template>

<script setup lang="ts">
// Adapted from https://github.com/hl037/vue-contenteditable

import { ref, onMounted, watch } from "vue";
function replaceAll(str: string, search: string, replacement: string) {
  return str.split(search).join(replacement);
}
const props = defineProps({
  tag: String,
  contenteditable: {
    type: [Boolean, String],
    default: true,
  },
  modelValue: String,
  text: String,
  noNl: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
  returned: String,
  "update:modelValue": String,
});

const element = ref<HTMLElement>();

onMounted(() => {
  console.log({
    "element.value": element.value,
  });
});

function currentContent() {
  return element.value?.innerText;
}
function updateContent(newcontent: string | undefined) {
  if (element.value) element.value.innerText = newcontent || "";
}
function update() {
  emit("update:modelValue", currentContent());
}
function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  if (!event?.clipboardData) return;
  let text = event.clipboardData.getData("text/plain");
  if (props.noNl) {
    text = replaceAll(text, "\r\n", " ");
    text = replaceAll(text, "\n", " ");
    text = replaceAll(text, "\r", " ");
  }
  window.document.execCommand("insertText", false, text);
}
function onKeypress(event: KeyboardEvent) {
  if (event.key == "Enter" && props.noNl) {
    event.preventDefault();
    emit("returned", currentContent());
  }
}
onMounted(() => {
  updateContent(props.modelValue ?? props.text);
});
watch(
  () => props.modelValue,
  (newval) => {
    if (newval != currentContent()) {
      updateContent(newval ?? props.text);
    }
  }
);
</script>
