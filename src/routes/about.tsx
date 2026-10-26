import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, mark } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vantis" },
      { name: "description", content: "Vantis makes phone cases that are built better: tough, clean, and made to last." },
      { property: "og:title", content: "About — Vantis" },
      { property: "og:description", content: "Vantis makes phone cases that are built better: tough, clean, and made to last." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="mx-auto max-w-3xl px-6 py-24">
        <img src={mark.url} alt="" className="h-14 w-14" />
        <h1 className="mt-8 text-4xl text-foreground md:text-6xl">Built <span className="text-primary">better.</span></h1>
        <div className="mt-10 space-y-6 text-lg text-muted-foreground">
          <p>Vantis started with a simple idea: your phone case shouldn't force a choice between protection and style.</p>
          <p>Every case is designed around real-world drops, everyday wear, and the accessories you actually use, like MagSafe chargers and mounts.</p>
          <p>No gimmicks. Just cases that do their job and look sharp doing it.</p>
        </div>
        <Link to="/shop" className="btn-neon mt-12">Shop the lineup</Link>
      </section>
      <Footer />
    </div>
  );
}
