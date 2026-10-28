import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Header, Footer, ProductCard, products, models, colors, formatPrice, freeShippingNote } from "@/components/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { name: product.name, tagline: product.tagline };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `Vantis ${loaderData.name} — iPhone 18 & 17 Pro Cases` : "Case not found — Vantis";
    const desc = loaderData?.tagline ?? "Vantis phone cases.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen">
      <Header />
      <div className="py-32 text-center">
        <h1 className="text-5xl">Case not found</h1>
        <Link to="/shop" className="btn-neon mt-8">Back to shop</Link>
      </div>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const p = products.find((x) => x.slug === slug);
  const [model, setModel] = useState<string>(models[0]);
  const [color, setColor] = useState<string>(colors[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const others = products.filter((x) => x.slug !== slug);
  if (!p) return null;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <div className="glow-blob animate-glow pointer-events-none absolute left-0 top-20 h-96 w-96" />
        <div className="relative md:sticky md:top-28 md:self-start">
          <img src={p.image} alt={`Vantis ${p.name} in Black`} className="animate-rise w-full rounded-[2.5rem]" />
          {color === "Blue" && <p className="mt-4 text-center text-xs text-muted-foreground">Blue selected. Product photo shows Black; Blue photos coming soon.</p>}
        </div>
        <div className="animate-rise relative">
          <Link to="/shop" className="label text-[0.65rem] text-muted-foreground hover:text-primary">← All cases</Link>
          <h1 className="mt-4 text-6xl text-foreground md:text-7xl">Vantis <span className="text-primary">{p.name}</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.tagline}</p>
          <p className="label mt-6 text-3xl text-foreground">{formatPrice(p.price * qty)}</p>
          <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Truck className="h-4 w-4 shrink-0 text-primary" /> {freeShippingNote(p.price * qty)}</p>

          <div className="mt-10">
            <p className="label text-[0.65rem] text-muted-foreground">Model</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {models.map((m) => (
                <Button variant="outline" aria-pressed={model === m} key={m} onClick={() => setModel(m)} className={`h-auto rounded-full border px-5 py-3 text-sm transition-colors ${model === m ? "border-primary text-primary" : "border-border text-muted-foreground"}`}>
                  {m}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="label text-[0.65rem] text-muted-foreground">Color — <span className="text-foreground">{color}</span></p>
            <div className="mt-3 flex gap-3">
              {colors.map((c) => (
                <Button variant="outline" aria-pressed={color === c.name} key={c.name} onClick={() => setColor(c.name)} aria-label={c.name} className={`h-11 w-11 rounded-full border-2 p-1 ${color === c.name ? "border-primary" : "border-border"}`}>
                  <span className={`block h-full w-full rounded-full ${c.swatch} ring-1 ring-border`} />
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full bg-secondary px-4 py-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Less"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="More"><Plus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }} className="btn-neon flex-1 justify-center">
              {added ? <><Check className="h-4 w-4" /> Added</> : "Add to cart"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            {[[Truck, "Fast shipping"], [ShieldCheck, "Lifetime warranty"], [RotateCcw, "30-day returns"]].map(([I, t]) => {
              const Icon = I as typeof Truck;
              return (
                <div key={t as string} className="rounded-2xl bg-card p-4">
                  <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />{t as string}
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-muted-foreground">{p.description}</p>
          <div className="mt-8 space-y-3">
            {p.features.map(([t, d]) => (
              <div key={t} className="flex gap-4 rounded-2xl bg-card p-5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="label text-xs text-foreground">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <h2 className="text-4xl text-foreground">You might also like</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {others.map((o) => <ProductCard key={o.slug} p={o} />)}
        </div>
      </section>
      <Footer />
    </div>
  );
}
