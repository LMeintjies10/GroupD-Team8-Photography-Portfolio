import { useState } from "react";
import FavouriteToggle from "./FavouriteToggle.jsx";

// Tailwind only sees full class strings, so layout classes are literals keyed by `size`.
export const SIZE_CLASSES = {
  feature: "col-span-2 row-span-2 sm:col-span-7 sm:row-span-4",
  side: "sm:col-span-5 sm:row-span-2",
  third: "sm:col-span-4 sm:row-span-3",
  thirdWide: "col-span-2 sm:col-span-4 sm:row-span-3",
  banner: "col-span-2 sm:col-span-12 sm:row-span-3",
};

export default function GalleryItem({ photo, layoutClass, isFavourite, onToggleFavourite, onBuy}) {
  const [busy, setBusy] = useState(false);

  async function handleBuy() {
    setBusy(true);
    try {
      await onBuy(photo);
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <figure
      className={`group relative isolate m-0 min-h-0 min-w-0 overflow-hidden bg-image-bg ${layoutClass}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        className="size-full object-cover object-center transition-transform duration-[650ms] ease-out motion-reduce:transition-none group-hover:scale-[1.045]"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-[25%] bottom-0 z-[1] bg-gradient-to-b from-transparent to-black/75 opacity-90 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Invisible button covering the card: clicking anywhere opens the details. */}
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`View details: ${photo.title}`}
        className="absolute inset-0 z-[2] cursor-pointer focus-visible:outline-offset-[-4px]"
      /><button
        type="button"
        onClick={handleBuy}
        disabled={busy}
        className="absolute top-2.5 left-2.5 z-[3] cursor-pointer bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-bg transition hover:bg-accent-hover disabled:opacity-60"
      >
        {busy ? "Redirecting..." : `Buy print · $${(photo.price_cents / 100).toFixed(0)}`}
      </button>

      <FavouriteToggle
        pressed={isFavourite}
        onToggle={() => onToggleFavourite(photo.id)}
        label={photo.title}
      />

      <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 z-[2] flex flex-col gap-1 text-white">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="font-display text-base leading-[1.2] sm:text-[clamp(13px,2vw,18px)] lg:text-[clamp(13px,1.5vw,21px)]">
            {photo.title}
          </span>
          <span className="shrink-0 text-[8px] uppercase tracking-[0.1em]">
            {photo.category}
          </span>
        </div>

        {/* Short overview: appears on hover (and keyboard focus) from tablet width up. */}
        <p className="m-0 hidden text-xs leading-snug text-white/90 sm:line-clamp-2 sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:max-h-12 sm:group-hover:opacity-100 sm:group-focus-within:max-h-12 sm:group-focus-within:opacity-100">
          {photo.summary}
        </p>
      </figcaption>
    </figure>
  );
}