/**
 * Tiny external store for the dialog's panel container element.
 */
export interface ContainerStore {
  get: () => HTMLDivElement | null;
  set: (el: HTMLDivElement | null) => void;
  subscribe: (cb: () => void) => () => void;
}

export function createContainerStore(): ContainerStore {
  let current: HTMLDivElement | null = null;
  const listeners = new Set<() => void>();
  return {
    get: () => current,
    set: (el) => {
      if (current === el) return;
      current = el;
      listeners.forEach((l) => l());
    },
    subscribe: (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
  };
}

