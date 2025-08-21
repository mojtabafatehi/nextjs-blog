// 📁 components/audio/AudioPlayerWrapper.tsx
"use client";

import { useEffect } from "react";
import { useAudioPlayer } from "./useAudioPlayer";
import { AudioControls } from "./AudioControls";

interface AudioPlayerWrapperProps {
  audioUrl?: string;
}

export default function AudioPlayerWrapper({
  audioUrl,
}: AudioPlayerWrapperProps) {
  const {
    audioRef,
    isPlaying,
    togglePlay,
    duration,
    currentTime,
    handleSeek,
    setAudioUrl,
  } = useAudioPlayer(audioUrl);

  useEffect(() => {
    if (audioUrl) setAudioUrl(audioUrl);
  }, [audioUrl]);

  return (
    <div className="w-full">
      <AudioControls
        isPlaying={isPlaying}
        onPlayPause={togglePlay}
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        className="hidden"
      />
    </div>
  );
}
