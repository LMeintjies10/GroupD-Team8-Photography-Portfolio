// Controlled toggle, same pattern as QuantityStepper:
// it holds no state of its own. The parent passes `pressed` and `onToggle`.
export default function FavouriteToggle({ pressed, onToggle, label }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={pressed ? `Remove ${label} from favourites` : `Add ${label} to favourites`}
      onClick={onToggle}
      className="absolute top-2.5 right-2.5 z-[3] grid size-9 cursor-pointer place-items-center rounded-full bg-black/45 text-white transition hover:scale-110 hover:bg-black/65"
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-[18px] transition-colors ${
          pressed ? "fill-accent stroke-accent" : "fill-none stroke-current"
        }`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 2.8 4.5 6.4 4.5c2 0 3.8 1.1 5.6 3.2 1.8-2.1 3.6-3.2 5.6-3.2 3.6 0 5.5 3.8 4 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}