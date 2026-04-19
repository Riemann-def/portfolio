'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
  index: number;
  image?: string;
}

export default function BlogCard({
  slug,
  title,
  description,
  date,
  readingTime,
  tags,
  index,
  image,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blog/${slug}`} className="group block">
        <article className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 cursor-pointer">
          {image && (
            <motion.img
              src={image}
              alt=""
              className="absolute -right-6 -bottom-6 w-32 h-32 sm:w-40 sm:h-40 object-contain opacity-[0.3] blur-[4px] pointer-events-none select-none group-hover:opacity-[0.07] transition-opacity duration-500"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ rotate: 720, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
            />
          )}
          <div className="relative flex items-center gap-3 mb-4">
            <time className="text-[11px] text-white/30 tracking-[0.2em] uppercase">
              {formattedDate}
            </time>
            <span className="text-white/15">·</span>
            <span className="text-[11px] text-white/30 tracking-[0.2em] uppercase">
              {readingTime} min read
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
            {title}
          </h2>

          <p className="text-white/45 text-sm sm:text-base leading-relaxed mb-5">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] tracking-wide uppercase text-white/35 bg-white/[0.04] border border-white/[0.06] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 text-sm">
              &rarr;
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
