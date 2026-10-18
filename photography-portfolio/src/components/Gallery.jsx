import GalleryItem, { SIZE_CLASSES } from "./GalleryItem.jsx";

// "All" shows the editorial mosaic. A filtered view switches to an even grid,
// because the mosaic's spans only line up when every photo is present.
const MOSAIC_GRID =
  "grid w-full auto-rows-[160px] grid-cols-2 gap-2.5 sm:auto-rows-[clamp(28px,6vw,48px)] sm:grid-cols-12 sm:gap-3 lg:auto-rows-[clamp(24px,4.5vw,60px)] lg:gap-[clamp(10px,1.5vw,20px)]";

const EVEN_GRID =
  "grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:gap-[clamp(10px,1.5vw,20px)]";

const EVEN_ITEM = "aspect-[4/5] sm:aspect-[4/3]";

export default function Gallery({ photos, filtered, favourites, onToggleFavourite }) {
  return (
    <div className={filtered ? EVEN_GRID : MOSAIC_GRID}>
      {photos.map((photo) => (
        <GalleryItem
          key={photo.id}
          photo={photo}
          layoutClass={filtered ? EVEN_ITEM : SIZE_CLASSES[photo.size]}
          isFavourite={favourites.includes(photo.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}