import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, Marquee, mark, products } from "@/components/site";

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

const values = [
  ["01", "Protection first", "Every case starts with real-world drops and everyday wear."],
  ["02", "Clean design", "No clutter. Sharp lines that look good on any desk."],
  ["03", "Made to last", "Materials chosen to hold up for years, not months."],
];

function About() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="relative mx-auto max-w-[96rem] px-6 lg:px-12 py-24">
        <div className="glow-blob animate-glow pointer-events-none absolute right-0 top-0 h-96 w-96" />
        <img src={mark.url} alt="" className="animate-floaty relative h-16 w-16" />
        <h1 className="relative mt-8 max-w-4xl text-6xl text-foreground md:text-8xl">
          No compromise. <span className="text-primary">Built better.</span>
        </h1>
        <p className="relative mt-8 max-w-2xl text-lg text-muted-foreground">
          Vantis started with a simple idea: your phone case shouldn't force a choice between protection and style. No gimmicks. Just cases that do their job and look sharp doing it.
        </p>
        <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Your phone goes everywhere you do. It lands on desks, gets tossed into bags, and comes along for the unexpected. We believe the case around it should feel like a natural part of your day — comfortable to carry, easy to use, and ready when life gets a little rough.
        </p>
        <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          That idea shapes our lineup. Titan takes a bolder approach with a reinforced frame, while Ghost keeps things slim with a hybrid shell. Different personalities, one shared purpose: protection that doesn't get in the way of your own style. Clean details, a confident look, and nothing added just for the sake of it. That's what built better means to us.
        </p>
      </section>
      <Marquee items={["Protection first", "Clean design", "Made to last"]} />
      <section className="mx-auto grid max-w-[96rem] gap-6 px-6 py-24 md:grid-cols-3">
        {values.map(([n, t, d]) => (
          <div key={n} className="rounded-[2rem] bg-card p-8">
            <p className="font-display text-5xl font-bold italic text-primary">{n}</p>
            <h3 className="mt-6 text-2xl text-foreground">{t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto grid max-w-[96rem] items-center gap-12 px-6 md:grid-cols-2">
        <img src={products[1].image} alt="Vantis Ghost case" className="rounded-[2.5rem]" loading="lazy" />
        <div>
          <h2 className="text-5xl text-foreground">Designed for the <span className="text-primary">everyday.</span></h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">From MagSafe chargers to car mounts, our cases are designed around the accessories you actually use. We pay attention to the little things — how a case feels in your hand, how it sits on a surface, and how easily it fits into your routine. Because a good case should do more than look right in a photo. It should feel right every time you pick up your phone.</p>
          <Link to="/shop" className="btn-neon mt-10">Shop the lineup</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
