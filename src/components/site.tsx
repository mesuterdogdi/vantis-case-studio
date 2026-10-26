import { Link } from "@tanstack/react-router";
import logo from "@/assets/vantislogotype.png.asset.json";
import mark from "@/assets/vantisV.png.asset.json";
import titan from "@/assets/VANTISTITANLOGOPRODUCTREAL.png.asset.json";
import ghost from "@/assets/VANTISGHOSTPRODUCTLOGO.png.asset.json";

export const products = [
  {
    slug: "titan",
    name: "Titan",
    price: "$49",
    image: titan.url,
    tagline: "Rugged armor for the toughest days.",
    features: [
      ["Military grade protection", "Drop-tested up to 15ft."],
      ["MagSafe compatible", "Stronger hold. Faster charge."],
      ["Raised edges", "Protects what matters most."],
    ],
  },
  {
    slug: "ghost",
    name: "Ghost",
    price: "$39",
    image: ghost.url,
    tagline: "Slim hybrid. Serious protection.",
    features: [
      ["Detachable lens guard", "Protects what matters most."],
      ["Shockproof", "Built to withstand drops and impacts."],
      ["Hybrid", "Strong style. Stronger protection."],
    ],
  },
] as const;

export { mark };

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Vantis home">
          <img src={logo.url} alt="Vantis" className="h-6 w-auto" />
        </Link>
        <nav className="flex gap-6 md:gap-10">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="label text-[0.65rem] text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <img src={mark.url} alt="" className="h-8 w-8" />
          <span className="label text-sm text-primary">Built better.</span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Vantis. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function ProductCard({ p }: { p: (typeof products)[number] }) {
  return (
    <article className="group overflow-hidden border border-border bg-card transition-colors hover:border-primary">
      <div className="overflow-hidden">
        <img
          src={p.image}
          alt={`Vantis ${p.name} phone case`}
          className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex items-end justify-between gap-4 p-6">
        <div>
          <h3 className="text-xl text-foreground">Vantis {p.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
        </div>
        <span className="label text-lg text-primary">{p.price}</span>
      </div>
    </article>
  );
}
