import { ReactNode, Suspense, memo, useEffect, useRef } from "react";
import { create } from "zustand";
import { icons } from "../resources/Icon/icons";
import styles from "./Sheet.module.scss";
import { Button } from "../resources/Button";

export type PageEntry = {
  content: () => ReactNode;
  title: string;
  icon?: keyof typeof icons;
};
export type Pages = Record<string, PageEntry>;

type SheetState<TPages extends Pages> = {
  activePage: keyof TPages;
  history: (keyof TPages)[];
  isOpen: boolean;
  open: (page?: keyof TPages) => void;
  close: () => void;
  navigate: (page: keyof TPages) => void;
  back: () => void;
};

export function createSheet<TPages extends Pages>(pages: TPages, { initialPage }: { initialPage?: keyof TPages }) {
  const firstKey = Object.keys(pages)[0] as keyof TPages;

  const useSheet = create<SheetState<TPages>>((set) => ({
    activePage: initialPage ?? firstKey,
    history: [],
    isOpen: false,
    open: (page) =>
      set((s) => ({ isOpen: true, activePage: page ?? s.activePage, history: [] })),
    close: () => set({ isOpen: false, activePage: initialPage ?? firstKey, history: [] }),
    navigate: (page) =>
      set((s) => ({ activePage: page, history: [...s.history, s.activePage] })),
    back: () =>
      set((s) => {
        if (s.history.length === 0) return s;
        const history = [...s.history];
        const activePage = history.pop()!;
        return { activePage, history };
      }),
  }));

  const Header = memo(function Header() {
    const activePage = useSheet((s) => s.activePage);
    const history = useSheet((s) => s.history);
    const canGoBack = history.length > 0;
    return (
      <header className={styles.header}>
        {canGoBack && (
          <Button variant="none" clickAction={() => useSheet.getState().back()}>
            {"<"}
          </Button>
        )}
        {[...history, activePage].map((page, index) => (
          <span key={index}>
            {index > 0 && " / "}
            {pages[page].title}
          </span>
        ))}
        <Button variant="none" clickAction={() => useSheet.getState().close()}>
          X
        </Button>
      </header>
    );
  });

  function Sheet() {
    const dialog = useRef<HTMLDialogElement>(null);
    const isOpen = useSheet((s) => s.isOpen);
    const activePage = useSheet((s) => s.activePage);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const pageFromUrl = params.get("sheet");
      if (pageFromUrl && Object.prototype.hasOwnProperty.call(pages, pageFromUrl)) {
        useSheet.getState().open(pageFromUrl as keyof TPages);
      }
    }, []);

    useEffect(() => {
      if (isOpen) dialog.current?.showModal();
      else dialog.current?.close();

      return () => {
        dialog.current?.close();
      };
    }, [isOpen]);

    const Active = pages[activePage].content;
    return (
      <dialog
        ref={dialog}
        onClose={() => useSheet.getState().close()}
        onClick={(e) => {
          if (e.target === dialog.current) {
            useSheet.getState().close();
          }
        }}
      >
        <aside className={styles.sheet}>
        <Header />
          <main>
            <Suspense fallback={<p>Loading…</p>}>
              <Active />
            </Suspense>
          </main>
        </aside>
      </dialog>
    );
  }

  return { Sheet, useSheet };
}
