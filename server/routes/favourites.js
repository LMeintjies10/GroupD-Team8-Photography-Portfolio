import { Router } from "express";
import { pool } from "../db.js";
import { requireAuth } from "../middleware.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT photo_id FROM favorites WHERE user_id = $1", [req.userId]);
  res.json(rows.map((r) => r.photo_id));
});

router.put("/:photoId", async (req, res) => {
  await pool.query(
    "INSERT INTO favorites (user_id, photo_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [req.userId, Number(req.params.photoId)]
  );
  res.json({ ok: true });
});

router.delete("/:photoId", async (req, res) => {
  await pool.query("DELETE FROM favorites WHERE user_id = $1 AND photo_id = $2", [
    req.userId,
    Number(req.params.photoId),
  ]);
  res.json({ ok: true });
});

export default router;