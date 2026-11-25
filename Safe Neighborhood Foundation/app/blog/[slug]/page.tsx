import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SANEF_BLOG_POSTS } from "@/lib/data";

export function generateStaticParams() {
  return SANEF_BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = SANEF_BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!article) return notFound();

  return (
    <article className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[780px] px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-2 text-[13px] font-semibold text-[#1C1917] hover:border-[#1B4332]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Field Notes
        </Link>

        <header className="mt-8 border-b border-[#E7E5E4] pb-8">
          <div className="flex flex-wrap items-center gap-2 text-[12px]">
            <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-semibold text-[#1B4332]">
              {article.category}
            </span>
            <span className="font-mono text-[#57534E]">{article.publishedDate}</span>
            <span className="text-[#D6D3D1]">·</span>
            <span className="text-[#57534E]">{article.readTime}</span>
          </div>
          <h1 className="mt-4 font-serif text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-[#1C1917] sm:text-[44px]">
            {article.title}
          </h1>
          <p className="mt-4 text-[14px] text-[#57534E]">
            By <strong className="text-[#1C1917]">{article.author}</strong> — {article.authorRole}
          </p>
        </header>

        <figure className="mt-8 overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white">
          <div className="aspect-[16/10] bg-[#E7E5E4]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="border-t border-[#E7E5E4] px-4 py-3 text-[12px] text-[#57534E]">
            {article.coverCaption}
          </figcaption>
        </figure>

        <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-[#1C1917]">
          {article.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="mt-12 rounded-[10px] border border-[#E7E5E4] bg-white p-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-[20px] font-medium text-[#1C1917]">
              Inspect the underlying field data
            </p>
            <p className="mt-1 text-[13px] text-[#57534E]">
              Download the verified photometric and ward survey PDFs in our archive.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#1B4332] px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            Open Evidence Archive
          </Link>
        </div>
      </div>
    </article>
  );
}
