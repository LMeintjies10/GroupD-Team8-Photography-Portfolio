import FavouriteToggle from "./FavouriteToggle.jsx";
import BuyButton from "./BuyButton.jsx";
import { money } from "../money.js";

// Tailwind only generates classes it can see as full strings.
// Mobile-first: unprefixed = 2-column phone grid, sm: = 12-column mosaic.
export const SIZE_CLASSES = {
  feature: "col-span-2 row-span-2 sm:col-span-7 sm:row-span-4",
  side: "sm:col-span-5 sm:row-span-2",
  third: "sm:col-span-4 sm:row-span-3",
  thirdWide: "col-span-2 sm:col-span-4 sm:row-span-3",
  banner: "col-span-2 sm:col-span-12 sm:row-span-3",
};

export default function GalleryItem({ photo, layoutClass, isFavourite, onToggleFavourite, onBuy, onOpen }) {
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
        className="pointer-events-none absolute inset-x-0 top-[35%] bottom-0 z-[1] bg-gradient-to-b from-transparent to-black/75 opacity-90 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Invisible button covering the card: clicking the photo opens its details */}
      <button
        type="button"
        onClick={() => onOpen(photo)}
        aria-label={`View details for ${photo.title}`}
        className="absolute inset-0 z-[2] cursor-pointer"
      />

      <FavouriteToggle
        pressed={isFavourite}
        onToggle={() => onToggleFavourite(photo.id)}
        label={photo.title}
      />

      <BuyButton
        onBuy={() => onBuy(photo)}
        className="absolute top-2.5 left-2.5 z-[3] px-3 py-1.5 text-[10px]"
      >
        <span className="sm:hidden">Buy</span>
        <span className="hidden sm:inline">Buy print</span> · {money(photo.price_cents)}
      </BuyButton>

      <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 z-[2] text-white">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-2">
          <span className="font-display text-base leading-[1.2] sm:text-[clamp(13px,2vw,18px)] lg:text-[clamp(13px,1.5vw,21px)]">
            {photo.title}
          </span>
          <span className="shrink-0 text-[8px] uppercase tracking-[0.1em]">{photo.category}</span>
        </div>

        {/* Brief overview: appears on hover (desktop only) */}
        <p className="m-0 line-clamp-3 hidden max-h-0 text-xs leading-snug opacity-0 transition-all duration-300 lg:block group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100 group-focus-within:mt-2 group-focus-within:max-h-16 group-focus-within:opacity-100">
          {photo.description}
        </p>
      </figcaption>
    </figure>
  );
}