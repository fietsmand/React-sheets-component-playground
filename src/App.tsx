import "./styles.css";
import { Sheet } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";
import { Button } from "./resources/Button";

export default function App() {
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>

      <Sheet>
        <Sheet.Trigger>
          {({ open, prefetch }) => (
            <span onPointerEnter={prefetch} onFocus={prefetch}>
              <Button clickAction={open} variant="primary">
                Open Drawer
              </Button>
            </span>
          )}
        </Sheet.Trigger>
        <Sheet.Panel>
          <Sheet.Header title="Profile" />
          <Sheet.Body>
            <ProfileView />
          </Sheet.Body>
        </Sheet.Panel>
      </Sheet>
    </div>
  );
}
