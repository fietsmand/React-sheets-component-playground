import { Suspense, use, useCallback, useMemo } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useSheet } from "../../Sheet/SheetContext";

interface AccountsData {
  accounts: [
    {
      id: string;
      label: string;
    },
  ];
}
let accountsPromise: Promise<AccountsData>;
function getAccountsImpl() {
  return new Promise<AccountsData>((resolve) => {
    console.log(
      "FETCHING ACCOUNTS FROM API. This should only be called when opened",
    );
    setTimeout(() => {
      resolve({
        accounts: [
          {
            id: "305151",
            label: "Bestseller Brande",
          },
        ],
      });
    }, 2000);
  });
}

function getAccounts() {
  accountsPromise = accountsPromise ?? getAccountsImpl();
  return accountsPromise;
}

export function AccountsPanel() {
  const data = use(getAccounts());

  return (
    <section>
      Accounts LIST. This should only be shown when the accounts button is
      pressed
      <ul>
        {data.accounts.map((account) => {
          return (
            <li key={account.id}>
              {account.id}: {account.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

interface AccountsButtonProps {
  count?: number;
  iconClassName?: string;
}

export function AccountsButton({ count, iconClassName }: AccountsButtonProps) {
  const sheet = useSheet();

  const panel = useMemo(
    () => (
      <Suspense fallback={<p>Loading accounts…</p>}>
        <AccountsPanel />
      </Suspense>
    ),
    [],
  );

  const open = useCallback(
    () => sheet.navigate({ title: "Accounts", component: panel }),
    [sheet, panel],
  );

  return (
    <Button variant="none" clickAction={open}>
      <Icon icon="account" className={iconClassName} />
      Accounts{count != null ? ` (${count})` : ""}
    </Button>
  );
}
