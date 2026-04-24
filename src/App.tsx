import { Suspense, useRef, useState } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const hasOpenedRef = useRef(false);
  if (isOpen) hasOpenedRef.current = true;

  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button clickAction={() => setIsOpen(true)} variant={"primary"}>
        Open Sheet
      </Button>

      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Profile"
      >
          <Suspense fallback={<p>Loading profile…</p>}>
            <ProfileView />
          </Suspense>
      </Sheet>
    </div>
  );
}
