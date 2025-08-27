export type NewsItem = {
  slug: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  body?: string;
};

export const newsItems: NewsItem[] = [
  {
    slug: "2025-07-24-enswim",
    title: "遠泳 7月24日に行われました",
    date: "2025-07-24",
    body:
      "今年の遠泳が無事に開催されました。みんな一生懸命に泳ぎ、素晴らしい挑戦を見せてくれました！参加者の皆さん、お疲れ様でした。",
  },
  {
    slug: "2025-07-20-hyakunin-isshu-cup",
    title: "百人一首クラブが8月17日 広島チャンピオンズカップに出場",
    date: "2025-07-20",
    body:
      "百人一首クラブのメンバーが広島で開催される全国大会『チャンピオンズカップ』に出場します。みんなで応援しましょう！",
  },
];

export function getAllNews() {
  return [...newsItems].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string) {
  return newsItems.find((n) => n.slug === slug) || null;
}

export function getLatestNews(limit = 5) {
  return getAllNews().slice(0, limit);
}

