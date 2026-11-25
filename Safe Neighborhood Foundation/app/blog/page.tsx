"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SANEF_BLOG_POSTS } from "@/lib/data";

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Field Evidence", "School Safety", "Youth Mediation"];

  const filtered =
    category === "All"
      ? SANEF_BLOG_POSTS
      : SANEF_BLOG_POSTS.filter((p) => p.category === category);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E7E5E4] pb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
            Journal & Announcements
          </p>
          <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
            Field Notes & Research
          </h1>
          <p className="mt-3 max-w-[660px] text-[16px] leading-relaxed text-[#57534E]">
            Long-form field dispatches, evaluation lessons, and public governance updates written
            by SANEF ward leads and researchers.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  category === cat
                    ? "bg-[#1B4332] text-[#FAF8F5]"
                    : "border border-[#E7E5E4] bg-white text-[#57534E] hover:border-[#1B4332]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Story */}
        {featured && (
          <article className="mt-10 grid grid-cols-1 overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white lg:grid-cols-12">
            <div className="aspect-[16/10] bg-[#E7E5E4] lg:col-span-6 lg:aspect-auto">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-9 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                  <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-semibold text-[#1B4332]">
                    Featured · {featured.category}
                  </span>
                  <span className="font-mono text-[#57534E]">{featured.publishedDate}</span>
                </div>
                <h2 className="mt-4 font-serif text-[28px] font-medium leading-snug text-[#1C1917] sm:text-[32px]">
                  <Link href={`/blog/${featured.slug}`} className="hover:text-[#1B4332]">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[#E7E5E4] pt-4 text-[13px]">
                <div>
                  <p className="font-semibold text-[#1C1917]">{featured.author}</p>
                  <p className="text-[#57534E]">{featured.authorRole}</p>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1B4332] hover:text-[#C85A32]"
                >
                  Read dispatch <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Remaining Articles */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#E7E5E4]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-2 text-[12px] text-[#57534E]">
                    <span className="font-semibold text-[#1B4332]">{post.category}</span>
                    <span>·</span>
                    <span className="font-mono">{post.publishedDate}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[23px] font-medium leading-snug text-[#1C1917]">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#1B4332]">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-[#57534E]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#E7E5E4] pt-4 text-[13px]">
                  <span className="text-[#57534E]">{post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-[#1B4332] hover:text-[#C85A32]"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
