"use client";

import { useState } from "react";

export default function AddToCart({ productId, name }: { productId: string; name: string }) {
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");

  function add() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.productId === productId);
    if (existing) existing.quantity += qty;
    else cart.push({ productId, name, quantity: qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    setMsg(`Added ${qty} × ${name}`);
    setTimeout(() => setMsg(""), 2000);
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
      <input
        type="number"
        min={1}
        max={20}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        style={{ width: 60 }}
      />
      <button onClick={add}>Add to cart</button>
      {msg && <span style={{ color: "green", fontSize: 14 }}>{msg}</span>}
    </div>
  );
}
