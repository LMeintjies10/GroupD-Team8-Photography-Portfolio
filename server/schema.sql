CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS photos (
  id       INTEGER PRIMARY KEY,
  title    TEXT NOT NULL,
  alt      TEXT NOT NULL,
  src      TEXT NOT NULL,
  category TEXT NOT NULL,
  size     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id  INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  photo_id INTEGER NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, photo_id)
);

-- Extra details for the photo pop-up and the print price
ALTER TABLE photos ADD COLUMN IF NOT EXISTS price_cents INTEGER NOT NULL DEFAULT 4500;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS location    TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS taken_on    TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS camera      TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS lens        TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS settings    TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS story       TEXT NOT NULL DEFAULT '';

-- Shoot packages
CREATE TABLE IF NOT EXISTS packages (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  duration    TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  features    TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS orders (
  id                SERIAL PRIMARY KEY,
  user_id           INTEGER NOT NULL REFERENCES users(id),
  status            TEXT NOT NULL DEFAULT 'pending',   -- pending | paid | cancelled
  total_cents       INTEGER NOT NULL,
  stripe_session_id TEXT UNIQUE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at           TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS order_items (
  id               SERIAL PRIMARY KEY,
  order_id         INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  photo_id         INTEGER NOT NULL REFERENCES photos(id),
  quantity         INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_cents INTEGER NOT NULL
);

-- An order line can now be a photo print OR a package
ALTER TABLE order_items ALTER COLUMN photo_id DROP NOT NULL;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS package_id INTEGER REFERENCES packages(id);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS item_name TEXT;