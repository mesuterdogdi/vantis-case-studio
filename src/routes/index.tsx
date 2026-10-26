import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Magnet, Layers, ArrowRight } from "lucide-react";
import { Header, Footer, ProductCard, Marquee, products, mark } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vantis — Phone Cases Built Better" },
      { name: "description", content: "Rugged, MagSafe-ready phone cases for iPhone 18 Pro Max. Meet Vantis Titan and Vantis Ghost." },
      { property: "og:title", content: "Vantis — Phone Cases Built Better" },
      { property: "og:description", content: "Rugged, MagSafe-ready phone cases for iPhone 18 Pro Max." },
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
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="glow-blob animate-glow pointer-events-none absolute -right-20 top-10 h-[28rem] w-[28rem]" />
        <div className="relative grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <div className="animate-rise">
            <span className="label inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.65rem] text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Now for iPhone 18 Pro Max
            </span>
            <h1 className="mt-8 text-6xl text-foreground md:text-8xl">
              Built<br /><span className="text-primary">better.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Armor for the phone you can't live without. Serious protection that still feels like yours.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-neon">Shop cases <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/about" className="btn-ghost-neon">Our story</Link>
            </div>
          </div>
          <div className="animate-floaty relative">
            <img src={titan.image} alt="Vantis Titan case on dark rocks" className="w-full rounded-[2.5rem] shadow-[var(--shadow-glow)]" />
          </div>
        </div>
      </section>

      <Marquee items={["Military grade protection", "MagSafe compatible", "Drop-tested 15ft", "Free shipping", "Built better"]} />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-24 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="animate-rise rounded-[2rem] bg-card p-8 transition-colors hover:bg-secondary" style={{ animationDelay: `${i * 120}ms` }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mt-6 text-2xl text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-5xl text-foreground md:text-6xl">The <span className="text-primary">lineup</span></h2>
          <Link to="/shop" className="label flex items-center gap-2 text-xs text-primary">View all <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {products.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-20 text-center text-primary-foreground">
          <img src={mark.url} alt="" className="animate-floaty pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-20 brightness-0" />
          <h2 className="relative mx-auto max-w-2xl text-5xl md:text-6xl">Protect what matters most.</h2>
          <Link to="/shop" className="label relative mt-10 inline-flex rounded-full bg-background px-8 py-4 text-xs text-foreground transition-transform hover:scale-105">
            Find your case
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
