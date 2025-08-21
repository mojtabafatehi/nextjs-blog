"use client";

import { FormProvider } from "react-hook-form";
import { useEffect } from "react";
import useArchiveForm from "@/hooks/useArchiveForm";
import BasicInfoSection from "./archiveForm/BasicInfoSection";
import ContentSection from "./archiveForm/ContentSection";
import FooterSection from "./archiveForm/FooterSection";
import SuccessModal from "./ui/SuccessModal";

export interface Person {
  id: number;
  full_name: string;
  role: PersonRole;
  avatar_url: string | null;
  created_at: string;
}

export default function FormComponent({ persons }: { persons: Person[] }) {
  const methods = useArchiveForm(persons);
  const {
    register,
    handleSubmit,
    onConfirmSubmit,
    newArchiveId,
    resetArchive,
    watch,
    setValue,
    artist,
    onError,
  } = methods as any;
  useEffect(() => {
    register("media.images", {
      validate: (v: any[]) =>
        (Array.isArray(v) && v.length > 0) || "حداقل یک تصویر باید آپلود شود.",
    });
  }, [register]);

  // auto-slug generation
  const titleValue = watch("title");
  useEffect(() => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FF\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
      setValue("slug", slug);
    }
  }, [titleValue, setValue]);

  return (
    <FormProvider {...methods}>
      <h3 className="text-center font-bold">ایجاد یک آرشیو جدید</h3>

      <form
        id="archive-form"
        onSubmit={handleSubmit(onConfirmSubmit, onError)}
        style={{ display: "grid", flexDirection: "column", gap: "1rem" }}
        className="bg-gray-800 px-12 py-6 rounded-4xl m-2"
      >
        <BasicInfoSection />
        <ContentSection persons={artist.data} />
        <FooterSection />
      </form>

      {newArchiveId && (
        <SuccessModal archiveId={newArchiveId} onClose={resetArchive} />
      )}
    </FormProvider>
  );
}
