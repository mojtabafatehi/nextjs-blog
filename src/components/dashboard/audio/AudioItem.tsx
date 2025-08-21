"use client";

import { Trash2 } from "lucide-react";
import AudioPlayerWrapper from "./AudioPlayerWrapper";
import SearchableSelect from "../UI/Select";
import { useFormContext, Controller } from "react-hook-form";
import { deleteAudio } from "@/app/actions/AudioAction";

interface Person {
  id: number;
  full_name: string;
}
interface Props {
  index: number;
  field: any;
  onRemove: (index: number) => void;
  persons: Person[];
  isUploading: boolean;
}

export default function AudioItem({
  index,
  field,
  onRemove,
  persons,
  isUploading,
}: Props) {
  const { control, register, setValue } = useFormContext();
  const handleDelete = async () => {
    if (field.audioUrl) await deleteAudio(field.audioUrl);
    onRemove(index);
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-2 border border-gray-600 rounded-lg bg-gray-800 items-center w-full">
      {/* حذف صوت */}
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-full bg-red-300 cursor-pointer p-2 text-red-600 hover:bg-red-400 hover:text-red-700"
          disabled={isUploading}
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* عنوان صوت */}
      <div className="col-span-4">
        <Controller
          name={`audios.${index}.title`}
          control={control}
          defaultValue={field.title || ""}
          rules={{ required: "عنوان صوت نمی‌تواند خالی باشد." }}
          render={({ field: ctrl, fieldState: { error } }) => (
            <div className="w-full space-y-1">
              <label
                htmlFor={`audio-title-${index}`}
                className="block text-xs font-medium dark:text-white"
              >
                عنوان صوت
              </label>
              <input
                {...ctrl}
                id={`audio-title-${index}`}
                type="text"
                placeholder="مثال: روضه حضرت علی اکبر"
                className={`w-full rounded-lg text-sm border ${
                  error ? "border-red-500" : "border-gray-400"
                } outline-none transition focus:border-red-600 px-5 py-1.5 placeholder:text-gray-400 bg-gray-600 text-white`}
                disabled={isUploading}
              />
              {error && <p className="text-red-400 text-xs">{error.message}</p>}
            </div>
          )}
        />
      </div>

      {/* پلیر صوت */}
      <div className="col-span-4">
        <label className="mb-1 text-xs font-medium text-white block">
          {field.isUploading ? "در حال آپلود..." : "پخش صوت"}
        </label>
        <AudioPlayerWrapper
          audioUrl={field.audioUrl}
          file={field.file}
          index={index}
          isUploading={field.isUploading}
          onUploadComplete={(url) => {
            setValue(`audios.${index}.audioUrl`, url);
            setValue(`audios.${index}.isUploading`, false);
          }}
        />
      </div>

      {/* صاحب اثر */}
      <div className="col-span-3">
        <Controller
          name={`audios.${index}.artist`}
          control={control}
          defaultValue={field.artist || ""}
          rules={{ required: "صاحب اثر را انتخاب کنید." }}
          render={({ field: ctrl, fieldState: { error } }) => (
            <div className="space-y-1">
              <SearchableSelect
                {...ctrl}
                label="صاحب اثر"
                control={control}
                id={`audios.${index}.artist`}
                options={persons}
                placeholder="جستجوی نام فرد"
                disabled={isUploading}
              />
              {error && <p className="text-red-400 text-xs">{error.message}</p>}
            </div>
          )}
        />
      </div>

      <input type="hidden" {...register(`audios.${index}.file`)} />
      <input type="hidden" {...register(`audios.${index}.audioUrl`)} />
    </div>
  );
}
