// 📁 components/audio/useUploadAudio.ts
import { useEffect, useRef, useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { uploadAudio } from "@/app/actions/AudioAction";
import { useToast } from "@/hooks/useToast";

export function useUploadAudio(persons: { id: number; full_name: string }[]) {
  const audioInputRef = useRef<HTMLInputElement>(null);
  const { getValues, control, register, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "audios" });
  const audios = useWatch({ control, name: "audios" }) || [];
  const [uploading, setUploading] = useState<Record<number, number>>({});
  const [timerStarted, setTimerStarted] = useState<Record<number, boolean>>({});
  const { addToast } = useToast();

  useEffect(() => {
    if (!Array.isArray(audios) || audios.length === 0) return;

    const newTimers: NodeJS.Timeout[] = [];

    audios.forEach((audio, idx) => {
      const hasArtist = !!audio.artist;
      const alreadyStarted = timerStarted[idx];
      const notUploading = !audio.isUploading;
      const hasFile = !!audio.file;
      const hasTitle = !!audio.title;

      if (hasArtist && notUploading && hasFile && !alreadyStarted && hasTitle) {
        setTimerStarted((prev) => ({ ...prev, [idx]: true }));

        const timeout = setTimeout(() => {
          startUpload(idx);
        }, 10_000);

        newTimers.push(timeout);
      }
    });

    return () => {
      newTimers.forEach(clearTimeout);
    };
  }, [audios]);

  const startUpload = async (index: number) => {
    const archiveTitle = getValues("title");
    if (!archiveTitle) {
      addToast("ابتدا عنوان آرشیو را وارد کنید.", "warning");
      return;
    }

    const file: File = getValues(`audios.${index}.file`);
    if (!file) return;

    const artistId = getValues(`audios.${index}.artist`);
    const artistObj = persons.find((p) => p.id === artistId);
    const artistName = artistObj?.full_name || "";
    const audioTitle = getValues(`audios.${index}.title`) || "";

    setValue(`audios.${index}.isUploading`, true);
    let prog = 0;
    const iv = setInterval(() => {
      prog = Math.min(prog + 10, 90);
      setUploading((u) => ({ ...u, [index]: prog }));
    }, 300);

    const fd = new FormData();
    fd.append("folder", "audios");
    fd.append("files", file);
    fd.append("archiveTitle", archiveTitle);
    fd.append("artistName", artistName);
    fd.append("audioTitle", audioTitle);

    const res = await uploadAudio(fd);
    clearInterval(iv);

    if (res.success && res.urls.length > 0) {
      const finalUrl = res.urls[0];

      setUploading((u) => ({ ...u, [index]: 100 }));
      setValue(`audios.${index}.audioUrl`, finalUrl);
      console.log(`✅ audio uploaded: [${index}] =>`, finalUrl); // 🟢 این لاگ مهمه
    } else {
      addToast("آپلود صوت با خطا مواجه شد.", "error");
    }
    setValue(`audios.${index}.isUploading`, false);
  };

  const handleAddClick = () => {
    const archiveTitle = getValues("title");
    if (!archiveTitle) {
      addToast("ابتدا عنوان آرشیو را وارد کنید.", "warning");
      return;
    }

    if (fields.length > 0) {
      const last = fields.length - 1;
      const title = getValues(`audios.${last}.title`);
      const artist = getValues(`audios.${last}.artist`);
      if (!title || !artist) {
        addToast(
          "ابتدا عنوان و صاحب اثر را برای صوت قبلی مشخص کنید.",
          "warning"
        );
        return;
      }
      startUpload(last);
    }
    audioInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      append({
        title: "",
        artist: undefined,
        audioUrl: URL.createObjectURL(file),
        isUploading: false,
        file,
      });
    });
    if (audioInputRef.current) audioInputRef.current.value = "";
  };

  return {
    control,
    register,
    setValue,
    fields,
    remove,
    audioInputRef,
    handleAddClick,
    handleFileUpload,
    uploading,
  };
}
