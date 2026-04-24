import type { ReactNode } from "react";
import styles from "./Sheet.module.scss";
import { useSheet } from "./context";

export interface SheetHeaderProps {
  title?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
}

export function SheetHeader({ title, onClose, onBack }: SheetHeaderProps) {
  const sheet = useSheet();
  const showBack = sheet.depth > 0;

  return (
    <header className={styles.header}>
      <div>
        {showBack && (
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Back"
            onClick={() => (onBack ? onBack() : sheet.closeSelf())}
          >
            <span className={styles.back} aria-hidden>
              ‹
            </span>
          </button>
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Close"
          onClick={() => (onClose ? onClose() : sheet.closeAll())}
        >
          X
        </button>
      </div>
    </header>
  );
}

