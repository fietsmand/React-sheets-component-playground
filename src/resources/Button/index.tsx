import { PropsWithChildren, startTransition, useTransition } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { capitalize } from "lodash";

interface ButtonProps {
  clickAction: () => void;
  variant?: "primary" | "tertiary" | "none";
}

export function Button({
  clickAction,
  variant = "primary",
  children,
}: PropsWithChildren<ButtonProps>) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      className={classNames(
        styles.button,
        styles[`variant${capitalize(variant)}`],
      )}
      disabled={isPending}
      onClick={() => startTransition(clickAction)}
    >
      {children}
    </button>
  );
}
