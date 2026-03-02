"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  journalTitle: string;
  trigger: ReactNode;
  onConfirmDelete: () => Promise<void> | void;
  isDeleting?: boolean;
};

export default function DeleteJournalDialog({
  journalTitle,
  trigger,
  onConfirmDelete,
  isDeleting = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const canDelete = useMemo(() => {
    return typed.trim() === journalTitle.trim() && !isDeleting;
  }, [typed, journalTitle, isDeleting]);

  const handleConfirm = async () => {
    setLocalError(null);
    try {
      await onConfirmDelete();
      setOpen(false);
      setTyped("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to delete";
      setLocalError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="bg-white border border-[#eee] rounded-sm p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
        showCloseButton={false}
      >
        <DialogHeader className="text-left">
          <DialogTitle className="editorial-title text-xl">
            Delete journal
          </DialogTitle>
          <DialogDescription className="body-text text-sm">
            This action cannot be undone. This will permanently delete
            <span className="text-[#111]"> {journalTitle}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <p className="category-label text-[10px]! text-[#777]!">
            To confirm, type the journal title below:
          </p>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={journalTitle}
            className="w-full px-3 py-2.5 border border-[#eee] text-sm font-light focus:outline-none focus:border-[#999] transition-colors"
          />
          {localError && (
            <p className="body-text text-xs text-red-500">{localError}</p>
          )}
        </div>

        <DialogFooter className="mt-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            className="inline-flex justify-center items-center border border-[#ddd] px-4 py-2.5 text-sm font-light tracking-wide hover:border-[#999] transition-colors"
            onClick={() => {
              setOpen(false);
              setTyped("");
              setLocalError(null);
            }}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center items-center border border-red-200 text-red-500 px-4 py-2.5 text-sm font-light tracking-wide hover:bg-red-50 transition-colors disabled:opacity-50"
            disabled={!canDelete}
            onClick={handleConfirm}
          >
            {isDeleting ? "Deleting..." : "Delete this journal"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
