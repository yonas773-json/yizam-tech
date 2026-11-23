"use client";
import { useEffect, useState } from "react";
import { CartLine, readCart, writeCart } from "@/components/AddToCart";

export default function Cart() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => setCart(readCart()), []);

  const total = cart.reduce((s, l) => s + l.price * l.quantity, 0);
  function remove(id: string) { const n = cart.filter((l) => l.productId !== id); setCart(n); writeCart(n); }

  async function checkout(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMsg("");
    const res = await fetch("/api/checkout", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, address, items: cart.map((l) => ({ productId: l.productId, quantity: l.quantity })) }),
    });
    const data = await res.json(); setBusy(false);
    if (!res.ok) return setMsg(data.error);
    writeCart([]); setCart([]); setMsg(`Order placed. Reference: ${data.orderId}`);
  }

  return (
    <main className="wrap" style={{ padding: "32px 20px", maxWidth: 640 }}>
      <h1>Your cart</h1>
      {cart.length === 0 && <p className="empty">Your cart is empty. Browse the store to add items.</p>}
      {cart.map((l) => (
        <div className="row" key={l.productId}>
          <span>{l.name} × {l.quantity}</span>
          <span>${(l.price * l.quantity).toFixed(2)} <button onClick={() => remove(l.productId)} aria-label={`Remove ${l.name}`}>Remove</button></span>
        </div>
      ))}
      {cart.length > 0 && (
        <form onSubmit={checkout} style={{ marginTop: 20 }}>
          <p className="price">Total ${total.toFixed(2)}</p>
          <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Delivery address<textarea required minLength={5} value={address} onChange={(e) => setAddress(e.target.value)} /></label>
          <button className="btn" disabled={busy}>{busy ? "Placing order…" : "Place order"}</button>
        </form>
      )}
      {msg && <p role="status">{msg}</p>}
    </main>
  );
}
