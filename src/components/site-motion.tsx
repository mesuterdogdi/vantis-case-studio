import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/** Progressive enhancement: artwork and controls remain usable without motion. */
export function SiteMotion() {
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};

    function setup() {
      cleanup();
      if (reducedMotion.matches) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section, section, footer"));
      const revealTargets = sections.filter((section) => section.getBoundingClientRect().top >= window.innerHeight);
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
      revealTargets.forEach((section) => {
        section.classList.add("motion-reveal");
        observer.observe(section);
      });

      const backdrop = document.querySelector<HTMLElement>("[data-motion-background]");
      let scrollFrame = 0;
      const updateScroll = () => {
        document.documentElement.classList.toggle("site-scrolled", window.scrollY > 32);
        if (backdrop) {
          const section = backdrop.parentElement;
          const bounds = section?.getBoundingClientRect();
          if (bounds && bounds.bottom > 0) {
            backdrop.style.setProperty("--artwork-drift", `${Math.min(28, Math.max(0, -bounds.top) * 0.06)}px`);
          }
        }
      };
      const onScroll = () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(updateScroll);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      const detach: Array<() => void> = [];
      if (finePointer.matches) {
        document.querySelectorAll<HTMLElement>("[data-motion-tilt]").forEach((element) => {
          let frame = 0;
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            cancelAnimationFrame(frame);
            const bounds = element.getBoundingClientRect();
            const x = Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5));
            const y = Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5));
            frame = requestAnimationFrame(() => {
              element.style.setProperty("--tilt-x", `${-y * 7}deg`);
              element.style.setProperty("--tilt-y", `${x * 7}deg`);
            });
          };
          const reset = () => {
            cancelAnimationFrame(frame);
            element.style.removeProperty("--tilt-x");
            element.style.removeProperty("--tilt-y");
          };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", reset);
          element.addEventListener("blur", reset);
          detach.push(() => {
            reset();
            element.removeEventListener("pointermove", move);
            element.removeEventListener("pointerleave", reset);
            element.removeEventListener("blur", reset);
          });
        });
      }

      cleanup = () => {
        cancelAnimationFrame(scrollFrame);
        backdrop?.style.removeProperty("--artwork-drift");
        observer.disconnect();
        revealTargets.forEach((section) => section.classList.remove("motion-reveal", "motion-visible"));
        window.removeEventListener("scroll", onScroll);
        document.documentElement.classList.remove("site-scrolled");
        detach.forEach((remove) => remove());
      };
    }

    setup();
    reducedMotion.addEventListener("change", setup);
    return () => {
      cleanup();
      reducedMotion.removeEventListener("change", setup);
    };
  }, [pathname]);

  return null;
}