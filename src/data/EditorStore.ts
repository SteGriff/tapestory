import { defineStore } from "pinia";
import { type IEditorState } from "@/types/IEditorState";
import { ToolType } from "@/types/ToolType";
import { elementLike, initialBox } from "./StoryElementFactory";
import type { IStoryElement } from "@/types/IStoryElement";
import type { IProject } from "@/types/IProject";
import cuid from "cuid";

const initialProject = (): IProject => {
  const initElement = initialBox();
  const elements: IStoryElement[] = [];
  elements.push(initElement);

  return {
    id: cuid(),
    name: "Story",
    public: false,
    storyElements: elements
  };
}

const initialState = (): IEditorState => {
  return {
    expandedTool: ToolType.None,
    selectedElementId: "",
    editingElementId: "",
    project: initialProject(),
    defaultElement: initialBox(),
    overlay: "",
    debug: false,
  };
};

export const useEditorStore = defineStore("editor", {
  state: () => initialState(),
  getters: {
    orderedElements(): IStoryElement[] {
      const elementsCopy = [...this.project.storyElements.filter((se) => !se.deleted)];
      elementsCopy.sort((a: IStoryElement, b: IStoryElement) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
      return elementsCopy;
    },
    selectedElement(): IStoryElement {
      const index = this.project.storyElements.findIndex(
        (se) => se.id === this.selectedElementId
      );
      const thing = this.project.storyElements[index] || this.defaultElement;
      return thing;
    },
    bottomElement(): IStoryElement {
      return (
        this.orderedElements[this.orderedElements.length - 1] || this.defaultElement
      );
    },
  },
  actions: {
    addBox() {
      const newEl: IStoryElement = elementLike(
        this.bottomElement,
        this.bottomElement.order
      );
      this.project.storyElements.push(newEl);
    },
  },
});
