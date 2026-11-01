import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware.js";

const router = Router();

router.get("/:id", requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid order id" });

  // user_id = req.userId means you can only see your own orders.
  const { rows } = await pool.query(
    "SELECT id, status, total_cents, created_at, paid_at FROM orders WHERE id = $1 AND user_id = $2",
    [id, req.userId]
  );
  if (!rows[0]) return res.status(404).json({ error: "Order not found" });

  const items = await pool.query(
    `SELECT p.title, oi.quantity, oi.unit_price_cents
       FROM order_items oi JOIN photos p ON p.id = oi.photo_id
      WHERE oi.order_id = $1`,
    [id]
  );
  res.json({ ...rows[0], items: items.rows });
});

export default router;