import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Footer } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vantis" },
      { name: "description", content: "Questions about your Vantis case or order? Get in touch." },
      { property: "og:title", content: "Contact — Vantis" },
      { property: "og:description", content: "Questions about your Vantis case or order? Get in touch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-2xl border border-border bg-card px-5 py-4 text-foreground outline-none transition-colors focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        <div className="glow-blob animate-glow pointer-events-none absolute -left-10 top-10 h-80 w-80" />
        <div className="relative">
          <p className="label text-xs text-primary">Contact</p>
          <h1 className="mt-4 text-6xl text-foreground md:text-7xl">Let's <span className="text-primary">talk.</span></h1>
          <p className="mt-6 max-w-sm text-muted-foreground">Questions about a case, an order or wholesale? Send a message and we'll get back to you.</p>
        </div>
        <form
          className="glass relative space-y-4 rounded-[2rem] p-8"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          {sent ? (
            <p className="py-16 text-center font-display text-3xl font-bold italic uppercase text-primary">Message sent.</p>
          ) : (
            <>
              <input required placeholder="Name" className={field} />
              <input required type="email" placeholder="Email" className={field} />
              <textarea required rows={5} placeholder="Message" className={field} />
              <button className="btn-neon w-full justify-center">Send message</button>
            </>
          )}
        </form>
      </section>
      <Footer />
    </div>
  );
}
