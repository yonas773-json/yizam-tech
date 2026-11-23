import { prisma } from "@/lib/prisma";
import AddToCart from "@/components/AddToCart";
export const dynamic = "force-dynamic";

async function load() {
  try {
    return await prisma.product.findMany({
      where: { active: true, deletedAt: null }, include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }], take: 48,
    });
  } catch { return null; }
}

export default async function Home() {
  const products = await load();
  return (
    <main>
      <section className="hero"><div className="wrap">
        <h1>Hardware that keeps your network and desk running.</h1>
        <p>Keyboards, SSDs, routers and switches from YIZAM Tech.</p>
      </div></section>
      <div className="wrap">
        {products === null && <p className="msg">The database isn’t connected yet. Set DATABASE_URL, then run db:push and db:seed.</p>}
        {products?.length === 0 && <p className="empty">No products yet. Run the seed script to add sample items.</p>}
        <div className="grid">
          {products?.map((p) => (
            <article className="card" key={p.id}>
              <div className="thumb" aria-hidden>{p.name.slice(0, 2)}</div>
              <span className="muted">{p.category.name}</span>
              <strong>{p.name}</strong>
              <span className="price">${Number(p.price).toFixed(2)}</span>
              <AddToCart productId={p.id} name={p.name} price={Number(p.price)} disabled={p.stock < 1} />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
