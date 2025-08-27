import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug } from "@/content/blog";

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return notFound();

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-card">
            <div style={{ marginBottom: "0.5rem" }}>
              <Link href="/blog" style={{ color: "#0984e3" }}>
                ← ブログ一覧に戻る
              </Link>
            </div>
            <h1 className="section-title" style={{ marginBottom: "0.25rem" }}>{post.title}</h1>
            <div className="news-date" style={{ marginBottom: "1.5rem" }}>
              {new Date(post.date).toLocaleDateString("ja-JP")}
            </div>
            <div style={{ lineHeight: 1.9, color: "#2d3436", whiteSpace: "pre-wrap" }}>{post.content}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
