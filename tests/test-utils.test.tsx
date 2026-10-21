import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { http, HttpResponse } from "msw/http";
import { API_URL } from "@/lib/env";
import { server } from "@/mocks/node";
import { renderWithProviders } from "./test-utils";

// Proves the harness end to end: a real fetch, intercepted by MSW, read through React Query.
function Status() {
  const { data, error, isPending } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as { status: string };
    },
  });

  if (isPending) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <p>Status: {data.status}</p>;
}

describe("test harness", () => {
  it("serves mocked data to React Query", async () => {
    server.use(
      http.get(`${API_URL}/status`, () => HttpResponse.json({ status: "ok" })),
    );

    renderWithProviders(<Status />);

    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(await screen.findByText("Status: ok")).toBeInTheDocument();
  });

  it("surfaces API errors", async () => {
    server.use(
      http.get(`${API_URL}/status`, () => new HttpResponse(null, { status: 500 })),
    );

    renderWithProviders(<Status />);

    expect(await screen.findByText("Error: HTTP 500")).toBeInTheDocument();
  });
});
