import { PropsWithChildren } from "react";

export interface SheetProps extends PropsWithChildren {}

export function Sheet({ children }: SheetProps) {
  return children;
}
