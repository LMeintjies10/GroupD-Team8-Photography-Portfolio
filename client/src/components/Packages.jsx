import { useEffect, useState } from "react";
import Container from "./Container.jsx";
import { Eyebrow, SectionHeading } from "./ui.jsx";
import { api, startCheckout } from "../api.js";

export default function Packages({ user, onRequireAuth }) {
  const [packages, setPackages] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/packages")
      .then(setPackages)
      .catch(() => setError("Couldn't load the packages. Please refresh."));
  }, []);

  async function book(pkg) {
    if (!user) return onRequireAuth();
    setBusyId(pkg.id);
    setError("");
    try {
      await startCheckout({ packageId: pkg.id });
    } catch (err) {
      setError(err.message);
      setBusyId(null);
    }
  }

  return (
    <Container
      as="section"
      id="packages"
      className="pt-[clamp(90px,12vw,160px)]"
      aria-labelledby="packages-title"
    >
      <div className="mb-[27px] sm:mb-[42px]">
        <Eyebrow>Work with me</Eyebrow>
        <SectionHeading id="packages-title">
          Shoot <em>packages.</em>
        </SectionHeading>
        <p className="mb-0 mt-[18px] max-w-[460px] text-muted">
          Pick a package and book it online. You'll pay securely through Stripe.
        </p>
      </div>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {packages.map((pkg) => (
          <article key={pkg.id} className="flex min-w-0 flex-col border border-line bg-paper p-6">
            <h3 className="m-0 font-display text-2xl font-medium">{pkg.name}</h3>
            <p className="m-0 mt-1 text-[11px] uppercase tracking-[0.1em] text-muted">{pkg.duration}</p>
            <p className="m-0 mt-4 font-display text-4xl">${(pkg.price_cents / 100).toFixed(0)}</p>
            <p className="mb-4 mt-4 text-sm text-muted">{pkg.description}</p>

            <ul className="m-0 mb-6 list-none space-y-2 p-0 text-sm">
              {pkg.includes.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-accent" aria-hidden="true">✓</span>
                  {line}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => book(pkg)}
              disabled={busyId === pkg.id}
              className="mt-auto min-h-[50px] cursor-pointer bg-accent px-6 text-[11px] font-bold uppercase tracking-[0.09em] text-bg transition hover:-translate-y-0.5 hover:bg-accent-hover disabled:opacity-60"
            >
              {busyId === pkg.id ? "Redirecting..." : "Book now"}
            </button>
          </article>
        ))}
      </div>
    </Container>
  );
}