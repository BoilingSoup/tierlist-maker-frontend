import { useRouter } from "next/router";
import { useEffect } from "react";
import { DiffData } from "../../components/tierlist/types";

let leaveConfirmed = false;
let isChanged = false;

export const useConfirmationOnExitIfUnsavedChanges = (diff: DiffData) => {
  const router = useRouter();

  /**
   * reset gloal vars on mount
   */
  useEffect(() => {
    leaveConfirmed = false;
    isChanged = false;
  }, []);

  /**
   * update global vars on react state change
   */
  useEffect(() => {
    if (diff.isChanged) {
      isChanged = true;
    } else {
      isChanged = false;
    }
  }, [diff]);

  /**
   * use global vars + state to conditionally add confirmations when navigating away from potentially unsaved data
   */
  useEffect(() => {
    window.onbeforeunload = function () {
      if (diff.isChanged) {
        return true;
      } else {
        return null;
      }
    };

    router.events.on("routeChangeStart", () => {
      // state is not working properly while this event fires, not even zustand store state.
      // Maybe NextJS is blowing away state during navigation...
      //
      // Anyway -- I use variables OUTSIDE react + useEffect to maintain these states as they are persisting properly.
      if (!isChanged || leaveConfirmed) {
        return;
      }

      if (
        window.confirm(
          "This page is asking you to confirm that you want to leave — information you’ve entered may not be saved."
        )
      ) {
        leaveConfirmed = true;
      } else {
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      }
    });
  }, [diff]);
};
