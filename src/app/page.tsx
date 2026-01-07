"use client";

import { useCallback, useEffect, useState } from "react";
import { detectDeviceAndMode, type DetectionResult } from "../lib/device";

export default function Home() {
  const [result, setResult] = useState<DetectionResult | null>(null);

  const runDetection = useCallback(() => {
    setResult(detectDeviceAndMode());
  }, []);

  useEffect(() => {
    runDetection();
  }, [runDetection]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold">Device &amp; PWA Detector</h1>
          {result?.isInstalled ? (
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800">
              Installed
            </span>
          ) : null}
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Device:</span>{" "}
            {result ? result.device : "Detecting..."}
          </p>
          <p>
            <span className="font-medium">Mode:</span>{" "}
            {result ? result.mode : "Detecting..."}
          </p>
          <p>
            <span className="font-medium">URL:</span>{" "}
            {result ? result.origin : "Detecting..."}
          </p>
        </div>

        <button
          type="button"
          onClick={runDetection}
          className="mt-5 w-full rounded-lg border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Refresh detection
        </button>

        <div className="mt-4 space-y-1 text-xs text-slate-500">
          <p>
            width: {result ? `${result.width}px` : "-"} | pointer:{" "}
            {result ? result.pointer : "-"}
          </p>
          <p>ua: {result ? result.userAgent : "-"}</p>
        </div>
      </div>
    </div>
  );
}
