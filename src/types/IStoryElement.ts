import { StoryElementType } from "./StoryElementType";

export interface IStoryElement {
  elementType: StoryElementType;
  text: string;
  shape: string;
  shader: string;
  palette: number;
  foreground: string;
}
