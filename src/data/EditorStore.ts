import { defineStore } from "pinia";
import { type IEditorState } from "@/types/IEditorState";
import { ToolType } from "@/types/ToolType";
import { initialBox } from "./StoryElementFactory";
import type { IStoryElement } from "@/types/IStoryElement";

const initialState = (): IEditorState => {
  const initElement = initialBox();
  const elements: Record<string, IStoryElement> = {};
  elements[initElement.id] = initElement;

  return {
    expandedTool: ToolType.None,
    selectedElementId: "",
    editingElementId: "",
    storyElements: elements,
    defaultElement: initialBox(),
  };
};

export const useEditorStore = defineStore("editor", {
  state: () => initialState(),
});
