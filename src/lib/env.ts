// NEXT_PUBLIC_* values are inlined at build time, so read them in one place.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const API_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";
