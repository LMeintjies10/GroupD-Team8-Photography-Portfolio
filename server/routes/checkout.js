import { Router } from "express";
import { pool } from "../db.js";
import { stripe, CURRENCY } from "../stripe.js";
import { requireAuth } from "../middleware.js";

const router = Router();

router.post("/", requireAuth, async (req, res) => {
  const { type } = req.body;
  const itemId = Number(req.body.id);
  const quantity = type === "photo" ? Number(req.body.quantity ?? 1) : 1; // packages are always 1

  if (!["photo", "package"].includes(type) || !Number.isInteger(itemId)) {
    return res.status(400).json({ error: "Invalid item" });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  // Price and name come from OUR database, never from the browser.
  let item;
  if (type === "photo") {
    const { rows } = await pool.query("SELECT title, price_cents FROM photos WHERE id = $1", [itemId]);
    if (rows[0]) item = { name: `Print: ${rows[0].title}`, price: rows[0].price_cents };
  } else {
    const { rows } = await pool.query("SELECT name, price_cents FROM packages WHERE id = $1", [itemId]);
    if (rows[0]) item = { name: `Shoot package: ${rows[0].name}`, price: rows[0].price_cents };
  }
  if (!item) return res.status(404).json({ error: "Item not found" });

  const total = item.price * quantity;

  const orderRes = await pool.query(
    "INSERT INTO orders (user_id, total_cents) VALUES ($1, $2) RETURNING id",
    [req.userId, total]
  );
  const orderId = orderRes.rows[0].id;

  await pool.query(
    `INSERT INTO order_items (order_id, photo_id, package_id, item_name, quantity, unit_price_cents)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [orderId, type === "photo" ? itemId : null, type === "package" ? itemId : null, item.name, quantity, item.price]
  );

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: CURRENCY,
            unit_amount: item.price,
            product_data: { name: item.name },
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