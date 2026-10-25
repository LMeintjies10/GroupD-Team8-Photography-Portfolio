import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { requireAuth } from "../middleware.js";

const router = Router();

const isProd = process.env.NODE_ENV === "production";

function setSession(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("session", token, {
    httpOnly: true,            // JavaScript in the page can't read it
    secure: isProd,            // HTTPS only when live
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 8) {
    return res.status(400).json({ error: "Name, email and a password of 8+ characters are required" });
  }
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, lower($2), $3) RETURNING id, name, email",
      [name, email, hash]
    );
    setSession(res, rows[0].id);
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.status(409).json({ error: "That email is already registered" });
    throw err;
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query("SELECT * FROM users WHERE email = lower($1)", [email || ""]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password || "", user.password_hash))) {
    return res.status(401).json({ error: "Wrong email or password" });
  }
  setSession(res, user.id);
  res.json({ id: user.id, name: user.name, email: user.email });
});

router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.json({ ok: true });
});

// The client calls this on page load, which is how a session survives a refresh.
router.get("/me", requireAuth, async (req, res) => {
  const { rows } = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [req.userId]);
  if (!rows[0]) return res.status(401).json({ error: "Not signed in" });
  res.json(rows[0]);
});

export default router;