import { DEFAULT_THEME } from "@mantine/core";
import { nanoid } from "nanoid";
import { PxSize, TierListData } from "./types";

export const DOM_TO_PNG_ID = "PNG";

export const MAX_IMAGE_SIZE: PxSize = "200px";
export const DEFAULT_IMAGE_SIZE: PxSize = "80px";
export const ROWS_TO_FIT_PERFECTLY_ON_SCREEN = 6;

export const SIDEBAR = "SIDEBAR";
export const CONTAINER = "CONTAINER";
export const IMAGE = "IMAGE";

export const LOCAL_TIERLIST_IDB_KEY = "lt";

export const SWATCHES = [
  DEFAULT_THEME.colors.red[5],
  DEFAULT_THEME.colors.orange[5],
  DEFAULT_THEME.colors.yellow[3],
  DEFAULT_THEME.colors.lime[5],
  DEFAULT_THEME.colors.green[5],
  DEFAULT_THEME.colors.cyan[5],
  DEFAULT_THEME.colors.blue[5],
  DEFAULT_THEME.colors.indigo[5],
  DEFAULT_THEME.colors.grape[5],
  DEFAULT_THEME.colors.violet[5],
  DEFAULT_THEME.colors.gray[5],
];

export const INITIAL_STATE: TierListData = {
  sidebar: [],
  rows: [
    { id: nanoid(), color: "#fe7f7f", label: "S", items: [] },
    { id: nanoid(), color: "#febe7e", label: "A", items: [] },
    { id: nanoid(), color: "#fefe7f", label: "B", items: [] },
    { id: nanoid(), color: "#7fff7f", label: "C", items: [] },
    { id: nanoid(), color: "#7fbfff", label: "D", items: [] },
    { id: nanoid(), color: DEFAULT_THEME.colors.grape[5], label: "F", items: [] },
  ],
};

/*************************Drag Event Constants*************************/

// These constants represent the dragOver event's possible branching conditions.

export const DRAG_FROM_ROW_TO_SIDEBAR__IMAGE = "DRAG_FROM_ROW_TO_SIDEBAR__IMAGE";

export const DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER = "DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER";

export const DRAG_FROM_SIDEBAR_TO_ROW__IMAGE = "DRAG_FROM_SIDEBAR_TO_ROW__IMAGE";

export const DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER = "DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER";

export const DRAG_FROM_ROW_TO_ROW__IMAGE = "DRAG_FROM_ROW_TO_ROW__IMAGE";

export const DRAG_FROM_ROW_TO_ROW__CONTAINER = "DRAG_FROM_ROW_TO_ROW__CONTAINER";

// These constants represent the dragEnd event's possible branching conditions.

export const DRAG_END_WITHIN_ROW = "DRAG_END_WITHIN_ROW";

export const DRAG_END_WITHIN_SIDEBAR = "DRAG_END_WITHIN_SIDEBAR";

// This constant is a possible branching condition in both dragOver and dragEnd events.

export const IGNORE_DRAG = "IGNORE_DRAG";

/**********************************************************************/
