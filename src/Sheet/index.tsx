import {
  PropsWithChildren,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./Sheet.module.scss";
import { Button } from "../resources/Button";

export interface SheetRef {
  open: () => void;
  close: () => void;
}

export interface SheetProps extends PropsWithChildren {
  ref: RefObject<SheetRef>;
  footer: ReactNode;
  header: ReactNode;
}

// export function SheetHeader({ children }) {
//   return children;
// }
interface SheetHeaderProps {
  header: ReactNode;
}

export function SheetHeader({ header }: SheetHeaderProps) {
  return <header>{header}</header>;
}

interface SheetFooterProps extends PropsWithChildren {
  footer: ReactNode;
}
export function SheetFooter({ children }: SheetFooterProps) {
  return <footer>{children}</footer>;
}

export function Sheet({ children, ref, footer, header }: SheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setIsOpen(true);
        dialogRef.current?.showPopover();
      },
      close() {
        setIsOpen(false);
        dialogRef.current?.hidePopover();
      },
    };
  }, []);

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onClose={() => {
        setIsOpen(false);
      }}
      popover="auto"
    >
      {header}
      {isOpen && <div>{children}</div>}
      {footer}
    </dialog>
  );
}
