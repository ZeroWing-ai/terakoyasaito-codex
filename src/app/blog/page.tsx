import Link from "next/link";
import { getAllBlogPosts } from "@/content/blog";

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-card">
            <h1 className="section-title">📝 てらこやブログ</h1>
            <p style={{ textAlign: "center", marginBottom: "2rem", color: "#636e72" }}>
              日々の活動やイベントのレポートをお届けします。
            </p>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              {posts.map((post) => (
                <article key={post.slug} className="news-item" style={{ padding: "1.2rem" }}>
                  <div className="news-date">{new Date(post.date).toLocaleDateString("ja-JP")}</div>
                  <h2 className="news-title" style={{ margin: "0.25rem 0 0.5rem" }}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p style={{ margin: 0, color: "#636e72" }}>{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

