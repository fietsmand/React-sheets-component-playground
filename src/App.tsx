import { useContext, useRef } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet, SheetFooter, SheetHeader, SheetRef } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";

//use ref
export default function App() {
  const sheetRef = useRef<SheetRef>(null);
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <Button
        clickAction={() => {
          sheetRef.current?.open();
        }}
        variant={"primary"}
      >
        Open Drawer
      </Button>

      <Sheet
        ref={sheetRef}
        header={
          <SheetHeader>
            <p>Drawer Component</p>
          </SheetHeader>
        }
        footer={
          <SheetFooter>
            <Button
              clickAction={() => {
                const isConfirm = confirm("DO YOU WANT TO SAVE");
                console.log("🚀 ~ App ~ isConfirm:", isConfirm);
                if (isConfirm) sheetRef.current?.close();
              }}
            >
              action 1
            </Button>
          </SheetFooter>
        }
      >
        <ProfileView />
      </Sheet>
    </div>
  );
}
