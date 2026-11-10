export const models = ["iPhone 18 Pro Max", "iPhone 18 Pro", "iPhone 17 Pro Max", "iPhone 17 Pro"] as const;

export const colors = [
  { name: "Black", swatch: "bg-case-black" },
  { name: "Blue", swatch: "bg-case-blue" },
] as const;

export const FREE_SHIPPING_THRESHOLD = 49;

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function freeShippingNote(total: number): string {
  return total >= FREE_SHIPPING_THRESHOLD
    ? "Free shipping included."
    : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for free shipping.`;
}

export function nextBannerModel(current: string, random = Math.random): string {
  const alternatives = models.filter((model) => model !== current);
  return alternatives[Math.min(alternatives.length - 1, Math.max(0, Math.floor(random() * alternatives.length)))] ?? models[0];
}

export const LOW_STOCK_LIMIT = 10;

export function stockFor(slug: string, model: string, color: string): number {
  if (model === "iPhone 18 Pro Max" && color === "Black") {
    if (slug === "titan") return 12;
    if (slug === "ghost") return 9;
  }
  return 10;
}

export function isLowStock(stock: number): boolean {
  return stock <= LOW_STOCK_LIMIT;
}
