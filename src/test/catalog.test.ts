import { describe, expect, it } from "vitest";
import { colors, FREE_SHIPPING_THRESHOLD, formatPrice, freeShippingNote, models, nextBannerModel } from "@/lib/catalog";
import { products } from "@/components/site";

describe("Vantis product options", () => {
  it("includes a detachable lens guard on Titan only", () => {
    expect(products.find((product) => product.slug === "titan")?.hasDetachableLensGuard).toBe(true);
    expect(products.find((product) => product.slug === "ghost")?.hasDetachableLensGuard).toBe(false);
  });
  it("offers all four requested phone models", () => {
    expect([...models]).toEqual(["iPhone 18 Pro Max", "iPhone 18 Pro", "iPhone 17 Pro Max", "iPhone 17 Pro"]);
  });
  it("offers Black and Blue", () => {
    expect(colors.map((color) => color.name)).toEqual(["Black", "Blue"]);
  });
  it("randomly selects another supported model each banner loop", () => {
    expect(nextBannerModel("iPhone 18 Pro Max", () => 0)).toBe("iPhone 18 Pro");
    expect(nextBannerModel("iPhone 18 Pro Max", () => 0.5)).toBe("iPhone 17 Pro Max");
    expect(nextBannerModel("iPhone 18 Pro Max", () => 0.99)).toBe("iPhone 17 Pro");
    for (const model of models) {
      expect(models).toContain(nextBannerModel(model));
      expect(nextBannerModel(model)).not.toBe(model);
    }
  });
});

describe("Vantis prices and shipping", () => {
  it("prices Titan at $24.99 and Ghost at $15.99", () => {
    expect(products.map((p) => [p.slug, p.price])).toEqual([["titan", 24.99], ["ghost", 15.99]]);
  });
  it("shows prices with two decimals", () => {
    expect(formatPrice(24.99)).toBe("$24.99");
    expect(formatPrice(15.99 * 3)).toBe("$47.97");
  });
  it("offers free shipping only once the order passes $40", () => {
    expect(freeShippingNote(24.99 + 15.99)).toBe("Free shipping included.");
    expect(freeShippingNote(15.99 * 2)).toBe("Add $8.02 more for free shipping.");
    expect(freeShippingNote(24.99 * 2)).toBe("Free shipping included.");
    expect(FREE_SHIPPING_THRESHOLD).toBe(40);
    expect(products.every((p) => p.price < FREE_SHIPPING_THRESHOLD)).toBe(true);
    expect(products[0].price + products[1].price).toBeGreaterThan(FREE_SHIPPING_THRESHOLD);
    expect(freeShippingNote(15.99)).toBe("Add $24.01 more for free shipping.");
    expect(freeShippingNote(47.97)).toBe("Free shipping included.");
  });
});
import { stockFor, isLowStock } from "@/lib/catalog";
describe("Vantis stock", () => {
  it("has 12 Black 18 Pro Max Titan, 9 Black 18 Pro Max Ghost, 10 otherwise", () => {
    expect(stockFor("titan", "iPhone 18 Pro Max", "Black")).toBe(12);
    expect(stockFor("ghost", "iPhone 18 Pro Max", "Black")).toBe(9);
    expect(stockFor("titan", "iPhone 18 Pro Max", "Blue")).toBe(10);
    expect(stockFor("ghost", "iPhone 17 Pro", "Black")).toBe(10);
  });
  it("flags low stock at 10 or fewer", () => {
    expect(isLowStock(12)).toBe(false);
    expect(isLowStock(10)).toBe(true);
  });
});
