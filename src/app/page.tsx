import Container from "@/components/Container";
import ListArchiveItem from "@/components/ListArchiveItem";
import NextCeremony from "@/components/NextCeremony";
import HomeSlider from "@/components/Slider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="my-15">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-9 h-80 order-1  md:order-none">
            <HomeSlider />
          </div>

          <div className="md:col-span-3 h-80 order-2 md:order-none">
            <NextCeremony />
          </div>
        </div>
        <div className="mt-20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-100">
              آخرین مراسمات برگزار شده
            </h3>

            <div className="flex-1 border-t border-gray-300 mx-4" />

            <Link href="/archives">
              <button className="text-sm p-2 rounded-xl bg-blue-700 text-gray-200 hover:text-white cursor-pointer transition">
                مشاهده همه مراسمات
              </button>
            </Link>
          </div>

          <ListArchiveItem />
        </div>
        home
      </Container>
    </div>
  );
}
