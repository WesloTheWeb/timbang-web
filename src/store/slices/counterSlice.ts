import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Example slice: the pattern every slice follows. Delete it once you have real ones.

export interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

export const counterSlice = createSlice({
  // Becomes the action type prefix ("counter/increment") and the key in RootState.
  name: "counter",
  initialState,
  reducers: {
    // Looks like mutation, but Immer turns it into an immutable update.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // PayloadAction<T> types action.payload and the action creator's argument.
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: () => initialState,
  },
  // RTK 2: selectors live on the slice and receive this slice's state, not RootState.
  selectors: {
    selectCount: (counter) => counter.value,
  },
});

// Action creators are generated for every reducer above.
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;
export const { selectCount } = counterSlice.selectors;
