import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { makeStore, type AppStore, type RootState } from "@/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  queryClient?: QueryClient;
}

function makeTestQueryClient() {
  return new QueryClient({
    // No retries, or a failing request takes seconds to show its error.
    defaultOptions: { queries: { retry: false } },
  });
}

// Like RTL's render, but inside a fresh Redux store and React Query cache so
// tests never share state. Returns both, so a test can inspect them directly.
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    queryClient = makeTestQueryClient(),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
