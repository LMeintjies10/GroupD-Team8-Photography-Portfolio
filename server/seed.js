import { readFileSync } from "node:fs";
import { pool } from "./db.js";

const photos = [
  [1, "Quiet confidence", "Architectural photography looking up between buildings", "/images/image1.jpg", "Architecture", "feature"],
  [2, "Somewhere still", "A swimmer beside a rocky coastline", "/images/image2.jpg", "Travel", "side"],
  [3, "In bloom", "A person standing in golden sunlight beside the water", "/images/image3.jpg", "Details", "side"],
  [4, "Unscripted", "A peaceful coastal scene at sunset", "/images/image4.jpg", "Portraits", "third"],
  [5, "Considered details", "A sunlit woodland path surrounded by trees", "/images/image5.jpg", "Nature", "third"],
  [6, "Out of office", "A rocky landscape surrounded by soft evening light", "/images/image6.jpg", "Travel", "thirdWide"],
  [7, "All together now", "Golden reflections on the water", "/images/image7.jpg", "Events", "banner"],
];

await pool.query(readFileSync("./schema.sql", "utf8"));

for (const [id, title, alt, src, category, size] of photos) {
  await pool.query(
    `INSERT INTO photos (id, title, alt, src, category, size)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (id) DO UPDATE
     SET title=$2, alt=$3, src=$4, category=$5, size=$6`,
    [id, title, alt, src, category, size]
  );
}

console.log(`Seeded ${photos.length} photos`);
await pool.end();