"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface MediaItemProps {
  index: number;
  url: string;
  type: "images" | "videos";
  onRemove: () => void;
  isUploading: boolean;
}

export default function MediaItem({
  index,
  url,
  type,
  onRemove,
  isUploading,
}: MediaItemProps) {
  const { register } = useFormContext();
  const isImage = type === "images";

  return (
    <div className="relative group inline-block m-2">
      {isImage ? (
        <MediaImage url={url} index={index} />
      ) : (
        <MediaVideo url={url} />
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // جلوگیری از کلیک روی والد
          onRemove();
        }}
        disabled={isUploading}
        className="cursor-pointer absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
      >
        <Trash2 size={14} />
      </button>

      {/* hidden field to preserve URL in form */}
      <input
        type="hidden"
        {...register(`media.${type}.${index}.url`)}
        value={url}
      />
    </div>
  );
}

function MediaImage({ url, index }: { url: string; index: number }) {
  return (
    <Image
      src={url}
      alt={`media-${index}`}
      width={100}
      height={100}
      className="object-cover aspect-square rounded-lg"
    />
  );
}

function MediaVideo({ url }: { url: string }) {
  return (
    <video src={url} className="w-[100px] h-[100px] object-cover rounded-lg" />
  );
}
