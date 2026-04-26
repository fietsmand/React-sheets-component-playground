import React from "react";
import { PropsWithChildren, startTransition } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { capitalize } from "lodash";

interface ButtonProps {
  hoverAction?: () => void;
  clickAction: () => void;
  variant?: "primary" | "tertiary" | "none";
  disabled?: boolean;
}

export function Button({
  hoverAction,
  clickAction,
  variant = "primary",
  disabled = false,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`variant${capitalize(variant)}`],
      )}
      disabled={disabled}
      onMouseEnter={async () => {
        startTransition(async () => {
          console.log("Starting HOVER transtition");
          await hoverAction?.();
        });
      }}
      onClick={clickAction}
    >
      {children}
    </button>
  );
}
