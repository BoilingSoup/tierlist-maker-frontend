import { nanoid } from "nanoid";
import { TierListData } from "./types";

export const SIDEBAR = "SIDEBAR";
export const CONTAINER = "CONTAINER";
export const IMAGE = "IMAGE";

export const initialData: TierListData = {
  sidebar: [],
  rows: [
    {
      id: nanoid(),
      color: "#fe7f7f",
      label: "S",
      items: [
        {
          id: nanoid(),
          src: "https://www.memeatlas.com/images/pepeThumbnails/pepe-fat-head-mouth-open-thumbnail.jpg",
        },
        {
          id: nanoid(),
          src: "https://www.memeatlas.com/images/pepeThumbnails/pepe-guy-fieri-shirt-thumbnail.png",
        },
        {
          id: nanoid(),
          src: "https://www.memeatlas.com/images/pepeThumbnails/pepe-drinks-tea-thumbnail.png",
        },
        {
          id: nanoid(),
          src: "https://www.memeatlas.com/images/pepeThumbnails/pepe-3d-hissing-thumbnail.png",
        },
      ],
    },
    { id: nanoid(), color: "#febe7e", label: "A", items: [] },
    { id: nanoid(), color: "#fefe7f", label: "B", items: [] },
    { id: nanoid(), color: "#7fff7f", label: "C", items: [] },
    { id: nanoid(), color: "#7fbfff", label: "D", items: [] },
  ],
};

/*************************Drag Event Constants*************************/

// These constants represent the dragOver event's possible branching conditions.

export const DRAG_FROM_ROW_TO_SIDEBAR__IMAGE =
  "DRAG_FROM_ROW_TO_SIDEBAR__IMAGE";

export const DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER =
  "DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER";

export const DRAG_FROM_SIDEBAR_TO_ROW__IMAGE =
  "DRAG_FROM_SIDEBAR_TO_ROW__IMAGE";

export const DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER =
  "DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER";

export const DRAG_FROM_ROW_TO_ROW__IMAGE = "DRAG_FROM_ROW_TO_ROW__IMAGE";

export const DRAG_FROM_ROW_TO_ROW__CONTAINER =
  "DRAG_FROM_ROW_TO_ROW__CONTAINER";

// These constants represnet the dragEnd event's possible branching conditions.

export const DRAG_END_WITHIN_ROW = "DRAG_END_WITHIN_ROW";

export const DRAG_END_WITHIN_SIDEBAR = "DRAG_END_WITHIN_SIDEBAR";

// This constant is a possible branching condition in both dragOver and dragEnd events.

export const IGNORE_DRAG = "IGNORE_DRAG";

/**********************************************************************/
