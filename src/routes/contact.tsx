import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, MessageCircle, Send, ShieldCheck, Truck } from "lucide-react";
import { Header, Footer, mark } from "@/components/site";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colors, models, FREE_SHIPPING_THRESHOLD } from "@/lib/catalog";

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

const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary";
const topics = ["General question", "Choosing a case", "Order & delivery", "Wholesale & partnerships"];

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("General question");
  const [message, setMessage] = useState("");
  const [model, setModel] = useState<string>("");
  const [color, setColor] = useState<string>("");

  function resetForm() {
    setSent(false);
    setName("");
    setTopic("General question");
    setMessage("");
    setModel("");
    setColor("");
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-[88rem] px-6 lg:px-12 pb-8 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="label text-xs text-primary">Vantis / Contact</p>
            <h1 className="mt-5 text-6xl text-foreground md:text-7xl">Let's<br /><span className="text-primary">talk.</span></h1>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Big question, small detail, or a new idea. Whatever's on your mind, we'd love to hear it.</p>
            <div className="mt-10 space-y-6 border-t border-border pt-8">
              <div className="flex gap-4"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-semibold">Find your fit</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Titan or Ghost? Let's find the right case for your everyday.</p></div></div>
              <div className="flex gap-4"><Truck className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-semibold">Order questions</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">A question about your order? Include your order number if you have one.</p></div></div>
              <div className="flex gap-4"><MessageCircle className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="font-semibold">Something else?</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Feedback, collaborations, or a simple hello. We're all ears.</p></div></div>
            </div>
            <img src={mark.url} alt="" className="mt-10 h-12 w-12 object-contain" />
          </div>

          <div className="min-w-0 rounded-[2rem] border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div role="status" aria-live="polite" className="animate-rise flex min-h-[550px] flex-col items-center justify-center text-center">
                <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"><Check className="h-8 w-8" /></span>
                <p className="label text-xs text-primary">A little hello goes a long way</p>
                <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Thanks{name.trim() ? `, ${name.trim().split(/\s+/)[0]}` : ""}!</h2>
                <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">Thank you for your message and for being part of Vantis. We appreciate you taking the time to reach out.</p>
                <Button asChild className="btn-neon mt-8 h-auto"><Link to="/shop">Explore the cases <ArrowRight /></Link></Button>
                <Button variant="link" className="mt-3" onClick={resetForm}>Write another message</Button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setSending(true); setError("");
                try {
                  const res = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                      access_key: "b598b515-8d77-43bd-9b98-3e5452f1e645", from_name: "Vantis website",
                      name: name.trim(), email: String(fd.get("email") ?? "").trim(), topic,
                      orderNumber: String(fd.get("orderNumber") ?? ""), model, color, message: message.trim(),
                      subject: `Vantis contact: ${topic}`, replyto: String(fd.get("email") ?? ""),
                      botcheck: String(fd.get("botcheck") ?? ""),
                    }),
                  });
                  const json = await res.json().catch(() => ({}));
                  if (!res.ok || json.success === false || json.success === "false") throw new Error();
                  setSent(true);
                } catch { setError("Sorry, your message couldn't be sent. Please try again in a moment."); }
                finally { setSending(false); }
              }}>
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="mb-7"><h2 className="text-3xl">Drop us a line.</h2><p className="mt-3 text-sm text-muted-foreground">Good conversations start with a hello.</p></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><label htmlFor="contact-name" className="text-sm font-medium">Your name <span className="text-primary">*</span></label><input id="contact-name" name="name" required autoComplete="name" maxLength={80} placeholder="Your name" className={field} value={name} onChange={(e) => setName(e.target.value)} /></div>
                  <div className="space-y-2"><label htmlFor="contact-email" className="text-sm font-medium">Email <span className="text-primary">*</span></label><input id="contact-email" name="email" required type="email" autoComplete="email" placeholder="you@example.com" className={field} /></div>
                </div>
                <div className="space-y-2"><label htmlFor="contact-topic" className="text-sm font-medium">What's on your mind?</label><Select value={topic} onValueChange={setTopic}><SelectTrigger id="contact-topic" className="h-12 rounded-xl bg-background"><SelectValue /></SelectTrigger><SelectContent>{topics.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
                {topic === "Order & delivery" && <div className="space-y-2"><label htmlFor="contact-order" className="text-sm font-medium">Order number <span className="text-muted-foreground">(optional)</span></label><input id="contact-order" name="orderNumber" placeholder="Order #" className={field} /></div>}
                {topic === "Choosing a case" && <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><label htmlFor="contact-model" className="text-sm font-medium">Phone model</label><Select value={model} onValueChange={setModel}><SelectTrigger id="contact-model" className="h-12 rounded-xl bg-background"><SelectValue placeholder="Select a model" /></SelectTrigger><SelectContent>{models.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><label htmlFor="contact-color" className="text-sm font-medium">Color</label><Select value={color} onValueChange={setColor}><SelectTrigger id="contact-color" className="h-12 rounded-xl bg-background"><SelectValue placeholder="Select a color" /></SelectTrigger><SelectContent>{colors.map((item) => <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>)}</SelectContent></Select></div>
                </div>}
                <div className="space-y-2"><label htmlFor="contact-message" className="text-sm font-medium">Your message <span className="text-primary">*</span></label><textarea id="contact-message" name="message" required rows={5} maxLength={2000} placeholder={topic === "Choosing a case" ? "What matters most to you in a case?" : topic === "Wholesale & partnerships" ? "Tell us a little about your business or idea…" : "Tell us what's on your mind…"} className={`${field} min-h-36 resize-y`} value={message} onChange={(e) => setMessage(e.target.value)} /><p className="text-right text-xs tabular-nums text-muted-foreground">{message.length} / 2,000</p></div>
                {error && <p role="alert" className="text-center text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={sending} className="btn-neon h-auto w-full">{sending ? "Sending…" : <>Send message <Send /></>}</Button>
              </form>
            )}
          </div>
        </div>

        <section className="mt-20 grid gap-8 border-t border-border pt-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div><p className="label text-xs text-primary">Quick answers</p><h2 className="mt-4 text-4xl">Wondering<br />about something?</h2></div>
          <Accordion type="single" collapsible>
            <AccordionItem value="cases"><AccordionTrigger>What's the difference between Titan and Ghost?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Titan is the rugged option, with a reinforced frame, raised edges, MagSafe magnets, and a detachable lens guard. Ghost has a slimmer hybrid shell without a detachable lens guard.<Button asChild variant="link" className="mt-2 px-0"><Link to="/shop">Compare the cases <ArrowRight /></Link></Button></AccordionContent></AccordionItem>
            <AccordionItem value="models"><AccordionTrigger>Will a Vantis case fit my phone?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Both cases are available for {models.join(", ")}, in Black and Blue. Pick your exact phone model on the case page.</AccordionContent></AccordionItem>
            <AccordionItem value="shipping"><AccordionTrigger>Do you offer free shipping?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Yes — free shipping on orders over ${FREE_SHIPPING_THRESHOLD}.</AccordionContent></AccordionItem>
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
}
