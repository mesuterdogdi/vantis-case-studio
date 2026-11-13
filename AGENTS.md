<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep supported models, color swatches, and banner model selection in the shared catalog module so shop browsing and both product pages stay consistent.
- Use the shop marquee's animation iteration event to choose a different random supported model after each full loop; preserve a deterministic initial model for hydration.
- Keep site-wide motion in the browser-only SiteMotion enhancement and semantic stylesheet rules; use frame-scheduled scroll updates and reversible effects, respect reduced motion, and leave artwork and controls usable without animation to preserve accessibility and performance.
- Keep original product photos accurate: label them as Black and disclose that Blue photos are not available instead of recoloring supplied assets.
- Keep product-detail photography in ProductGallery, separate from storefront artwork, so studio views can be browsed and enlarged without replacing shared promotional images.
