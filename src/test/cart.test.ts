import { describe, it, expect } from "vitest";
import { addLine } from "@/lib/cart";
const l = { slug: "titan", model: "iPhone 18 Pro Max", color: "Black" };
describe("cart", () => {
  it("merges same model/color and caps at stock", () => {
    const a = addLine([], { ...l, qty: 8 }, 12);
    expect(addLine(a, { ...l, qty: 8 }, 12)[0].qty).toBe(12);
  });
  it("keeps different colors as separate lines", () => {
    const a = addLine([], { ...l, qty: 1 }, 12);
    expect(addLine(a, { ...l, color: "Blue", qty: 2 }, 10)).toHaveLength(2);
  });
});
