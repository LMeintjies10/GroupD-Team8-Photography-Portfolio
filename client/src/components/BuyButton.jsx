import { useState } from "react";

export default function BuyButton({ onBuy, className = "", children }) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      await onBuy();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={`cursor-pointer bg-accent text-[11px] font-bold uppercase tracking-[0.08em] text-bg transition hover:bg-accent-hover disabled:opacity-60 ${className}`}
    >
      {busy ? "Redirecting..." : children}
    </button>
  );
}