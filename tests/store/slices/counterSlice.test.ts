import { describe, expect, it } from "vitest";
import {
  counterSlice,
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "@/store";

// Reducers are pure functions, so test them directly: (state, action) => state.
const reducer = counterSlice.reducer;

describe("counterSlice", () => {
  it("starts at 0", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({ value: 0 });
  });

  it("increments and decrements", () => {
    expect(reducer({ value: 1 }, increment())).toEqual({ value: 2 });
    expect(reducer({ value: 1 }, decrement())).toEqual({ value: 0 });
  });

  it("increments by a payload", () => {
    expect(reducer({ value: 1 }, incrementByAmount(5))).toEqual({ value: 6 });
  });

  it("resets", () => {
    expect(reducer({ value: 9 }, reset())).toEqual({ value: 0 });
  });
});
