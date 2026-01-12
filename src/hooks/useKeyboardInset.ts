import { useEffect, useState } from "react";

export function useKeyboardInset(enabled: boolean) {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setInset(0);
      return;
    }

    const viewport = window.visualViewport;
    if (!viewport) {
      setInset(0);
      return;
    }

    const updateInset = () => {
      // keyboard height ≈ innerHeight - visualViewport.height - offsetTop
      const keyboard =
        window.innerHeight - viewport.height - (viewport.offsetTop ?? 0);
      setInset(Math.max(0, Math.round(keyboard)));
    };

    updateInset();
    viewport.addEventListener("resize", updateInset);
    viewport.addEventListener("scroll", updateInset);

    return () => {
      viewport.removeEventListener("resize", updateInset);
      viewport.removeEventListener("scroll", updateInset);
    };
  }, [enabled]);

  return inset;
}
