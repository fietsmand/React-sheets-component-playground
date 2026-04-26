import { Suspense, useMemo, useState, useTransition } from "react";
import { Button } from "./resources/Button";
import "./styles.css";
import { Sheet } from "./Sheet";
import { ProfileView } from "./resources/ProfileView";
import { SheetHeader } from "./Sheet/SheetHeader";

export default function App() {
  const [startLoad, setStartLoad] = useState(false);
  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const [isPending, startTransition] = useTransition();

  const Profile = useMemo(() => {
    console.log("useMemo loading Profile: startLoad =", startLoad);
    return startLoad ? <ProfileView /> : null;
  }, [startLoad]);

  const handleHover = () => {
    startTransition(() => {
      setStartLoad(true);
    });
  };

  const handleOpenSheet = () => {
    setIsSheetOpened(true);
  };

  const handleClose = () => {
    setIsSheetOpened(false);
    setStartLoad(false);
  };

  return (
    <div className="App">
      <h1>Sheet example</h1>
      <pre>
        <p>Start by editing the `./Sheet/index.tsx` component.</p>
      </pre>
      <Button
        clickAction={handleOpenSheet}
        variant={"primary"}
        hoverAction={handleHover}
      >
        Open Drawer
      </Button>

      <Sheet
        isOpen={isSheetOpened}
        onClose={handleClose}
        direction="right"
        header={
          <SheetHeader
            title={"Profile"}
            onClose={handleClose}
            onBack={handleClose}
            showBackButton={false}
            showCloseButton={true}
          />
        }
      >
        <Suspense fallback={<div>Loading...</div>}>{Profile}</Suspense>
      </Sheet>
    </div>
  );
}
