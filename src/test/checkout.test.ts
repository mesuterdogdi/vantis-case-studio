import { afterEach, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    inputValidator: () => ({ handler: (handler: unknown) => handler }),
  }),
}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeader: () => "http://localhost:8080",
}));

import { createCheckout } from "@/lib/checkout.functions";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("uses the supplied $15.99 Ghost price ID and subtotal for shipping", async () => {
  vi.stubEnv("STRIPE_SECRET_KEY", "test-placeholder");
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ url: "https://checkout.stripe.com/test-placeholder" }),
  });
  vi.stubGlobal("fetch", fetchMock);
  await createCheckout({ data: { items: [
    { slug: "ghost", model: "iPhone 18 Pro Max", color: "Black", qty: 2 },
  ] } });
  const body = fetchMock.mock.calls[0]?.[1]?.body as URLSearchParams;
  expect(body.get("line_items[0][price]")).toBe("price_1Uamfd387l6jwqk6vc6cM4mU");
  expect(body.get("line_items[0][quantity]")).toBe("2");
  expect(body.get("shipping_options[0][shipping_rate_data][fixed_amount][amount]")).toBe("499");
});