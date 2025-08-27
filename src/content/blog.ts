export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  excerpt: string;
  content: string; // simple markdown-ish text for now
  tags?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "welcome-to-terakoya",
    title: "てらこやブログはじめました",
    date: "2025-07-10",
    excerpt:
      "てらこやの日々の様子や学びを、子どもたちの言葉といっしょにお届けします。",
    content:
      "てらこやのブログへようこそ！このブログでは、日々の活動やイベント、子どもたちの成長の瞬間をお伝えしていきます。\\n\\nみんなで学び、みんなで育つ—その雰囲気が少しでも伝わればうれしいです。",
    tags: ["お知らせ", "はじめに"],
  },
  {
    slug: "english-club-report",
    title: "英語クラブの最近のようす",
    date: "2025-07-22",
    excerpt:
      "歌やゲームで自然に英語にふれる時間。みんなの好きが学びに変わる。",
    content:
      "英語クラブでは、歌やリズム遊び、簡単な会話のロールプレイを通して、英語に親しんでいます。\\n\\n最近の人気は自己紹介ビンゴ。『好きな食べ物は？』『週末は何した？』など、英語でのやりとりが自然と増えてきました。",
    tags: ["英語クラブ", "日常"],
  },
  {
    slug: "hyakunin-isshu-cup",
    title: "百人一首クラブ、広島チャンピオンズカップへ！",
    date: "2025-07-20",
    excerpt:
      "夏の挑戦。ことばと集中力の勝負にむけて、練習を重ねています。",
    content:
      "百人一首クラブのメンバーが、広島で開催される全国大会『チャンピオンズカップ』に出場します。\\n\\n取り札の気配、読み手の声、静かな集中。練習では『初めて勝てた！』という声も。みんなで応援しています。",
    tags: ["百人一首", "大会"],
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getLatestBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}

