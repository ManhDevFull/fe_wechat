import { useEffect, useRef } from "react";

type CloseHandler = () => void;

export function useBackClose(open: boolean, onClose: CloseHandler) {
  const pushedRef = useRef(false);
  const ignorePopRef = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      if (!pushedRef.current) {
        return;
      }

      // Back from the fake entry should close the panel, not the page.
      pushedRef.current = false;
      if (!ignorePopRef.current) {
        onClose();
      }
      ignorePopRef.current = false;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [onClose]);

  useEffect(() => {
    if (open && !pushedRef.current) {
      // Push a fake history entry so hardware back closes the panel.
      history.pushState({ __threadOpen: true }, "", location.href);
      pushedRef.current = true;
      return;
    }

    if (!open && pushedRef.current) {
      // Closing via UI: pop the fake entry and ignore the popstate callback.
      ignorePopRef.current = true;
      history.back();
    }
  }, [open]);
}
