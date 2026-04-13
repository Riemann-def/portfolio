import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark-dimmed',
  });

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-white/[0.07]">
      <div className="flex items-center px-4 py-2 bg-white/[0.04] border-b border-white/[0.05]">
        <span className="text-[11px] text-white/30 tracking-[0.15em] uppercase font-medium">
          {language}
        </span>
      </div>
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
