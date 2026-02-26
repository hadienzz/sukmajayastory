"use client";

import { dummyJournals } from "@/lib/dummy-journals";
import { BookOpen, Eye, PenSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const totalJournals = dummyJournals.length;
  const featuredCount = dummyJournals.filter((j) => j.featured).length;
  const categories = [...new Set(dummyJournals.map((j) => j.category))];

  const stats = [
    {
      label: "Total Journals",
      value: totalJournals,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Eye,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Authors",
      value: [...new Set(dummyJournals.map((j) => j.author))].length,
      icon: PenSquare,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="editorial-title text-2xl md:text-3xl">Dashboard</h1>
          <p className="body-text text-sm mt-1">
            Welcome back to Sukma Jaya Story CMS
          </p>
        </div>
        <Link
          href="/dashboard/journals/create"
          className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors"
        >
          <PenSquare size={14} />
          New Journal
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#eee] p-5 rounded-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="category-label">{stat.label}</span>
              <div className={`p-2 rounded-sm ${stat.color}`}>
                <stat.icon size={14} />
              </div>
            </div>
            <p className="editorial-title text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Journals */}
      <div className="bg-white border border-[#eee] rounded-sm">
        <div className="px-6 py-4 border-b border-[#eee] flex items-center justify-between">
          <h2 className="editorial-title text-lg">Recent Journals</h2>
          <Link
            href="/dashboard/journals"
            className="category-label hover:text-[#111] transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="divide-y divide-[#f0f0f0]">
          {dummyJournals.slice(0, 5).map((journal) => (
            <div
              key={journal.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-light text-sm truncate">{journal.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="category-label !text-[10px]">
                    {journal.category}
                  </span>
                  <span className="text-[#ccc]">·</span>
                  <span className="category-label !text-[10px]">
                    {journal.author}
                  </span>
                  <span className="text-[#ccc]">·</span>
                  <span className="category-label !text-[10px]">
                    {new Date(journal.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {journal.featured && (
                  <span className="text-[9px] uppercase tracking-widest bg-amber-50 text-amber-600 px-2 py-0.5 rounded-sm">
                    Featured
                  </span>
                )}
                <Link
                  href={`/dashboard/journals/${journal.id}/edit`}
                  className="text-[#999] hover:text-[#111] transition-colors"
                >
                  <PenSquare size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
