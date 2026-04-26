import { PropsWithChildren, useEffect } from "react";
import styles from "./Sheet.module.scss";
import classNames from "classnames";

export interface SheetProps extends PropsWithChildren {
  isOpen?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  direction?: "top" | "bottom" | "left" | "right" | "topRight";
  duration?: number;
  header?: React.ReactNode;
}

const transformMap = {
  top: "translateY(-100%)",
  bottom: "translateY(100%)",
  left: "translateX(-100%)",
  right: "translateX(100%)",
  // topRight: 'translate(0,-100%)'
  topRight: "translate(0,-100%)",
};

export function Sheet({
  children,
  isOpen,
  onClose,
  onBack,
  header,
  direction = "right",
  duration = 300,
}: SheetProps) {
  const drawerStyle: React.CSSProperties = {
    transform: isOpen ? "translate(0, 0)" : transformMap[direction],
    visibility: isOpen ? "visible" : "hidden",
    transition: `all ${duration}ms ease-in-out`,
  };

  return (
    <div
      className={classNames({
        [styles.closed]: !isOpen,
        [styles.opened]: isOpen,
      })}
    >
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div
        className={styles.wrapper}
        style={drawerStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {header}
        {children}
      </div>
    </div>
  );
}
