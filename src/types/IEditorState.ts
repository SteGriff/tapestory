import type { IStoryElement } from "./IStoryElement";
import { ToolType } from "./ToolType";

export interface IEditorState {
  expandedTool: ToolType;
  storyElements: Record<string, IStoryElement>;
  selectedElementId: string | null;
  editingElementId: string | null;
  defaultElement: IStoryElement;
}
