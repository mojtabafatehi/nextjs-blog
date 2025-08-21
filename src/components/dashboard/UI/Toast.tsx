"use client";

import { useEffect, useState } from "react";
import { CircleX, TriangleAlert } from "lucide-react";

interface ToastProps {
  id: string;
  message: string;
  type?: "warning" | "success" | "error";
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({
  id,
  message,
  type = "warning",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // فعال‌سازی انیمیشن
    setShow(true);

    // حذف بعد از مدت زمان مشخص‌شده
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => onClose(id), 300); // صبر کن تا انیمیشن خروج اجرا شه
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const bg =
    type === "warning"
      ? "bg-yellow-200"
      : type === "error"
      ? "bg-red-400"
      : "bg-green-400";

  return (
    <div
      className={`
        ${bg} text-gray-900 px-6 py-2 rounded shadow-lg
        flex items-center gap-6 justify-between mb-2 w-full max-w-sm transition-all duration-300
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="flex items-center gap-2">
        <TriangleAlert size={16} />
        <span className="text-center">{message}</span>
      </div>
      <button onClick={() => onClose(id)} className="font-bold cursor-pointer">
        <CircleX color="red" />
      </button>
    </div>
  );
}
