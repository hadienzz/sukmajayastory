"use client";

import { use } from "react";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import TipTapEditor from "@/components/dashboard/tiptap-editor";
import { useEditJournalForm } from "@/forms/journal/useEditJournalForm";
import DeleteJournalDialog from "@/components/dashboard/delete-journal-dialog";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditJournalPage({ params }: Props) {
  const { id } = use(params);
  const {
    journalQuery,
    formik,
    coverPreviewUrl,
    existingCoverImageUrl,
    onCoverImageChange,
    handlePreview,
    handleDelete,
    isSubmitting,
    isDeleting,
  } = useEditJournalForm(id);

  if (journalQuery.isLoading) {
    return <p className="body-text text-sm">Loading...</p>;
  }

  if (journalQuery.isError || !journalQuery.data) {
    return (
      <div>
        <div className="flex items-start sm:items-center gap-4 mb-6">
          <Link
            href="/dashboard/journals"
            className="p-2 text-[#999] hover:text-[#111] transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="editorial-title text-2xl md:text-3xl">Edit Journal</h1>
            <p className="body-text text-sm mt-1">Journal not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const journal = journalQuery.data;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex items-start sm:items-center gap-4 min-w-0">
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
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 border border-[#ddd] px-4 py-2.5 text-sm font-light tracking-wide hover:border-[#999] transition-colors"
          >
            <Eye size={14} />
            Preview
          </button>
          <DeleteJournalDialog
            journalTitle={journal.title}
            isDeleting={isDeleting}
            onConfirmDelete={handleDelete}
            trigger={
              <button
                type="button"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 border border-red-200 text-red-500 px-4 py-2.5 text-sm font-light tracking-wide hover:bg-red-50 transition-colors"
                disabled={isDeleting}
              >
                <Trash2 size={14} />
                Delete
              </button>
            }
          />
          <button
            onClick={() => formik.submitForm()}
            disabled={isSubmitting}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            <Save size={14} />
            {isSubmitting ? "Saving..." : "Update"}
          </button>
        </div>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter journal title..."
              className="w-full text-2xl editorial-title border-none focus:outline-none placeholder:text-[#ccc]"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="body-text text-xs mt-2 text-red-500">
                {formik.errors.title}
              </p>
            )}
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="A brief subtitle..."
              className="w-full text-sm font-light border-none focus:outline-none placeholder:text-[#ccc]"
            />
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Content</label>
            <TipTapEditor
              content={formik.values.content}
              onChange={(next) => formik.setFieldValue("content", next)}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="body-text text-xs mt-2 text-red-500">
                {formik.errors.content}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={(e) =>
                onCoverImageChange(e.currentTarget.files?.[0] ?? null)
              }
              onBlur={formik.handleBlur}
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors mb-3"
            />
            {formik.touched.coverImage && formik.errors.coverImage && (
              <p className="body-text text-xs mb-3 text-red-500">
                {formik.errors.coverImage}
              </p>
            )}
            {(coverPreviewUrl || existingCoverImageUrl) && (
              <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-[#f5f5f5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverPreviewUrl ?? existingCoverImageUrl ?? ""}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors bg-white"
            >
              <option value="">Select category</option>
              <option value="Wedding">Wedding</option>
              <option value="Pre-Wedding">Pre-Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Behind the Lens">Behind the Lens</option>
              <option value="Family">Family</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="body-text text-xs mt-2 text-red-500">
                {formik.errors.category}
              </p>
            )}
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Author</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Author name..."
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors"
            />
            {formik.touched.author && formik.errors.author && (
              <p className="body-text text-xs mt-2 text-red-500">
                {formik.errors.author}
              </p>
            )}
          </div>

          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
            <label className="category-label block mb-3">Options</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formik.values.featured}
                onChange={formik.handleChange}
                className="w-4 h-4 accent-[#111]"
              />
              <span className="text-sm font-light">
                Mark as featured journal
              </span>
            </label>
          </div>

          {/* Meta info */}
          <div className="bg-white border border-[#eee] rounded-sm p-4 sm:p-6">
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
      </form>
    </div>
  );
}
