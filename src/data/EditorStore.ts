import { defineStore } from "pinia";
import { type IEditorState } from "@/types/IEditorState";
import { ToolType } from "@/types/ToolType";
import { elementLike, newConnector, initialBox } from "./StoryElementFactory";
import type { IColourStoryElement, IStoryElement } from "@/types/IStoryElement";
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

const loadProjectLocal = (): IProject | null => {
  const projectJson = localStorage.getItem("project");
  if (projectJson) {
    console.log("Load!");
    return JSON.parse(projectJson) as IProject;
  }
  console.log("Nothing to load - start from scratch!");
  return null;
}

const initialState = (): IEditorState => {
  return {
    expandedTool: ToolType.None,
    selectedElementId: "",
    editingElementId: "",
    project: loadProjectLocal() || initialProject(),
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
    bottomElementClasses(): string[] {
      const bottomColouredEl = this.bottomElement as IColourStoryElement;
      return [
        "palette" + bottomColouredEl.palette,
        "shader" + bottomColouredEl.shader,
        bottomColouredEl.foreground,
      ]
    }
  },
  actions: {
    addBox() {
      const newEl: IStoryElement = elementLike(
        this.bottomElement,
        this.bottomElement.order
      );
      this.project.storyElements.push(newEl);
      this.saveProjectLocal();
    },
    addConnector(order: number) {
      const connector: IStoryElement = newConnector(order);
      this.project.storyElements.push(connector);
      this.saveProjectLocal();
    },
    saveProjectLocal() {
      console.log("Save!");
      const projectJson = JSON.stringify(this.project);
      localStorage.setItem('project', projectJson);
    },
    newProject() {
      this.project = initialProject();
    }
  },
});
