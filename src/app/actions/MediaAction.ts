// 📁 app/actions/MediaAction.ts
"use server";

import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export type UploadResult = {
  success: boolean;
  urls: string[];
  message: string;
};

export type DeleteResult = {
  success: boolean;
  message: string;
};

export async function UploadMedia(formData: FormData): Promise<UploadResult> {
  try {
    const folder = formData.get("folder");
    if (typeof folder !== "string" || !folder.trim()) {
      throw new Error("Folder must be a non-empty string");
    }

    const files = formData.getAll("files") as File[];
    if (!files.length) {
      return { success: false, urls: [], message: "No files provided" };
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];
    for (const file of files) {
      const ext = path.extname(file.name) || ".bin";
      const name = `${randomUUID()}${ext}`;
      const filePath = path.join(uploadDir, name);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      urls.push(`/uploads/${folder}/${name}`);
    }

    return { success: true, urls, message: "Files uploaded successfully" };
  } catch (err) {
    console.error("UploadMedia error:", err);
    return {
      success: false,
      urls: [],
      message: err instanceof Error ? err.message : "Unknown upload error",
    };
  }
}

export async function DeleteMedia(fileUrl: string): Promise<DeleteResult> {
  try {
    if (!fileUrl.startsWith("/uploads/")) {
      throw new Error("Invalid file URL");
    }
    // تبدیل URL به مسیر فایل روی دیسک
    const relative = fileUrl.replace(/^\//, ""); // حذف / ابتدای مسیر
    const filePath = path.join(process.cwd(), "public", relative);

    await unlink(filePath);
    return { success: true, message: "File deleted successfully" };
  } catch (err) {
    console.error("DeleteMedia error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unknown delete error",
    };
  }
}
