import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Truck, Lock } from "lucide-react";
import { Header, Footer, products, formatPrice, freeShippingNote } from "@/components/site";
import { stockFor, FREE_SHIPPING_THRESHOLD } from "@/lib/catalog";
import { cart, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Vantis" },
      { name: "description", content: "Review your Vantis cases before checkout." },
      { property: "og:title", content: "Your cart — Vantis" },
      { property: "og:description", content: "Review your Vantis cases before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const lines = items.map((i) => ({ ...i, p: products.find((p) => p.slug === i.slug)! })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-[96rem] px-6 pb-16 pt-16 lg:px-12">
        <p className="label text-xs text-primary">Vantis / Cart</p>
        <h1 className="mt-4 text-6xl text-foreground md:text-7xl">Your <span className="text-primary">cart.</span></h1>
        {lines.length === 0 ? (
          <div className="mt-12 rounded-[2rem] border border-border bg-card p-12 text-center">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="btn-neon mt-6">Shop cases</Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <ul className="space-y-4">
              {lines.map((l) => {
                const stock = stockFor(l.slug, l.model, l.color);
                return (
                  <li key={`${l.slug}-${l.model}-${l.color}`} className="flex gap-5 rounded-[2rem] border border-border bg-card p-4 sm:p-5">
                    <img src={l.p.image} alt={`Vantis ${l.p.name}`} className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xl font-display italic uppercase">Vantis {l.p.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{l.model} · {l.color}</p>
                        </div>
                        <p className="label shrink-0 text-foreground">{formatPrice(l.p.price * l.qty)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 rounded-full bg-secondary px-4 py-2">
                          <button onClick={() => cart.setQty(l, l.qty - 1)} aria-label="Less"><Minus className="h-4 w-4" /></button>
                          <span className="w-6 text-center">{l.qty}</span>
                          <button onClick={() => cart.setQty(l, Math.min(stock, l.qty + 1))} disabled={l.qty >= stock} className="disabled:opacity-40" aria-label="More"><Plus className="h-4 w-4" /></button>
                        </div>
                        <button onClick={() => cart.remove(l)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /> Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <aside className="h-fit rounded-[2rem] border border-border bg-card p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="text-3xl">Summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Items</dt><dd>{count}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}</dd></div>
              </dl>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Truck className="h-4 w-4 shrink-0 text-primary" /> {freeShippingNote(subtotal)}</p>
              <div className="mt-6 flex justify-between border-t border-border pt-6"><span className="label">Total</span><span className="label text-2xl text-primary">{formatPrice(subtotal)}</span></div>
              <button disabled className="btn-neon mt-6 w-full justify-center opacity-60"><Lock className="h-4 w-4" /> Checkout coming soon</button>
              <p className="mt-3 text-center text-xs text-muted-foreground">Secure payments are being set up. Your cart is saved on this device.</p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
