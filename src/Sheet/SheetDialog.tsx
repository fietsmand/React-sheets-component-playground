import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
} from "react";
import styles from "./Sheet.module.scss";
import { useRoot } from "./context";

export function SheetDialog() {
  const root = useRoot();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isOpen = root.levels.length > 0;

  useEffect(() => {const d = dialogRef.current;
    if (!d) return;

    if (isOpen && !d.open) {
      setIsClosing(false);
      d.showModal();
      return;
    }

    if (!isOpen && d.open && !isClosing) {
      setIsClosing(true);
      const onEnd = () => {
        d.close();
        setIsClosing(false);
        d.removeEventListener("animationend", onEnd);
      };
      d.addEventListener("animationend", onEnd);
    }
  }, [isOpen, isClosing]);

  // Scroll lock on body while dialog is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const containerStore = root.containerStore;
  const setContainer = useCallback(
    (el: HTMLDivElement | null) => {
      containerStore.set(el);
    },
    [containerStore],
  );

  const handleClick = (e: ReactMouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      root.closeAll();
    }
  };

  const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    root.closeAll();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-closing={isClosing || undefined}
      onClick={handleClick}
      onCancel={handleCancel}
    >
      <div ref={setContainer} className={styles.panels} />
    </dialog>
  );
}

