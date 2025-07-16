"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    href: "/",
    title: " صفحه اصلی ",
  },
  {
    href: "archives",
    title: " آرشیو مراسمات ",
  },
  {
    href: "archives/tazye",
    title: "آرشیو تعزیه ",
  },
  {
    href: "contact",
    title: "تماس باما (انتقادات و پیشنهادات)",
  },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-8">
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
    </div>
  );
}
