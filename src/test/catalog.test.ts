import { describe, expect, it } from "vitest";
import { models, colors, nextBannerModel, formatPrice } from "@/lib/catalog";
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