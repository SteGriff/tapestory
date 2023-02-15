import type { IStoryElement } from "./IStoryElement";

export interface IProject {
    id: string;
    name: string;
    public: boolean;
    storyElements: IStoryElement[];
}
