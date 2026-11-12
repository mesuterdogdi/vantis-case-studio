import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { models, stockFor, FREE_SHIPPING_THRESHOLD } from "@/lib/catalog";

const PRICES = {
  titan: { priceId: "price_1UamOM387l6jwqk6v2tbAtyc", cents: 2499, name: "Titan" },
  ghost: { priceId: "price_1UamOj387l6jwqk6PVvebLxx", cents: 1699, name: "Ghost" },
} as const;
const SHIPPING_FEE_CENTS = 499;

const schema = z.object({
  items: z.array(z.object({
    slug: z.enum(["titan", "ghost"]),
    model: z.enum(models),
    color: z.enum(["Black", "Blue"]),
    qty: z.number().int().min(1).max(50),
  })).min(1).max(20),
});

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["STRIPE_SECRET_KEY"];
    if (!key) return { error: "Checkout is not available right now." };
    const origin = getRequestHeader("origin") || "https://vantis-case-studio.lovable.app";
    const p = new URLSearchParams();
    let subtotal = 0;
    const summary: string[] = [];
    data.items.forEach((it, i) => {
      const qty = Math.min(it.qty, stockFor(it.slug, it.model, it.color));
      const pr = PRICES[it.slug];
      subtotal += pr.cents * qty;
      summary.push(`${qty}x ${pr.name} ${it.model} ${it.color}`);
      p.set(`line_items[${i}][price]`, pr.priceId);
      p.set(`line_items[${i}][quantity]`, String(qty));
    });
    const free = subtotal >= FREE_SHIPPING_THRESHOLD * 100;
    p.set("mode", "payment");
    p.set("success_url", `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`);
    p.set("cancel_url", `${origin}/cart`);
    p.set("shipping_address_collection[allowed_countries][0]", "US");
    p.set("phone_number_collection[enabled]", "true");
    p.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    p.set("shipping_options[0][shipping_rate_data][display_name]", free ? "Free shipping (USPS Ground Advantage)" : "Standard shipping (USPS Ground Advantage)");
    p.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(free ? 0 : SHIPPING_FEE_CENTS));
    p.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
    p.set("metadata[order]", summary.join("; ").slice(0, 490));
    p.set("payment_intent_data[description]", summary.join("; ").slice(0, 490));
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: p,
    });
    const json = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) {
      console.error("Stripe checkout error", json.error?.message);
      return { error: "Couldn't start checkout. Please try again." };
    }
    return { url: json.url };
  });
