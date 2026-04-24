import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import classNames from "classnames";
import styles from "./Sheet.module.scss";
import { useSheet } from "./context";

type TriggerRenderProps = {
  open: () => void;
  prefetch: () => void;
  isOpen: boolean;
};

export interface SheetTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode | ((p: TriggerRenderProps) => ReactNode);
}

export function SheetTrigger({
  children,
  className,
  onPointerEnter,
  onFocus,
  onClick,
  ...rest
}: SheetTriggerProps) {
  const sheet = useSheet();

  if (typeof children === "function") {
    return (
      <>
        {children({
          open: sheet.open,
          prefetch: sheet.prefetch,
          isOpen: sheet.isOpen,
        })}
      </>
    );
  }

  return (
    <button
      type="button"
      className={classNames(styles.triggerReset, className)}
      onPointerEnter={(e) => {
        sheet.prefetch();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        sheet.prefetch();
        onFocus?.(e);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) sheet.open();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
