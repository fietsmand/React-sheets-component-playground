import { PropsWithChildren, startTransition } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { capitalize } from "lodash";

interface ButtonProps {
  clickAction: () => void;
  variant: "primary" | "tertiary";
}

export function Button({
  clickAction,
  variant = "primary",
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`variant${capitalize(variant)}`]
      )}
      onClick={() => startTransition(clickAction)}
    >
      Open drawer
    </button>
  );
}
