import { useEffect } from "react";
import BuyButton from "./BuyButton.jsx";
import { money } from "../money.js";

const rows = [
  ["Location", "location"],
  ["Date", "taken_on"],
  ["Camera", "camera"],
  ["Lens", "lens"],
  ["Settings", "settings"],
  ["Category", "category"],
];

export default function PhotoModal({ photo, onClose, onBuy }) {
  // Close on Escape, and stop the page behind from scrolling while open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      onClick={onClose}
    >
      <div
        className="relative mx-auto grid max-w-5xl overflow-hidden border border-line bg-paper md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-black/60 text-lg text-white hover:bg-black/80"
        >
          ✕
        </button>

        <img
          src={photo.src}
          alt={photo.alt}
          className="h-72 w-full object-cover md:h-full md:min-h-[480px]"
        />

        <div className="min-w-0 p-6 sm:p-8">
          <p className="mb-2 mt-0 text-[11px] font-bold uppercase tracking-[0.19em] text-accent">
            {photo.category}
          </p>
          <h2
            id="photo-modal-title"
            className="m-0 font-display text-3xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl"
          >
            {photo.title}
          </h2>

          <p className="mb-0 mt-4 text-muted">{photo.description}</p>
          {photo.story && <p className="mb-0 mt-3 text-muted">{photo.story}</p>}

          <dl className="my-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-line py-5 text-sm">
            {rows.map(([label, key]) =>
              photo[key] ? (
                <div key={key} className="min-w-0">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">{label}</dt>
                  <dd className="m-0 [overflow-wrap:anywhere]">{photo[key]}</dd>
                </div>
              ) : null
            )}
          </dl>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-display text-3xl">{money(photo.price_cents)}</span>
            <BuyButton onBuy={() => onBuy(photo)} className="min-h-[46px] px-6">
              Buy a print
            </BuyButton>
          </div>
        </div>
      </div>
    </div>
  );
}