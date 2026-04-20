import classNames from "classnames";

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
    <i className={className}>
      <IconType />
    </i>
  );
}
