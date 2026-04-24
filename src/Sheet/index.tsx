import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import classNames from "classnames";
import { Icon } from "../resources/Icon";
import {
  SheetContext,
  type SheetContextValue,
  type SubPage,
} from "./SheetContext";
import styles from "./Sheet.module.scss";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Sheet({ isOpen, onClose, title, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sub, setSub] = useState<SubPage | null>(null);
  const lastSubRef = useRef<ReactNode>(null);

  // Keep the last sub component alive so visibility:hidden preserves the DOM
  if (sub?.component) lastSubRef.current = sub.component;

  const navigate = useCallback((next: SubPage) => {
    setSub(next);
  }, []);

  const goBack = useCallback(() => {
    setSub(null);
  }, []);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  // Sync native dialog open/close with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Reset navigation state after close animation finishes
  useEffect(() => {
    if (isOpen) return;
    const t = setTimeout(() => {
      setSub(null);
      lastSubRef.current = null;
    }, 320);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Close when clicking the backdrop (::backdrop click fires on the dialog)
  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  // Native dialog fires "cancel" on Escape — sync with our state
  const handleCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  const contextValue = useMemo<SheetContextValue>(
    () => ({
      navigate,
      goBack,
      close,
      depth: sub ? 1 : 0,
    }),
    [navigate, goBack, close, sub],
  );

  const atSub = sub != null;
  const hasSubContent = lastSubRef.current != null;

  return (
    <SheetContext value={contextValue}>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={handleDialogClick}
        onCancel={handleCancel}
      >
        <header className={styles.header}>
          {atSub ? (
            <button
              type="button"
              className={styles.headerButton}
              onClick={goBack}
              aria-label="Back"
            >
              <span aria-hidden="true">←</span>
            </button>
          ) : null}
          <h2 className={styles.title}>{sub?.title ?? title}</h2>
          <button
            type="button"
            className={styles.headerButton}
            onClick={onClose}
            aria-label="Close"
          >
            <Icon icon="close" />
          </button>
        </header>
        <div className={styles.viewport}>
          <div className={classNames(styles.track, { [styles.atSub]: atSub })}>
            <div className={styles.panel}>{children}</div>
            <div
              className={classNames(styles.panel, {
                [styles.hidden]: !atSub,
              })}
            >
              {hasSubContent ? lastSubRef.current : null}
            </div>
          </div>
        </div>
      </dialog>
    </SheetContext>
  );
}