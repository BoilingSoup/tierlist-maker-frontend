import { useRouter } from "next/router";
import { useEffect } from "react";
import { DiffData } from "../../components/tierlist/types";

let leaveConfirmed = false;
let isChanged = false;

type Param = {
  diff: DiffData;
  enabled: boolean;
};

export const useConfirmationOnExitIfUnsavedChanges = ({ diff, enabled }: Param) => {
  const router = useRouter();

  /**
   * reset gloal vars on mount
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    leaveConfirmed = false;
    isChanged = false;
  }, [enabled]);

  /**
   * update global vars on react state change
   */
  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (diff.isChanged) {
      isChanged = true;
    } else {
      isChanged = false;
    }
  }, [diff, enabled]);

  /**
   * use global vars + state to conditionally add confirmations when navigating away from potentially unsaved data
   */
  useEffect(() => {
    window.onbeforeunload = function () {
      if (!enabled) {
        return null;
      }
      if (diff.isChanged) {
        return true;
      } else {
        return null;
      }
    };

    function handleLeave() {
      // state is not working properly while this event fires, not even zustand store state.
      // Maybe NextJS is blowing away state during navigation...
      //
      // Anyway -- I use variables OUTSIDE react + useEffect to maintain these states as these are persisting properly.
      if (!enabled || !isChanged || leaveConfirmed) {
        return;
      }

      if (
        window.confirm(
          "This page is asking you to confirm that you want to leave — information you’ve entered may not be saved."
        )
      ) {
        leaveConfirmed = true;
      } else {
        leaveConfirmed = false;
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      }
    }

    router.events.on("routeChangeStart", handleLeave);

    return () => {
      window.onbeforeunload = null;
      router.events.off("routeChangeStart", handleLeave);
    };
  }, [diff, enabled]);
};
