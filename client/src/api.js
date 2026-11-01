export async function api(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// Asks the server for a Stripe Checkout page and sends the browser there.
export async function startCheckout(body) {
  const { url } = await api("/api/checkout", { method: "POST", body });
  window.location.href = url;
}