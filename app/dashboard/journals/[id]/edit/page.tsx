"use client";

import { useState, use } from "react";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { getJournalById } from "@/lib/dummy-journals";
import TipTapEditor from "@/components/dashboard/tiptap-editor";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditJournalPage({ params }: Props) {
  const { id } = use(params);
  const journal = getJournalById(id);

  if (!journal) notFound();

  const [title, setTitle] = useState(journal.title);
  const [subtitle, setSubtitle] = useState(journal.subtitle || "");
  const [author, setAuthor] = useState(journal.author);
  const [category, setCategory] = useState(journal.category);
  const [coverImage, setCoverImage] = useState(journal.coverImage);
  const [content, setContent] = useState(journal.content);
  const [featured, setFeatured] = useState(journal.featured);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const updatedData = {
      ...journal,
      title,
      subtitle,
      author,
      category,
      coverImage,
      content,
      featured,
    };

    console.log("Journal updated:", updatedData);
    alert("Journal updated successfully! (dummy — data logged to console)");
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
              Edit Journal
            </h1>
            <p className="body-text text-sm mt-1">
              Editing &ldquo;{journal.title}&rdquo;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/journal/${journal.id}`}
            target="_blank"
            className="inline-flex items-center gap-2 border border-[#ddd] px-4 py-2.5 text-sm font-light tracking-wide hover:border-[#999] transition-colors"
          >
            <Eye size={14} />
            Preview
          </Link>
          <button
            className="inline-flex items-center gap-2 border border-red-200 text-red-500 px-4 py-2.5 text-sm font-light tracking-wide hover:bg-red-50 transition-colors"
            onClick={() => alert("Delete functionality (dummy)")}
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
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

          <div className="bg-white border border-[#eee] rounded-sm p-6">
            <label className="category-label block mb-3">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A brief subtitle..."
              className="w-full text-sm font-light border-none focus:outline-none placeholder:text-[#ccc]"
            />
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-6">
            <label className="category-label block mb-3">Content</label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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

          {/* Meta info */}
          <div className="bg-white border border-[#eee] rounded-sm p-6">
            <label className="category-label block mb-3">Info</label>
            <div className="space-y-2 text-sm font-light text-[#777]">
              <p>
                <span className="text-[#aaa]">Published:</span>{" "}
                {new Date(journal.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="text-[#aaa]">Read time:</span>{" "}
                {journal.readTime}
              </p>
              <p>
                <span className="text-[#aaa]">Slug:</span> {journal.slug}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
