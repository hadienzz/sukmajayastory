"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCreateJournalMutation } from "@/hooks/use-journal";
import {
  buildJournalPreview,
  JOURNAL_PREVIEW_STORAGE_KEY,
  JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY,
} from "@/forms/journal/journal-preview";
import {
  JOURNAL_DRAFT_STORAGE_PREFIX,
  clearJournalDraft,
  dataUrlToFile,
  fileToDataUrl,
  loadJournalDraft,
  saveJournalDraft,
} from "@/forms/journal/journal-draft";

export interface CreateJournalFormValues {
  title: string;
  subtitle: string;
  author: string;
  category: string;
  coverImage: File | null;
  content: string;
  featured: boolean;
}

export const useCreateJournalForm = () => {
  const router = useRouter();
  const createMutation = useCreateJournalMutation();
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [coverImageDataUrl, setCoverImageDataUrl] = useState<string | null>(null);
  const draftKey = `${JOURNAL_DRAFT_STORAGE_PREFIX}create`;

  const formik = useFormik<CreateJournalFormValues>({
    initialValues: {
      title: "",
      subtitle: "",
      author: "",
      category: "",
      coverImage: null,
      content: "",
      featured: false,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.title.trim()) errors.title = "Title is required";
      if (!values.author.trim()) errors.author = "Author is required";
      if (!values.category.trim()) errors.category = "Category is required";
      if (!values.coverImage) errors.coverImage = "Cover image is required";
      if (!values.content.trim()) errors.content = "Content is required";
      return errors;
    },
    onSubmit: async (values, helpers) => {
      try {
        if (!values.coverImage) throw new Error("Cover image is required");

        await createMutation.mutateAsync({
          title: values.title,
          subtitle: values.subtitle || undefined,
          author: values.author,
          category: values.category,
          coverImage: values.coverImage,
          content: values.content,
          featured: values.featured,
        });

        clearJournalDraft(draftKey);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(JOURNAL_PREVIEW_STORAGE_KEY);
          window.sessionStorage.removeItem(JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY);
        }

        // router.push("/dashboard/journals");
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const draft = loadJournalDraft(draftKey);
    if (!draft) return;

    void formik.setValues({
      title: draft.title ?? "",
      subtitle: draft.subtitle ?? "",
      author: draft.author ?? "",
      category: draft.category ?? "",
      coverImage: null,
      content: draft.content ?? "",
      featured: Boolean(draft.featured),
    });

    if (draft.coverImageDataUrl && draft.coverImageName) {
      try {
        const file = dataUrlToFile(
          draft.coverImageDataUrl,
          draft.coverImageName,
          draft.coverImageType,
        );
        void formik.setFieldValue("coverImage", file);
        setCoverImageDataUrl(draft.coverImageDataUrl);
      } catch {
        // ignore restore errors
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!formik.values.coverImage) {
      setCoverPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(formik.values.coverImage);
    setCoverPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [formik.values.coverImage]);

  const onCoverImageChange = (file: File | null) => {
    void formik.setFieldValue("coverImage", file);
    if (!file) {
      setCoverImageDataUrl(null);
      return;
    }
    void fileToDataUrl(file)
      .then((dataUrl) => setCoverImageDataUrl(dataUrl))
      .catch(() => setCoverImageDataUrl(null));
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      saveJournalDraft(draftKey, {
        title: formik.values.title,
        subtitle: formik.values.subtitle,
        author: formik.values.author,
        category: formik.values.category,
        content: formik.values.content,
        featured: Boolean(formik.values.featured),
        coverImageDataUrl: coverImageDataUrl ?? undefined,
        coverImageName: formik.values.coverImage?.name,
        coverImageType: formik.values.coverImage?.type,
      });
    }, 350);

    return () => window.clearTimeout(handle);
  }, [
    draftKey,
    formik.values.title,
    formik.values.subtitle,
    formik.values.author,
    formik.values.category,
    formik.values.content,
    formik.values.featured,
    formik.values.coverImage,
    coverImageDataUrl,
  ]);

  const handlePreview = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        {
          title: true,
          author: true,
          category: true,
          coverImage: true,
          content: true,
        },
        true,
      );
      return;
    }

    if (!coverPreviewUrl) return;

    const preview = buildJournalPreview({
      title: formik.values.title,
      subtitle: formik.values.subtitle || undefined,
      author: formik.values.author,
      category: formik.values.category,
      coverImage: coverPreviewUrl,
      content: formik.values.content,
      featured: formik.values.featured,
    });

    sessionStorage.setItem(
      JOURNAL_PREVIEW_STORAGE_KEY,
      JSON.stringify(preview),
    );
    sessionStorage.setItem(
      JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY,
      "/dashboard/journals/create",
    );
    router.push("/dashboard/journals/preview");
  };

  return {
    formik,
    coverPreviewUrl,
    onCoverImageChange,
    handlePreview,
    isSubmitting: formik.isSubmitting || createMutation.isPending,
  };
};
