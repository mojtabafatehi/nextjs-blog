import { getArchives } from "@/app/actions/listArchive";
import ArchiveItem from "./ArchiveItem";

export interface IPerson {
  id: number;
  full_name: string;
  role: "reciter" | "speaker";
  avatar_url: string | null;
}

export interface IArchiveItemProps {
  id: number;
  title: string;
  summary: string;
  description: string;
  location: string;
  status: string;
  slug: string;
  cover_image_url: string;
  event_date: string;
  reciters: IPerson[];
  speakers: IPerson[];
}

export default async function ListArchiveItem() {
  const result = await getArchives();
  const archives = result.data as IArchiveItemProps[];

  return (
    <div className="flex justify-between gap-4 my-5">
      {archives.slice(0, 4).map((archive) => (
        <ArchiveItem key={archive.id} archive={archive} />
      ))}
    </div>
  );
}
