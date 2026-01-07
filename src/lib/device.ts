export type DeviceType = "Mobile" | "Desktop/Laptop";
export type RunningMode = "PWA Standalone" | "Browser";
export type PointerType = "coarse" | "fine" | "unknown";

export type DetectionResult = {
  device: DeviceType;
  mode: RunningMode;
  width: number;
  pointer: PointerType;
  userAgent: string;
  origin: string;
  isInstalled: boolean;
};

const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod|Mobile/i;

type NavigatorWithUAData = Navigator & {
  userAgentData?: {
    mobile?: boolean;
  };
  standalone?: boolean;
};

export function detectDeviceAndMode(): DetectionResult {
  const nav = navigator as NavigatorWithUAData;
  const ua = nav.userAgent ?? "";

  const matchMedia = window.matchMedia?.bind(window);
  const pointerCoarse = matchMedia?.("(pointer: coarse)").matches ?? false;
  const pointerFine = matchMedia?.("(pointer: fine)").matches ?? false;

  const isMobile =
    pointerCoarse || nav.userAgentData?.mobile === true || MOBILE_UA_REGEX.test(ua);

  const device: DeviceType = isMobile ? "Mobile" : "Desktop/Laptop";
  const pointer: PointerType = pointerCoarse
    ? "coarse"
    : pointerFine
      ? "fine"
      : "unknown";

  const isStandalone =
    (matchMedia?.("(display-mode: standalone)").matches ?? false) ||
    nav.standalone === true;
  const mode: RunningMode = isStandalone ? "PWA Standalone" : "Browser";

  return {
    device,
    mode,
    width: window.innerWidth,
    pointer,
    userAgent: ua.length > 80 ? `${ua.slice(0, 77)}...` : ua,
    origin: window.location.origin,
    isInstalled: isStandalone,
  };
}
