import { useEffect, useState } from "react";

export default function PhotoModal({ photo, onClose, onBuy }) {
  const [busy, setBusy] = useState(false);

  // Close on Escape, and stop the page behind from scrolling while it's open.
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
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-title"
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto grid max-w-[960px] grid-cols-1 border border-line bg-paper md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-black/60 text-lg text-white hover:bg-black/80"
        >
          ×
        </button>

        <img
          src={photo.src}
          alt={photo.alt}
          className="h-[280px] w-full min-w-0 object-cover md:h-full md:min-h-[460px]"
        />

        <div className="flex min-w-0 flex-col gap-5 p-6 sm:p-8">
          <div>
            <p className="m-0 mb-2 text-[11px] font-bold uppercase tracking-[0.19em] text-accent">
              {photo.category}
            </p>
            <h3 id="photo-title" className="m-0 font-display text-3xl font-medium leading-tight">
              {photo.title}
            </h3>
          </div>

          <dl className="m-0 grid grid-cols-2 gap-4 border-y border-line py-4 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">Location</dt>
              <dd className="m-0 mt-1">{photo.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.1em] text-muted">Year</dt>
              <dd className="m-0 mt-1">{photo.shot_year}</dd>
            </div>
          </dl>

          <div>
            <h4 className="m-0 mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
              The story behind it
            </h4>
            <p className="m-0 text-sm leading-relaxed text-muted">{photo.story}</p>
          </div>

          <button
            type="button"
            onClick={handleBuy}
            disabled={busy}
            className="mt-auto min-h-[50px] cursor-pointer bg-accent px-6 text-[11px] font-bold uppercase tracking-[0.09em] text-bg transition hover:-translate-y-0.5 hover:bg-accent-hover disabled:opacity-60"
          >
            {busy ? "Redirecting..." : `Buy a print · $${(photo.price_cents / 100).toFixed(0)}`}
          </button>
        </div>
      </div>
    </div>
  );
}