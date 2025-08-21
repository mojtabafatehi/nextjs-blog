// 📁 hooks/useToast.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface ToastItem {
  id: string;
  message: string;
  type?: "warning" | "success" | "error";
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (msg: string, type?: ToastItem["type"]) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: ToastItem["type"] = "warning") => {
    const id = uuid();
    setToasts((t) => [...t, { id, message, type }]);
  };

  const removeToast = (id: string) =>
    setToasts((t) => t.filter((x) => x.id !== id));

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}
