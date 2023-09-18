import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";

export const useClickOutModal = (close: () => void) => {
  const [clickable1, setClickable1] = useState<HTMLElement | null>(null); // click on image doesn't close modal
  const [clickable2, setClickable2] = useState<HTMLElement | null>(null); // click on download button doesn't close modal

  useClickOutside(close, null, [clickable1, clickable2]);

  return [setClickable1, setClickable2];
};
