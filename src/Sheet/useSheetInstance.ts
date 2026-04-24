import { startTransition, useCallback, useId, useMemo, useRef } from "react";
import type { RootContextValue, SheetContextValue } from "./context";

/**
 * Builds the SheetContextValue for a single <Sheet> against a given root.
 * Used by both the root-level and nested sheets so the public Sheet context
 * stays identical regardless of nesting.
 */
export function useSheetInstance(
  root: RootContextValue,
  onIntent: (() => void) | undefined,
): SheetContextValue {
  const id = useId();
  const depth = root.levels.indexOf(id);
  const isOpen = depth !== -1;

  const prefetchedRef = useRef(false);
  const prefetch = useCallback(() => {
    if (prefetchedRef.current) return;
    prefetchedRef.current = true;
    onIntent?.();
  }, [onIntent]);

  return useMemo<SheetContextValue>(
    () => ({
      id,
      isOpen,
      depth,
      open: () => {
        prefetch();
        startTransition(() => root.open(id));
      },
      prefetch,
      closeSelf: () => startTransition(() => root.closeTo(id)),
      closeAll: () => startTransition(() => root.closeAll()),
    }),
    [id, isOpen, depth, root, prefetch],
  );
}
