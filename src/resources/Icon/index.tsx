import classNames from "classnames";
import styles from "./Icon.module.scss";
import { icons } from "./icons";

export function Icon({
  className,
  icon,
}: {
  className?: string;
  icon: keyof typeof icons;
}) {
  const IconType = icons[icon];
  if (!IconType) return;
  return (
    <i className={classNames(className, styles.icon)}>
      <IconType />
    </i>
  );
}
