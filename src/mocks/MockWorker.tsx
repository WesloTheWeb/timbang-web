"use client";

import { useEffect } from "react";
import { startWorker } from "./browser";

// Starts the mock Service Worker, then reports back. Loaded by MSWProvider with
// ssr: false, because "msw/browser" can't be resolved in a server build.
export default function MockWorker({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // If the worker can't start (e.g. no Service Worker support), still render
    // the app; requests then go to the real network.
    startWorker().then(onReady, (error) => {
      console.error("[MSW] Failed to start; using the real network.", error);
      onReady();
    });
  }, [onReady]);

  return null;
}
