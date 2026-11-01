import express, { Router } from "express";
import { pool } from "../db.js";
import { stripe } from "../stripe.js";

const router = Router();

// express.raw keeps the body untouched, which Stripe needs to verify the signature.
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid") {
      // The ONLY place an order becomes 'paid'. Safe to run twice.
      await pool.query(
        `UPDATE orders
            SET status = 'paid', paid_at = now()
          WHERE id = $1 AND stripe_session_id = $2 AND total_cents = $3 AND status <> 'paid'`,
        [Number(session.client_reference_id), session.id, session.amount_total]
      );
    }
  }

  res.json({ received: true });
});

export default router;