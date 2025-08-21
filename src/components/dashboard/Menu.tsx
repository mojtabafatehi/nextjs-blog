"use client";
import {
  CircleChevronDown,
  CircleChevronLeft,
  FilePlus,
  FolderPlus,
  LayoutDashboardIcon,
  ListChecks,
  MessageCircleMore,
  PlusSquare,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    href: "/dashboard",
    title: "داشبورد",
    icon: <LayoutDashboardIcon className="w-5 h-5" />,
  },
  {
    title: "مدیریت آرشیوها",
    icon: <FolderPlus className="w-5 h-5" />,
    children: [
      {
        href: "/dashboard/archives/create",
        title: "ایجاد آرشیو",
        icon: <PlusSquare className="w-4 h-4" />,
      },
      {
        href: "/dashboard/archives",
        title: "ویرایش آرشیوها",
        icon: <ListChecks className="w-4 h-4" />,
      },
      {
        href: "/dashboard/archives/persons",
        title: "مدیریت مداحان و سخنرانان",
        icon: <PlusSquare className="w-4 h-4" />,
      },
    ],
  },
  {
    href: "/dashboard/posts",
    title: "مدیریت پست ها",
    icon: <FilePlus className="w-5 h-5" />,
  },

  {
    href: "/dashboard/comments",
    title: "مدیریت نظرات",
    icon: <MessageCircleMore className="w-5 h-5" />,
  },
  {
    href: "/dashboard/settings",
    title: "تنظیمات",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function Menu({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className={`flex flex-col ${isOpen ? "px-1" : "px-2"}`}>
      {links.map((link) => {
        // اگر منوی اصلی لینک ساده بود
        if (!link.children) {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 hover:text-amber-300 transition-colors py-4 ${
                pathname === link.href ? "text-amber-400" : "text-white"
              }`}
            >
              <span className="w-6 flex justify-center">{link.icon}</span>
              {isOpen && (
                <span className="flex-1 text-center text-sm">{link.title}</span>
              )}
            </Link>
          );
        }

        // اگر زیرمنو داشت
        const isOpenDropdown = openDropdown === link.title;

        return (
          <div key={link.title} className="flex flex-col">
            <button
              onClick={() =>
                setOpenDropdown(isOpenDropdown ? null : link.title)
              }
              className={`flex items-center gap-4 w-full hover:text-amber-300 py-4 transition-colors ${
                isOpenDropdown ? "text-amber-400" : "text-white"
              }`}
            >
              <span className="w-6 flex justify-center">{link.icon}</span>
              {isOpen && (
                <span className="flex-1 text-center text-sm">{link.title}</span>
              )}
              <span className="w-6 flex justify-center transition-all">
                {isOpenDropdown ? (
                  <CircleChevronDown size={16} />
                ) : (
                  <CircleChevronLeft size={16} />
                )}
              </span>
            </button>

            {isOpenDropdown &&
              isOpen &&
              link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`ml-4 flex items-center gap-2 text-sm py-2 transition-colors ${
                    pathname === child.href
                      ? "text-amber-400"
                      : "text-gray-300 hover:text-amber-300"
                  }`}
                >
                  <span className="w-4">{child.icon}</span>
                  {child.title}
                </Link>
              ))}
          </div>
        );
      })}
    </div>
  );
}
