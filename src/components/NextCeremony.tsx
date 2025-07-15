"use client";

import { useState } from "react";
import Image from "next/image";

export default function NextCeremony() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className="relative rounded-2xl h-80 overflow-hidden cursor-pointer"
        onClick={toggleModal}
      >
        <div className="absolute inset-0">
          <Image
            src="/uploads/next.jpg"
            alt="مراسم آینده"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            quality={80}
          />
        </div>

        <div className="absolute inset-x-0 top-0 bg-gray-600/70 backdrop-blur-sm py-2 rounded-t-2xl">
          <h6 className="text-yellow-400 text-center font-bold">مراسم آینده</h6>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={toggleModal}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src="/uploads/next.jpg"
              alt="مراسم آینده - نمایش بزرگ"
              fill
              className="object-contain"
              quality={100}
            />

            <button
              className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleModal();
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
