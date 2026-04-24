import {
  PropsWithChildren,
  useImperativeHandle,
  RefObject,
  useTransition,
  useRef,
  useState,
  createContext,
  use,
} from "react";
import styles from "./Sheet.module.scss";
import { Button } from "../resources/Button";
import { Icon } from "../resources/Icon";
export interface SheetRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}
export interface SheetProps extends PropsWithChildren {
  ref: RefObject<SheetRef | null>;

  header: React.ReactNode;
  footer: React.ReactNode;
}

interface SheetContextType {
  close: () => void;
  back?: () => void;
}
export const SheetContext = createContext<SheetContextType | null>(null);

export function SheetHeader({ children }: PropsWithChildren) {
  const sheetContext = use(SheetContext);
  if (!sheetContext) throw Error("SheetContext can only be used in a provider");

  const isRenderedWithinASheet = !!sheetContext?.back;
  return (
    <header className={styles.header}>
      {sheetContext.back && (
        <Button clickAction={sheetContext.back}>
          <Icon icon={"account"} />
        </Button>
      )}
      {children}
      <Button clickAction={sheetContext?.close} variant="tertiary">
        <Icon icon="close" />
      </Button>
    </header>
  );
}

export function SheetFooter({ children }: PropsWithChildren) {
  return <footer className={styles.footer}>{children}</footer>;
}

export function Sheet({ children, ref, header, footer }: SheetProps) {
  const sheetContext = use(SheetContext);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const isRenderedWithinASheet = !!sheetContext;

  const closeAll =
    sheetContext &&
    function () {
      sheetContext?.close();
    };

  function animateMoveContentOut() {
    modalRef.current?.childNodes.forEach((node) => {
      return node.animate(
        [
          {
            transform: "translateX(0px)",
          },
          {
            transform: "translateX(-420px)",
          },
        ],
        {
          duration: 700,
          fill: "forwards",
        },
      );
    });
  }
  function animateMoveContentIn() {
    modalRef.current?.childNodes.forEach((node) =>
      node.animate(
        [
          {
            transform: "translateX(-420px)",
          },
          {
            transform: "translateX(0px)",
          },
        ],
        {
          duration: 700,
          fill: "forwards",
        },
      ),
    );
  }

  const close = () =>
    startTransition(() => {
      modalRef.current?.hidePopover();
      setOpen(false);
    });

  const state = {
    back: isRenderedWithinASheet ? closeCurrentSheet : undefined,
    close: sheetContext?.close ?? closeCurrentSheet,
    moveContentOut: animateMoveContentOut,
    moveContentIn: animateMoveContentIn,
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        startTransition(() => {
          modalRef.current?.showPopover();
          setOpen(true);
          sheetContext?.moveContentOut?.();
        });
      },
      close: closeAll ?? close,
      isOpen,
    };
  }, [isOpen]);

  function closeCurrentSheet() {
    startTransition(() => {
      modalRef.current?.hidePopover();
      setOpen(false);
      sheetContext?.moveContentIn?.();
    });
  }

  return (
    <SheetContext value={state}>
      <aside
        ref={modalRef}
        popover="auto"
        onClose={close}
        className={styles.dialog}
      >
        {header}
        {isPending && <p>Loading content</p>}
        {isOpen && children}
        {footer}
      </aside>
    </SheetContext>
  );
}

Sheet.Header = SheetHeader;
Sheet.Footer = SheetFooter;
