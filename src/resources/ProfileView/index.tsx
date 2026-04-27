import { use, useRef } from "react";
import { Button } from "../Button";
import styles from "./ProfileView.module.scss";
import { Icon } from "../Icon";
import { Sheet, SheetHeader, SheetRef } from "../../Sheet";
import { AccountsView } from "../AccountsView";
interface ProfileData {
  name: string;
  email: string;
  numberOfSelectedAccounts: number;
}
let profilePromise: Promise<ProfileData>;
function getProfileImpl() {
  return new Promise<ProfileData>((resolve) => {
    console.log(
      "FETCHING PROFILE FROM API. This should only be called when opened",
    );
    setTimeout(() => {
      resolve({
        name: "Daniël Huizenga",
        email: "daniel.huizenga@bestseller.com",
        numberOfSelectedAccounts: 2,
      });
    }, 2000);
  });
}

function getProfile() {
  profilePromise = profilePromise ?? getProfileImpl();
  return profilePromise;
}

// NOTE: This should only be rendered when the sheet has been opened
export function ProfileView() {
  const data = use(getProfile());
  const sheetRef = useRef<SheetRef>(null);

  return (
    <div className={styles.section}>
      <div className={styles.profileDetails}>
        <h3 className={styles.name}>{data.name}</h3>
        <p className={styles.email}>{data.email}</p>
      </div>
      <ul className={styles.actions}>
        <li className={styles.action}>
          <Icon className={styles.actionIcon} icon="storefront" />
          <p className={styles.actionName}>Orders</p>
        </li>
        <li className={styles.action}>
          <Icon className={styles.actionIcon} icon="receipt" />
          <p className={styles.actionName}>Invoices</p>
        </li>
        <li className={styles.action}>
          <Icon className={styles.actionIcon} icon="insights" />
          <p className={styles.actionName}>Insights</p>
        </li>
        <li className={styles.action}>
          <Icon className={styles.actionIcon} icon="users" />
          <p className={styles.actionName}>Users</p>
        </li>
      </ul>
      <ul className={styles.links}>
        <li className={styles.link}>
          <Button
            variant="none"
            clickAction={() => {
              sheetRef.current?.open();
            }}
          >
            <Icon icon="account" className={styles.listItemIcon} />
            Accounts ({data.numberOfSelectedAccounts})
          </Button>
          <Sheet
            ref={sheetRef}
            header={<SheetHeader>Accounts View</SheetHeader>}
          >
            <AccountsView />
          </Sheet>
        </li>
        <li className={styles.link}>
          <Button variant="none" clickAction={() => {}}>
            <Icon icon="basket" className={styles.listItemIcon} />
            Open baskets
          </Button>
        </li>
        <li className={styles.link}>
          <Button variant="none" clickAction={() => {}}>
            <Icon icon="vmi" className={styles.listItemIcon} />
            Replenishment
          </Button>
        </li>
        <li className={styles.link}>
          <Button variant="none" clickAction={() => {}}>
            <Icon icon="settings" className={styles.listItemIcon} />
            Settings
          </Button>
        </li>
        <li className={styles.link}>
          <Button variant="none" clickAction={() => {}}>
            <Icon icon="logout" className={styles.listItemIcon} />
            Log out
          </Button>
        </li>
      </ul>
    </div>
  );
}
