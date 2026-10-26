import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Magnet, Layers } from "lucide-react";
import { Header, Footer, ProductCard, products, mark } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantis — Phone Cases Built Better" },
      { name: "description", content: "Rugged, MagSafe-ready phone cases. Meet Vantis Titan and Vantis Ghost." },
      { property: "og:title", content: "Vantis — Phone Cases Built Better" },
      { property: "og:description", content: "Rugged, MagSafe-ready phone cases. Meet Vantis Titan and Vantis Ghost." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  { icon: Shield, title: "Drop-tested", text: "Engineered to survive falls up to 15ft." },
  { icon: Magnet, title: "MagSafe ready", text: "Strong magnets for a secure snap and fast charge." },
  { icon: Layers, title: "Hybrid build", text: "Hard shell plus shock-absorbing frame." },
];

function Index() {
  const titan = products[0];
  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="label text-xs text-primary">New — Titan Series</p>
            <h1 className="mt-6 text-5xl leading-tight text-foreground md:text-7xl">
              Built <span className="text-primary">better.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Armor for the phone you can't live without. Military-grade protection with a profile that still feels like yours.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-neon">Shop cases</Link>
              <Link to="/about" className="btn-ghost-neon">Our story</Link>
            </div>
          </div>
          <div className="relative">
            <img src={titan.image} alt="Vantis Titan case on dark rocks" className="w-full border border-border" />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5">
              <div className="hex flex h-14 w-14 shrink-0 items-center justify-center bg-primary">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl text-foreground md:text-4xl">The lineup</h2>
          <Link to="/shop" className="label text-xs text-primary hover:underline">View all</Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {products.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col items-center gap-8 border border-primary px-6 py-16 text-center">
          <img src={mark.url} alt="" className="h-14 w-14" />
          <h2 className="max-w-2xl text-3xl text-foreground md:text-4xl">Protect what matters most.</h2>
          <Link to="/shop" className="btn-neon">Find your case</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
