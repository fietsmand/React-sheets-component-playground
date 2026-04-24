import { use, useRef } from "react";
import { SheetRef, Sheet, SheetHeader } from "../../Sheet";
import { Button } from "../Button";
import { Icon } from "../Icon";

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

function AccountButton2({}) {
  const accountsRef = useRef<SheetRef>(null);
  const onClickAccounts = () => accountsRef.current?.open();
  return (
    <>
      <Button variant="none" clickAction={onClickAccounts}>
        <Icon icon="account" />
        Accounts bla
      </Button>
      <Sheet ref={accountsRef} header={<SheetHeader>2</SheetHeader>}>
        <AccountsView />
      </Sheet>
    </>
  );
}
// NOTE: This should only be rendered when the sheet has been opened
export function AccountsView() {
  const data = use(getAccounts());

  return (
    <section>
      Accounts LIST. This should only be shown when the accounts button is
      pressed
      <ul>
        {data.accounts.map((account) => {
          return (
            <li>
              {account.id}: {account.label}
            </li>
          );
        })}

        <AccountButton2 />
      </ul>
    </section>
  );
}
