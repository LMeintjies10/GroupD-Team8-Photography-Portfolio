import { readFileSync } from "node:fs";
import { pool } from "./db.js";

// All of the detail text below is placeholder content. Edit it, then run `npm run seed` again.
const photos = [
  {
    id: 1, title: "Quiet confidence", alt: "Architectural photography looking up between buildings",
    src: "/images/image1.jpg", category: "Architecture", size: "feature", price_cents: 6500,
    description: "Looking straight up between glass towers as the afternoon light cuts through.",
    location: "Cape Town CBD, South Africa", taken_on: "March 2025",
    camera: "Sony A7 IV", lens: "24-70mm f/2.8", settings: "1/500s · f/8 · ISO 100",
    story: "Taken on a lunch break with no plan, just looking up. The towers frame a thin strip of sky, and the light only hit the glass for about ten minutes.",
  },
  {
    id: 2, title: "Somewhere still", alt: "A swimmer beside a rocky coastline",
    src: "/images/image2.jpg", category: "Travel", size: "side", price_cents: 4500,
    description: "A swimmer slips into calm water below a rocky shoreline.",
    location: "Llandudno, Cape Town", taken_on: "January 2025",
    camera: "Sony A7 IV", lens: "70-200mm f/4", settings: "1/1000s · f/5.6 · ISO 200",
    story: "Early morning, almost no wind. The water was so flat that the swimmer's reflection stayed intact for a few seconds.",
  },
  {
    id: 3, title: "In bloom", alt: "A person standing in golden sunlight beside the water",
    src: "/images/image3.jpg", category: "Details", size: "side", price_cents: 3500,
    description: "A figure stands in golden light at the water's edge.",
    location: "Muizenberg, Cape Town", taken_on: "February 2025",
    camera: "Fujifilm X-T5", lens: "35mm f/1.4", settings: "1/800s · f/2 · ISO 160",
    story: "Shot just before sunset, with the sun low enough to warm every edge. I waited for the person to stop moving and let the light do the work.",
  },
  {
    id: 4, title: "Unscripted", alt: "A peaceful coastal scene at sunset",
    src: "/images/image4.jpg", category: "Portraits", size: "third", price_cents: 5500,
    description: "A quiet coastal sunset, caught between takes.",
    location: "Sea Point Promenade, Cape Town", taken_on: "April 2025",
    camera: "Sony A7 IV", lens: "50mm f/1.8", settings: "1/320s · f/2.8 · ISO 125",
    story: "This was the moment after the posed portraits were done. Everyone relaxed, and the sunset did the rest.",
  },
  {
    id: 5, title: "Considered details", alt: "A sunlit woodland path surrounded by trees",
    src: "/images/image5.jpg", category: "Nature", size: "third", price_cents: 4000,
    description: "A sunlit woodland path, dappled and still.",
    location: "Newlands Forest, Cape Town", taken_on: "May 2025",
    camera: "Fujifilm X-T5", lens: "16-55mm f/2.8", settings: "1/250s · f/5.6 · ISO 400",
    story: "A slow walk on a misty morning. I stopped where the path bent, because the light came through the canopy in shafts.",
  },
  {
    id: 6, title: "Out of office", alt: "A rocky landscape surrounded by soft evening light",
    src: "/images/image6.jpg", category: "Travel", size: "thirdWide", price_cents: 5000,
    description: "Soft evening light across a rocky landscape.",
    location: "Cederberg Mountains, Western Cape", taken_on: "June 2025",
    camera: "Sony A7 IV", lens: "24-70mm f/2.8", settings: "1/125s · f/11 · ISO 100",
    story: "A weekend away with no signal. The rocks glow orange for about fifteen minutes before dark, and this is the best frame from that window.",
  },
  {
    id: 7, title: "All together now", alt: "Golden reflections on the water",
    src: "/images/image7.jpg", category: "Events", size: "banner", price_cents: 6000,
    description: "Golden reflections ripple across the water at a gathering.",
    location: "V&A Waterfront, Cape Town", taken_on: "August 2025",
    camera: "Sony A7 IV", lens: "85mm f/1.8", settings: "1/400s · f/2.8 · ISO 320",
    story: "An evening event by the harbour. I turned away from the crowd and shot the water, which carried the whole mood of the night.",
  },
];

const packages = [
  {
    id: 1, name: "Mini Session", duration: "30 minutes", price_cents: 15000,
    description: "A short, relaxed shoot for a quick set of portraits.",
    features: ["1 location", "10 edited photos", "Online gallery for 30 days"],
  },
  {
    id: 2, name: "Portrait Session", duration: "1.5 hours", price_cents: 30000,
    description: "A full portrait session with time for outfit and location changes.",
    features: ["Up to 2 locations", "25 edited photos", "Online gallery for 60 days", "1 print included"],
  },
  {
    id: 3, name: "Event Coverage", duration: "4 hours", price_cents: 65000,
    description: "Candid coverage of a birthday, gathering or small event.",
    features: ["Candid and group shots", "60 edited photos", "Sneak peek within 48 hours", "Online gallery for 90 days"],
  },
  {
    id: 4, name: "Brand Day", duration: "Full day", price_cents: 120000,
    description: "A full day of content for your brand, shop or business.",
    features: ["Planning call beforehand", "Up to 3 locations", "100 edited photos", "Commercial usage licence"],
  },
];

// Inserts a row, or updates it if the id already exists, so seeding twice is safe.
// Table and column names come from the objects above, not from user input.
async function upsert(table, row) {
  const cols = Object.keys(row);
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ");
  const updates = cols.filter((c) => c !== "id").map((c) => `${c} = EXCLUDED.${c}`).join(", ");
  await pool.query(
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})
     ON CONFLICT (id) DO UPDATE SET ${updates}`,
    Object.values(row)
  );
}

await pool.query(readFileSync("./schema.sql", "utf8"));
for (const p of photos) await upsert("photos", p);
for (const p of packages) await upsert("packages", p);

console.log(`Seeded ${photos.length} photos and ${packages.length} packages`);
await pool.end();