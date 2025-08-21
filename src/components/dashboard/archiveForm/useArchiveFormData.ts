import { useForm } from "react-hook-form";
import { ArchiveFormData } from "@/app/actions/createArchive";

export function useArchiveFormData(persons: any[] = []) {
  const methods = useForm<ArchiveFormData>({
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      date: "",
      location: "حسینیه بیت المسلم",
      status: "draft",
      slug: "",
      media: { images: [], videos: [] },
      audios: [],
      images: [],
      videos: [],
    },
    mode: "onSubmit",
  });

  const resetArchive = () => {
    methods.reset();
  };

  return {
    ...methods, // handleSubmit, register, setValue, getValues, reset, ...
    resetArchive,
    artist: persons,
  };
}
