"use client";

import { dummyJournals } from "@/lib/dummy-journals";
import { PenSquare, Trash2, Eye, Search, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function DashboardJournalsList() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", ...new Set(dummyJournals.map((j) => j.category))];

  const filtered = dummyJournals.filter((j) => {
    const matchSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || j.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="editorial-title text-2xl md:text-3xl">All Journals</h1>
          <p className="body-text text-sm mt-1">
            Manage your journal entries
          </p>
        </div>
        <Link
          href="/dashboard/journals/create"
          className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors"
        >
          <PlusCircle size={14} />
          New Journal
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#eee] rounded-sm mb-6">
        <div className="px-6 py-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]"
            />
            <input
              type="text"
              placeholder="Search journals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-[#eee] text-sm font-light focus:outline-none focus:border-[#999] transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#eee] text-sm font-light focus:outline-none focus:border-[#999] transition-colors bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#eee] rounded-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#eee]">
              <th className="text-left px-6 py-3">
                <span className="category-label">Journal</span>
              </th>
              <th className="text-left px-6 py-3 hidden md:table-cell">
                <span className="category-label">Category</span>
              </th>
              <th className="text-left px-6 py-3 hidden lg:table-cell">
                <span className="category-label">Author</span>
              </th>
              <th className="text-left px-6 py-3 hidden lg:table-cell">
                <span className="category-label">Date</span>
              </th>
              <th className="text-left px-6 py-3">
                <span className="category-label">Status</span>
              </th>
              <th className="text-right px-6 py-3">
                <span className="category-label">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f5f5]">
            {filtered.map((journal) => (
              <tr key={journal.id} className="hover:bg-[#fafafa] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={journal.coverImage}
                        alt={journal.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-light text-sm truncate max-w-[250px]">
                        {journal.title}
                      </p>
                      <p className="text-[11px] text-[#aaa] truncate max-w-[250px]">
                        {journal.excerpt}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="category-label !text-[10px] bg-[#f5f5f5] px-2 py-1 rounded-sm">
                    {journal.category}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm font-light text-[#777]">
                    {journal.author}
                  </span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-sm font-light text-[#777]">
                    {new Date(journal.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {journal.featured ? (
                    <span className="text-[9px] uppercase tracking-widest bg-amber-50 text-amber-600 px-2 py-0.5 rounded-sm">
                      Featured
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase tracking-widest bg-green-50 text-green-600 px-2 py-0.5 rounded-sm">
                      Published
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/journal/${journal.id}`}
                      target="_blank"
                      className="p-1.5 text-[#bbb] hover:text-[#111] transition-colors"
                      title="Preview"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      href={`/dashboard/journals/${journal.id}/edit`}
                      className="p-1.5 text-[#bbb] hover:text-[#111] transition-colors"
                      title="Edit"
                    >
                      <PenSquare size={14} />
                    </Link>
                    <button
                      className="p-1.5 text-[#bbb] hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="body-text text-sm">No journals found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
