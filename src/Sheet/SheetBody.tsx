import type { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./Sheet.module.scss";

export interface SheetBodyProps extends PropsWithChildren {
  className?: string;
}

export function SheetBody({ children, className }: SheetBodyProps) {
  return <div className={classNames(styles.body, className)}>{children}</div>;
}

