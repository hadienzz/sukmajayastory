"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  useDeleteJournalMutation,
  useJournalQuery,
  useUpdateJournalMutation,
} from "@/hooks/use-journal";
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

export interface EditJournalFormValues {
  title: string;
  subtitle: string;
  author: string;
  category: string;
  coverImage: File | null;
  content: string;
  featured: boolean;
}

export const useEditJournalForm = (id: string) => {
  const router = useRouter();
  const journalQuery = useJournalQuery(id);
  const updateMutation = useUpdateJournalMutation();
  const deleteMutation = useDeleteJournalMutation();
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [coverImageDataUrl, setCoverImageDataUrl] = useState<string | null>(null);
  const [didRestoreDraft, setDidRestoreDraft] = useState(false);
  const draftKey = `${JOURNAL_DRAFT_STORAGE_PREFIX}edit:${id}`;

  const formik = useFormik<EditJournalFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: journalQuery.data?.title ?? "",
      subtitle: journalQuery.data?.subtitle ?? "",
      author: journalQuery.data?.author ?? "",
      category: journalQuery.data?.category ?? "",
      coverImage: null,
      content: journalQuery.data?.content ?? "",
      featured: journalQuery.data?.featured ?? false,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.title.trim()) errors.title = "Title is required";
      if (!values.author.trim()) errors.author = "Author is required";
      if (!values.category.trim()) errors.category = "Category is required";
      if (!values.content.trim()) errors.content = "Content is required";
      return errors;
    },
    onSubmit: async (values, helpers) => {
      try {
        await updateMutation.mutateAsync({
          id,
          payload: {
            title: values.title,
            subtitle: values.subtitle || undefined,
            author: values.author,
            category: values.category,
            coverImage: values.coverImage,
            content: values.content,
            featured: values.featured,
          },
        });

        clearJournalDraft(draftKey);
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(JOURNAL_PREVIEW_STORAGE_KEY);
          window.sessionStorage.removeItem(JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY);
        }
        router.push("/dashboard/journals");
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (didRestoreDraft) return;
    if (!journalQuery.data) return;

    const draft = loadJournalDraft(draftKey);
    if (draft) {
      void formik.setValues({
        title: draft.title ?? journalQuery.data.title,
        subtitle: draft.subtitle ?? journalQuery.data.subtitle ?? "",
        author: draft.author ?? journalQuery.data.author,
        category: draft.category ?? journalQuery.data.category,
        coverImage: null,
        content: draft.content ?? journalQuery.data.content,
        featured:
          draft.featured !== undefined ? Boolean(draft.featured) : journalQuery.data.featured,
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
    }

    setDidRestoreDraft(true);
  }, [didRestoreDraft, draftKey, formik, journalQuery.data]);

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
    if (!didRestoreDraft) return;

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
    didRestoreDraft,
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
          content: true,
        },
        true,
      );
      return;
    }

    const coverImage =
      coverPreviewUrl ?? journalQuery.data?.coverImage ?? "";
    if (!coverImage) return;

    const preview = buildJournalPreview({
      title: formik.values.title,
      subtitle: formik.values.subtitle || undefined,
      author: formik.values.author,
      category: formik.values.category,
      coverImage,
      content: formik.values.content,
      featured: formik.values.featured,
    });

    sessionStorage.setItem(JOURNAL_PREVIEW_STORAGE_KEY, JSON.stringify(preview));
    sessionStorage.setItem(
      JOURNAL_PREVIEW_ORIGIN_STORAGE_KEY,
      `/dashboard/journals/${encodeURIComponent(id)}/edit`,
    );
    router.push("/dashboard/journals/preview");
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ id });
    clearJournalDraft(draftKey);
    router.push("/dashboard/journals");
  };

  return {
    journalQuery,
    formik,
    coverPreviewUrl,
    existingCoverImageUrl: journalQuery.data?.coverImage ?? null,
    onCoverImageChange,
    handlePreview,
    handleDelete,
    isSubmitting: formik.isSubmitting || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};

