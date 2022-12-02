import { StoryElementType } from "./StoryElementType";

export interface IColourStoryElement extends IStoryElement {
  text: string;
  shader: string;
  palette: number;
  foreground: string;
}

export interface IStoryElement {
  id: string;
  order: number;
  elementType: StoryElementType;
  shape: string;
  deleted: boolean;
}
