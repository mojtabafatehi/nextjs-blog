"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu as MenuIcon, X } from "lucide-react";
import Menu from "./Menu";

export default function SidebarAdmin() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-900 shadow-lg p-4 flex flex-col space-y-4 ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <button
        className="self-end mb-2 text-amber-400"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X /> : <MenuIcon />}
      </button>

      {/* Logo + Title */}
      <div className="flex flex-col items-center">
        <Image
          src="/Logo.webp"
          alt="هیئت مسلم بن عقیل"
          width={isOpen ? 100 : 40}
          height={isOpen ? 100 : 40}
        />
        {isOpen && (
          <span className="text-sm text-amber-500 py-4">
            پنل مدیریتی سایت
          </span>
        )}
      </div>

      {/* Menu */}
      <div className="p-4 flex flex-col space-y-4 items-center">
        <Menu isOpen={isOpen} />
      </div>
    </div>
  );
}
