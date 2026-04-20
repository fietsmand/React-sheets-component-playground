import { useRef } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";

export default function App() {
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button clickAction={() => {}} variant={"primary"}>
        Open Drawer
      </Button>

      <Sheet>
        <ProfileView />
      </Sheet>
    </div>
  );
}
