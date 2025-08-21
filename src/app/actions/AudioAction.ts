"use server";

import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

type UploadResult = {
  success: boolean;
  urls: string[];
  message: string;
};

type DeleteResult = {
  success: boolean;
  message: string;
};

export async function uploadAudio(formData: FormData): Promise<UploadResult> {
  try {
    const folder = formData.get("folder") as string;
    const archiveTitle = formData.get("archiveTitle") as string;
    const artistName = formData.get("artistName") as string;
    const audioTitle = formData.get("audioTitle") as string;

    if (!folder || !archiveTitle || !artistName || !audioTitle) {
      throw new Error("Missing metadata for filename generation");
    }

    const files = formData.getAll("files") as File[];
    if (!files.length) {
      return { success: false, urls: [], message: "No files" };
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    // تابع پاک‌سازی رشته: حروف فارسی (U+0600-06FF)، حروف انگلیسی، اعداد و خط تیره مجاز
    const clean = (s: string) =>
      s
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FF\w\-]+/g, "");

    for (const file of files) {
      const ext = path.extname(file.name) || ".bin";
      const base = `${clean(archiveTitle)}-${clean(artistName)}`;
      const filename = `${base}-${clean(audioTitle)}${ext}`;
      const filePath = path.join(uploadDir, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      urls.push(`/uploads/${folder}/${filename}`);
    }

    return { success: true, urls, message: "Uploaded" };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      urls: [],
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function deleteAudio(fileUrl: string): Promise<DeleteResult> {
  try {
    // اطمینان از معتبر بودن URL
    if (!fileUrl.startsWith("/uploads/")) {
      throw new Error("Invalid file URL");
    }
    // مسیر روی دیسک
    const relativePath = fileUrl.replace(/^\//, ""); // حذف اسلش ابتدای مسیر
    const filePath = path.join(process.cwd(), "public", relativePath);

    // پاک کردن فایل
    await unlink(filePath);

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown error occurred during deletion",
    };
  }
}
