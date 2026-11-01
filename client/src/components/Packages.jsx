import { useEffect, useState } from "react";
import Container from "./Container.jsx";
import BuyButton from "./BuyButton.jsx";
import { Eyebrow, SectionHeading } from "./ui.jsx";
import { api } from "../api.js";
import { money } from "../money.js";

export default function Packages({ onCheckout }) {
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api("/api/packages")
      .then((data) => { setPackages(data); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <Container
      as="section"
      id="packages"
      className="pt-[clamp(90px,12vw,160px)]"
      aria-labelledby="packages-title"
    >
      <Eyebrow>Book a shoot</Eyebrow>
      <SectionHeading id="packages-title">
        Shoot <em>packages.</em>
      </SectionHeading>
      <p className="mb-10 mt-[18px] max-w-[470px] text-muted">
        Pick a package and pay a deposit-free test payment to reserve it. I'll be in touch to plan the details.
      </p>

      {status === "loading" && <p className="text-muted">Loading packages...</p>}
      {status === "error" && <p className="text-muted">Couldn't load the packages. Please refresh.</p>}

      {status === "ready" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <article key={pkg.id} className="flex min-w-0 flex-col border border-line bg-paper p-6">
              <h3 className="m-0 font-display text-2xl font-medium">{pkg.name}</h3>
              <p className="mb-0 mt-1 text-[11px] uppercase tracking-[0.1em] text-muted">{pkg.duration}</p>
              <p className="my-4 font-display text-4xl">{money(pkg.price_cents)}</p>
              <p className="m-0 text-sm text-muted">{pkg.description}</p>

              <ul className="mb-6 mt-4 list-none space-y-2 p-0 text-sm">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <BuyButton
                onBuy={() => onCheckout("package", pkg.id)}
                className="mt-auto min-h-[46px] w-full px-5"
              >
                Book now · {money(pkg.price_cents)}
              </BuyButton>
            </article>
          ))}
        </div>
      )}
    </Container>
  );
}