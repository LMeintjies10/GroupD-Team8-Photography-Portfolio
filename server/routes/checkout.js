import { Router } from "express";
import { pool } from "../db.js";
import { stripe, CURRENCY } from "../stripe.js";
import { requireAuth } from "../middleware.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const photoId = Number(req.body.photoId);
  const quantity = Number(req.body.quantity ?? 1);
  if (!Number.isInteger(photoId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: "Invalid photo or quantity" });
  }

  // The price comes from OUR database, never from the browser.
  const { rows } = await pool.query(
    "SELECT id, title, price_cents FROM photos WHERE id = $1",
    [photoId]
  );
  const photo = rows[0];
  if (!photo) return res.status(404).json({ error: "Photo not found" });

  const total = photo.price_cents * quantity;

  const orderRes = await pool.query(
    "INSERT INTO orders (user_id, total_cents) VALUES ($1, $2) RETURNING id",
    [req.userId, total]
  );
  const orderId = orderRes.rows[0].id;

  await pool.query(
    "INSERT INTO order_items (order_id, photo_id, quantity, unit_price_cents) VALUES ($1,$2,$3,$4)",
    [orderId, photo.id, quantity, photo.price_cents]
  );

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: CURRENCY,
            unit_amount: photo.price_cents,
            product_data: { name: `Print: ${photo.title}` },
          },
        },
      ],
      client_reference_id: String(orderId),
      metadata: { orderId: String(orderId) },
      success_url: `${process.env.CLIENT_URL}/?checkout=success&order=${orderId}`,
      cancel_url: `${process.env.CLIENT_URL}/?checkout=cancelled#portfolio`,
    });

    await pool.query("UPDATE orders SET stripe_session_id = $1 WHERE id = $2", [session.id, orderId]);
    res.json({ url: session.url });
  } catch (err) {
    await pool.query("UPDATE orders SET status = 'cancelled' WHERE id = $1", [orderId]);
    throw err;
  }
});

export default router;