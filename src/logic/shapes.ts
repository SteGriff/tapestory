import { StoryElementType } from "@/types/StoryElementType";
import { shapes, connectors } from "@/data/Constants";

// Calculated
export const shapesFor = (elementType: StoryElementType) => {
    return elementType === StoryElementType.Connector ? connectors : shapes;
};