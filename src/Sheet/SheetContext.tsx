import { createContext, use, type ReactNode } from "react";

export interface SubPage {
  title: string;
  component: ReactNode;
}

export interface SheetContextValue {
  navigate: (sub: SubPage) => void;
  goBack: () => void;
  close: () => void;
  depth: number;
}

export const SheetContext = createContext<SheetContextValue | null>(null);

export function useSheet(): SheetContextValue {
  const ctx = use(SheetContext);
  if (!ctx) {
    throw new Error("useSheet must be used within a <Sheet>");
  }
  return ctx;
}
