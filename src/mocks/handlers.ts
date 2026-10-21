import type { RequestHandler } from "msw";

// One list of handlers, shared by the browser worker (dev) and the Node
// server (tests). Shape responses like the real API, e.g.:
//
//   http.get(`${API_URL}/foods/search`, ({ request }) => HttpResponse.json([...]))
//
// (`http` and `HttpResponse` come from "msw/http"; `API_URL` from "@/lib/env".)
export const handlers: RequestHandler[] = [];
