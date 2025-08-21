"use server";

import { prisma } from "@/lib/prisma";

export type ArchiveFormData = {
  title: string;
  description?: string;
  date?: string; // ISO string
  location?: string;
  status: "draft" | "published";
  slug: string;
  images?: string[];
  videos?: string[];
  audios?: { url: string; title?: string; artist?: number }[];
};

export async function createArchive(data: ArchiveFormData) {
  console.log(data);
  console.log(data.audios);
  try {
    const archive = await prisma.archive.create({
      data: {
        title: data.title,
        description: data.description || "",
        event_date: data.date ? new Date(data.date) : null,
        location: data.location || "",
        status: data.status,
        slug: data.slug,
        cover_image_url: (data.images && data.images[0]) || "",
        audios: {
          create:
            data.audios?.map((audio) => ({
              url: audio.url,
              title: audio.title || "",
              artist_id: audio.artist || null,
            })) || [],
        },
        images: {
          create: data.images?.map((url) => ({ url })) || [],
        },
        videos: {
          create: data.videos?.map((url) => ({ url, title: "" })) || [],
        },
        participants: {
          create:
            data.audios
              ?.filter((a) => a.artist)
              .map((a) => ({
                person_id: a.artist!,
              })) || [],
        },
      },
    });

    return archive.id;
  } catch (err) {
    console.log(data);
    console.log(data.audios);
    console.error("❌ Prisma createArchive error:", err);
    throw err;
  }
}
