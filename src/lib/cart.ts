import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; model: string; color: string; qty: number };

const KEY = "vantis-cart";
let items: CartItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();
const EMPTY: CartItem[] = [];

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try { items = JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { items = []; }
}
function save(next: CartItem[]) {
  items = next;
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export const sameLine = (a: Omit<CartItem, "qty">, b: Omit<CartItem, "qty">) =>
  a.slug === b.slug && a.model === b.model && a.color === b.color;

/** Pure helper: add qty to a line, never exceeding stock. */
export function addLine(list: CartItem[], line: CartItem, stock: number): CartItem[] {
  const existing = list.find((i) => sameLine(i, line));
  if (existing) return list.map((i) => (i === existing ? { ...i, qty: Math.min(stock, i.qty + line.qty) } : i));
  return [...list, { ...line, qty: Math.min(stock, line.qty) }];
}

export const cart = {
  add(line: CartItem, stock: number) { load(); save(addLine(items, line, stock)); },
  setQty(line: Omit<CartItem, "qty">, qty: number) { load(); save(qty <= 0 ? items.filter((i) => !sameLine(i, line)) : items.map((i) => (sameLine(i, line) ? { ...i, qty } : i))); },
  remove(line: Omit<CartItem, "qty">) { load(); save(items.filter((i) => !sameLine(i, line))); },
};

export function useCart(): CartItem[] {
  return useSyncExternalStore(
    (cb) => { load(); listeners.add(cb); cb(); return () => listeners.delete(cb); },
    () => { load(); return items; },
    () => EMPTY,
  );
}
