import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const cats = ["Computer Accessories", "Hardware", "Networking", "Electronics"];
  const c: Record<string, string> = {};
  for (const name of cats) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    c[name] = (await db.category.upsert({ where: { slug }, update: {}, create: { name, slug } })).id;
  }
  const items = [
    ["Mechanical Keyboard 75%", "Hardware", 89, true],
    ["Wireless Mouse", "Computer Accessories", 29, true],
    ["Wi-Fi 6 Router AX3000", "Networking", 119, true],
    ["24-port Gigabit Switch", "Networking", 149, false],
    ["1TB NVMe SSD", "Hardware", 79, true],
    ["USB-C Hub 7-in-1", "Computer Accessories", 45, false],
  ] as const;
  for (const [name, cat, price, featured] of items) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await db.product.upsert({
      where: { slug }, update: {},
      create: { sku: slug.toUpperCase().slice(0, 20), name, slug, description: `${name} from YIZAM Tech.`, price, stock: 25, featured, categoryId: c[cat] },
    });
  }
}
main().finally(() => db.$disconnect());
