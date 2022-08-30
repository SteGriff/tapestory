<template>
  <div @click.capture="expandCollapse(ToolType.None)">
    <main
      class="ph2 w-100 measure center mt4 mb5"
      @click="state.expandedTool = ToolType.None"
    >
      <div>
        <div v-for="(el, id) in state.storyElements" :key="id">
          <element-tools
            :selected="selectedIs(id)"
            @changeType="changeTypeOfCurrent()"
            @delete="deleteCurrent()"
            @connectBefore="connectBeforeCurrent()"
            @connectAfter="connectAfterCurrent()"
          >
            <box
              v-if="el.elementType === StoryElementType.Box"
              v-model="state.storyElements[id]"
              @click="selectBox(id)"
            />
            <word-art
              v-if="el.elementType === StoryElementType.WordArt"
              v-model="state.storyElements[id]"
              @click="selectBox(id)"
            />
          </element-tools>
        </div>
      </div>

      <button
        class="btn bn black pointer br-pill f2 w3 h3 db center tc"
        :class="bottomElementClasses"
        @click="state.addBox"
      >
        +
      </button>

      <!-- Debug -->
      <table v-show="state.debug" class="mt3 w5 center tc" cell-spacing="0">
        <tr>
          <td class="ba pa1">{{ state.selectedElementId }}</td>
          <td class="ba pa1">{{ selectedElement.elementType }}</td>
          <td class="ba pa1">{{ selectedElement.palette }}</td>
          <td class="ba pa1">{{ selectedElement.shader }}</td>
          <td class="ba pa1">{{ selectedElement.foreground }}</td>
          <td class="ba pa1">{{ selectedElement.text }}</td>
        </tr>
      </table>
    </main>

    <footer class="fixed bottom-0 w-100 br b--gray z-0 bg-black-10">
      <div class="w-100 measure center flex">
        <tool-drawer class="bg-black-10" :expanded="toolIs(ToolType.Palette)">
          <palette-picker
            v-model="selectedElement.palette"
            @expandCollapse="expandCollapse(ToolType.Palette)"
            @expand="expand(ToolType.Palette)"
          />
        </tool-drawer>

        <tool-drawer class="bg-black-20" :expanded="toolIs(ToolType.Shader)">
          <shader-picker
            v-model="selectedElement.shader"
            :palette="selectedElement.palette"
            @expandCollapse="expandCollapse(ToolType.Shader)"
            @expand="expand(ToolType.Shader)"
          />
        </tool-drawer>

        <tool-drawer
          class="bg-black-10"
          :expanded="toolIs(ToolType.Foreground)"
        >
          <foreground-picker
            v-model="selectedElement.foreground"
            :palette="selectedElement.palette"
            :shader="selectedElement.shader"
            @expandCollapse="expandCollapse(ToolType.Foreground)"
            @expand="expand(ToolType.Foreground)"
          />
        </tool-drawer>

        <button
          type="button"
          class="btn btn-tool ma3 tc pointer bg-white bn br-pill"
          @click="state.debug = !state.debug"
        >
          🧠
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import box from "@/components/Box.vue";
import wordArt from "@/components/WordArt.vue";
import palettePicker from "@/components/PalettePicker.vue";
import shaderPicker from "./components/ShaderPicker.vue";
import foregroundPicker from "./components/ForegroundPicker.vue";
import toolDrawer from "./components/ToolDrawer.vue";

import { computed } from "vue";
import { ToolType } from "./types/ToolType";
import ElementTools from "./components/ElementTools.vue";
import { StoryElementType } from "./types/StoryElementType";
import { useEditorStore } from "./data/EditorStore";

const state = useEditorStore();

// Move all the computeds to the state/store sometime...

const selectedElement = computed(
  () => state.storyElements[state.selectedElementId] || state.defaultElement
);

const bottomElementClasses = computed(() => [
  "palette" + state.bottomElement.palette,
  "shader" + state.bottomElement.shader,
  state.bottomElement.foreground,
]);

const selectBox = (id: string) => {
  console.log("selectBox", id);
  state.selectedElementId = id;
};

const changeTypeOfCurrent = () => {
  selectedElement.value.elementType =
    selectedElement.value.elementType == StoryElementType.WordArt
      ? StoryElementType.Box
      : StoryElementType.WordArt;
};

const deleteCurrent = () => {
  delete state.storyElements[state.selectedElementId];
};

const connectBeforeCurrent = () => {
  selectedElement.value.elementType =
    selectedElement.value.elementType == StoryElementType.WordArt
      ? StoryElementType.Box
      : StoryElementType.WordArt;
};

const connectAfterCurrent = () => {
  selectedElement.value.elementType =
    selectedElement.value.elementType == StoryElementType.WordArt
      ? StoryElementType.Box
      : StoryElementType.WordArt;
};

const selectedIs = (id: string) => state.selectedElementId === id;
const toolIs = (t: ToolType) => state.expandedTool === t;
const expand = (t: ToolType) => {
  state.expandedTool = t;
};
const expandCollapse = (t: ToolType) => {
  state.expandedTool = state.expandedTool === t ? ToolType.None : t;
};
</script>
