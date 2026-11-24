import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEMO = [
  { id: "demo-1", name: "Mechanical Keyboard 75%", price: 89, stock: 25, featured: true, category: { name: "Hardware" } },
  { id: "demo-2", name: "Wireless Mouse", price: 29, stock: 25, featured: true, category: { name: "Computer Accessories" } },
  { id: "demo-3", name: "Wi-Fi 6 Router AX3000", price: 119, stock: 25, featured: true, category: { name: "Networking" } },
  { id: "demo-4", name: "24-port Gigabit Switch", price: 149, stock: 10, featured: false, category: { name: "Networking" } },
  { id: "demo-5", name: "1TB NVMe SSD", price: 79, stock: 25, featured: true, category: { name: "Hardware" } },
  { id: "demo-6", name: "USB-C Hub 7-in-1", price: 45, stock: 0, featured: false, category: { name: "Computer Accessories" } },
];

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  try {
    const products = await prisma.product.findMany({
      where: {
        active: true,
        deletedAt: null,
        name: { contains: q, mode: "insensitive" },
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    if (products.length > 0) return NextResponse.json(products);
  } catch {
    // fall through to demo
  }
  const filtered = q
    ? DEMO.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : DEMO;
  return NextResponse.json(filtered);
}
