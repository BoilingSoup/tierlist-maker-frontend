import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";
import { array, object, string } from "valibot";
import {
  CONTAINER,
  DRAG_END_WITHIN_ROW,
  DRAG_END_WITHIN_SIDEBAR,
  DRAG_FROM_ROW_TO_ROW__CONTAINER,
  DRAG_FROM_ROW_TO_ROW__IMAGE,
  DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER,
  DRAG_FROM_ROW_TO_SIDEBAR__IMAGE,
  DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER,
  DRAG_FROM_SIDEBAR_TO_ROW__IMAGE,
  IGNORE_DRAG,
  IMAGE,
  SIDEBAR,
} from "./constants";

export type ClientSideImage = {
  id: string;
  src: string;
};

export type TierListData = {
  sidebar: ClientSideImage[];
  rows: TierListRowData[];
};

// validation schema like zod
export const TierListSchema = object({
  sidebar: array(
    object({
      id: string(),
      src: string(),
    })
  ),
  rows: array(
    object({
      id: string(),
      label: string(),
      color: string(),
      items: array(
        object({
          id: string(),
          src: string(),
        })
      ),
    })
  ),
});

export type TierListRowData = {
  id: string;
  label: string;
  color: string;
  items: ClientSideImage[];
};

export type FullScreenProp = {
  state: boolean;
  toggle: () => Promise<void>;
};

export type PxSize = `${number}px`;
export type RemSize = `${number}rem`;
export type CalcSize = `calc(${string})`;

export type ActiveItem = ClientSideImage & ContainerIDPayload;

export type ActiveItemState = ActiveItem | undefined;

export type UpdateActiveItemParam = {
  event: DragStartEvent;
  setActiveItem: Dispatch<SetStateAction<ActiveItemState>>;
};

export type SortableImageProps = {
  img: ClientSideImage;
} & ContainerIDPayload;

type ContainerIDPayload = {
  containerID: string;
};

/*************************Drag Over Event types*************************/

export type DragOverType =
  | typeof IGNORE_DRAG
  | typeof DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER
  | typeof DRAG_FROM_ROW_TO_SIDEBAR__IMAGE
  | typeof DRAG_FROM_ROW_TO_ROW__CONTAINER
  | typeof DRAG_FROM_ROW_TO_ROW__IMAGE
  | typeof DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER
  | typeof DRAG_FROM_SIDEBAR_TO_ROW__IMAGE;

export type OverItemEventData = OverImageEventData | OverRowEventData | OverSidebarEventData;

type OverImageEventData = DragOverEvent["over"] & ActiveImageEventData;

type ActiveImageEventData = DragOverEvent["active"] & {
  id: string;
  data: {
    current:
      | (DragOverEvent["active"]["data"]["current"] & {
          containerID: string;
          img: ClientSideImage;
          type: typeof IMAGE;
        })
      | undefined;
  };
};

type OverRowEventData = DragOverEvent["over"] & {
  id: string;
  data: {
    current:
      | {
          type: typeof CONTAINER;
          containerID: OverRowEventData["id"];
        }
      | undefined;
  };
};

type OverSidebarEventData = DragOverEvent["over"] & {
  id: typeof SIDEBAR;
  data: {
    current:
      | {
          type: typeof CONTAINER;
          containerID: typeof SIDEBAR;
        }
      | undefined;
  };
};
/**********************************************************************/

/*************************Drag End Event types*************************/

export type DragEndType = typeof DRAG_END_WITHIN_ROW | typeof DRAG_END_WITHIN_SIDEBAR | typeof IGNORE_DRAG;

/**********************************************************************/

export type UploadParam = {
  formData: FormData;
  metaData: {
    lengths: { thumbnail: number; sidebar: number; [key: string]: number };
    order: string[];
  };
};
