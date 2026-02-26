"use client";

import { useState } from "react";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import TipTapEditor from "@/components/dashboard/tiptap-editor";

export default function CreateJournalPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const journalData = {
      title,
      subtitle,
      author,
      category,
      coverImage,
      content,
      featured,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      publishedAt: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
    };

    console.log("Journal saved:", journalData);
    alert("Journal saved successfully! (dummy — data logged to console)");
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/journals"
            className="p-2 text-[#999] hover:text-[#111] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="editorial-title text-2xl md:text-3xl">
              New Journal
            </h1>
            <p className="body-text text-sm mt-1">
              Create a new journal entry
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-[#ddd] px-4 py-2.5 text-sm font-light tracking-wide hover:border-[#999] transition-colors"
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter journal title..."
                className="w-full text-2xl editorial-title border-none focus:outline-none placeholder:text-[#ccc]"
              />
            </div>

            {/* Subtitle */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="A brief subtitle for the journal..."
                className="w-full text-sm font-light border-none focus:outline-none placeholder:text-[#ccc]"
              />
            </div>

            {/* Content Editor */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Content</label>
              <TipTapEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Cover Image</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Image URL..."
                className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors mb-3"
              />
              {coverImage && (
                <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-[#f5f5f5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Category */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors bg-white"
              >
                <option value="">Select category</option>
                <option value="Wedding">Wedding</option>
                <option value="Pre-Wedding">Pre-Wedding</option>
                <option value="Engagement">Engagement</option>
                <option value="Behind the Lens">Behind the Lens</option>
                <option value="Family">Family</option>
              </select>
            </div>

            {/* Author */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name..."
                className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors"
              />
            </div>

            {/* Featured Toggle */}
            <div className="bg-white border border-[#eee] rounded-sm p-6">
              <label className="category-label block mb-3">Options</label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#111]"
                />
                <span className="text-sm font-light">
                  Mark as featured journal
                </span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
