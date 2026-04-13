import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from './data';
import BlogCard from './components/BlogCard';

export const metadata: Metadata = {
  title: 'Writing — Markel Ramiro',
  description: 'Articles about software engineering, AI, and tech.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-12 sm:pt-16 pb-12">
        <Link
          href="/"
          className="text-white/30 hover:text-white/60 transition-colors text-sm tracking-wide inline-block mb-16"
        >
          &larr; markelramiro.com
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Writing
        </h1>
        <p className="text-white/35 text-base sm:text-lg max-w-xl">
          Thoughts on software, AI, and things I find interesting.
        </p>

        <hr className="border-white/[0.06] mt-10" />
      </div>

      {/* ── Article grid ───────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 gap-5">
          {articles.map((article, index) => (
            <BlogCard
              key={article.slug}
              slug={article.slug}
              title={article.title.en}
              description={article.description.en}
              date={article.date}
              readingTime={article.readingTime}
              tags={article.tags}
              image={article.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
