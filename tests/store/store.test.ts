import { describe, expect, it } from "vitest";
import { makeStore } from "@/store";

describe("makeStore", () => {
  it("creates a separate store on each call", () => {
    expect(makeStore()).not.toBe(makeStore());
  });
});
