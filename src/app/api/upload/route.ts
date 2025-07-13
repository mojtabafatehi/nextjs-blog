import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("media") as File;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "هیج فایلی ارسال نشده" },
        { status: 400 }
      );
    }

    // چک کردن حجم فایل (مثلا حداکثر 100 مگابایت)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: "فایل خیلی بزرگ است!" },
        { status: 413 }
      );
    }

    const ext = file.name.split(".").pop();
    const uniqueName = uuidv4() + "." + ext;
    const uploadPath = path.join(
      process.cwd(),
      "public",
      "uploads",
      uniqueName
    );

    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(uploadPath, buffer);

    const fileUrl = `/uploads/${uniqueName}`;

    return NextResponse.json(
      { url: fileUrl, message: "آپلود با موفقیت انجام شد" },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در آپلود", error);
    return NextResponse.json(
      { error: "خطای سرور هنگام آپلود فایل" },
      { status: 500 }
    );
  }
}
