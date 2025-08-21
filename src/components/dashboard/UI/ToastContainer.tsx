// 📁 components/ui/ToastContainer.tsx
"use client";

import Toast from "./Toast";
import { useToast } from "@/hooks/useToast";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-50">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          id={t.id}
          message={t.message}
          type={t.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
