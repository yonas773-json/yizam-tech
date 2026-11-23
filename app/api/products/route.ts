import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const products = await prisma.product.findMany({
    where: { active: true, deletedAt: null, name: { contains: q, mode: "insensitive" } },
    include: { category: true }, orderBy: { createdAt: "desc" }, take: 50,
  });
  return NextResponse.json(products);
}
