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

export type SaveTierListResponse = {
  id: string;
  title: string;
  data: TierListData | string; // idk why tf axios sometimes parses and sometimes doesn't
  description: string | null;
  thumbnail: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

type AddedImage =
  | {
      location: "sidebar";
      index: number;
    }
  | {
      location: "row";
      rowID: string;
      index: number;
    };

export type DiffData = {
  isChanged: boolean;
  metadata: {
    added: AddedImage[];
  };
};

export type DiffParam = {
  clientData: TierListData | undefined;
  serverData: TierListData | undefined;
};

export type PaginationMetadata = {
  path: string;
  per_page: number;
  next_cursor: null | string;
  next_page_url: null | string;
  prev_cursor: null | string;
  prev_page_url: null | string;
};

export type UserTierListsResponse = PaginationMetadata & {
  data: Array<{
    id: string;
    title: string;
    description: null | string;
    thumbnail: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
  }>;
};
