import type { IColourStoryElement, IStoryElement } from "@/types/IStoryElement";
import { StoryElementType } from "@/types/StoryElementType";
import cuid from "cuid";
import { randomPrompt } from "./Prompts"

export function initialBox(): IColourStoryElement {
  return {
    id: cuid(),
    order: 1,
    elementType: StoryElementType.Box,
    shape: "round",
    shader: "g13",
    //palette: 1,
    foreground: "white",
    text: randomPrompt(),
    alignment: "center",
    deleted: false
  };
}

export function elementLike(el: IStoryElement, order: number): IStoryElement {
  return { ...el, id: cuid(), order: order };
}

export function newConnector(order: number): IStoryElement {
  return {
    id: cuid(),
    order: order,
    elementType: StoryElementType.Connector,
    shape: "1",
    alignment: "center",
    deleted: false
  };
}
