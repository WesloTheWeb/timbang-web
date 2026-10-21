"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lazy initializer: one store per browser tab (and per server request),
  // created once and kept across re-renders.
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
