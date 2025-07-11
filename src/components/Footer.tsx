import Image from "next/image";
import Container from "./Container";
import MapIR from "./MapIR";
import toPersianDigits from "@/utils/number";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <Container>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 space-y-4 text-center">
            <div>
              <Image
                src="/Logo.webp"
                alt="هیئت مسلم ابن عقیل"
                width={150}
                height={150}
                className="mx-auto my-2"
              />
              <h1 className="text-xl font-bold text-amber-400">
                هیئت مسلم ابن عقیل (ع)
              </h1>
            </div>
            <p className="text-gray-300 text-sm">
              هیئت مذهبی مسلم ابن عقیل (ع) فعالیت‌های مذهبی، فرهنگی و اجتماعی
              <br />
              <span className="block mt-4 text-xs">
                آدرس: اصفهان - شهرستان جرقویه - روستای پیکان
              </span>
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 space-y-2">
            <h3 className="text-lg font-semibold border-b pb-2 border-amber-500">
              آدرس‌ها
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MapIR
                lat={32.259095}
                lng={52.172884}
                zoom={16}
                markerText="هیئت مسلم ابن عقیل"
                className="h-full min-h-40"
              />
              <MapIR
                lat={32.25877}
                lng={52.174917}
                zoom={16}
                markerText="حسینیه بیت الحسین"
                className="h-full min-h-40"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 border-amber-500">
              شبکه های اجتماعی و حمایت
            </h3>
            <span className="bg-yellow-400 text-black px-3 rounded-md text-sm font-semibold transition-transform hover:scale-105 hover:shadow-md cursor-pointer">
              پرداخت نذورات
            </span>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-2 pt-2 text-center text-gray-400 text-xs">
          <p>
            © {toPersianDigits(1405)} کلیه حقوق برای هیئت مسلم ابن عقیل محفوظ
            است
          </p>
        </div>
      </Container>
    </footer>
  );
}
