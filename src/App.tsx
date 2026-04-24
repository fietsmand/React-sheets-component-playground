import { Button } from "./resources/Button";
import "./styles.css";
import { createSheet } from "./Sheet";
import { MemoProfileView } from "./resources/ProfileView";
import { MemoAccountsView } from "./resources/AccountsView";

export const profileSheet = createSheet({
  profile: { content: () => <MemoProfileView />, title: "Profile" },
  accounts: { content: () => <MemoAccountsView />, title: "Accounts" },
}, {  }
);


export default function App() {
  const { Sheet, useSheet } = profileSheet;

  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button
        clickAction={() => useSheet.getState().open()}
        variant={"primary"}
      >
        Open Drawer
      </Button>

      <Sheet />
    </div>
  );
}
