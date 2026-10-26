import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, products } from "@/components/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Cases — Vantis" },
      { name: "description", content: "Shop Vantis Titan and Vantis Ghost protective phone cases." },
      { property: "og:title", content: "Shop Cases — Vantis" },
      { property: "og:description", content: "Shop Vantis Titan and Vantis Ghost protective phone cases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="label text-xs text-primary">Shop</p>
        <h1 className="mt-4 text-4xl text-foreground md:text-6xl">Choose your armor</h1>
      </section>
      {products.map((p, i) => (
        <section key={p.slug} className="border-t border-border">
          <div className={`mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <img src={p.image} alt={`Vantis ${p.name} phone case`} className="w-full border border-border" loading="lazy" />
            <div>
              <h2 className="text-4xl text-foreground">Vantis <span className="text-primary">{p.name}</span></h2>
              <p className="mt-4 text-lg text-muted-foreground">{p.tagline}</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {p.features.map(([t, d]) => (
                  <li key={t} className="py-4">
                    <p className="label text-xs text-foreground">{t}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-6">
                <span className="label text-2xl text-primary">{p.price}</span>
                <button type="button" className="btn-neon">Add to cart</button>
              </div>
            </div>
          </div>
        </section>
      ))}
      <Footer />
    </div>
  );
}
