import { useState } from "react";
import Container from "./Container.jsx";
import FilterBar from "./FilterBar.jsx";
import Gallery from "./Gallery.jsx";
import { Eyebrow, SectionHeading, TextLink } from "./ui.jsx";
import { photos } from "../data/photos.js";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (id) =>
    setFavourites((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
    );

  const filtered = activeCategory !== "All";
  const visiblePhotos = filtered
    ? photos.filter((photo) => photo.category === activeCategory)
    : photos;

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

      <FilterBar active={activeCategory} onChange={setActiveCategory} />

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
            : "Seven frames. Countless stories."}
        </span>
        <span>
          {favourites.length > 0
            ? `${favourites.length} favourited`
            : "Scroll slowly. Look closely."}
        </span>
      </div>
    </Container>
  );
}