"use client";
import { Play, Pause } from "lucide-react";

interface AudioControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  onPlayPause: () => void;
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export function AudioControls({
  isPlaying,
  onPlayPause,
  duration,
  currentTime,
  onSeek,
}: AudioControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  return (
    <div className="flex items-center gap-3 w-full bg-gray-600 p-1 rounded-4xl">
      <button
        type="button"
        onClick={onPlayPause}
        className="cursor-pointer p-1.5 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <span className="text-xs w-7 text-gray-200">
        {formatTime(currentTime)}
      </span>
      <div
        onClick={handleProgressClick}
        className="flex-1 h-3 bg-gray-200 rounded-full cursor-pointer relative min-w-[150px]"
      >
        <div
          className="absolute top-0 left-0 h-full bg-amber-500 rounded-full"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>
      <span className="text-xs w-10 text-gray-200">{formatTime(duration)}</span>
    </div>
  );
}
