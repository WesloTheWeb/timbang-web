import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./src/mocks/node";

// "error": a request with no handler fails the test instead of hitting the network.
beforeAll(() => {
  server.listen({ onUnhandledFrame: "error" });
});

afterEach(() => {
  // RTL only auto-cleans when Vitest globals are on; they're off here.
  cleanup();
  // Drop any server.use() overrides so tests don't leak into each other.
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
