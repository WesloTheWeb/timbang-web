import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { renderWithProviders } from "../test-utils";
import { increment, selectCount } from "@/store";
import { StoreProvider } from "@/components/Providers";

// How a component talks to the store: select to read, dispatch to write.
function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(increment())}>Count: {count}</button>
  );
}

describe("StoreProvider", () => {
  it("gives children a working store", async () => {
    render(
      <StoreProvider>
        <Counter />
      </StoreProvider>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("Count: 1");
  });
});

describe("renderWithProviders", () => {
  it("accepts preloaded state and returns the store", async () => {
    const { store } = renderWithProviders(<Counter />, {
      preloadedState: { counter: { value: 5 } },
    });

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("Count: 6");
    expect(store.getState().counter.value).toBe(6);
  });
});
