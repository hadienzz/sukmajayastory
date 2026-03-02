import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Journal } from "@/types/journal";
import {
  journalService,
  type CreateJournalPayload,
  type UpdateJournalPayload,
} from "@/service/journal.service";

const journalKeys = {
  all: ["journals"] as const,
  detail: (id: string) => ["journals", id] as const,
  delete: (id: string) => ["journals", id, "delete"] as const,
  outline: ["journals", "outline"] as const,
};

export const useJournalsQuery = () => {
  const { data, isLoading, isError, error } = useQuery<Journal[], Error>({
    queryKey: journalKeys.all,
    queryFn: journalService.listJournals,
  });
  const safeData = Array.isArray(data) ? data : [];
  return { data: safeData, isLoading, isError, error };
};

export const useJournalQuery = (id: string) => {
  return useQuery<Journal, Error>({
    queryKey: journalKeys.detail(id),
    queryFn: () => journalService.getJournalById(id),
    enabled: Boolean(id),
  });
};

export const useCreateJournalMutation = () => {
  const qc = useQueryClient();

  return useMutation<Journal, Error, CreateJournalPayload>({
    mutationFn: journalService.createJournal,
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: journalKeys.all });
      qc.setQueryData(journalKeys.detail(created.id), created);
    },
    onError: (error) => {
      console.error("Error creating journal:", error);
    },
  });
};

export const useUpdateJournalMutation = () => {
  const qc = useQueryClient();

  return useMutation<
    Journal,
    Error,
    { id: string; payload: UpdateJournalPayload }
  >({
    mutationFn: ({ id, payload }) =>
      journalService.updateJournalById(id, payload),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: journalKeys.all });
      qc.setQueryData(journalKeys.detail(updated.id), updated);
    },
  });
};

export const useDeleteJournalMutation = () => {
  const qc = useQueryClient();

  return useMutation<void, Error, { id: string }>({
    mutationFn: ({ id }) => journalService.deleteJournalById(id),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: journalKeys.all });
      qc.removeQueries({ queryKey: journalKeys.detail(variables.id) });
    },
  });
};

const useGetJournalOutline = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: journalKeys.outline,
    queryFn: async () => journalService.getJournalOutline(),
  });

  const safeData = Array.isArray(data) ? data : [];

  return { data: safeData, isLoading, error };
};

export default useGetJournalOutline;

// export const useJournalsQuery = () => {
//   return useQuery<Journal[], Error>({
//     queryKey: journalKeys.all,
//     queryFn: journalApi.list,
//   });
// };

// export const useJournalQuery = (id: string) => {
//   return useQuery<Journal, Error>({
//     queryKey: journalKeys.detail(id),
//     queryFn: () => journalApi.getById(id),
//     enabled: Boolean(id),
//   });
// };

// export const useCreateJournalMutation = () => {
//   const qc = useQueryClient();

//   return useMutation<Journal, Error, CreateJournalPayload>({
//     mutationFn: journalApi.create,
//     onSuccess: (created) => {
//       qc.invalidateQueries({ queryKey: journalKeys.all });
//       qc.setQueryData(journalKeys.detail(created.id), created);
//     },
//   });
// };

// export const useUpdateJournalMutation = () => {
//   const qc = useQueryClient();

//   return useMutation<
//     Journal,
//     Error,
//     { id: string; payload: UpdateJournalPayload }
//   >({
//     mutationFn: ({ id, payload }) => journalApi.update(id, payload),
//     onSuccess: (updated) => {
//       qc.invalidateQueries({ queryKey: journalKeys.all });
//       qc.setQueryData(journalKeys.detail(updated.id), updated);
//     },
//   });
// };

// export const useDeleteJournalMutation = () => {
//   const qc = useQueryClient();

//   return useMutation<void, Error, { id: string }>({
//     mutationFn: ({ id }) => journalApi.delete(id),
//     onSuccess: (_data, variables) => {
//       qc.invalidateQueries({ queryKey: journalKeys.all });
//       qc.removeQueries({ queryKey: journalKeys.detail(variables.id) });
//     },
//   });
// };
