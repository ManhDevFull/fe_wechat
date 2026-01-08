"use client";

import React, {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type TooltipSide = "top" | "bottom";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;

  preferredSide?: TooltipSide;
  offset?: number;

  /** Nếu true: cho phép click/scroll/link bên trong tooltip */
  interactive?: boolean;

  tooltipClassName?: string;
  panelClassName?: string;
};

function mergeDescribedBy(existing: unknown, nextId: string) {
  const existingStr =
    typeof existing === "string" ? existing.trim() : "";

  if (!existingStr) return nextId;

  // Tránh trùng id
  const parts = existingStr.split(/\s+/).filter(Boolean);
  if (parts.includes(nextId)) return existingStr;

  return [...parts, nextId].join(" ");
}

const Tooltip = ({
  content,
  children,
  preferredSide = "top",
  offset = 12,
  interactive = false,
  tooltipClassName = "",
  panelClassName = "",
}: TooltipProps) => {
  const reactId = useId();
  const tooltipId = useMemo(() => `tooltip-${reactId.replace(/[:]/g, "")}`, [reactId]);

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<TooltipSide>(preferredSide);

  const updatePlacement = useCallback(() => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;

    // Tooltip đang invisible/opacity-0 vẫn đo được, nhưng nếu bị display:none thì không.
    const wrapperRect = wrapper.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const spaceAbove = wrapperRect.top;
    const spaceBelow = window.innerHeight - wrapperRect.bottom;

    const fitsAbove = spaceAbove >= tooltipRect.height + offset;
    const fitsBelow = spaceBelow >= tooltipRect.height + offset;

    let nextPlacement: TooltipSide;
    if (fitsAbove && fitsBelow) {
      nextPlacement = preferredSide;
    } else if (fitsAbove) {
      nextPlacement = "top";
    } else if (fitsBelow) {
      nextPlacement = "bottom";
    } else {
      nextPlacement = spaceAbove >= spaceBelow ? "top" : "bottom";
    }

    setPlacement(nextPlacement);
  }, [offset, preferredSide]);

  useLayoutEffect(() => {
    if (!open) return;

    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => updatePlacement());
    };

    schedule();

    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("scroll", schedule, true);
    };
  }, [open, updatePlacement]);

  const isTop = placement === "top";

  // Motion class (dễ đọc hơn)
  const motionClass = isTop
    ? open
      ? "translate-y-0"
      : "translate-y-2"
    : open
      ? "translate-y-0"
      : "-translate-y-2";

  const containerPointerEvents = interactive ? "pointer-events-auto" : "pointer-events-none";

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)} // hỗ trợ touch
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      // để focus được khi children không focusable (tùy bạn bỏ nếu không cần)
      tabIndex={React.isValidElement(children) ? -1 : 0}
    >
      {React.isValidElement(children) ? (
        React.cloneElement(children as React.ReactElement<any>, {
          "aria-describedby": mergeDescribedBy(
            (children.props as any)["aria-describedby"],
            tooltipId
          ),
        })
      ) : (
        <span aria-describedby={tooltipId}>{children}</span>
      )}

      <div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!open}
        ref={tooltipRef}
        className={[
          "absolute left-1/2 -translate-x-1/2",
          // tránh tràn màn hình: max width theo viewport
          "w-72 max-w-[calc(100vw-1rem)]",
          "transition-all duration-200 ease-out transform",
          containerPointerEvents,
          isTop ? "bottom-full" : "top-full",
          open ? "visible opacity-100" : "invisible opacity-0",
          motionClass,
          tooltipClassName,
        ].join(" ")}
        style={{
          marginBottom: isTop ? offset : undefined,
          marginTop: !isTop ? offset : undefined,
        }}
      >
        <div
          className={[
            "relative p-4",
            "bg-gradient-to-br from-gray-900/95 to-gray-800/95",
            "backdrop-blur-md rounded-2xl",
            "border border-white/10",
            "shadow-[0_0_30px_rgba(79,70,229,0.15)]",
            panelClassName,
          ].join(" ")}
        >
          <div className="relative z-10">{content}</div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-50" />

          <div
            className={[
              "absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 z-10",
              "bg-gradient-to-br from-gray-900/95 to-gray-800/95",
              "border-white/10",
              isTop ? "-bottom-1.5 border-r border-b" : "-top-1.5 border-l border-t",
            ].join(" ")}
          />
        </div>
      </div>
    </span>
  );
};

export default Tooltip;
