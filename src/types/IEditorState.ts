import type { IStoryElement } from "./IStoryElement";
import { ToolType } from "./ToolType";

export interface IEditorState {
  expandedTool: ToolType;
  storyElements: IStoryElement[];
  selectedElementId: string;
  editingElementId: string;
  defaultElement: IStoryElement;
  debug: boolean;
}
