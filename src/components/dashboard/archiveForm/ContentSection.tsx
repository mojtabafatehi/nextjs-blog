import UploadAudio from "../audio/UploadAudio";
import UploadMedia from "../media/UploadMedia";

export default function ContentSection({ persons }) {
  return (
    <>
      <UploadAudio persons={persons} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-2 flex flex-col items-center">
          <h4 className="w-full bg-blue-500 text-xs p-2 rounded-2xl text-center font-bold text-white">
            آپلود تصاویر مراسم
            <span className="text-red-700 font-extralight">
              (اولین تصویر، کاور آرشیو است!)
            </span>
          </h4>
          <UploadMedia
            type="images"
            accept="image/*"
            buttonText="آپلود تصویر"
          />
        </div>
        <div className="col-span-2 flex flex-col items-center">
          <h4 className="w-full bg-blue-500 text-xs p-2 rounded-2xl text-center font-bold text-white">
            آپلود ویدیوهای مراسم
          </h4>
          <UploadMedia
            type="videos"
            accept="video/*"
            buttonText="آپلود ویدیو"
          />
        </div>
      </div>
    </>
  );
}
