import type { IStoryElement } from "@/types/IStoryElement";
import { StoryElementType } from "@/types/StoryElementType";
import { randomFrom } from "@/utils/random";
import { randomShaders, palettes } from "./Constants";

export function initialBox(): IStoryElement {
  return {
    elementType: StoryElementType.Box,
    shape: "round",
    shader: "g13",
    palette: 1,
    foreground: "white",
    text: "Hello",
  };
}

export function randomBox(): IStoryElement {
  return {
    elementType: StoryElementType.Box,
    shape: "round",
    shader: randomFrom(randomShaders),
    palette: randomFrom(palettes),
    foreground: "white",
    text: "Hi, I'm new",
  };
}

export function elementLike(el: IStoryElement) {
  return { ...el };
}
