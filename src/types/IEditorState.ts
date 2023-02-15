import type { IProject } from "./IProject";
import type { IStoryElement } from "./IStoryElement";
import { ToolType } from "./ToolType";

export interface IEditorState {
  expandedTool: ToolType;
  project: IProject;
  selectedElementId: string;
  editingElementId: string;
  defaultElement: IStoryElement;
  overlay: string;
  debug: boolean;
}
