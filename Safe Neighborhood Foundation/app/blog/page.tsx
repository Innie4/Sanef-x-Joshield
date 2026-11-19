import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { SANEF_BLOG } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          FIELD DISPATCHES & POLICY JOURNAL
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Field Insights & Community Research
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Read investigative articles, statistical findings from our ongoing projects, and policy recommendations 
          for sustainable community defense.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SANEF_BLOG.map((post) => (
          <article
            key={post.id}
            className="civic-card rounded-3xl p-8 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  {post.category}
                </span>
                <span className="font-mono">{post.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {post.title}
              </h2>

              <p className="text-xs text-slate-500 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{post.author}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{post.date}</span>
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                {post.summary}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
