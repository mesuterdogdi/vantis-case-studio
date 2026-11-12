import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Header, Footer } from "@/components/site";
import { cart, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout-success")({
  head: () => ({
    meta: [
      { title: "Order confirmed — Vantis" },
      { name: "description", content: "Thanks for your Vantis order. Your case is on its way soon." },
      { property: "og:title", content: "Order confirmed — Vantis" },
      { property: "og:description", content: "Thanks for your Vantis order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Success,
});

function Success() {
  const items = useCart();
  useEffect(() => { items.forEach((i) => cart.remove(i)); }, [items]);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 text-5xl text-foreground md:text-7xl">Thank <span className="text-primary">you!</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">Your order is confirmed. A receipt is on its way to your email, and we'll send tracking as soon as your case ships.</p>
        <Link to="/shop" className="btn-neon mt-10">Keep shopping</Link>
      </main>
      <Footer />
    </div>
  );
}
