import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header, Footer, Marquee, products, colors, formatPrice } from "@/components/site";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Cases — Vantis" },
      { name: "description", content: "Shop Vantis Titan and Ghost cases for iPhone 18 Pro and Pro Max, and iPhone 17 Pro and Pro Max, in Black or Blue. Titan $24.99, Ghost $16.99. Free shipping on orders over $50." },
      { property: "og:title", content: "Shop Cases — Vantis" },
      { property: "og:description", content: "Explore Titan ($24.99) and Ghost ($16.99) for iPhone 18 and 17 Pro models in Black or Blue. Free shipping on orders over $50." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="mx-auto flex max-w-[88rem] flex-col justify-between gap-6 px-6 pb-12 pt-16 md:flex-row md:items-end">
        <div>
          <p className="label text-xs text-primary">The case collection</p>
          <h1 className="mt-4 text-5xl text-foreground md:text-7xl">Vantis <span className="text-primary">cases.</span></h1>
          <p className="mt-5 max-w-lg text-muted-foreground">Two ways to protect your phone. Find your fit.</p>
        </div>
        <p className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground"><Truck className="h-5 w-5 text-primary" /> Free shipping on orders over $50</p>
      </section>
      <Marquee rotateModels items={["Built better", "MagSafe compatible"]} />
      <section className="mx-auto max-w-[88rem] px-6 lg:px-12 pt-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          {products.map((p) => (
            <article key={p.slug} className="group min-w-0">
              <Link to="/shop/$slug" params={{ slug: p.slug }} aria-label={`Explore Vantis ${p.name}`} className="relative block overflow-hidden rounded-lg bg-card">
                <img src={p.image} alt={`Vantis ${p.name} in Black`} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transform-none" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/80 to-background/10 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                  <p className="label text-[0.65rem] text-primary">Features</p>
                  <ul className="mt-4 space-y-3">
                    {p.features.map(([t, d], i) => (
                      <li key={t} style={{ transitionDelay: `${i * 70}ms` }} className="flex translate-y-3 gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                        <div>
                          <p className="label text-xs text-foreground">{t}</p>
                          <p className="text-xs text-muted-foreground">{d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
              <div className="pt-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="label text-[0.65rem] text-primary">{p.slug === "titan" ? "Maximum protection" : "Slim everyday protection"}</p>
                  <div className="flex gap-2" aria-label="Available colors">{colors.map((c) => <span key={c.name} title={c.name} className={`h-4 w-4 rounded-full ring-1 ring-border ${c.swatch}`} />)}</div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4"><h2 className="text-4xl text-foreground">Vantis {p.name}</h2><p className="text-xl font-semibold">{formatPrice(p.price)}</p></div>
                <p className="mt-3 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">iPhone 18 & 17 · Pro / Pro Max <span className="mx-2">/</span> Black or Blue</p>
                <Button asChild className="mt-6 h-11 rounded-full px-6"><Link to="/shop/$slug" params={{ slug: p.slug }}>Choose your case <ArrowRight /></Link></Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
