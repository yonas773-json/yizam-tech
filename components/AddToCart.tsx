"use client";
export type CartLine = { productId: string; name: string; price: number; quantity: number };

export function readCart(): CartLine[] {
  try { return JSON.parse(localStorage.getItem("yizam-cart") ?? "[]"); } catch { return []; }
}
export function writeCart(c: CartLine[]) {
  try { localStorage.setItem("yizam-cart", JSON.stringify(c)); } catch {}
}

export default function AddToCart({ productId, name, price, disabled }: { productId: string; name: string; price: number; disabled: boolean }) {
  function add() {
    const cart = readCart();
    const line = cart.find((l) => l.productId === productId);
    if (line) line.quantity += 1; else cart.push({ productId, name, price, quantity: 1 });
    writeCart(cart);
    alert(`${name} added to cart`);
  }
  return <button className="btn" disabled={disabled} onClick={add}>{disabled ? "Out of stock" : "Add to cart"}</button>;
}
