"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import SearchItem from "./Search";
import Image from "next/image";
import { UserPenIcon } from "lucide-react";

const links = [
  {
    href: "/",
    title: " صفحه اصلی ",
  },
  {
    href: "archiv",
    title: " آرشیو مراسمات ",
  },
  {
    href: "tazye",
    title: "آرشیو تعزیه ",
  },
  {
    href: "contact",
    title: "تماس باما (انتقادات و پیشنهادات)",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full px-4">
      <div>
        <Image
          src="/Logo.webp"
          alt="هیئت مسلم بن عقیل"
          width={100}
          height={100}
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-7 text-sm">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-red-500 transition-colors ${
                pathname === item.href ? "text-red-500" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}

          <span className="bg-yellow-400 text-black px-3  rounded-md text-sm font-semibold transition-transform hover:scale-105 hover:shadow-md cursor-pointer">
            پرداخت نذورات
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchItem />
        <button className="text-sm border px-3 py-1 rounded-md flex gap-2 cursor-pointer">
          <span>ورود مدیر</span>
          <UserPenIcon size={18} />
        </button>
        <Image
          src="/Logo.webp"
          alt="حسینیه بیت الحسین"
          width={100}
          height={100}
        />
      </div>
    </nav>
  );
}
