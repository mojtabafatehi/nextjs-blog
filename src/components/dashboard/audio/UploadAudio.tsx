// 📁 components/audio/UploadAudio.tsx
"use client";

import { Upload } from "lucide-react";
import AudioItem from "./AudioItem";
import { useUploadAudio } from "@/components/dashboard/audio/useUploadAudio";

export default function UploadAudio({
  persons,
}: {
  persons: { id: number; full_name: string }[];
}) {
  const { fields, remove, audioInputRef, handleAddClick, handleFileUpload } =
    useUploadAudio(persons);

  return (
    <div className="space-y-2 mt-4">
      <span className="bg-blue-500 rounded-2xl block p-2 text-xs font-bold dark:text-white text-center">
        آپلود صوت‌های مراسم
      </span>

      {fields.map((field, i) => (
        <AudioItem
          key={field.id}
          index={i}
          field={field}
          onRemove={remove}
          persons={persons}
          isUploading={field.isUploading}
        />
      ))}

      <div className="flex justify-center">
        <input
          ref={audioInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
        >
          <Upload size={18} />
          {fields.length ? "افزودن صوت دیگر" : "آپلود صوت"}
        </button>
      </div>
    </div>
  );
}
