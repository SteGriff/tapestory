import { StoryElementType } from "./StoryElementType";

export interface IStoryElement {
  id: string;
  elementType: StoryElementType;
  text: string;
  shape: string;
  shader: string;
  palette: number;
  foreground: string;
}
