import MSWProvider from "./MSWProvider";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

// Every app-wide provider, in one place. Order matters:
// MSW first, so mocks are ready before React Query sends any request.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MSWProvider>
      <QueryProvider>
        <StoreProvider>{children}</StoreProvider>
      </QueryProvider>
    </MSWProvider>
  );
}
