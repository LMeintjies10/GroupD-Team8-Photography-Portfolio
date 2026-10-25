import { useState } from "react";
import { api } from "../api.js";

const input =
  "w-full rounded-none border border-input-border bg-bg px-3.5 py-3 text-[13px] text-text placeholder:text-[#aaa99f] focus:border-accent";

export default function AuthDialog({ onClose, onAuthed }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await api(`/api/auth/${mode}`, { method: "POST", body: form });
      onAuthed(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Sign in" : "Create account"}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="grid w-full max-w-[400px] gap-4 border border-line bg-paper p-6"
      >
        <h2 className="m-0 font-display text-3xl font-medium">
          {mode === "login" ? "Sign in" : "Create account"}
        </h2>

        {mode === "signup" && (
          <input className={input} name="name" placeholder="Your name" value={form.name} onChange={update} required />
        )}
        <input className={input} type="email" name="email" placeholder="Email" value={form.email} onChange={update} required />
        <input className={input} type="password" name="password" placeholder="Password (8+ characters)" value={form.password} onChange={update} minLength={8} required />

        {error && <p className="m-0 text-sm text-red-400" role="alert">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="min-h-[46px] cursor-pointer bg-accent text-[11px] font-bold uppercase tracking-[0.09em] text-bg hover:bg-accent-hover disabled:opacity-60"
        >
          {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
          className="cursor-pointer text-xs text-muted underline"
        >
          {mode === "login" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}