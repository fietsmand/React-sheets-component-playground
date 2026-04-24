import { Suspense, useRef } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet, SheetHeader, SheetRef } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";
import React from "react";

export default function App() {
  const ref = useRef<SheetRef>(null);
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button
        clickAction={() => {
          ref.current.open();
        }}
        variant={"primary"}
      >
        Open Drawer
      </Button>

      <Sheet
        ref={ref}
        header={<SheetHeader>ELLO</SheetHeader>}
        footer={undefined}
      >
        <Suspense fallback={<p>Loading content 2</p>}>
          <ProfileView />
        </Suspense>
      </Sheet>
    </div>
  );
}
