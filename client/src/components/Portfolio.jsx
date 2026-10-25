import { useEffect, useState } from "react";
import Container from "./Container.jsx";
import FilterBar from "./FilterBar.jsx";
import Gallery from "./Gallery.jsx";
import { Eyebrow, SectionHeading, TextLink } from "./ui.jsx";
import { api } from "../api.js";

export default function Portfolio({ user, onRequireAuth }) {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [activeCategory, setActiveCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);

  // Load the photos from the API once.
  useEffect(() => {
    api("/api/photos")
      .then((data) => { setPhotos(data); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);

  // Load this user's favourites whenever they sign in or out.
  useEffect(() => {
    if (!user) { setFavourites([]); return; }
    api("/api/favourites").then(setFavourites).catch(() => setFavourites([]));
  }, [user]);

  async function toggleFavourite(id) {
    if (!user) return onRequireAuth();
    const has = favourites.includes(id);
    await api(`/api/favourites/${id}`, { method: has ? "DELETE" : "PUT" });
    setFavourites((current) => (has ? current.filter((x) => x !== id) : [...current, id]));
  }

  const categories = ["All", ...new Set(photos.map((p) => p.category))];
  const filtered = activeCategory !== "All";
  const visiblePhotos = filtered ? photos.filter((p) => p.category === activeCategory) : photos;

  return (
    <Container
      as="section"
      id="portfolio"
      className="pt-[clamp(90px,12vw,160px)]"
      aria-labelledby="portfolio-title"
    >
      <div className="mb-[27px] flex flex-col items-start gap-5 sm:mb-[42px] sm:flex-row sm:items-end sm:justify-between sm:gap-7">
        <div>
          <Eyebrow>A selection of stories · 2024–2026</Eyebrow>
          <SectionHeading id="portfolio-title">
            Selected <em>frames.</em>
          </SectionHeading>
          <p className="mb-0 mt-[18px] max-w-[380px] text-muted">
            Different places, different people, one constant: finding something
            extraordinary in the everyday.
          </p>
        </div>
        <TextLink href="#contact">
          Create something together <span aria-hidden="true">↗</span>
        </TextLink>
      </div>

      {status === "loading" && <p className="text-muted">Loading photographs...</p>}
      {status === "error" && <p className="text-muted">Couldn't load the photographs. Please refresh.</p>}

      {status === "ready" && (
        <>
          <FilterBar categories={categories} active={activeCategory} onChange={setActiveCategory} />

          <Gallery
            photos={visiblePhotos}
            filtered={filtered}
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
          />

          <div
            className="mt-5 flex flex-col gap-1 text-[10px] uppercase tracking-[0.08em] text-muted sm:flex-row sm:justify-between sm:gap-5"
            aria-live="polite"
          >
            <span>
              {filtered
                ? `${visiblePhotos.length} of ${photos.length} frames · ${activeCategory}`
                : `${photos.length} frames. Countless stories.`}
            </span>
            <span>
              {user
                ? `${favourites.length} favourited`
                : "Sign in to save favourites"}
            </span>
          </div>
        </>
      )}
    </Container>
  );
}