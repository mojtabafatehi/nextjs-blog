import { useState, useCallback } from "react";

export function useConfirmModal() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onValid = useCallback(() => {
    setConfirmOpen(true);
  }, []);

  return {
    confirmOpen,
    setConfirmOpen,
    onValid,
  };
}