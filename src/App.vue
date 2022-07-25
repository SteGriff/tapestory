<template>
  <div @click.capture="expandCollapse(ToolType.None)">
    <main
      class="ph2 w-100 measure center mt4 mb5"
      @click="state.expandedTool = ToolType.None"
    >
      <div>
        <div v-for="(_, id) in state.storyElements" :key="id">
          <element-tools
            :selected="selectedIs(id)"
            @changeType="changeTypeOfCurrent()"
            @delete="deleteCurrent()"
          >
            <box v-model="state.storyElements[id]" @click="selectBox(id)" />
          </element-tools>
        </div>
      </div>

      <!-- <h1 class="heading palette38 shaderg135">Hello World</h1> -->

      <button
        class="btn bn black pointer br-pill f2 w3 h3 db center tc"
        :class="bottomElementClasses"
        @click="addBox"
      >
        +
      </button>

      <!-- Debug -->
      <table class="w5 center tc" cell-spacing="0">
        <tr>
          <td class="ba pa1">{{ state.selectedElementId }}</td>
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
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import box from "@/components/Box.vue";
import palettePicker from "@/components/PalettePicker.vue";
import shaderPicker from "./components/ShaderPicker.vue";
import foregroundPicker from "./components/ForegroundPicker.vue";
import toolDrawer from "./components/ToolDrawer.vue";

import { computed, reactive } from "vue";
import type { IAppState } from "./types/IAppState";
import { ToolType } from "./types/ToolType";
import { elementLike, initialBox } from "./data/StoryElementFactory";
import ElementTools from "./components/ElementTools.vue";
import { StoryElementType } from "./types/StoryElementType";

const state = reactive<IAppState>({
  expandedTool: ToolType.None,
  selectedElementId: null,
  storyElements: [initialBox()],
  defaultElement: initialBox(),
});

const selectedElement = computed(
  () => state.storyElements[state.selectedElementId] || state.defaultElement
);

const bottomElement = computed(
  () =>
    state.storyElements[state.storyElements.length - 1] || state.defaultElement
);

const bottomElementClasses = computed(() => [
  "palette" + bottomElement.value.palette,
  "shader" + bottomElement.value.shader,
  bottomElement.value.foreground,
]);

const selectBox = (index: number) => {
  state.selectedElementId = index;
};

const addBox = () => {
  state.storyElements.push(elementLike(bottomElement.value));
};

const changeTypeOfCurrent = () => {
  selectedElement.value.elementType = StoryElementType.Text;
};

const deleteCurrent = () => {
  state.storyElements.splice(state.selectedElementId, 1);
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
