import { useRef } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet, SheetFooter, SheetHeader, SheetRef } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";

//use ref
export default function App() {
  const sheetRef = useRef<SheetRef>(null);
  //console.log(sheetRef.current);
  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>

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
          <SheetHeader
            header={
              <>
                <Button
                  clickAction={() => {
                    sheetRef.current?.open();
                  }}
                >
                  back
                </Button>
                <Button
                  clickAction={() => {
                    sheetRef.current?.open();
                  }}
                >
                  close
                </Button>
              </>
            }
          />
        }
        footer={
          <SheetFooter
            footer={
              <Button
                clickAction={() => {
                  const isConfirm = confirm("DO YOU WANT TO SAVE");
                  console.log("🚀 ~ App ~ isConfirm:", isConfirm);
                  if (isConfirm) sheetRef.current?.close();
                }}
              >
                action 1
              </Button>
            }
          />
        }
      >
        <ProfileView />
      </Sheet>
    </div>
  );
}
