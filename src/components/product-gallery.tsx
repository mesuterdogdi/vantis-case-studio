import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import rear from "@/assets/titan-studio-rear.jpg";
import angle from "@/assets/titan-studio-angle.jpg";
import interior from "@/assets/titan-studio-interior.jpg";
import side from "@/assets/titan-studio-side.jpg";
import bottom from "@/assets/titan-studio-bottom.jpg";
import ghostAngle from "@/assets/ghost-studio-angle.jpg";
import ghostRear from "@/assets/ghost-studio-rear.jpg";
import ghostInterior from "@/assets/ghost-studio-interior.jpg";
import ghostSide from "@/assets/ghost-studio-side.jpg";
import ghostBottom from "@/assets/ghost-studio-bottom.jpg";

const titanPhotos = [
  { src: rear, label: "Rear view" },
  { src: angle, label: "Three-quarter view" },
  { src: interior, label: "Interior view" },
  { src: side, label: "Side profile" },
  { src: bottom, label: "Edge detail" },
];

const ghostPhotos = [
  { src: ghostRear, label: "Rear view" },
  { src: ghostAngle, label: "Three-quarter view" },
  { src: ghostInterior, label: "Interior view" },
  { src: ghostSide, label: "Side profile" },
  { src: ghostBottom, label: "Edge detail" },
];

export function ProductGallery({ name, image, color }: { name: string; image: string; color: string }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const photos = name === "Titan" ? titanPhotos : name === "Ghost" ? ghostPhotos : [{ src: image, label: "Product view" }];
  const photo = photos[index] ?? photos[0];
  if (!photo) return null;
  const step = (direction: number) => {
    setIndex((current) => (current + direction + photos.length) % photos.length);
    setZoomed(false);
  };
  const arrows = (expanded = false) => photos.length > 1 && (
    <div className={`flex items-center gap-2 ${expanded ? "justify-center" : ""}`}>
      <Button variant="secondary" size="icon" aria-label="Previous photo" title="Previous photo" onClick={() => step(-1)} className="rounded-full"><ChevronLeft /></Button>
      <span className="min-w-12 text-center text-xs tabular-nums text-muted-foreground" aria-live="polite">{index + 1} / {photos.length}</span>
      <Button variant="secondary" size="icon" aria-label="Next photo" title="Next photo" onClick={() => step(1)} className="rounded-full"><ChevronRight /></Button>
    </div>
  );

  return (
    <div className="product-artwork min-w-0 md:sticky md:top-28 md:self-start">
      <Dialog onOpenChange={() => setZoomed(false)}>
        <div className="relative overflow-hidden rounded-lg">
          <DialogTrigger asChild>
            <Button variant="ghost" aria-label={`Expand ${name} photo`} className="block h-auto w-full overflow-hidden rounded-lg p-0 hover:bg-transparent">
              <img key={photo.src} src={photo.src} alt={`Vantis ${name} in Black — ${photo.label}`} className="gallery-photo-enter aspect-square w-full object-contain" />
              <span className="absolute bottom-4 right-4 rounded-full bg-background/90 p-3 text-foreground"><Expand className="h-4 w-4" /></span>
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-h-[95dvh] w-[calc(100%-2rem)] max-w-4xl gap-3 overflow-auto rounded-lg p-4 pt-10" onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
        }}>
          <DialogTitle className="sr-only">Vantis {name} photo gallery</DialogTitle>
          <DialogDescription className="sr-only">Black case — {photo.label}</DialogDescription>
          <div className="max-h-[72dvh] overflow-auto rounded-lg">
            <img src={photo.src} alt={`Vantis ${name} in Black — ${photo.label}`} className={zoomed ? "w-[1536px] max-w-none" : "mx-auto max-h-[72dvh] w-full object-contain"} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{photo.label}</p>
            {arrows(true)}
            <Button variant="secondary" size="icon" aria-label={zoomed ? "Zoom out" : "Zoom in"} title={zoomed ? "Zoom out" : "Zoom in"} onClick={() => setZoomed((current) => !current)}>{zoomed ? <ZoomOut /> : <ZoomIn />}</Button>
          </div>
        </DialogContent>
      </Dialog>
      {photos.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3" aria-label={`${name} photo views`}>
          {photos.map((item, i) => (
            <Button key={item.src} variant="outline" aria-label={`Show ${item.label.toLowerCase()}`} title={item.label} aria-pressed={index === i} onClick={() => setIndex(i)} className={`aspect-square h-auto w-full overflow-hidden rounded-lg p-0 ${index === i ? "border-primary ring-2 ring-primary" : "border-border"}`}>
              <img src={item.src} alt="" className="h-full w-full object-contain" loading="lazy" />
            </Button>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Black <span className="mx-2">/</span> {photo.label}</p>
        {arrows()}
      </div>
      {color === "Blue" && <p className="mt-3 text-xs text-muted-foreground">Blue photos are not available; pictured case is Black.</p>}
    </div>
  );
}