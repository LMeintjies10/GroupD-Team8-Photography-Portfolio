import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import photos from "./routes/photos.js";
import auth from "./routes/auth.js";
import favourites from "./routes/favourites.js";

const app = express();
app.set("trust proxy", 1); // behind Railway's proxy
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/photos", photos);
app.use("/api/auth", auth);
app.use("/api/favourites", favourites);

// Catch errors from async routes so the server doesn't crash
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));