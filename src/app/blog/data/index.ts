/* ─── Article Types ──────────────────────────────────────────── */

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'list' | 'image' | 'tldr' | 'chart' | 'equation';
  content: string;
  language?: string;     // for code blocks: 'python', 'bash', 'javascript', etc.
  level?: 2 | 3;         // for headings
  items?: string[];       // for lists
  variant?: 'info' | 'warning' | 'tip'; // for callouts
  alt?: string;           // for images / chart caption
  output?: string;        // for code blocks: simulated terminal output shown on "Run"
  chartId?: string;       // for charts: identifier of which chart component to render
  meta?: Record<string, string>; // for charts: extra labels (yLabel, sweetSpotLabel, ...)
}

export interface ArticleContent {
  sections: ArticleSection[];
}

export interface Article {
  slug: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  date: string;           // ISO date: '2026-04-13'
  readingTime: number;    // minutes
  tags: string[];
  image?: string;          // optional background image for card decoration
  hideLanguageToggle?: boolean; // hide the EN/ES toggle (defaults to false)
  content: { en: ArticleContent; es: ArticleContent };
}

/* ─── Article Registry ──────────────────────────────────────── */

import obfuscatedCode from './articles/obfuscated-code';
import scalingLaws from './articles/scaling-laws';

export const articles: Article[] = [
  scalingLaws,
  obfuscatedCode,
];

/* ─── Helpers ───────────────────────────────────────────────── */

export function getAllArticles(): Article[] {
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
