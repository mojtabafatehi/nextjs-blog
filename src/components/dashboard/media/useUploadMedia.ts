import { useState, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  UploadMedia as uploadMediaAction,
  DeleteMedia as deleteMediaAction,
} from "@/app/actions/MediaAction";

export function useUploadMedia(type: "images" | "videos") {
  const inputRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `media.${type}`,
  });

  const [uploading, setUploading] = useState(false);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);

  const urls = fields.map((f) => f.url as string);

  const handleAddClick = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    const form = new FormData();
    form.append("folder", type);
    files.forEach((f) => form.append("files", f));

    const result = await uploadMediaAction(form);
    if (result.success) {
      result.urls.forEach((url) => append({ url, isUploading: false }));
    } else {
      console.error("UploadMedia:", result.message);
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (idx: number) => {
    await deleteMediaAction(urls[idx]);
    remove(idx);
    setViewerIdx(null);
  };

  const handleRemoveItem = async (index: number) => {
    const url = fields[index]?.url;
    if (url) await deleteMediaAction(url);
    remove(index);
  };

  const handleRemove = async (index: number, closeModal?: boolean) => {
    const url = fields[index]?.url;
    if (url) await deleteMediaAction(url);
    remove(index);
    if (closeModal) setViewerIdx(null);
  };

  return {
    inputRef,
    fields,
    uploading,
    viewerIdx,
    setViewerIdx,
    handleAddClick,
    handleFileChange,
    handleDelete,
    urls,
    handleRemoveItem,
    handleRemove,
  };
}
