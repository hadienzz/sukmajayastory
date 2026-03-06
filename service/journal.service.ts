import type { Journal } from "@/types/journal";
import axiosInstance from "@/utils/axios";

export interface CreateJournalPayload {
  title: string;
  subtitle?: string;
  author: string;
  category: string;
  coverImage: File;
  content: string;
  featured?: boolean;
}
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  errors?: unknown;
  meta?: unknown;
}

export type UpdateJournalPayload = Partial<
  Omit<CreateJournalPayload, "coverImage">
> & {
  coverImage?: File | null;
};

const toFormData = (payload: Record<string, unknown>) => {
  const fd = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue;
    if (value instanceof File) {
      fd.append(key, value);
      continue;
    }
    fd.append(key, String(value));
  }
  return fd;
};

const createJournal = async (payload: CreateJournalPayload) => {
  const fd = toFormData(payload as unknown as Record<string, unknown>);

  const response = await axiosInstance.post<ApiResponse<Journal>>(
    "/api/journal/create",
    fd,
  );

  return response.data.data;
};

const getJournalById = async (id: string) => {
  const response = await axiosInstance.get<ApiResponse<Journal>>(
    `/api/journal/${id}`,
  );
  return response.data.data;
};

const listJournals = async () => {
  const response =
    await axiosInstance.get<ApiResponse<Journal[]>>("/api/journal/all");
  return response.data.data;
};

const deleteJournalById = async (id: string) => {
  await axiosInstance.delete(`/api/journal/${id}`);
};

const updateJournalById = async (id: string, payload: UpdateJournalPayload) => {
  const fd = toFormData(payload as unknown as Record<string, unknown>);
  const response = await axiosInstance.put<ApiResponse<Journal>>(
    `/api/journal/${id}`,
    fd,
  );
  return response.data.data;
};

const getJournalOutline = async () => {
  const response = await axiosInstance.get<
    ApiResponse<
      Pick<Journal, "id" | "title" | "category" | "publishedAt" | "featured">[]
    >
  >("/api/journal/outline");

  return response.data.data;
};

const getJournalPaginated = async () => {
  const response =
    await axiosInstance.get<ApiResponse<Journal[]>>("/api/journal/paginated");
  return response.data.data;
};

const listJournalsByCategory = async (category: string): Promise<{ data: Journal[]; message: string }> => {
  const response = await axiosInstance.get<ApiResponse<Journal[]>>(
    `/api/journal/category/${encodeURIComponent(category)}`,
  );
  return { data: response.data.data, message: response.data.message };
};

const getJournalCategories = async (): Promise<string[]> => {
  const response = await axiosInstance.get<ApiResponse<string[]>>(
    "/api/journal/categories",
  );
  return response.data.data;
};

export const journalService = {
  createJournal,
  getJournalById,
  listJournals,
  updateJournalById,
  deleteJournalById,
  getJournalOutline,
  getJournalPaginated,
  listJournalsByCategory,
  getJournalCategories,
};

// const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
//   const res = await fetch(url, {
//     ...init,
//     headers: {
//       "Content-Type": "application/json",
//       ...(init?.headers ?? {}),
//     },
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(text || `Request failed (${res.status})`);
//   }

//   // 204 No Content
//   if (res.status === 204) return undefined as T;

//   return (await res.json()) as T;
// };

// export const journalApi = {
//   list: async (): Promise<Journal[]> => request<Journal[]>(baseUrl()),

//   getById: async (id: string): Promise<Journal> =>
//     request<Journal>(`${baseUrl()}/${encodeURIComponent(id)}`),

//   create: async (payload: CreateJournalPayload): Promise<Journal> =>
//     request<Journal>(baseUrl(), { method: "POST", body: JSON.stringify(payload) }),

//   update: async (id: string, payload: UpdateJournalPayload): Promise<Journal> =>
//     request<Journal>(`${baseUrl()}/${encodeURIComponent(id)}`, {
//       method: "PUT",
//       body: JSON.stringify(payload),
//     }),

//   delete: async (id: string): Promise<void> =>
//     request<void>(`${baseUrl()}/${encodeURIComponent(id)}`, { method: "DELETE" }),
// };
