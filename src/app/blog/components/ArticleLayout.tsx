'use client';

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

interface ProcessedSection {
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'list' | 'image' | 'tldr';
  content: string;
  language?: string;
  level?: 2 | 3;
  items?: string[];
  variant?: 'info' | 'warning' | 'tip';
  alt?: string;
  renderedHtml?: string; // pre-rendered HTML for code blocks
  output?: string;       // simulated terminal output for "Run" button
}

function RunnableCodeBlock({ section }: { section: ProcessedSection }) {
  const [showOutput, setShowOutput] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleRun = () => {
    if (showOutput) {
      setShowOutput(false);
      setTyping(false);
      return;
    }
    setTyping(true);
    setShowOutput(true);
    setTimeout(() => setTyping(false), 600);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/[0.07]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.04] border-b border-white/[0.05]">
        <span className="text-[11px] text-white/30 tracking-[0.15em] uppercase font-medium">
          {section.language}
        </span>
        {section.output && (
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 text-[11px] tracking-wide text-white/30 hover:text-green-400/80 transition-colors cursor-pointer"
          >
            {showOutput ? (
              <>
                <span className="text-[10px]">&#x25A0;</span> Clear
              </>
            ) : (
              <>
                <span className="text-[10px]">&#x25B6;</span> Run
              </>
            )}
          </button>
        )}
      </div>
      {section.renderedHtml ? (
        <div
          className="overflow-x-auto p-4 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.renderedHtml }}
        />
      ) : (
        <pre className="p-4 overflow-x-auto text-sm text-white/60">
          <code>{section.content}</code>
        </pre>
      )}
      {showOutput && section.output && (
        <div className="border-t border-white/[0.05] bg-black/40 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-green-400/50 tracking-widest uppercase">output</span>
          </div>
          <pre className={`text-sm text-green-400/70 font-mono whitespace-pre-wrap transition-opacity duration-300 ${typing ? 'opacity-0' : 'opacity-100'}`}>
            {section.output}
          </pre>
        </div>
      )}
    </div>
  );
}

interface ArticleLayoutProps {
  title: { en: string; es: string };
  description: { en: string; es: string };
  date: string;
  readingTime: number;
  tags: string[];
  sections: {
    en: ProcessedSection[];
    es: ProcessedSection[];
  };
}

function renderSection(section: ProcessedSection, index: number) {
  switch (section.type) {
    case 'heading':
      if (section.level === 3) {
        return (
          <h3 key={index} className="text-xl sm:text-2xl font-semibold text-white/85 mt-10 mb-4">
            {section.content}
          </h3>
        );
      }
      return (
        <h2 key={index} className="text-2xl sm:text-3xl font-bold text-white/90 mt-14 mb-6">
          {section.content}
        </h2>
      );

    case 'tldr':
      return (
        <div key={index} className="mb-8 pb-8 border-b border-white/[0.06]">
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-white/35 mb-3">
            TL;DR
          </span>
          <p className="text-white/55 text-base italic leading-[1.8]">
            {section.content}
          </p>
        </div>
      );

    case 'paragraph':
      return (
        <p key={index} className="text-white/65 leading-[1.9] mb-6 text-lg">
          {section.content}
        </p>
      );

    case 'code':
      return <RunnableCodeBlock key={index} section={section} />;

    case 'callout': {
      const borderColor =
        section.variant === 'warning'
          ? 'border-l-amber-500/50'
          : section.variant === 'tip'
          ? 'border-l-emerald-500/50'
          : 'border-l-blue-500/50';
      return (
        <div
          key={index}
          className={`my-8 bg-white/[0.03] border-l-2 ${borderColor} px-6 py-5 rounded-r-lg text-white/55 text-base leading-relaxed`}
        >
          {section.content}
        </div>
      );
    }

    case 'list':
      return (
        <ul key={index} className="my-5 space-y-3 pl-5">
          {section.items?.map((item, i) => (
            <li key={i} className="text-white/60 text-lg list-disc leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}

export default function ArticleLayout({
  title,
  description,
  date,
  readingTime,
  tags,
  sections,
}: ArticleLayoutProps) {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50 });

  const formattedDate = new Date(date).toLocaleDateString(
    lang === 'en' ? 'en-US' : 'es-ES',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const currentSections = lang === 'en' ? sections.en : sections.es;

  return (
    <article className="min-h-screen bg-[#050505]">
      {/* ── Reading progress ─────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #ff7448 0%, #ff4848 50%, #6248ff 100%)',
        }}
      />

      {/* ── Back link ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pt-8 sm:pt-12">
        <Link
          href="/blog"
          className="text-white/30 hover:text-white/60 transition-colors text-sm tracking-wide"
        >
          &larr; Blog
        </Link>
      </div>

      {/* ── Article header ───────────────────────────────────── */}
      <motion.header
        className="max-w-3xl mx-auto px-6 pt-10 sm:pt-16 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] tracking-[0.15em] uppercase text-white/30 bg-white/[0.04] border border-white/[0.06] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
          {lang === 'en' ? title.en : title.es}
        </h1>

        <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-6">
          {lang === 'en' ? description.en : description.es}
        </p>

        <div className="flex items-center gap-3 text-xs text-white/25 tracking-[0.15em] uppercase">
          <time>{formattedDate}</time>
          <span className="text-white/10">·</span>
          <span>{readingTime} min {lang === 'en' ? 'read' : 'lectura'}</span>
        </div>

        {/* ── Language toggle — EN / ES pill ────────────────── */}
        <div className="mt-6 inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
          {(['en', 'es'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`px-3 py-1 rounded-full text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                lang === code
                  ? 'bg-white/[0.08] text-white/85'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        <hr className="border-white/[0.06] mt-6" />
      </motion.header>

      {/* ── Article body ─────────────────────────────────────── */}
      <motion.div
        className="max-w-3xl mx-auto px-6 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        key={lang}
      >
        {currentSections.map((section, i) => renderSection(section, i))}
      </motion.div>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="max-w-3xl mx-auto px-6 pb-16 border-t border-white/[0.06] pt-8">
        <Link
          href="/blog"
          className="text-white/30 hover:text-white/60 transition-colors text-sm"
        >
          &larr; {lang === 'en' ? 'Back to all articles' : 'Volver a todos los artículos'}
        </Link>
      </footer>
    </article>
  );
}
