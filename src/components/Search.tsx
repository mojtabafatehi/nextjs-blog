"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchItem() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // بستن با کلیک بیرون از modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="cursor-pointer hover:bg-gray-600 rounded-full p-2">
        <Search size={20} strokeWidth={1} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          {/* MODAL BOX */}
          <div
            ref={modalRef}
            className="relative w-[80%] max-w-2xl bg-white rounded-xl shadow-xl p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 left-3 text-gray-500 hover:text-black cursor-pointer bg-red-300 rounded-full p-1"
            >
              <X size={20} color="red" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center text-gray-500">
              نام مراسم ، مداح یا سخنران مورد نظر را وارد کنید
            </h2>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="مثال: شب تاسوعا"
                className="flex-1 border text-black border-gray-400 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                جستجو
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
