// 📁 components/ui/ConfirmPublishModal.tsx
"use client";

import { X } from "lucide-react";

interface ConfirmPublishModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  onSaveDraft: () => void;
}

export default function ConfirmPublishModal({
  onConfirm,
  onCancel,
  onSaveDraft,
}: ConfirmPublishModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-200  p-6 rounded-lg w-96 relative shadow-2xl">
        <button
          onClick={onCancel}
          className="cursor-pointer absolute top-2 right-2 text-red-600"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-center mb-4 text-red-600">
          آیا از انتشار این آرشیو مطمئن هستید؟
        </h2>
        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
            onClick={onConfirm}
          >
            بله، منتشر کن
          </button>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer"
            onClick={onCancel}
          >
            نه! برگرد
          </button>
          <button
            className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500 cursor-pointer"
            onClick={onSaveDraft}
          >
            مطمئن نیستم! پیش‌نویس ذخیره کن
          </button>
        </div>
      </div>
    </div>
  );
}
