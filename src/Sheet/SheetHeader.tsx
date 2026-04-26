import { Button } from "../resources/Button";
import { Icon } from "../resources/Icon";
import styles from "./Sheet.module.scss";

interface SheetHeaderProps {
  title: string;
  onClose?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  showCloseButton?: boolean;
}

export function SheetHeader({
  title,
  onClose,
  onBack,
  showBackButton = false,
  showCloseButton = true,
}: SheetHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        {showBackButton && onBack && (
          <Button clickAction={onBack} variant="primary" aria-label="Go back">
            <Icon icon="close" />
          </Button>
        )}
      </div>
      <h2>{title}</h2>
      <div>
        {showCloseButton && onClose && (
          <Button clickAction={onClose} variant="tertiary" aria-label="Close">
            <Icon icon="close" />
          </Button>
        )}
      </div>
    </header>
  );
}
