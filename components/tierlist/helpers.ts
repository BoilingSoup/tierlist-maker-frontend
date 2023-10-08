import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useFullscreen } from "@mantine/hooks";
import { nanoid } from "nanoid";
import { saveAs } from "file-saver";
import DomToImage from "dom-to-image";
import { Dispatch, SetStateAction } from "react";
import { append, filterByID, findIndexByID, insertAtIndex, pxToNumber } from "../common/helpers";
import {
  CONTAINER,
  DOM_TO_PNG_ID,
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
  MAX_IMAGE_SIZE,
  SIDEBAR,
  SWATCHES,
} from "./constants";
import {
  ActiveItem,
  ActiveItemState,
  ClientSideImage,
  DiffData,
  DiffParam,
  DragEndType,
  DragOverType,
  FullScreenProp,
  OverItemEventData,
  SaveTierListParam,
  SortableImageProps,
  TierListData,
  TierListRowData,
  UpdateActiveItemParam,
  UploadParam,
} from "./types";
import imageCompression from "browser-image-compression";
import { THUMBNAIL_WIDTH } from "../../config/config";
import { SetDataArg } from "../../hooks/store/types";
import { UploadResponse } from "../../hooks/api/types";

/** Converts value of useFullscreen() to prop used in components */
export const getFullScreenProp = (fullScreen: ReturnType<typeof useFullscreen>): FullScreenProp => ({
  toggle: fullScreen.toggle,
  state: fullScreen.fullscreen,
});

const updateActiveItem = ({ event, setActiveItem }: UpdateActiveItemParam) => {
  const activeItemProperties = getActiveItemProperties(event);

  // Only returns undefined if dnd-kit was misconfigured
  if (activeItemProperties === undefined) {
    return;
  }

  const { id, src, containerID } = activeItemProperties;
  return setActiveItem({ id, src, containerID });
};

const getActiveItemProperties = (event: DragOverEvent | DragStartEvent): ActiveItem | undefined => {
  const { active } = event;

  // Only returns undefined if dnd-kit was misconfigured
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

  const overItemData = over.data.current;
  // Only returns undefined if dnd-kit was misconfigured
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
const getDragOverType = (event: DragOverEvent): DragOverType => {
  const { somethingWentWrong, activeItemProperties, overItemProperties } = getDragEventData(event);

  // NOTE: should never return true unless dnd-kit node refs gets misconfigured
  if (somethingWentWrong) {
    return IGNORE_DRAG;
  }

  const { containerID: activeItemContainerID } = activeItemProperties;

  const { type: overItemType, containerID: overItemContainerID } = overItemProperties;

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

  const dragIsFromRowToSidebar = activeItemContainerID !== SIDEBAR && overItemContainerID === SIDEBAR;

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

  const dragIsFromSidebarToRow = activeItemContainerID === SIDEBAR && overItemContainerID !== SIDEBAR;

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

  const dragIsFromRowToAnotherRow = activeItemContainerID !== SIDEBAR && overItemContainerID !== SIDEBAR;

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
type DragEventData =
  | {
      somethingWentWrong: true;
      activeItemProperties: undefined;
      overItemProperties: undefined;
    }
  | {
      somethingWentWrong: false;
      activeItemProperties: NonNullable<ReturnType<typeof getActiveItemProperties>>;
      overItemProperties: NonNullable<ReturnType<typeof getOverItemProperties>>;
    };

const getDragEventData = (event: DragOverEvent | DragEndEvent): DragEventData => {
  const unexpectedPath: DragEventData = {
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
const dispatchDragOverAction = ({ dragOverType, event, data, setData }: DispatchDragOverActionParam) => {
  const { somethingWentWrong, overItemProperties, activeItemProperties } = getDragEventData(event);

  if (dragOverType === IGNORE_DRAG || somethingWentWrong) {
    return;
  }

  const { containerID: activeItemContainerID, id: activeItemID, src: activeItemSrc } = activeItemProperties;

  const { containerID: overItemContainerID, id: overItemID } = overItemProperties;

  const draggedImage: ClientSideImage = {
    id: activeItemID,
    src: activeItemSrc,
  };

  //
  // Init these variables outside of switch/case or I can't reuse their names inside different cases due to scope clash.
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
            const imageWasDraggedOutOfThisRow = row.id === activeItemContainerID;
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

      overItemIndex = findIndexByID(data.rows[overItemRowIndex].items, overItemID);

      setData(
        (prev): TierListData => ({
          sidebar: filterByID(prev.sidebar, activeItemID),
          rows: prev.rows.map((row, index) => {
            const imageWasDraggedIntoThisRow = index === overItemRowIndex;
            if (imageWasDraggedIntoThisRow) {
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
      activeItemContainerIndex = findIndexByID(data.rows, activeItemContainerID);

      overItemRowIndex = findIndexByID(data.rows, overItemContainerID);

      overItemIndex = findIndexByID(data.rows[overItemRowIndex].items, overItemID);

      setData(
        (prev): TierListData => ({
          sidebar: prev.sidebar,
          rows: prev.rows.map((row, index) => {
            const imageWasDraggedOutOfThisRow = index === activeItemContainerIndex;
            if (imageWasDraggedOutOfThisRow) {
              return {
                ...row,
                items: filterByID(row.items, activeItemID),
              };
            }

            const imageWasDraggedIntoThisRow = index === overItemRowIndex;
            if (imageWasDraggedIntoThisRow) {
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
            const imageWasDraggedOutOfThisRow = row.id === activeItemContainerID;
            if (imageWasDraggedOutOfThisRow) {
              return {
                ...row,
                items: filterByID(row.items, activeItemID),
              };
            }

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

    default:
      return;
  }
};

// The dragEnd event handles rearranging images within the same container.
// ex: Moving an image in the place of another image within the same row or sidebar.
//
// Images handled by this event are guaranteed to be within the same container,
// because the dragOver event is fired first when an image is moved between containers.
//
// i.e. An image being dragged into a different container will be added to that container
// as soon as the pointer is hovered over the container.
// It is only after this transfer that the dragEnd event can be triggered,
// at which point the state has already reflected that the image is in the new container.
const getDragEndType = (event: DragEndEvent): DragEndType => {
  const { somethingWentWrong, activeItemProperties, overItemProperties } = getDragEventData(event);

  // NOTE: should never return true unless dnd-kit node refs gets misconfigured
  if (somethingWentWrong) {
    return IGNORE_DRAG;
  }

  const { type: overItemType, containerID: overItemContainerID } = overItemProperties;

  const { containerID: activeItemContainerID } = activeItemProperties;

  // Inside a container, an image can be dropped on another image, rearranging the order of images.
  // Or an image can be dropped on the container root itself.
  switch (true) {
    // if dropped on the container root, ignore
    case overItemType === CONTAINER:
      return IGNORE_DRAG;

    // Otherwise, images must be rearranged

    case activeItemContainerID === SIDEBAR && overItemContainerID === SIDEBAR:
      return DRAG_END_WITHIN_SIDEBAR;

    case activeItemContainerID !== SIDEBAR && overItemContainerID !== SIDEBAR:
      return DRAG_END_WITHIN_ROW;
  }

  // NOTE: should never reach here.
  console.log("unexpected drag");
  return IGNORE_DRAG;
};

type DispatchDragEndActionParam = {
  dragEndType: DragEndType;
  event: DragEndEvent;
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
};
const dispatchDragEndAction = ({ dragEndType, event, data, setData }: DispatchDragEndActionParam) => {
  const { somethingWentWrong, overItemProperties, activeItemProperties } = getDragEventData(event);

  if (somethingWentWrong) {
    return;
  }

  const { id: activeItemID, containerID: activeItemContainerID } = activeItemProperties;

  const { id: overItemID } = overItemProperties;

  //
  // Init these variables outside of switch/case or I can't reuse their names inside different cases due to scope clash.
  let overItemIndex: number;
  let activeItemIndex: number;
  //
  //

  switch (dragEndType) {
    case IGNORE_DRAG:
      return;

    case DRAG_END_WITHIN_SIDEBAR:
      activeItemIndex = findIndexByID(data.sidebar, activeItemID);
      overItemIndex = findIndexByID(data.sidebar, overItemID);

      setData((prev) => {
        return {
          sidebar: arrayMove(prev.sidebar, activeItemIndex, overItemIndex),
          rows: prev.rows,
        };
      });
      return;

    case DRAG_END_WITHIN_ROW:
      const rowIndex = findIndexByID(data.rows, activeItemContainerID);
      activeItemIndex = findIndexByID(data.rows[rowIndex].items, activeItemID);
      overItemIndex = findIndexByID(data.rows[rowIndex].items, overItemID);
      setData(
        (prev): TierListData => ({
          sidebar: prev.sidebar,
          rows: prev.rows.map((row) => {
            const isRowThatTriggeredEvent = row.id === activeItemContainerID;
            if (isRowThatTriggeredEvent) {
              return {
                ...row,
                items: arrayMove(row.items, activeItemIndex, overItemIndex),
              };
            }
            return row;
          }),
        })
      );
      return;
  }
};

type DragHandlers = {
  start: (event: DragStartEvent) => void;
  over: (event: DragOverEvent) => void;
  end: (event: DragEndEvent) => void;
};

export type GetDragHandlersParam = {
  setActiveItem: Dispatch<SetStateAction<ActiveItemState>>;
  data: TierListData;
  setData: Dispatch<SetStateAction<TierListData>>;
  enabled?: boolean;
};

export const getDragHandlers = ({ setActiveItem, data, setData, enabled }: GetDragHandlersParam): DragHandlers => {
  if (!enabled) {
    return {
      start(event: DragStartEvent) {},
      over(event: DragOverEvent) {},
      end(event: DragEndEvent) {},
    };
  }

  const handleDragStart = (event: DragStartEvent) => {
    updateActiveItem({ event, setActiveItem });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const dragOverType = getDragOverType(event);
    dispatchDragOverAction({ dragOverType, event, data: data!, setData });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const dragEndType = getDragEndType(event);
    dispatchDragEndAction({ dragEndType, event, data: data!, setData });
  };

  return { start: handleDragStart, over: handleDragOver, end: handleDragEnd };
};

type RowHandlers = {
  moveRowUp: (rowID: string) => void;
  moveRowDown: (rowID: string) => void;
  changeLabel: (param: { rowID: string; label: string }) => void;
  changeColor: (param: { rowID: string; color: string }) => void;
  addRowAbove: (rowID: string) => void;
  addRowBelow: (rowID: string) => void;
  deleteRow: (rowID: string) => void;
  clearRow: (rowID: string) => void;
  addImage: (newImage: ClientSideImage[]) => void;
  deleteImage: (droppableID: string, imgID: string) => void;
  deleteAllImages: () => void;
  moveAllImages: () => void;
};

export type GetRowHandlersParam = {
  data: TierListData;
  setData: ((arg: SetDataArg) => Promise<void>) | ((arg: SetDataArg) => void);
  enabled?: boolean;
};

export const getRowHandlers = ({ data, setData, enabled }: GetRowHandlersParam): RowHandlers => {
  if (!enabled) {
    return {
      moveRowUp: (rowID: string) => {},
      moveRowDown: (rowID: string) => {},
      changeLabel: (param: { rowID: string; label: string }) => {},
      changeColor: (param: { rowID: string; color: string }) => {},
      addRowAbove: (rowID: string) => {},
      addRowBelow: (rowID: string) => {},
      deleteRow: (rowID: string) => {},
      clearRow: (rowID: string) => {},
      addImage: (newImage: ClientSideImage[]) => {},
      deleteImage: (droppableID: string, imgID: string) => {},
      deleteAllImages: () => {},
      moveAllImages: () => {},
    };
  }

  const moveRowUp = (rowID: string) => {
    const currRowIndex = findIndexByID(data.rows, rowID);
    if (currRowIndex < 1) {
      return;
    }

    const newRowIndex = currRowIndex - 1;

    setData(
      (prev: TierListData): TierListData => ({
        rows: arrayMove(prev!.rows, currRowIndex, newRowIndex),
        sidebar: prev!.sidebar,
      })
    );
  };

  const moveRowDown = (rowID: string) => {
    const currRowIndex = findIndexByID(data.rows, rowID);
    const isUnmovable = currRowIndex === -1 || currRowIndex === data.rows.length - 1;
    if (isUnmovable) {
      return;
    }

    const newRowIndex = currRowIndex + 1;

    setData(
      (prev): TierListData => ({
        rows: arrayMove(prev!.rows, currRowIndex, newRowIndex),
        sidebar: prev!.sidebar,
      })
    );
  };

  const changeLabel = ({ rowID, label }: { rowID: string; label: string }) => {
    setData(
      (prev): TierListData => ({
        rows: prev!.rows.map((row) => {
          if (row.id !== rowID) {
            return row;
          }
          return { id: row.id, color: row.color, items: row.items, label };
        }),
        sidebar: prev!.sidebar,
      })
    );
  };

  const changeColor = ({ rowID, color }: { rowID: string; color: string }) => {
    setData(
      (prev): TierListData => ({
        rows: prev!.rows.map((row) => {
          if (row.id !== rowID) {
            return row;
          }
          return { id: row.id, color, items: row.items, label: row.label };
        }),
        sidebar: prev!.sidebar,
      })
    );
  };

  const addRowAbove = (rowID: string) => {
    const rowsCopy = [...data.rows];
    const insertAtIndex = findIndexByID(rowsCopy, rowID);
    const newRow: TierListRowData = { id: nanoid(), color: randomSwatch(), items: [], label: "NEW" };
    rowsCopy.splice(insertAtIndex, -1, newRow);

    setData((prev): TierListData => ({ rows: rowsCopy, sidebar: prev!.sidebar }));
  };

  const addRowBelow = (rowID: string) => {
    const rowsCopy = [...data.rows];
    const insertAtIndex = findIndexByID(rowsCopy, rowID) + 1;
    const newRow: TierListRowData = { id: nanoid(), color: randomSwatch(), items: [], label: "NEW" };
    rowsCopy.splice(insertAtIndex, -1, newRow);

    setData((prev): TierListData => ({ rows: rowsCopy, sidebar: prev!.sidebar }));
  };

  const deleteRow = (rowID: string) => {
    const rowIndex = findIndexByID(data.rows, rowID);
    const rowItems = data.rows[rowIndex].items;
    setData(
      (prev): TierListData => ({
        rows: prev!.rows.filter((row) => row.id !== rowID),
        sidebar: [...prev!.sidebar, ...rowItems],
      })
    );
  };

  const clearRow = (rowID: string) => {
    const rowIndex = findIndexByID(data.rows, rowID);
    const rowItems = data.rows[rowIndex].items;
    setData(
      (prev): TierListData => ({
        rows: prev!.rows.map((row) => {
          if (row.id !== rowID) {
            return row;
          }
          return { id: row.id, color: row.color, items: [], label: row.label };
        }),
        sidebar: [...prev!.sidebar, ...rowItems],
      })
    );
  };

  const addImage = (newImage: ClientSideImage[]) => {
    setData(
      (prev): TierListData => ({
        sidebar: append(prev!.sidebar, ...newImage),
        rows: prev!.rows,
      })
    );
  };

  const deleteImage = (droppableID: string, imgID: string) => {
    const droppableIndex = findIndexByID(data.rows, droppableID);
    const isRow = droppableIndex !== -1;

    setData(
      (prev): TierListData => ({
        rows: isRow
          ? prev!.rows.map((row) => {
              if (row.id !== row.id) {
                return row;
              }
              return {
                id: row.id,
                color: row.color,
                items: row.items.filter((item) => item.id !== imgID),
                label: row.label,
              };
            })
          : prev!.rows,
        sidebar: isRow ? prev!.sidebar : prev!.sidebar.filter((item) => item.id !== imgID),
      })
    );
  };

  const deleteAllImages = () => {
    setData((prev) => ({
      rows: prev!.rows.map((row) => ({ id: row.id, color: row.color, items: [], label: row.label })),
      sidebar: [],
    }));
  };

  const moveAllImages = () => {
    setData((prev) => {
      const allRowImages: ClientSideImage[] = [];
      const blankRows: TierListRowData[] = [];

      prev!.rows.forEach((row) => {
        row.items.forEach((item) => allRowImages.push(item));
        blankRows.push({ id: row.id, color: row.color, items: [], label: row.label });
      });

      return {
        rows: blankRows,
        sidebar: [...prev!.sidebar, ...allRowImages],
      };
    });
  };

  return {
    moveRowUp,
    moveRowDown,
    changeLabel,
    changeColor,
    addRowAbove,
    addRowBelow,
    deleteRow,
    clearRow,
    deleteImage,
    deleteAllImages,
    moveAllImages,
    addImage,
  };
};

const randomSwatch = () => SWATCHES[Math.floor(Math.random() * SWATCHES.length)];

export const compressImage = async (file: File, maxDimension?: number) => {
  const compressionOpts = {
    maxSizeMB: 0.9,
    maxWidthOrHeight: maxDimension ?? pxToNumber(MAX_IMAGE_SIZE),
    useWebWorker: true,
  };

  return await imageCompression(file, compressionOpts);
};

type GetImageHandlersParam = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsExporting: (newValue: boolean) => void;
  setIsDownloading: Dispatch<SetStateAction<boolean>>;
  setImgSrc: Dispatch<SetStateAction<string>>;
  openModal: () => void;
};

export const getImageHandlers = ({
  setIsLoading,
  setIsExporting,
  setIsDownloading,
  setImgSrc,
  openModal,
}: GetImageHandlersParam) => {
  const handleExportPreview = () => {
    setIsLoading(true);

    const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;
    openModal();

    setIsExporting(true); // toolbars/delete buttons are hidden while exporting. Don't want those in the screenshot.

    DomToImage.toPng(div)
      .then((dataUrl) => {
        setImgSrc(dataUrl);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDownloadImage = () => {
    setIsDownloading(true);

    const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;

    setIsExporting(true);

    DomToImage.toBlob(div)
      .then((blob) => {
        saveAs(blob, `tierlist.png`);
      })
      .finally(() => {
        setIsDownloading(false);
      });
  };

  return { handleExportPreview, handleDownloadImage };
};

function padTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

export function dateInYyyyMmDdHhMmSs(date: Date, dateDiveder: string = "-") {
  // :::: Exmple Usage ::::
  // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
  // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
  //console.log(dateInYyyyMmDdHhMmSs(new Date()));

  //  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
  // Date divider
  // 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
  // console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
  return (
    [date.getFullYear(), padTwoDigits(date.getMonth() + 1), padTwoDigits(date.getDate())].join(dateDiveder) +
    " " +
    [padTwoDigits(date.getHours()), padTwoDigits(date.getMinutes()), padTwoDigits(date.getSeconds())].join(":")
  );
}

export async function generateFormData({
  data,
  setHideToolbars,
}: {
  data: TierListData;
  setHideToolbars: (v: boolean) => void;
}): Promise<[FormData, UploadParam["metaData"]]> {
  // images must be uploaded as FormData, a flat data structure.
  const fd = new FormData();

  // metadata of the flattened TierListData so responses can be reconstructed back into an object after files are uploaded
  const lengths: { thumbnail: number; sidebar: number; [key: string]: number } = {
    thumbnail: 1,
    sidebar: data.sidebar.length,
  };
  const order: string[] = ["thumbnail", "sidebar"];

  // 2 different Blob types and they're causing conflict. Using any[] instead
  let images: any[] = [];

  const div = document.getElementById(DOM_TO_PNG_ID)! as HTMLDivElement;

  setHideToolbars(true);
  images.push(
    DomToImage.toBlob(div)
      .then((blob) => {
        return compressImage(new File([blob], "blob", { type: "image/jpeg" }), THUMBNAIL_WIDTH);
      })
      .catch((err) => console.error(err))
      .finally(() => setHideToolbars(false))
  );

  data.sidebar.forEach((el) => images.push(fetch(el.src).then((res) => res.blob())));

  for (let row of data.rows) {
    lengths[row.id] = row.items.length;
    order.push(row.id);

    for (let img of row.items) {
      images.push(fetch(img.src).then((res) => res.blob()));
    }
  }

  images = await Promise.all(images);

  const LARAVEL_MULTI_FILE_INPUT_SUFFIX = "[]"; // Laravel looks for suffix "[]" in the input name to run multi file validations
  const FORM_DATA_KEY = "image" + LARAVEL_MULTI_FILE_INPUT_SUFFIX;

  for (let i = 0; i < images.length; ++i) {
    fd.append(FORM_DATA_KEY, images[i]);
  }

  return [fd, { lengths, order }];
}

export function checkForDiff({ clientData, serverData }: DiffParam): DiffData {
  let out: DiffData = { isChanged: false, metadata: { added: [] } };

  const dataNotReady = serverData === undefined || clientData === undefined;
  if (dataNotReady) {
    return out;
  }

  const clientImages: Record<string, boolean> = {};

  for (let i = 0; i < clientData.sidebar.length; ++i) {
    const image = clientData.sidebar[i];

    if (image.src.startsWith("data:")) {
      out.isChanged = true;
      out.metadata.added.push({ location: "sidebar", index: i });
    } else {
      clientImages[image.src] = true;
    }
  }

  for (let clientRow of clientData.rows) {
    const items = clientRow.items;

    for (let i = 0; i < items.length; ++i) {
      const image = items[i];

      if (image.src.startsWith("data:")) {
        out.isChanged = true;
        out.metadata.added.push({ location: "row", rowID: clientRow.id, index: i });
      } else {
        clientImages[image.src] = true;
      }
    }
  }

  for (let serverSidebarImage of serverData.sidebar) {
    const serverSrc = serverSidebarImage.src;

    if (!clientImages[serverSrc]) {
      out.isChanged = true;
    }
  }

  for (let serverRow of serverData.rows) {
    for (let serverRowImage of serverRow.items) {
      const serverSrc = serverRowImage.src;

      if (!clientImages[serverSrc]) {
        out.isChanged = true;
      }
    }
  }

  // Not 10000% accurate, out.isChanged will be false if the user
  // swaps image positions and the lengths of containers do not change.
  // But it's good enough for most scenarios.
  if (clientData.sidebar.length !== serverData.sidebar.length) {
    out.isChanged = true;
  } else if (clientData.rows.length !== serverData.rows.length) {
    out.isChanged = true;
  } else {
    for (let i = 0; i < clientData.rows.length; ++i) {
      if (clientData.rows[i].items.length !== serverData.rows[i].items.length) {
        out.isChanged = true;
      }
    }
  }

  return out;
}

const punctuationRegex = new RegExp(/[.|!|?]/);

export function titleCase(title: string): string {
  const words = title.split(" ");
  const capitalized = words.map((word) => (word[0] !== undefined ? word[0].toUpperCase() + word.slice(1) : ""));
  return capitalized.join(" ");
}

export function lastCharIsPunctuation(input: string | null) {
  if (input === null || input.length === 0) {
    return false;
  }

  return punctuationRegex.test(input[input.length - 1]);
}

export function capitalizeSentences(text: string): string {
  const sentences = text.split(punctuationRegex);
  const capitalizedArr = sentences.map((sentence) =>
    sentence[0] !== undefined ? sentence[0].toUpperCase() + sentence.slice(1) : ""
  );
  const capitalizedStr = capitalizedArr.join(" ").trim();

  return lastCharIsPunctuation(capitalizedStr) ? capitalizedStr : capitalizedStr + ".";
}

type ReconstructDeps = {
  response: UploadResponse;
  metadata: {
    lengths: { thumbnail: number; sidebar: number; [key: string]: number };
    order: string[];
  };
  title: string;
  placeholder: string;
  tierListData: TierListData;
  description?: string;
  isPublic: boolean;
};

/**
 * Replaces TierListData image Blobs with src links
 */
export function reconstructPayload({
  response,
  metadata,
  title,
  placeholder,
  tierListData,
  description,
  isPublic,
}: ReconstructDeps): SaveTierListParam["payload"] {
  const payload: SaveTierListParam["payload"] = {
    title: title.trim() === "" ? placeholder : title.trim(),
    data: JSON.parse(JSON.stringify(tierListData)) as TierListData,
    thumbnail: "",
    description,
    is_public: isPublic,
  };

  const { order, lengths } = metadata;
  let offset = 0;

  for (let id of order) {
    let rowIndex = -1;

    if (id !== "thumbnail" && id !== "sidebar") {
      rowIndex = payload.data.rows.findIndex((row) => row.id.toString() === id);
    }

    for (let i = 0; i < lengths[id]; ++i) {
      switch (id) {
        case "thumbnail":
          payload.thumbnail = response.data[offset + i];
          break;

        case "sidebar":
          payload.data.sidebar[i].src = response.data[offset + i];
          break;

        default:
          if (rowIndex !== -1) {
            payload.data.rows[rowIndex].items[i].src = response.data[offset + i];
          }

          break;
      }
    }
    offset += lengths[id];
  }

  return payload;
}
