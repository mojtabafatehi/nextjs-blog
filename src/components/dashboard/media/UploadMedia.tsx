"use client";

import { Upload } from "lucide-react";
import MediaItem from "./MediaItem";
import MediaViewer from "./MediaViewer";
import { useUploadMedia } from "@/components/dashboard/media/useUploadMedia";
import { useFormContext } from "react-hook-form";

interface Props {
  type: "images" | "videos";
  buttonText: string;
  accept: string;
}

export default function UploadMedia({ type, buttonText, accept }: Props) {
  const {
    inputRef,
    fields,
    uploading,
    viewerIdx,
    setViewerIdx,
    handleAddClick,
    handleFileChange,
    handleRemove,
    urls,
  } = useUploadMedia(type);

  return (
    <>
      {viewerIdx !== null && (
        <MediaViewer
          urls={urls}
          startIndex={viewerIdx}
          onClose={() => setViewerIdx(null)}
          onDelete={(idx) => handleRemove(idx, true)}
        />
      )}

      {/* Thumbnails */}
      <div className="space-y-2">
        <div className="flex flex-wrap">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="cursor-pointer"
              onClick={() => setViewerIdx(idx)}
            >
              <MediaItem
                index={idx}
                url={field.url}
                type={type}
                onRemove={() => handleRemove(idx)}
                isUploading={uploading}
              />
            </div>
          ))}
        </div>

        {/* Upload button */}
        <div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <button
            type="button"
            onClick={handleAddClick}
            disabled={uploading}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600"
            } text-white`}
          >
            <Upload size={18} />
            {uploading ? "در حال آپلود..." : buttonText}
          </button>
        </div>
      </div>
    </>
  );
}
