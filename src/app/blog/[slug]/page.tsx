import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { codeToHtml } from 'shiki';
import { getAllArticles, getArticleBySlug, ArticleSection } from '../data';
import ArticleLayout from '../components/ArticleLayout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title.en} — Markel Ramiro`,
    description: article.description.en,
  };
}

async function renderCodeBlocks(sections: ArticleSection[]) {
  return Promise.all(
    sections.map(async (section) => {
      if (section.type === 'code' && section.language) {
        const html = await codeToHtml(section.content, {
          lang: section.language,
          theme: 'github-dark-dimmed',
        });
        return { ...section, renderedHtml: html };
      }
      return section;
    })
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [enSections, esSections] = await Promise.all([
    renderCodeBlocks(article.content.en.sections),
    renderCodeBlocks(article.content.es.sections),
  ]);

  return (
    <ArticleLayout
      title={article.title}
      description={article.description}
      date={article.date}
      readingTime={article.readingTime}
      tags={article.tags}
      sections={{
        en: enSections,
        es: esSections,
      }}
    />
  );
}
