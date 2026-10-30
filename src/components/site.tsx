import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/vantislogotype.png.asset.json";
import mark from "@/assets/vantisV.png.asset.json";
import titan from "@/assets/titanhero2good.png.asset.json";
import ghost from "@/assets/ghosthero1.png.asset.json";
import { formatPrice, models, nextBannerModel } from "@/lib/catalog";
export { colors, formatPrice, FREE_SHIPPING_THRESHOLD, freeShippingNote, models } from "@/lib/catalog";

export const products = [
  {
    slug: "titan",
    name: "Titan",
    price: 24.99,
    hasDetachableLensGuard: true,
    image: titan.url,
    tagline: "Rugged armor for the toughest days.",
    description:
      "Titan is our toughest case. A reinforced frame, raised edges, a detachable lens guard and built-in MagSafe magnets keep your phone safe without slowing you down.",
    features: [
      ["Military grade protection", "Drop-tested up to 15ft."],
      ["MagSafe compatible", "Stronger hold. Faster charge."],
      ["Raised edges", "Protects what matters most."],
      ["Detachable lens guard", "Removable protection for your camera lenses."],
    ],
  },
  {
    slug: "ghost",
    name: "Ghost",
    price: 16.99,
    hasDetachableLensGuard: false,
    image: ghost.url,
    tagline: "Slim hybrid. Serious protection.",
    description:
      "Ghost is the slim one. A hybrid shell gives everyday protection in a profile that barely adds bulk.",
    features: [
      ["Shockproof", "Built to withstand drops and impacts."],
      ["Hybrid", "Strong style. Stronger protection."],
    ],
  },
] as const;

export type Product = (typeof products)[number];
export { mark, logo };

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Marquee({ items, rotateModels = false }: { items: string[]; rotateModels?: boolean }) {
  const [featuredModel, setFeaturedModel] = useState<string>(models[0]);
  const content = rotateModels ? ["Free shipping over $50", featuredModel, ...items] : items;
  const row = [...content, ...content, ...content, ...content];
  return (
    <div className="overflow-hidden bg-primary py-3 text-primary-foreground">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap" onAnimationIteration={() => { if (rotateModels) setFeaturedModel((current) => nextBannerModel(current)); }}>
        {[...row, ...row].map((t, i) => (
          <span key={i} className="label flex items-center gap-10 text-xs">
            {t}
            <img src={mark.url} alt="" className="h-3 w-3 brightness-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3">
        <Link to="/" aria-label="Vantis home">
          <img src={logo.url} alt="Vantis" className="h-5 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="label rounded-full px-4 py-2 text-[0.65rem] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link to="/shop" className="btn-neon hidden !px-5 !py-2.5 md:inline-flex">Shop now</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="glass mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl p-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="label rounded-2xl px-4 py-3 text-xs">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 overflow-hidden border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo.url} alt="Vantis" className="h-7 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Phone cases that are built better. Tough, clean, made to last.</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="label text-[0.65rem] text-primary">Shop</p>
          {products.map((p) => (
            <Link key={p.slug} to="/shop/$slug" params={{ slug: p.slug }} className="block text-muted-foreground hover:text-foreground">
              Vantis {p.name}
            </Link>
          ))}
        </div>
        <div className="space-y-3 text-sm">
          <p className="label text-[0.65rem] text-primary">Company</p>
          <Link to="/about" className="block text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
        </div>
      </div>
      <p className="text-outline select-none text-center font-display text-[18vw] font-bold italic leading-none">VANTIS</p>
      <p className="py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Vantis. Built better.</p>
    </footer>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: p.slug }}
      className="group relative block overflow-hidden rounded-[2rem] bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
    >
      <img
        src={p.image}
        alt={`Vantis ${p.name} phone case`}
        className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="glass absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl px-5 py-4">
        <div>
          <h3 className="text-2xl text-foreground">Vantis {p.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
        </div>
        <span className="label rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground">{formatPrice(p.price)}</span>
      </div>
    </Link>
  );
}
