import { useEffect, useRef } from "react";

type CloseHandler = () => void;

// Shared stack so only the top-most overlay handles a back event.
const backCloseStack: symbol[] = [];
let handlingPopState = false;

export function useBackClose(open: boolean, onClose: CloseHandler) {
  const idRef = useRef<symbol>(Symbol("back-close"));
  const pushedRef = useRef(false);
  const ignorePopRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      // Another overlay already handled this popstate.
      if (handlingPopState) {
        return;
      }

      // Only the top-most overlay should react to back.
      const top = backCloseStack[backCloseStack.length - 1];
      if (top !== idRef.current) {
        return;
      }

      handlingPopState = true;

      // Back from the fake entry should close the panel, not the page.
      if (!ignorePopRef.current) {
        onClose();
      }
      ignorePopRef.current = false;
      pushedRef.current = false;
      backCloseStack.pop();

      queueMicrotask(() => {
        handlingPopState = false;
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onClose]);

  useEffect(() => {
    if (open && !pushedRef.current) {
      // Push a fake history entry so hardware back closes the panel.
      history.pushState({ __threadOpen: true }, "", location.href);
      pushedRef.current = true;
      backCloseStack.push(idRef.current);
      return;
    }

    if (!open && pushedRef.current) {
      // Closing via UI: pop the fake entry and ignore the popstate callback.
      ignorePopRef.current = true;
      history.back();
    }
  }, [open]);
}
