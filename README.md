# FRAME: Photography Portfolio

A full-stack photography portfolio. Browse a gallery loaded from a database, open any photo for its details, create an account, save favourites, and pay for prints and shoot packages with Stripe (test mode).

**Live site:** (https://group-d-team8-photography-portfolio.vercel.app/)
**Live API:** (https://groupd-team8-photography-portfolio.onrender.com)

Built by Group D, Team 8.

## Tech stack

| Part | Technology | Hosted on |
|---|---|---|
| Frontend | React, Vite, Tailwind CSS | Vercel |
| Backend | Node.js, Express | Render |
| Database | PostgreSQL | Neon |
| Auth | bcryptjs, JSON Web Tokens in an httpOnly cookie | |
| Payments | Stripe Checkout and webhooks (test mode) | |

## Features

- Photo gallery loaded from the Postgres database through the API
- Hover a photo for a short overview, or click it for a detail window (location, date, camera, lens, settings and the story behind it)
- Category filter, built with `useState`
- Sign up, sign in and sign out, with sessions that survive a page refresh
- Favourite photos, saved per user in the database
- **Buy a print** of any photo, and **book a shoot package**, paid through Stripe Checkout
- Orders saved in the database and confirmed by a Stripe webhook
- Success banner that confirms the payment and shows the order
- Responsive, mobile-first layout with no horizontal scroll
- Contact form

## Project structure

```
client/                  React app
  src/
    components/          Header, Hero, Portfolio, Gallery, GalleryItem, PhotoModal,
                         Packages, BuyButton, CheckoutBanner, AuthDialog, ...
    api.js               fetch wrapper for the API
    money.js             formats prices
  vite.config.js         dev proxy: /api goes to localhost:3000
  vercel.json            production rewrite: /api goes to the Render server
server/                  Express API
  index.js               starts the server and mounts the routes
  db.js                  Postgres connection
  stripe.js              Stripe connection
  schema.sql             table definitions
  seed.js                loads the photos and packages into the database
  middleware.js          checks the session cookie (requireAuth)
  routes/                photos, packages, auth, favourites, checkout, orders, webhook
```

## Database schema

| Table | What it stores |
|---|---|
| `users` | id, name, unique email, hashed password, created_at |
| `photos` | title, alt text, image path, category, layout size, print price, and detail fields (description, location, date, camera, lens, settings, story) |
| `packages` | name, description, duration, price, and a list of what is included |
| `favorites` | links a user to a photo they hearted. The primary key is (user_id, photo_id) |
| `orders` | one row per purchase: user, status (`pending`, `paid` or `cancelled`), total, Stripe session id, created and paid times |
| `order_items` | what was bought in each order: the photo or package, its name, quantity and the price at the time |

Deleting a user or photo removes its favourites automatically (`ON DELETE CASCADE`).

## API routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/photos` | | All photos as JSON |
| GET | `/api/packages` | | All shoot packages as JSON |
| POST | `/api/auth/signup` | | Create an account and sign in |
| POST | `/api/auth/login` | | Sign in |
| POST | `/api/auth/logout` | | Sign out |
| GET | `/api/auth/me` | yes | The signed-in user, or 401 |
| GET | `/api/favorites` | yes | The user's favourite photo ids |
| PUT / DELETE | `/api/favorites/:photoId` | yes | Add or remove a favourite |
| POST | `/api/checkout` | yes | Create an order and a Stripe Checkout Session, and return its URL |
| GET | `/api/orders/:id` | yes | One of the user's own orders, with its items |
| POST | `/api/webhook` | Stripe signature | Stripe calls this when a payment completes |

## How payments work

1. The signed-in user clicks **Buy print** or **Book now**. The browser sends only the item type and id, never a price.
2. The server looks up the real price in the database, saves an order with status `pending`, and creates a Stripe Checkout Session.
3. The browser is redirected to Stripe's hosted payment page. The server never sees card details.
4. After payment, Stripe calls `/api/webhook`. The server verifies Stripe's signature and then marks the order `paid`. This is the only place an order becomes paid.
5. Stripe sends the user back to the site, where a banner checks the order a few times (the webhook can arrive a moment later) and confirms the payment.

**Test card:** `4242 4242 4242 4242`, any future expiry date, any CVC. No real money is used.

## Run it locally

You need Node.js 20.19 or newer, a free Postgres database (for example from [Neon](https://neon.tech)), a free [Stripe](https://stripe.com) account in **Test mode**, and the [Stripe CLI](https://stripe.com/docs/stripe-cli).

**1. Clone and install**

```bash
git clone [your repo URL]
cd server && npm install
cd ../client && npm install
```

**2. Create `server/.env`** (see `server/.env.example`)

```
DATABASE_URL=your-postgres-connection-string
JWT_SECRET=a-long-random-string
CLIENT_URL=http://localhost:5173
PORT=3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**3. Create the tables and load the data**

```bash
cd server
npm run seed
```

**4. Start everything** (three terminals)

```bash
# terminal 1: the API
cd server && npm run dev

# terminal 2: the website
cd client && npm run dev

# terminal 3: forward Stripe webhooks to your local server
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

The `stripe listen` command prints a `whsec_...` secret. Put it in `server/.env` as `STRIPE_WEBHOOK_SECRET` and restart the server.

Open http://localhost:5173.

## Deployment

1. **Neon:** create the database and run `npm run seed` against it.
2. **Render:** deploy the `server` folder (Root Directory `server`, Build `npm install`, Start `npm start`). Set `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL`, `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`.
3. **Stripe dashboard:** add a webhook endpoint at `https://[your Render URL]/api/webhook` for the `checkout.session.completed` event, and use its signing secret as `STRIPE_WEBHOOK_SECRET` on Render.
4. **Vercel:** deploy the `client` folder. `client/vercel.json` forwards `/api` requests to the Render server, so the browser sees one site and the session cookie works.

## Security notes

- Secrets live in `.env`, which is excluded from git. Only `.env.example` is committed.
- Prices are always read from the database on the server, never trusted from the browser.
- Only Stripe's signed webhook can mark an order as paid.
- Users can only read their own orders.
- Passwords are hashed with bcrypt and never stored as plain text.
- The session cookie is `httpOnly`, so page scripts can't read it.
- Database queries use parameters, which protects against SQL injection.

## Notes

- Stripe runs in **test mode** only. No real payments are taken.
- The photo details and shoot packages are placeholder content.
- The free Render service sleeps when idle, so the first request after a break can take 30 to 60 seconds.