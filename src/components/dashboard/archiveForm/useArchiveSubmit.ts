// 📁 hooks/useArchiveSubmit.ts
import { useState, useCallback } from "react";
import { prepareData } from "./archiveUtils";
import { useToast } from "@/hooks/useToast";
import { createArchive } from "@/app/actions/createArchive";

export function useArchiveSubmit(getValues: any) {
  const { addToast } = useToast();
  const [newArchiveId, setNewArchiveId] = useState<number | null>(null);
  const [submitType, setSubmitType] = useState<"published" | "draft" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onConfirmSubmit = useCallback(
    async (data: any) => {
      if (isSubmitting) return;

      if (!data?.status && !submitType) {
        addToast("وضعیت ارسال مشخص نیست.", "warning");
        return;
      }

      setIsSubmitting(true);

      try {
        const payload = prepareData(data, getValues, submitType);
        const id = await createArchive(payload);
        setNewArchiveId(id);
        setConfirmOpen(false);
        addToast(
          payload.status === "published"
            ? "آرشیو با موفقیت منتشر شد."
            : "آرشیو به عنوان پیش‌نویس ذخیره شد.",
          "success"
        );
      } catch (err: any) {
        const msg = err?.message || err?.cause?.message || String(err);

        if (msg.includes("UNIQUE constraint failed: archives.slug")) {
          addToast("این لینک قبلاً استفاده شده.", "warning");
        } else {
          addToast("خطا در ذخیره آرشیو. لطفاً دوباره تلاش کنید.", "error");
        }
      } finally {
        setIsSubmitting(false);
        setSubmitType(null);
        setConfirmOpen(false);
      }
    },
    [getValues, submitType, isSubmitting, addToast]
  );

  return {
    onConfirmSubmit,
    submitType,
    setSubmitType,
    newArchiveId,
    setNewArchiveId,
    isSubmitting,
    confirmOpen,
    setConfirmOpen,
  };
}
