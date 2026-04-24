import { createContext, useContext } from "react";
import type { ContainerStore } from "./containerStore";

export interface RootContextValue {
  containerStore: ContainerStore;
  levels: string[];
  open: (id: string) => void;
  closeTo: (id: string) => void;
  closeAll: () => void;
}

export const RootContext = createContext<RootContextValue | null>(null);

export interface SheetContextValue {
  id: string;
  isOpen: boolean;
  depth: number;
  open: () => void;
  prefetch: () => void;
  closeSelf: () => void;
  closeAll: () => void;
}

export const SheetContext = createContext<SheetContextValue | null>(null);

export function useRoot(): RootContextValue {
  const ctx = useContext(RootContext);
  if (!ctx) throw new Error("This component must be rendered inside <Sheet>");
  return ctx;
}

export function useSheet(): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error("useSheet must be used within <Sheet>");
  return ctx;
}
