import { useEffect, useState } from "react";

export const useToggleDeleteTransitions = (duration: number) => {
  const [checked, setChecked] = useState(false);

  const [deleteAllVisible, setDeleteAllBtnVisible] = useState(false);
  const [moveAllVisible, setMoveAllBtnVisible] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const grace = 100; // +100ms extra assurance that exit transition has finished.

    if (checked) {
      setMoveAllBtnVisible(false);
      timer = setTimeout(() => setDeleteAllBtnVisible(true), duration + grace);
    } else {
      setDeleteAllBtnVisible(false);
      timer = setTimeout(() => setMoveAllBtnVisible(true), duration + grace);
    }

    return () => clearTimeout(timer);
  }, [checked]);

  return { checked, setChecked, deleteAllVisible, moveAllVisible };
};
