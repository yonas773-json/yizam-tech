import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart";
export const dynamic = "force-dynamic";

const DEMO_PRODUCTS = [
  { id: "demo-1", name: "Mechanical Keyboard 75%", price: 89, stock: 25, featured: true, category: { name: "Hardware" } },
  { id: "demo-2", name: "Wireless Mouse", price: 29, stock: 25, featured: true, category: { name: "Computer Accessories" } },
  { id: "demo-3", name: "Wi-Fi 6 Router AX3000", price: 119, stock: 25, featured: true, category: { name: "Networking" } },
  { id: "demo-4", name: "24-port Gigabit Switch", price: 149, stock: 10, featured: false, category: { name: "Networking" } },
  { id: "demo-5", name: "1TB NVMe SSD", price: 79, stock: 25, featured: true, category: { name: "Hardware" } },
  { id: "demo-6", name: "USB-C Hub 7-in-1", price: 45, stock: 0, featured: false, category: { name: "Computer Accessories" } },
];

async function load() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true, deletedAt: null },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 48,
    });
    if (products.length > 0) return { products, demo: false };
  } catch {
    // DB not available
  }
  return { products: DEMO_PRODUCTS, demo: true };
}

export default async function Home() {
  const { products, demo } = await load();
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <h1>Hardware that keeps your network and desk running.</h1>
          <p>Keyboards, SSDs, routers and switches from YIZAM Tech.</p>
        </div>
      </section>
      <div className="wrap">
        {demo && (
          <p className="msg">
            Demo mode — showing sample products. Connect a Postgres database (set DATABASE_URL) and run{" "}
            <code>db:push</code> + <code>db:seed</code> for the real store.
          </p>
        )}
        {products.length === 0 && (
          <p className="empty">No products yet. Run the seed script to add sample items.</p>
        )}
        <div className="grid">
          {products.map((p) => (
            <article className="card" key={p.id}>
              <div className="thumb" aria-hidden>
                {p.name.slice(0, 2)}
              </div>
              <span className="muted">{p.category.name}</span>
              <strong>{p.name}</strong>
              <span className="price">${Number(p.price).toFixed(2)}</span>
              <AddToCart
                productId={p.id}
                name={p.name}
                price={Number(p.price)}
                disabled={p.stock < 1}
              />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
