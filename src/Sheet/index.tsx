import { RefObject, useImperativeHandle, useRef } from "react";
export interface SheetRefType {
    open: () => void;
    close: () => void;
  }

interface SheetProps {
  sheetRef: RefObject<SheetRefType>
}

export function Sheet({
  sheetRef
}: SheetProps) {
  if (sheetRef === undefined) throw new Error("You need a ref mate")
  const dialogRef = useRef<HTMLDialogElement>(null)
  useImperativeHandle(sheetRef, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }),[])
  return <dialog
    popover="auto"
    ref={dialogRef}  
    onClick={e => {
      if (e.target.nodeName === 'DIALOG')
        e.target.close('dismiss')
         console.log("COMP: ", e)
      // e.currentTarget.close()
    // dialogRef?.current?.close();

    }}
  >
    ELLo
  </dialog>;
}
