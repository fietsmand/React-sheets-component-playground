import {
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import {
  RootContext,
  SheetContext,
  type RootContextValue,
} from "./context";
import {
  createContainerStore,
  type ContainerStore,
} from "./containerStore";
import { useSheetInstance } from "./useSheetInstance";
import { SheetDialog } from "./SheetDialog";

export interface SheetProps extends PropsWithChildren {
  onIntent?: () => void;
}

export function Sheet(props: SheetProps) {
  const parentRoot = useContext(RootContext);
  return parentRoot ? (
    <NestedSheet parentRoot={parentRoot} {...props} />
  ) : (
    <RootSheet {...props} />
  );
}

function RootSheet({ children, onIntent }: SheetProps) {
  const [levels, setLevels] = useState<string[]>([]);

  // Lazily-created stable store; never re-created across renders.
  const containerStoreRef = useRef<ContainerStore | null>(null);
  if (containerStoreRef.current === null) {
    containerStoreRef.current = createContainerStore();
  }

  const root = useMemo<RootContextValue>(
    () => ({
      containerStore: containerStoreRef.current!,
      levels,
      open: (i) => setLevels((l) => (l.indexOf(i) !== -1 ? l : [...l, i])),
      closeTo: (i) =>
        setLevels((l) => {
          const idx = l.indexOf(i);
          return idx === -1 ? l : l.slice(0, idx);
        }),
      closeAll: () => setLevels([]),
    }),
    [levels],
  );

  const sheet = useSheetInstance(root, onIntent);

  return (
    <RootContext.Provider value={root}>
      <SheetContext.Provider value={sheet}>
        {children}
           <SheetDialog />
      </SheetContext.Provider>
    </RootContext.Provider>
  );
}

function NestedSheet({
  children,
  onIntent,
  parentRoot,
}: SheetProps & { parentRoot: RootContextValue }) {
  const sheet = useSheetInstance(parentRoot, onIntent);
  return (
    <SheetContext.Provider value={sheet}>{children}</SheetContext.Provider>
  );
}
