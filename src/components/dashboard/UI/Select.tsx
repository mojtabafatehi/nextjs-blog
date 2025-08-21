"use client";
import { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

interface Person {
  id: number;
  full_name: string;
}

interface SearchableSelectProps {
  control: any;
  id: string;
  label: string;
  options: Person[];
  placeholder: string;
}

export default function SearchableSelect({
  control,
  id,
  label,
  options,
  placeholder,
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // فیلتر کردن گزینه‌ها بر اساس جستجو
  const filteredOptions = options.filter((person) =>
    person.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // بستن dropdown وقتی کلیک خارج از آن انجام می‌شود
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="" ref={wrapperRef}>
      <div className="flex justify-between mx-2 items-center">
        <label
          htmlFor={id}
          className="block text-xs font-medium dark:text-white"
        >
          {label}
        </label>

        <a
          href="#"
          className="block text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 mb-1 rounded-4xl"
        >
          افزودن مداح/سخنران
        </a>
      </div>

      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <div className="relative">
            {/* فیلد جستجو */}
            <input
              type="text"
              placeholder={placeholder}
              className="w-full rounded-lg text-sm border-1 border-gray-400 outline-none transition focus:border-red-600 px-5 py-1.5 placeholder:text-gray-400 bg-gray-600 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />

            {/* dropdown */}
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-gray-400 rounded-md border text-gray-50 border-gray-300 max-h-60 overflow-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((person) => (
                    <div
                      key={person.id}
                      className="p-2 hover:bg-amber-400 cursor-pointer"
                      onClick={() => {
                        field.onChange(person.id);
                        setSearchTerm(person.full_name);
                        setIsOpen(false);
                      }}
                    >
                      {person.full_name}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">نتیجه‌ای یافت نشد</div>
                )}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
