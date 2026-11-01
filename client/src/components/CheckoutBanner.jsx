import { useEffect, useState } from "react";
import { api } from "../api.js";

const money = (cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export default function CheckoutBanner({ user, authChecked }) {
  const params = new URLSearchParams(window.location.search);
  const result = params.get("checkout");
  const orderId = params.get("order");

  const [state, setState] = useState("checking"); // checking | paid | pending | signin | error
  const [order, setOrder] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (result !== "success" || !orderId || !authChecked) return;
    if (!user) { setState("signin"); return; }

    let stop = false;
    (async () => {
      for (let i = 0; i < 8; i++) {
        try {
          const o = await api(`/api/orders/${orderId}`);
          if (stop) return;
          setOrder(o);
          if (o.status === "paid") { setState("paid"); return; }
        } catch {
          if (!stop) setState("error");
          return;
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      if (!stop) setState("pending");
    })();
    return () => { stop = true; };
  }, [result, orderId, user, authChecked]);

  if (hidden || !result) return null;

  function close() {
    window.history.replaceState({}, "", "/");
    setHidden(true);
  }

  let message;
  if (result === "cancelled") message = "Checkout cancelled. You haven't been charged.";
  else if (state === "paid")
    message = `Payment confirmed. Order #${order.id} is paid (${money(order.total_cents)}): ${order.items
      .map((i) => `${i.quantity} × ${i.item_name}`)
      .join(", ")}.`;
  else if (state === "pending") message = "Payment received. We're still confirming it, so refresh in a moment.";
  else if (state === "signin") message = "Sign in to see your order.";
  else if (state === "error") message = "We couldn't load that order.";
  else message = "Confirming your payment...";

  return (
    <div className="border-b border-line bg-paper px-5 py-3 text-sm" role="status">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <span>{message}</span>
        <button type="button" onClick={close} className="cursor-pointer text-xs underline">Dismiss</button>
      </div>
    </div>
  );
}