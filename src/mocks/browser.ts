import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

let started: Promise<unknown> | undefined;

// Start once, even though React Strict Mode runs effects twice in dev.
export function startWorker() {
  // "bypass": requests with no handler (Next assets, HMR) go to the network.
  started ??= worker.start({ onUnhandledFrame: "bypass" });
  return started;
}
