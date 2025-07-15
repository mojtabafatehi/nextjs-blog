"use client";

import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import toPersianDigits from "@/utils/number";

interface ISlide {
  id: number;
  image_url: string;
  link_url: string;
  alt: string;
}

export default function HomeSlider() {
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const getSlides = async () => {
      const res = await fetch("/api/sliders");
      const data = await res.json();
      setSlides(data);
    };
    getSlides();
  }, []);

  return (
    <div className="h-80 w-full relative group">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-full w-full relative">
              <a href={slide.link_url}>
                <Image
                  src={slide.image_url}
                  alt={slide.alt}
                  className="rounded-xl object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 950px"
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ناوبر سفارشی */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-black/30 rounded-full px-4 py-2 backdrop-blur-lg">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="text-white hover:text-amber-400 transition-colors"
        >
          &lt;
        </button>

        <span className="text-white text-sm">
          {toPersianDigits(activeIndex + 1)}/{toPersianDigits(slides.length)}
        </span>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="text-white hover:text-amber-400 transition-colors"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
