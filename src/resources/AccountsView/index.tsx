import { memo, use } from "react";

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
            <li key={account.id}>
              {account.id}: {account.label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export const MemoAccountsView = memo(AccountsView);