// 📁 components/media/MediaViewer.tsx
"use client";

import { useState, useEffect, MouseEvent } from "react";
import { X, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

type MediaViewerProps = {
  urls: string[];
  startIndex: number;
  onClose: () => void;
  onDelete: (idx: number) => void;
};

export default function MediaViewer({
  urls,
  startIndex,
  onClose,
  onDelete,
}: MediaViewerProps) {
  const [current, setCurrent] = useState(startIndex);

  const currentUrl = urls[current];
  const isVideo = /\.(mp4|webm)$/i.test(currentUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && current < urls.length - 1)
        setCurrent((c) => c + 1);
      if (e.key === "ArrowLeft" && current > 0) setCurrent((c) => c - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, urls.length, onClose]);

  useEffect(() => {
    if (!urls[current]) onClose();
  }, [current, urls, onClose]);

  if (!currentUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e: MouseEvent) => e.stopPropagation()}
      >
        <ControlButtons
          onClose={onClose}
          onDelete={() => onDelete(current)}
          canGoLeft={current > 0}
          canGoRight={current < urls.length - 1}
          goLeft={() => setCurrent((c) => c - 1)}
          goRight={() => setCurrent((c) => c + 1)}
        />

        {isVideo ? (
          <video
            src={currentUrl}
            controls
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        ) : (
          <img
            src={currentUrl}
            alt={`media-${current}`}
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  );
}

function ControlButtons({
  onClose,
  onDelete,
  canGoLeft,
  canGoRight,
  goLeft,
  goRight,
}: {
  onClose: () => void;
  onDelete: () => void;
  canGoLeft: boolean;
  canGoRight: boolean;
  goLeft: () => void;
  goRight: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="cursor-pointer absolute top-2 right-2 text-white p-1 bg-black/50 rounded-full z-30"
      >
        <X size={24} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="cursor-pointer flex gap-2 bg-red-500/70 absolute top-2 left-2 text-red-300 py-1 px-3 rounded-full z-30"
      >
        <Trash2 size={24} />
        <span>حذف</span>
      </button>

      {canGoLeft && (
        <button
          type="button"
          onClick={goLeft}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 text-white p-1 bg-black/30 rounded-full"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {canGoRight && (
        <button
          type="button"
          onClick={goRight}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-white p-1 bg-black/30 rounded-full"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </>
  );
}
