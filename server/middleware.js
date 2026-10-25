import jwt from "jsonwebtoken";

// Reads the session cookie. If valid, sets req.userId; otherwise rejects.
export function requireAuth(req, res, next) {
  try {
    const { userId } = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch {
    res.status(401).json({ error: "Not signed in" });
  }
}