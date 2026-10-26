import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, ProductCard, Marquee, products } from "@/components/site";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Cases — Vantis" },
      { name: "description", content: "Shop Vantis Titan and Vantis Ghost cases for iPhone 18 Pro Max." },
      { property: "og:title", content: "Shop Cases — Vantis" },
      { property: "og:description", content: "Shop Vantis Titan and Vantis Ghost cases for iPhone 18 Pro Max." },
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
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="glow-blob animate-glow pointer-events-none absolute -left-20 top-0 h-80 w-80" />
        <p className="label relative text-xs text-primary">Shop</p>
        <h1 className="relative mt-4 text-6xl text-foreground md:text-8xl">Choose your <span className="text-primary">armor</span></h1>
        <p className="relative mt-6 text-muted-foreground">Available now for iPhone 18 Pro Max in Black. More models and colors coming soon.</p>
      </section>
      <Marquee items={["iPhone 18 Pro Max", "Black", "More colors soon", "Built better"]} />
      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        {products.map((p) => <ProductCard key={p.slug} p={p} />)}
      </section>
      <Footer />
    </div>
  );
}
