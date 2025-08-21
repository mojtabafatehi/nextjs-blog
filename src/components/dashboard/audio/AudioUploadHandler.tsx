// components/audio/AudioUploadHandler.tsx
"use client";

interface AudioUploadHandlerProps {
  progress: number;
  onDelete: () => void;
  audioUrl?: string;
}

export function AudioUploadHandler({
  progress,
  onDelete,
  audioUrl,
}: AudioUploadHandlerProps) {
  return (
    <div className="flex flex-col gap-2">
      {/*<div className="w-full bg-blue-500 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      */}
    </div>
  );
}
