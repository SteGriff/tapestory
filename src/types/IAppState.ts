import type { IStoryElement } from "./IStoryElement";
import { ToolType } from "./ToolType";

export interface IAppState {
    expandedTool : ToolType,
    storyElements : IStoryElement[],
    selectedElementIndex : number,
    
}