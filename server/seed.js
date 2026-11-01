import { readFileSync } from "node:fs";
import { pool } from "./db.js";

// PLACEHOLDER TEXT: replace the summary, location, year and story with the real details.
const photos = [
  [1, "Quiet confidence", "Architectural photography looking up between buildings", "/images/image1.jpg", "Architecture", "feature", 6500],
  [2, "Somewhere still", "A swimmer beside a rocky coastline", "/images/image2.jpg", "Travel", "side", 4500],
  [3, "In bloom", "A person standing in golden sunlight beside the water", "/images/image3.jpg", "Details", "side", 3500],
  [4, "Unscripted", "A peaceful coastal scene at sunset", "/images/image4.jpg", "Portraits", "third", 5500],
  [5, "Considered details", "A sunlit woodland path surrounded by trees", "/images/image5.jpg", "Nature", "third", 4000],
  [6, "Out of office", "A rocky landscape surrounded by soft evening light", "/images/image6.jpg", "Travel", "thirdWide", 5000],
  [7, "All together now", "Golden reflections on the water", "/images/image7.jpg", "Events", "banner", 6000],
];

await pool.query(readFileSync("./schema.sql", "utf8"));

for (const [id, title, alt, src, category, size, price] of photos) {
  await pool.query(
    `INSERT INTO photos (id, title, alt, src, category, size, price_cents)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (id) DO UPDATE
     SET title=$2, alt=$3, src=$4, category=$5, size=$6, price_cents=$7`,
    [id, title, alt, src, category, size, price]
  );
}

console.log(`Seeded ${photos.length} photos and ${packages.length} packages`);
await pool.end();