import FavouriteToggle from "./FavouriteToggle.jsx";

// Tailwind only generates classes it can see as full strings,
// so the layout classes live here as literals, keyed by the `size` in the data.
// Mobile-first: unprefixed = 2-column phone grid, sm: = 12-column mosaic.
export const SIZE_CLASSES = {
  feature: "col-span-2 row-span-2 sm:col-span-7 sm:row-span-4",
  side: "sm:col-span-5 sm:row-span-2",
  third: "sm:col-span-4 sm:row-span-3",
  thirdWide: "col-span-2 sm:col-span-4 sm:row-span-3",
  banner: "col-span-2 sm:col-span-12 sm:row-span-3",
};

export default function GalleryItem({ photo, layoutClass, isFavourite, onToggleFavourite }) {
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

      <FavouriteToggle
        pressed={isFavourite}
        onToggle={() => onToggleFavourite(photo.id)}
        label={photo.title}
      />

      <figcaption className="absolute inset-x-3 bottom-3 z-[2] flex flex-col items-start gap-1 text-white sm:flex-row sm:items-end sm:justify-between sm:gap-2">
        <span className="font-display text-base leading-[1.2] sm:text-[clamp(13px,2vw,18px)] lg:text-[clamp(13px,1.5vw,21px)]">
          {photo.title}
        </span>
        <span className="shrink-0 text-[8px] uppercase tracking-[0.1em]">
          {photo.category}
        </span>
      </figcaption>
    </figure>
  );
}