import { ArchiveFormData } from "@/app/actions/createArchive";

export const prepareData = (
  data: any,
  getValues: any,
  submitType: string | null
): ArchiveFormData => {
  const images = getValues("media.images")?.map((m: any) => m.url) || [];
  const videos = getValues("media.videos")?.map((m: any) => m.url) || [];

  const audios = (data.audios || []).map((a: any) => ({
    url: a.audioUrl,
    title: a.title || "",
    artist: a.artist || null,
  }));

  const status = data?.status || submitType || "draft";

  return {
    title: data.title,
    summary: data.summary || "",
    description: data.description || "",
    date: data.date || null,
    location: data.location || "",
    status,
    slug: data.slug,
    cover_image_url: images[0] || "",
    audios,
    images,
    videos,
  };
};
