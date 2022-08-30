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
    debug: false,
  };
};

export const useEditorStore = defineStore("editor", {
  state: () => initialState(),
  getters: {
    orderedElements(state): IStoryElement[] {
      const elementsCopy = [...state.storyElements];
      elementsCopy.sort((a: IStoryElement, b: IStoryElement) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
      return elementsCopy;
    },
    bottomElement(state): IStoryElement {
      const lastElement = this.orderedElements[this.orderedElements.length];
      // console.log(keys, lastKey, lastElement);
      return lastElement || state.defaultElement;
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
