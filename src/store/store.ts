import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slices";

// Pass whole slices, not reducers: each one is keyed by its `name`, so this
// gives RootState = { counter: CounterState }. Add new slices to the list.
// UI state only; API data belongs to React Query.
const rootReducer = combineSlices(counterSlice);

export type RootState = ReturnType<typeof rootReducer>;

// A factory, not a singleton: on the server, a module-level store would be
// shared across every request (and leak one user's state to another).
export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
