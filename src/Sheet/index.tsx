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
import classNames from "classnames";
export interface SheetRef {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}
export interface SheetProps extends PropsWithChildren {
  ref: RefObject<SheetRef | null>;
  header: ReturnType<typeof SheetHeader>;
  footer: React.ReactNode;
}

interface SheetContextType {
  close: () => void;
  back?: () => void;
  moveContentOut: () => void;
  moveContentIn: () => void;
}
export const SheetContext = createContext<SheetContextType | null>(null);

export function SheetHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const sheetContext = use(SheetContext);
  if (!sheetContext) throw Error("SheetContext can only be used in a provider");

  return (
    <header className={classNames(styles.header, className)}>
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

export function SheetFooter({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <footer className={classNames(classNames, styles.footer)}>
      {children}
    </footer>
  );
}
const DURATION_IN_MS = 300;
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
          duration: DURATION_IN_MS,
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
          duration: DURATION_IN_MS,
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

  const state: SheetContextType = {
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
    modalRef.current?.hidePopover();
    setOpen(false);
    sheetContext?.moveContentIn?.();
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
