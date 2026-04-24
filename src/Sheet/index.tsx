import { Sheet as SheetRoot } from "./Sheet";
import { SheetTrigger } from "./SheetTrigger";
import { SheetPanel } from "./SheetPanel";
import { SheetHeader } from "./SheetHeader";
import { SheetBody } from "./SheetBody";
export { useSheet } from "./context";

export const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Panel: SheetPanel,
  Header: SheetHeader,
  Body: SheetBody,
});
