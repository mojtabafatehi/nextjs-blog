"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CustomSlider({
  slides = [],
  showArrows = true,
  showPagination = true,
  titlePosition = "bottom",
  autoPlay = true,
  autoPlayInterval = 5000,
  slideClass = "",
  arrowClass = "bg-white/30 backdrop-blur-sm",
  paginationClass = "bg-black/50 backdrop-blur-sm",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isHovered, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) nextSlide();
    if (deltaX < -50) prevSlide();
  };

  const getTitlePositionClass = () => {
    switch (titlePosition) {
      case "top":
        return "items-start pt-8";
      case "center":
        return "items-center";
      case "bottom":
      default:
        return "items-end pb-8";
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
        <p>تصویری برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* اسلایدها */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full flex-shrink-0 relative ${slideClass}`}
          >
            <Image
              src={slide.image}
              alt={slide.title || "اسلاید"}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
            {slide.title && (
              <div
                className={`absolute inset-x-0 flex justify-center ${getTitlePositionClass()}`}
              >
                <h2 className="text-white text-2xl font-bold bg-black/40 px-4 py-2 rounded-lg">
                  {slide.title}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* فلش‌های ناوبری */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition ${arrowClass}`}
            aria-label="اسلاید قبلی"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition ${arrowClass}`}
            aria-label="اسلاید بعدی"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* پاگینیشن */}
      {showPagination && (
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 ${paginationClass} px-3 py-1 rounded-full`}
        >
          <span className="text-white text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`برو به اسلاید ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
