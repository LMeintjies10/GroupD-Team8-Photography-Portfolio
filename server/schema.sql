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

-- Extra details for the photo pop-up
ALTER TABLE photos ADD COLUMN IF NOT EXISTS summary   TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS location  TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS shot_year INTEGER;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS story     TEXT NOT NULL DEFAULT '';
ALTER TABLE photos ADD COLUMN IF NOT EXISTS price_cents INTEGER NOT NULL DEFAULT 4500;

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