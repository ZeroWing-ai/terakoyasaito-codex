import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllNews, getNewsBySlug } from "@/content/news";

export function generateStaticParams() {
  const items = getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return notFound();

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-card">
            <div style={{ marginBottom: "0.5rem" }}>
              <Link href="/news" style={{ color: "#0984e3" }}>
                ← お知らせ一覧に戻る
              </Link>
            </div>
            <h1 className="section-title" style={{ marginBottom: "0.25rem" }}>{item.title}</h1>
            <div className="news-date" style={{ marginBottom: "1.5rem" }}>
              {new Date(item.date).toLocaleDateString("ja-JP")}
            </div>
            {item.body && (
              <div style={{ lineHeight: 1.9, color: "#2d3436", whiteSpace: "pre-wrap" }}>{item.body}</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
