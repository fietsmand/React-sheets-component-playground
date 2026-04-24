import {
  Suspense,
  useSyncExternalStore,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import styles from "./Sheet.module.scss";
import { useRoot, useSheet } from "./context";

const getNull = () => null;

export interface SheetPanelProps extends PropsWithChildren {
  className?: string;
  fallback?: ReactNode;
}

export function SheetPanel({ children, className, fallback }: SheetPanelProps) {
  const root = useRoot();
  const sheet = useSheet();

  // Subscribe ONLY to the container element, not to the whole root context.
  // This Panel re-renders when the dialog mounts/unmounts its container,
  // and never because of unrelated state in the root.
  const container = useSyncExternalStore(
    root.containerStore.subscribe,
    root.containerStore.get,
    getNull,
  );

  if (!sheet.isOpen || !container) return null;

  debugger; // ⏸ only when the panel is truly mounted/portaled
  return createPortal(
    <section
      className={classNames(styles.panel, className)}
      data-depth={sheet.depth}
    >
      <Suspense
        fallback={
          fallback ?? <div className={styles.fallback}>Loading…</div>
        }
      >
        {children}
      </Suspense>
    </section>,
    container,
  );
}

