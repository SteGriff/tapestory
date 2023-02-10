import { defineStore } from "pinia";
import { type IEditorState } from "@/types/IEditorState";
import { ToolType } from "@/types/ToolType";
import { elementLike, initialBox } from "./StoryElementFactory";
import type { IStoryElement } from "@/types/IStoryElement";

const initialState = (): IEditorState => {
  const initElement = initialBox();
  const elements: IStoryElement[] = [];
  elements.push(initElement);

  return {
    expandedTool: ToolType.None,
    selectedElementId: "",
    editingElementId: "",
    storyElements: elements,
    defaultElement: initialBox(),
    overlay: "",
    debug: false,
  };
};

export const useEditorStore = defineStore("editor", {
  state: () => initialState(),
  getters: {
    orderedElements(): IStoryElement[] {
      //const elementsCopy = [...this.storyElements];
      const elementsCopy = [...this.storyElements.filter((se) => !se.deleted)];
      elementsCopy.sort((a: IStoryElement, b: IStoryElement) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
      return elementsCopy;
    },
    selectedElement(): IStoryElement {
      const index = this.storyElements.findIndex(
        (se) => se.id === this.selectedElementId
      );
      const thing = this.storyElements[index] || this.defaultElement;
      console.log("se", thing);
      return thing;
    },
    bottomElement(): IStoryElement {
      return (
        this.orderedElements[this.orderedElements.length] || this.defaultElement
      );
    },
  },
  actions: {
    addBox() {
      console.log("addBox");
      const newEl: IStoryElement = elementLike(
        this.bottomElement,
        this.bottomElement.order
      );
      this.storyElements.push(newEl);
      console.log(this.storyElements);
    },
  },
});
