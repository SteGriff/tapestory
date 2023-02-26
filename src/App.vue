<template>
  <div @click.capture="expandCollapse(ToolType.None)">
    <main
      class="ph2 w-100 measure center mt4 mb5"
      @click="state.expandedTool = ToolType.None"
    >
      <!-- The user generated story elements -->
      <div v-for="el in state.orderedElements" :key="el.id">
        <element-tools
          :selected="selectedIs(el.id)"
          :hasText="hasText(el.elementType)"
          :hasSparkles="hasText(el.elementType)"
          @changeType="changeType(el)"
          @delete="deleteElement(el)"
          @editText="editText(el)"
          @connectAfter="connectAfter(el)"
        >
          <box
            v-if="el.elementType === StoryElementType.Box"
            :story-element="el"
            @click="selectBox(el.id)"
          />
          <word-art
            v-if="el.elementType === StoryElementType.WordArt"
            :story-element="el"
            @click="selectBox(el.id)"
          />
          <connector
            v-if="el.elementType === StoryElementType.Connector"
            :story-element="el"
            @click="selectBox(el.id)"
          />
        </element-tools>
      </div>

      <button
        class="btn pa0 bn black pointer br-pill f2 w3 h3 db center tc"
        :class="state.bottomElementClasses"
        @click="state.addBox"
      >
        +
      </button>

      <!-- Debug -->
      <table v-show="state.debug" class="mt3 w5 center tc" cell-spacing="0">
        <tr>
          <td class="ba pa1">{{ state.selectedElementId }}</td>
          <td class="ba pa1">typ {{ state.selectedElement.elementType }}</td>
          <td class="ba pa1">pal {{ state.selectedElement.palette }}</td>
          <td class="ba pa1">shd {{ state.selectedElement.shader }}</td>
          <td class="ba pa1">fgc {{ state.selectedElement.foreground }}</td>
          <td class="ba pa1">{{ state.selectedElement.text }}</td>
          <td class="ba pa1">ord {{ state.selectedElement.order }}</td>
          <td class="ba pa1">del {{ state.selectedElement.deleted }}</td>
        </tr>
      </table>
    </main>

    <!-- Bottom toolbar -->
    <footer class="fixed bottom-0 w-100 br b--gray z-0 bg-black-10">
      <div class="w-100 measure center flex">
        <tool-drawer
          v-if="shapesFor(state.selectedElement.elementType).length > 1"
          class="bg-black-10"
          :expanded="toolIs(ToolType.Shape)"
        >
          <!-- Shapes == connectors for now -->
          <shape-picker
            v-model="state.selectedElement.shape"
            :shapes="shapesFor(state.selectedElement.elementType)"
            @expandCollapse="expandCollapse(ToolType.Shape)"
            @expand="expand(ToolType.Shape)"
            @update:modelValue="state.saveProjectLocal()"
          />
        </tool-drawer>

        <tool-drawer
          v-if="state.selectedElement.palette"
          class="bg-black-10"
          :expanded="toolIs(ToolType.Palette)"
        >
          <palette-picker
            v-model="state.selectedElement.palette"
            @expandCollapse="expandCollapse(ToolType.Palette)"
            @expand="expand(ToolType.Palette)"
            @update:modelValue="state.saveProjectLocal()"
          />
        </tool-drawer>

        <tool-drawer
          v-if="state.selectedElement.shader"
          class="bg-black-20"
          :expanded="toolIs(ToolType.Shader)"
        >
          <shader-picker
            v-model="state.selectedElement.shader"
            :palette="state.selectedElement.palette"
            @expandCollapse="expandCollapse(ToolType.Shader)"
            @expand="expand(ToolType.Shader)"
            @update:modelValue="state.saveProjectLocal()"
          />
        </tool-drawer>

        <tool-drawer
          v-if="state.selectedElement.foreground"
          class="bg-black-10"
          :expanded="toolIs(ToolType.Foreground)"
        >
          <foreground-picker
            v-model="state.selectedElement.foreground"
            :palette="state.selectedElement.palette"
            :shader="state.selectedElement.shader"
            @expandCollapse="expandCollapse(ToolType.Foreground)"
            @expand="expand(ToolType.Foreground)"
            @update:modelValue="state.saveProjectLocal()"
          />
        </tool-drawer>

        <button
          type="button"
          class="btn btn-tool b-btn btn-flex pa0 ma3 tc pointer bg-white br-pill"
          @click="state.newProject()"
          @click.right="state.debug = !state.debug"
        >
          🧾
        </button>

        <button
          type="button"
          class="btn btn-height b-btn btn-flex ph3 mv3 mh2 tc pointer bg-white br-pill"
          @click="editTitle()"
        >
          {{ state.project.name }}
        </button>
      </div>
    </footer>
  </div>

  <!-- Overlay background -->
  <div
    v-if="state.overlay"
    class="overlay z-2 bg-dark-gray o-70 fixed absolute--fill"
  ></div>

  <!-- Overlay close btn pa0 -->
  <div v-if="state.overlay">
    <div
      class="z-3 white huge fixed right-2 top-1 pointer"
      @click="closeOverlay()"
    >
      &times;
    </div>
  </div>

  <!-- Overlay contents -->
  <div v-if="state.overlay === 'edit'">
    <textarea
      class="z-3 white bn bg-transparent huge b tc fixed t-50 l-50 translate-center w-90 ma2 pa1 ph3"
      v-model="state.selectedElement.text"
    ></textarea>
  </div>
  <div v-if="state.overlay === 'title'">
    <textarea
      class="z-3 white bn bg-transparent huge b tc fixed t-50 l-50 translate-center w-90 ma2 pa1 ph3"
      v-model="state.project.name"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import box from "@/components/Box.vue";
import wordArt from "@/components/WordArt.vue";
import connector from "@/components/Connector.vue";
import shapePicker from "@/components/ShapePicker.vue";
import palettePicker from "@/components/PalettePicker.vue";
import shaderPicker from "@/components/ShaderPicker.vue";
import foregroundPicker from "@/components/ForegroundPicker.vue";
import toolDrawer from "@/components/ToolDrawer.vue";
import elementTools from "@/components/ElementTools.vue";

import { ToolType } from "@/types/ToolType";
import { StoryElementType } from "@/types/StoryElementType";
import { useEditorStore } from "@/data/EditorStore";
import { shapesFor } from "@/logic/shapes";

const state = useEditorStore();

const selectBox = (id: string) => {
  console.log("selectBox", id);
  state.selectedElementId = id;
};

const changeType = (el) => {
  el.elementType =
    el.elementType == StoryElementType.WordArt
      ? StoryElementType.Box
      : StoryElementType.WordArt;
  state.saveProjectLocal();
};

const deleteElement = (el) => {
  el.deleted = true;
  state.saveProjectLocal();
};

const editText = () => {
  state.overlay = "edit";
};

const editTitle = () => {
  state.overlay = "title";
};

const connectAfter = (el) => {
  state.addConnector(el.order + 1);
};

const closeOverlay = () => {
  state.overlay = "";
  state.saveProjectLocal();
};

// Tool selection stuff
const selectedIs = (id: string) => state.selectedElementId === id;
const hasText = (elementType: StoryElementType) => elementType < 2;
const toolIs = (t: ToolType) => state.expandedTool === t;
const expand = (t: ToolType) => {
  state.expandedTool = t;
};
const expandCollapse = (t: ToolType) => {
  state.expandedTool = state.expandedTool === t ? ToolType.None : t;
};
</script>
