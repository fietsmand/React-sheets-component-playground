import {
  PropsWithChildren,
  RefObject,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./sheet.module.scss";

export interface SheetRef {
  open: () => void;
}

export interface SheetProps extends PropsWithChildren {
  ref: RefObject<SheetRef>;
}

export function Sheet({ children, ref }: SheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
      },
    };
  }, []);
  if (!isOpen) return null;

  return (
    <dialog className={styles.dialog} open={isOpen}>
      {children}
    </dialog>
  );
}
