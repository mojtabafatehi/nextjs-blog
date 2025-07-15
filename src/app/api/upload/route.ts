import { writeFile, mkdir, access } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // 1. بررسی پوشه آپلود
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await access(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    // 2. دریافت فایل
    const formData = await request.formData();
    const file = formData.get("media") as File;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "هیچ فایلی ارسال نشده یا فرمت نامعتبر" },
        { status: 400 }
      );
    }

    // 3. اعتبارسنجی حجم فایل
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: "حجم فایل نمی‌تواند بیشتر از 100 مگابایت باشد" },
        { status: 413 }
      );
    }

    // 4. اعتبارسنجی نوع فایل
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "فقط فایل‌های تصویری (JPEG, PNG, WebP) مجاز هستند" },
        { status: 415 }
      );
    }

    // 5. ذخیره فایل
    const ext = file.name.split(".").pop();
    const uniqueName = uuidv4() + "." + ext;
    const uploadPath = path.join(uploadDir, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(uploadPath, buffer);

    // 6. پاسخ موفقیت‌آمیز
    const fileUrl = `/uploads/${uniqueName}`;
    return NextResponse.json(
      { 
        url: fileUrl,
        filename: uniqueName,
        size: file.size,
        type: file.type
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("خطای کامل آپلود:", error);
    return NextResponse.json(
      { 
        error: "خطا در پردازش فایل",
        ...(process.env.NODE_ENV === 'development' && {
          details: error.message,
          stack: error.stack
        })
      },
      { status: 500 }
    );
  }
}