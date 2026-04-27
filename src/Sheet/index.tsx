import {
  createContext,
  PropsWithChildren,
  ReactNode,
  RefObject,
  startTransition,
  use,
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
  ref: RefObject<SheetRef | null>;
  footer?: ReactNode;
  header?: ReactNode;
}

interface SheetContextType {
  close: () => void;
  back?: () => void;
}
export const SheetContext = createContext<SheetContextType | null>(null);

export function SheetHeader({ children }: PropsWithChildren) {
  const sheetContext = use(SheetContext);
  console.log("context: ", sheetContext);
  return (
    <header>
      {sheetContext?.back && (
        <Button clickAction={sheetContext?.back}>back</Button>
      )}
      {children}header
      {sheetContext?.close && (
        <Button clickAction={sheetContext?.close}>close</Button>
      )}
    </header>
  );
}

export function SheetFooter({ children }: PropsWithChildren) {
  return <footer>{children}</footer>;
}

export function Sheet({ children, ref, footer, header }: SheetProps) {
  const sheetContext = use(SheetContext);
  const isRenderedWithinASheet = !!sheetContext;
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setIsOpen(true);
        dialogRef.current?.showPopover();
      },
      close: () => {
        closeAll ?? close;
      },
      isOpen,
    };
  }, [isOpen]);

  function closeCurrentSheet() {
    dialogRef.current?.hidePopover();
    setIsOpen(false);
  }
  const close = () =>
    startTransition(() => {
      dialogRef.current?.hidePopover();
      setIsOpen(false);
    });

  const closeAll =
    sheetContext &&
    function () {
      sheetContext?.close();
    };

  const state: SheetContextType = {
    back: isRenderedWithinASheet ? closeCurrentSheet : undefined,
    close: sheetContext?.close ?? closeCurrentSheet,
  };

  return (
    <SheetContext value={state}>
      <dialog
        className={styles.dialog}
        ref={dialogRef}
        onClose={close}
        popover="auto"
      >
        {header}
        {isOpen && <div>{children}</div>}
        SHEET
        {footer}
      </dialog>
    </SheetContext>
  );
}
