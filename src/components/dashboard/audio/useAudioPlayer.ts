"use client";
import { useState, useRef, useEffect } from "react";

export function useAudioPlayer(initialUrl?: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(initialUrl);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateData = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateData);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadedmetadata", updateData);

    return () => {
      audio.removeEventListener("timeupdate", updateData);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadedmetadata", updateData);
    };
  }, [audioUrl]);

  return {
    audioRef,
    isPlaying,
    togglePlay,
    duration,
    currentTime,
    handleSeek,
    setAudioUrl,
  };
}
