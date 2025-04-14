"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ToastProvider } from "./ToastProvider";
import { useTheme } from "./ThemeProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { mounted, themeChanging } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className={themeChanging ? "opacity-90" : "opacity-100"}>
          {children}
        </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}
