import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useFullscreen } from "@mantine/hooks";
import { Dispatch, SetStateAction } from "react";
import {
  CONTAINER,
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
import {
  ActiveItem,
  ClientSideImage,
  DragOverType,
  FullScreenProp,
  OverItemEventData,
  SortableImageProps,
  TierListData,
  UpdateActiveItemParam,
} from "./types";

/** Converts value of useFullscreen() to prop used in components */
export const getFullScreenProp = (
  fullScreen: ReturnType<typeof useFullscreen>
): FullScreenProp => ({
  toggle: fullScreen.toggle,
  state: fullScreen.fullscreen,
});

export const updateActiveItem = ({
  event,
  setActiveItem,
}: UpdateActiveItemParam) => {
  const activeItemProperties = getActiveItemProperties(event);

  // Never seen this return undefined, but that's how dnd-kit types it. Maybe it returns undefined if misconfigured...
  if (activeItemProperties === undefined) {
    return setActiveItem(undefined);
  }

  const { id, src, containerID } = activeItemProperties;
  return setActiveItem({ id, src, containerID });
};

const getActiveItemProperties = (
  event: DragStartEvent | DragOverEvent
): ActiveItem | undefined => {
  const { active } = event;

  // Never seen this return undefined, but that's how dnd-kit types it. Maybe it returns undefined if misconfigured...
  const activeItemData = active.data.current as SortableImageProps | undefined;

  if (activeItemData === undefined) {
    return undefined;
  }

  const activeItemID = activeItemData.img.id;
  const activeItemSrc = activeItemData.img.src;
  const activeContainerID = activeItemData.containerID;

  return {
    id: activeItemID,
    src: activeItemSrc,
    containerID: activeContainerID,
  };
};

const getOverItemProperties = (event: DragOverEvent) => {
  // overrides dnd-kit's default Over type with more specific type including the item's metadata
  const over = event.over as OverItemEventData;

  const overItemData = over.data.current; // should never return undefined but typescript makes me check
  if (overItemData === undefined) {
    return undefined;
  }

  const overItemID = over.id;
  const overItemType = overItemData.type;
  const overItemContainerID = overItemData.containerID;

  return {
    id: overItemID,
    type: overItemType,
    containerID: overItemContainerID,
  };
};

// Images can be dragged from the sidebar to a row, or from a row to the sidebar + some minor variations.
// This function identifies which of the 7 possible branching conditions to take.
export const getDragOverType = (event: DragOverEvent): DragOverType => {
  const { somethingWentWrong, activeItemProperties, overItemProperties } =
    getDragOverEventData(event);

  // NOTE: should never return true unless dnd-kit node refs gets misconfigured
  if (somethingWentWrong) {
    return IGNORE_DRAG;
  }

  const { containerID: activeItemContainerID } = activeItemProperties;

  const { type: overItemType, containerID: overItemContainerID } =
    overItemProperties;

  // NOTE: Drags that occur within the same container are ignored in this event handler.
  // Drags within the same container are handled entirely by the DragEnd event.
  if (activeItemContainerID === overItemContainerID) {
    return IGNORE_DRAG;
  }

  //
  //  Branching possibilities:
  //
  //  - Image dragged from row to ...
  //    - sidebar container
  //    - an image in the sidebar container
  //    - another row container
  //    - an image in another row container
  //
  //  - Image dragged from sidebar to
  //    - a row container
  //    - an image in a row container
  //

  const dragIsFromRowToSidebar =
    activeItemContainerID !== SIDEBAR && overItemContainerID === SIDEBAR;

  if (dragIsFromRowToSidebar) {
    switch (overItemType) {
      case IMAGE:
        return DRAG_FROM_ROW_TO_SIDEBAR__IMAGE;

      case CONTAINER:
        return DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER;

      default:
        // NOTE: should never reach here.
        console.error("unexpected drag");
        return IGNORE_DRAG;
    }
  }

  const dragIsFromSidebarToRow =
    activeItemContainerID === SIDEBAR && overItemContainerID !== SIDEBAR;

  if (dragIsFromSidebarToRow) {
    switch (overItemType) {
      case IMAGE:
        return DRAG_FROM_SIDEBAR_TO_ROW__IMAGE;

      case CONTAINER:
        return DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER;

      default:
        // NOTE: should never reach here.
        console.error("unexpected drag");
        return IGNORE_DRAG;
    }
  }

  const dragIsFromRowToAnotherRow =
    activeItemContainerID !== SIDEBAR && overItemContainerID !== SIDEBAR;

  if (dragIsFromRowToAnotherRow) {
    switch (overItemType) {
      case IMAGE:
        return DRAG_FROM_ROW_TO_ROW__IMAGE;

      case CONTAINER:
        return DRAG_FROM_ROW_TO_ROW__CONTAINER;

      default:
        // NOTE: should never reach here.
        console.error("unexpected drag");
        return IGNORE_DRAG;
    }
  }

  // NOTE: should never reach here.
  console.log("unexpected drag");
  return IGNORE_DRAG;
};

// i.e. if somethingWentWrong (unexpected undefined/null value), other properties are undefined.
// if somethingWentWrong === false, asserts that other properties are not nullish or undefined.
type DragOverEventData =
  | {
      somethingWentWrong: true;
      activeItemProperties: undefined;
      overItemProperties: undefined;
    }
  | {
      somethingWentWrong: false;
      activeItemProperties: NonNullable<
        ReturnType<typeof getActiveItemProperties>
      >;
      overItemProperties: NonNullable<ReturnType<typeof getOverItemProperties>>;
    };

const getDragOverEventData = (event: DragOverEvent): DragOverEventData => {
  const unexpectedPath: DragOverEventData = {
    somethingWentWrong: true,
    activeItemProperties: undefined,
    overItemProperties: undefined,
  };

  const { active, over } = event;

  const itemsAreNullishForWhateverReason = !active || !over;
  if (itemsAreNullishForWhateverReason) {
    return unexpectedPath;
  }

  const activeItemProperties = getActiveItemProperties(event);
  if (activeItemProperties === undefined) {
    return unexpectedPath;
  }

  const overItemProperties = getOverItemProperties(event);
  if (overItemProperties === undefined) {
    return unexpectedPath;
  }

  // expected path
  return {
    somethingWentWrong: false,
    activeItemProperties,
    overItemProperties,
  };
};

type DispatchDragOverActionParam = {
  dragOverType: DragOverType;
  event: DragOverEvent;
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
};
export const dispatchDragOverAction = ({
  dragOverType,
  event,
  data,
  setData,
}: DispatchDragOverActionParam) => {
  const { somethingWentWrong, overItemProperties, activeItemProperties } =
    getDragOverEventData(event);

  if (dragOverType === IGNORE_DRAG || somethingWentWrong) {
    return;
  }

  const {
    containerID: activeItemContainerID,
    id: activeItemID,
    src: activeItemSrc,
  } = activeItemProperties;

  const { containerID: overItemContainerID, id: overItemID } =
    overItemProperties;

  const draggedImage: ClientSideImage = {
    id: activeItemID,
    src: activeItemSrc,
  };

  //
  // Init these variables outside of switch/case or I can't reuse their names due to scope clash.
  let overItemIndex: number;
  let overItemRowIndex: number;
  let activeItemContainerIndex: number;
  //
  //

  switch (dragOverType) {
    case DRAG_FROM_ROW_TO_SIDEBAR__IMAGE:
      overItemIndex = findIndexByID(data.sidebar, overItemID);

      setData((prev) => ({
        sidebar: insertAtIndex(prev.sidebar, draggedImage, overItemIndex),
        rows: prev.rows.map((row) => {
          const imageWasDraggedOutOfThisRow = row.id === activeItemContainerID;
          if (imageWasDraggedOutOfThisRow) {
            return {
              ...row,
              items: filterByID(row.items, activeItemID),
            };
          }

          return row;
        }),
      }));
      return;

    case DRAG_FROM_ROW_TO_SIDEBAR__CONTAINER:
      setData(
        (prev): TierListData => ({
          sidebar: append(prev.sidebar, draggedImage),
          rows: prev.rows.map((row) => {
            const imageWasDraggedOutOfThisRow =
              row.id === activeItemContainerID;
            if (imageWasDraggedOutOfThisRow) {
              return {
                ...row,
                items: filterByID(row.items, activeItemID),
              };
            }

            return row;
          }),
        })
      );
      return;

    case DRAG_FROM_SIDEBAR_TO_ROW__CONTAINER:
      setData(
        (prev): TierListData => ({
          sidebar: filterByID(prev.sidebar, activeItemID),
          rows: prev.rows.map((row) => {
            const imageWasDraggedIntoThisRow = row.id === overItemID;
            if (imageWasDraggedIntoThisRow) {
              return {
                ...row,
                items: append(row.items, draggedImage),
              };
            }

            return row;
          }),
        })
      );
      return;

    case DRAG_FROM_SIDEBAR_TO_ROW__IMAGE:
      overItemRowIndex = findIndexByID(data.rows, overItemContainerID);

      overItemIndex = findIndexByID(
        data.rows[overItemRowIndex].items,
        overItemID
      );

      setData(
        (prev): TierListData => ({
          sidebar: filterByID(prev.sidebar, activeItemID),
          rows: prev.rows.map((row, index) => {
            const imgWasDraggedIntoThisRow = index === overItemRowIndex;
            if (imgWasDraggedIntoThisRow) {
              return {
                ...row,
                items: insertAtIndex(row.items, draggedImage, overItemIndex),
              };
            }

            return row;
          }),
        })
      );
      return;

    case DRAG_FROM_ROW_TO_ROW__IMAGE:
      activeItemContainerIndex = findIndexByID(
        data.rows,
        activeItemContainerID
      );

      overItemRowIndex = findIndexByID(data.rows, overItemContainerID);

      overItemIndex = findIndexByID(
        data.rows[overItemRowIndex].items,
        overItemID
      );

      setData(
        (prev): TierListData => ({
          sidebar: prev.sidebar,
          rows: prev.rows.map((row, index) => {
            const imgWasDraggedOutOfThisRow =
              index === activeItemContainerIndex;
            if (imgWasDraggedOutOfThisRow) {
              return {
                ...row,
                items: filterByID(row.items, activeItemID),
              };
            }

            const imgWasDraggedIntoThisRow = index === overItemRowIndex;
            if (imgWasDraggedIntoThisRow) {
              return {
                ...row,
                items: insertAtIndex(row.items, draggedImage, overItemIndex),
              };
            }

            return row;
          }),
        })
      );
      return;

    case DRAG_FROM_ROW_TO_ROW__CONTAINER:
      setData(
        (prev): TierListData => ({
          sidebar: prev.sidebar,
          rows: prev.rows.map((row) => {
            const imgWasDraggedOutOfThisRow = row.id === activeItemContainerID;
            if (imgWasDraggedOutOfThisRow) {
              return {
                ...row,
                items: filterByID(row.items, activeItemID),
              };
            }

            const imgWasDraggedIntoThisRow = row.id === overItemID;
            if (imgWasDraggedIntoThisRow) {
              return {
                ...row,
                items: append(row.items, draggedImage),
              };
            }

            return row;
          }),
        })
      );
      return;

    default:
      return;
  }
};

/**
 * filterByID accepts an arr of objects that has a property of ["id"], and an id.
 * A new array is returned, excluding all elements in the original array that match the provided id.
 **/
const filterByID = <T extends { id: U }, U>(arr: T[], id: U): T[] => {
  return arr.filter((item) => item.id !== id);
};

/**
 * findIndexByID accepts an arr of objects that has a property of ["id"], and an id.
 * The index of the first element in the array that matches the provided id will be returned.
 * Otherwise, -1 will be returned.
 */
const findIndexByID = <T extends { id: U }, U>(arr: T[], id: U) => {
  return arr.findIndex((el) => el.id === id);
};

/** insertAtIndex returns a copy of arr with the provided data inserted at the specified index */
const insertAtIndex = <T>(arr: T[], data: T, index: number) => {
  return [...arr.slice(0, index), data, ...arr.slice(index)];
};

/** arrayPush returns a copy of arr with the provided data inserted at the end of the array */
const append = <T>(arr: T[], data: T) => [...arr, data];
