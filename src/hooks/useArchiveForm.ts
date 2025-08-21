// 📁 hooks/useArchiveForm.ts
"use client";

import { useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import { useArchiveFormData } from "@/components/dashboard/archiveForm/useArchiveFormData";
import { useConfirmModal } from "@/components/dashboard/archiveForm/useConfirmModal";
import { useArchiveSubmit } from "@/components/dashboard/archiveForm/useArchiveSubmit";

/**
 * کامپوزر: ترتیب ساخت مهم است — ابتدا modal، بعد submit (تا setter مودال را پاس کنیم)
 */
export default function useArchiveForm(persons: any[] = []) {
  const { addToast } = useToast();

  // 1) فرم (useForm)
  const formData = useArchiveFormData(persons);

  // 2) modal را اول بساز تا setter برای submit آماده باشد
  const modal = useConfirmModal();

  // 3) submit را بساز و setter مودال را پاس بده
  const submit = useArchiveSubmit(formData.getValues, modal.setConfirmOpen);

  // 4) wrapper برای ریست کامل (فرم + مودال‌ها + newArchiveId)
  const resetArchive = useCallback(() => {
    formData.resetArchive(); // ریست مقادیر فرم (useForm.reset)
    // پاک کردن نمایش SuccessModal
    submit.setNewArchiveId?.(null);
    // بستن Confirm modal هر طور که باز مانده
    modal.setConfirmOpen(false);
    // پاک کردن submitType
    submit.setSubmitType?.(null);
  }, [formData, submit, modal]);

  const onError = useCallback(
    (errs: any) => {
      console.log("⚠️ فرم نامعتبر:", errs);

      if (errs.title) return addToast(errs.title.message, "warning");
      if (errs.date) return addToast(errs.date.message, "warning");

      if (errs.media?.images) {
        const msg =
          errs.media.images?.root?.message || "حداقل یک تصویر باید آپلود شود.";
        return addToast(msg, "warning");
      }

      if (errs.audios) {
        for (const [, errItem] of Object.entries(errs.audios)) {
          if ((errItem as any)?.title)
            return addToast("عنوان صوت نمی‌تواند خالی باشد.", "warning");
          if ((errItem as any)?.artist)
            return addToast("صاحب اثر صوت را انتخاب کنید.", "warning");
        }
      }

      addToast("لطفاً خطاهای فرم را بررسی کنید.", "warning");
    },
    [addToast]
  );

  // بازگرداندن همه چیز (form methods + submit + modal + helpers)
  return {
    ...formData,
    ...submit,
    ...modal,
    onError,
    resetArchive,
  };
}
