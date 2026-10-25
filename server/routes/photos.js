import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT id, title, alt, src, category, size FROM photos ORDER BY id"
  );
  res.json(rows);
});

export default router;