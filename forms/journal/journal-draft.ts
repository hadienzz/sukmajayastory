export const JOURNAL_DRAFT_STORAGE_PREFIX = "journalDraft:";

export type JournalDraft = {
  title: string;
  subtitle: string;
  author: string;
  category: string;
  content: string;
  featured: boolean;
  coverImageDataUrl?: string;
  coverImageName?: string;
  coverImageType?: string;
};

const isBrowser = () => typeof window !== "undefined";

export const loadJournalDraft = (storageKey: string): JournalDraft | null => {
  if (!isBrowser()) return null;
  const raw = window.sessionStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as JournalDraft;
  } catch {
    return null;
  }
};

export const saveJournalDraft = (storageKey: string, draft: JournalDraft) => {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(storageKey, JSON.stringify(draft));
};

export const clearJournalDraft = (storageKey: string) => {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(storageKey);
};

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  });
};

export const dataUrlToFile = (dataUrl: string, name: string, type?: string) => {
  const [header, base64] = dataUrl.split(",");
  const inferredType =
    header?.match(/data:(.*?);base64/)?.[1] || type || "application/octet-stream";

  const binary = window.atob(base64 ?? "");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return new File([bytes], name, { type: inferredType });
};
