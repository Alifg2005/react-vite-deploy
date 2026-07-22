// WishlistContext.tsx — Global wishlist state for the student module.
// Extracted from StudentWishlist so it can be provided at the StudentLayout
// level and consumed by any student page (e.g. AddToWishlistButton in
// catalogue pages) without prop-drilling.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { WISHLIST_SEED_ITEMS } from "../../../mock";
import type {
  WishlistItemType,
  WishlistItemTypeEn,
  RegistrationStatus,
  WishlistItem,
} from "../../../mock";

export type { WishlistItemType, WishlistItemTypeEn, RegistrationStatus, WishlistItem };

// ── Types ──────────────────────────────────────────────────────────────────────

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  toast: string | null;
}

// ── Context ────────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(WISHLIST_SEED_ITEMS);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast() {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast("added");
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      showToast();
      return [item, ...prev];
    });
  }, []);

  const removeItem = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    []
  );

  const hasItem = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, hasItem, toast }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
