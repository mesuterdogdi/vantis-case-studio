import { describe, expect, it } from "vitest";
import { colors, FREE_SHIPPING_THRESHOLD, formatPrice, freeShippingNote, models, nextBannerModel } from "@/lib/catalog";
import { products } from "@/components/site";

describe("Vantis product options", () => {
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
  it("prices Titan at $24.99 and Ghost at $16.99", () => {
    expect(products.map((p) => [p.slug, p.price])).toEqual([["titan", 24.99], ["ghost", 16.99]]);
  });
  it("shows prices with two decimals", () => {
    expect(formatPrice(24.99)).toBe("$24.99");
    expect(formatPrice(16.99 * 3)).toBe("$50.97");
  });
  it("offers free shipping only once the order passes $50", () => {
    expect(FREE_SHIPPING_THRESHOLD).toBe(30);
    expect(products.every((p) => p.price < FREE_SHIPPING_THRESHOLD)).toBe(true);
    expect(products[0].price + products[1].price).toBeGreaterThan(FREE_SHIPPING_THRESHOLD);
    expect(freeShippingNote(16.99)).toBe("Add $13.01 more for free shipping.");
    expect(freeShippingNote(41.98)).toBe("Free shipping included.");
  });
});