import { ReactNode } from "react";
import AppProvider from "./AppProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
