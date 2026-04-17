import { useRef } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet, SheetRefType } from "./Sheet";

export default function App() {
  const ref = useRef<SheetRefType>(null)
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button
        clickAction={() => {
          ref.current?.open()
        }}
        variant={"primary"}
      >
        Open Drawer
      </Button>
      <Sheet
         sheetRef={ref}
      />
    </div>
  );
}
