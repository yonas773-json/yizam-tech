import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const Body = z.object({
  email: z.string().email(),
  address: z.string().min(5),
  items: z.array(z.object({ productId: z.string().uuid(), quantity: z.number().int().min(1).max(20) })).min(1),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Check your email, address and cart." }, { status: 400 });
  const { email, address, items } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const lines = [];
      for (const it of items) {
        const p = await tx.product.findUnique({ where: { id: it.productId } });
        if (!p || !p.active) throw new Error("A product in your cart is no longer available.");
        const upd = await tx.product.updateMany({
          where: { id: p.id, stock: { gte: it.quantity } }, data: { stock: { decrement: it.quantity } },
        });
        if (upd.count === 0) throw new Error(`Not enough stock for ${p.name}.`);
        subtotal += Number(p.price) * it.quantity;
        lines.push({ productId: p.id, quantity: it.quantity, unitPrice: p.price });
      }
      return tx.order.create({ data: { email, address, subtotal, items: { create: lines } } });
    });
    return NextResponse.json({ orderId: order.id });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 409 });
  }
}
