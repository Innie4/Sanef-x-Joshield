import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { SANEF_BLOG } from "@/lib/data";
import { notFound } from "next/navigation";

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = SANEF_BLOG.find((p) => p.slug === params.slug) || SANEF_BLOG[0];

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-700 font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Field Reports</span>
      </Link>

      <div className="space-y-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
          <span className="font-semibold text-slate-700">{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div
        className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="pt-10 mt-12 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
        <span>Published by Safe Neighborhood Foundation Research Directorate</span>
        <Link
          href="/portfolio"
          className="text-emerald-700 font-semibold hover:underline"
        >
          View Related Evidence Archives →
        </Link>
      </div>
    </article>
  );
}
