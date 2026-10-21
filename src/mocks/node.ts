import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Used by Vitest (see vitest.setup.ts). Tests can override per-test with server.use().
export const server = setupServer(...handlers);
