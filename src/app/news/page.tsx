import Link from "next/link";
import { getAllNews } from "@/content/news";

export default function NewsIndexPage() {
  const items = getAllNews();
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-card">
            <h1 className="section-title">📢 お知らせ</h1>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              {items.map((n) => (
                <article key={n.slug} className="news-item" style={{ padding: "1.2rem" }}>
                  <div className="news-date">{new Date(n.date).toLocaleDateString("ja-JP")}</div>
                  <h2 className="news-title" style={{ margin: "0.25rem 0 0.5rem" }}>
                    {n.body ? <Link href={`/news/${n.slug}`}>{n.title}</Link> : n.title}
                  </h2>
                  {n.body && (
                    <p style={{ margin: 0, color: "#636e72" }}>{n.body.slice(0, 100)}{n.body.length > 100 ? "…" : ""}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

