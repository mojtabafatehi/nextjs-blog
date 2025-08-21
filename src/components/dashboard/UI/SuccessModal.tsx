// 📁 components/ui/SuccessModal.tsx
"use client";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface SuccessModalProps {
  archiveId: number;
  onClose: () => void; // برای گزینه «ایجاد جدید» یا بستن مودال
}

export default function SuccessModal({
  archiveId,
  onClose,
}: SuccessModalProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-green-200 rounded-lg p-6 w-80 shadow-xl">
        <button
          className="absolute top-2 right-2 text-green-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg text-green-400 font-bold mb-4 text-center">
          انتشار موفقیت‌آمیز
        </h2>

        <div className="flex flex-col gap-2">
          <button
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => router.push(`/archives/${archiveId}`)}
          >
            نمایش آرشیو جدید
          </button>

          <button
            className="cursor-pointer w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={() => {
              // فقط یک بار onClose صدا زده می‌شود؛ کامپوزر (resetArchive) باید همه مودال‌ها را ببندد
              onClose();
            }}
          >
            ایجاد آرشیو جدید
          </button>

          <button
            className="cursor-pointer w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
            onClick={() => router.push("/dashboard")}
          >
            بازگشت به داشبورد
          </button>
        </div>
      </div>
    </div>
  );
}
