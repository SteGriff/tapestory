import type { IStoryElement } from "@/types/IStoryElement";
import { StoryElementType } from "@/types/StoryElementType";
import cuid from "cuid";

export function initialBox(): IStoryElement {
  return {
    id: cuid(),
    elementType: StoryElementType.Box,
    shape: "round",
    shader: "g13",
    palette: 1,
    foreground: "white",
    text: "Hello",
  };
}

export function elementLike(el: IStoryElement): IStoryElement {
  return { ...el, id: cuid() };
}
