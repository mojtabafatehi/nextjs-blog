import Image from "next/image";
import Link from "next/link";
import MetaItem from "./MetaItem";
import { IArchiveItemProps } from "./ListArchiveItem";

export default function ArchiveItem({
  archive,
}: {
  archive: IArchiveItemProps;
}) {
  const shownReciters = archive.reciters
    .slice(0, 2)
    .map((r) => r.full_name)
    .join("، ");
  const recitersText =
    archive.reciters.length > 2 ? `${shownReciters} و ...` : shownReciters;

  return (
    <div className="relative bg-gray-600 rounded-2xl shadow-2xl overflow-hidden pb-12">
      <Link href={`/archives/${archive.slug}`}>
        <Image
          src={archive.cover_image_url}
          alt={archive.title}
          width={400}
          height={200}
          className="w-full h-[150px] object-cover rounded-t"
        />
      </Link>

      <div className="px-4 py-3">
        <h3 className="text-lg font-bold mb-1 border-2 rounded-2xl text-center text-amber-400">
          {archive.title}
        </h3>

        {archive.speakers.length > 0 && (
          <MetaItem
            label="سخنران"
            value={archive.speakers.map((s) => s.full_name).join("، ")}
          />
        )}

        {archive.reciters.length > 0 && (
          <MetaItem label="مداحان" value={recitersText} />
        )}

        <MetaItem label="مکان مراسم" value={archive.location} />
        <MetaItem
          label="تاریخ مراسم"
          value={new Date(archive.event_date).toLocaleDateString("fa-IR")}
        />
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] rounded-2xl bg-gray-700 hover:bg-gray-800 text-center">
        <Link
          href={`/archives/${archive.slug}`}
          className="block text-red-500 p-2"
        >
          مشاهده کامل آرشیو
        </Link>
      </div>
    </div>
  );
}
