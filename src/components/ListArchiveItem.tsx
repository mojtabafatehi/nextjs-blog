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
  const res = await fetch("http://localhost:3000/api/archives", {
    cache: "no-store",
  });

  const data = (await res.json()) as IArchiveItemProps[];

  return (
    <div className="flex justify-between gap-4 my-5">
      {data.slice(0, 4).map((archive) => (
        <ArchiveItem key={archive.id} archive={archive} />
      ))}
    </div>
  );
}
