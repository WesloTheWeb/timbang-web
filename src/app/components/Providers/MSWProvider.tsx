"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { API_MOCKING } from "@/lib/env";

// ssr: false keeps MSW out of the server build entirely.
const MockWorker = dynamic(() => import("@/mocks/MockWorker"), { ssr: false });

// Holds back rendering until the mock worker is running, so no request
// slips out to the real network first. A pass-through when mocking is disabled.
export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(!API_MOCKING);

  if (!API_MOCKING) return children;

  return (
    <>
      <MockWorker onReady={() => setReady(true)} />
      {ready ? children : null}
    </>
  );
}
