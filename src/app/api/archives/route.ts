import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await dbPromise;

  // واکشی همه آرشیوها
  const archives = await db.all(
    "SELECT * FROM archives ORDER BY created_at DESC"
  );

  // برای هر آرشیو، مداحان و سخنرانانش را واکشی کن
  const fullArchives = await Promise.all(
    archives.map(async (archive) => {
      // واکشی شرکت‌کنندگان آن آرشیو از جدول persons
      const participants = await db.all(
        `
        SELECT persons.* FROM participants
        JOIN persons ON persons.id = participants.person_id
        WHERE participants.archive_id = ?
      `,
        archive.id
      );

      // جداسازی مداحان و سخنرانان
      const reciters = participants.filter((p) => p.role === "reciter");
      const speakers = participants.filter((p) => p.role === "speaker");

      return {
        ...archive,
        reciters,
        speakers,
      };
    })
  );

  return NextResponse.json(fullArchives);
}

export async function POST(request: Request) {
  const db = await dbPromise;

  try {
    // اعتبارسنجی نوع محتوا
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "نوع محتوای درخواست باید JSON باشد" },
        { status: 415 }
      );
    }

    const body = await request.json();

    // اعتبارسنجی فیلدهای اجباری
    const requiredFields = ["title", "event_date", "location"];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "فیلدهای اجباری خالی هستند",
          missingFields,
        },
        { status: 400 }
      );
    }

    // اعتبارسنجی مقادیر
    const {
      title,
      summary = "",
      description = "",
      event_date,
      location,
      status = "draft",
      cover_image_url = "",
      slug = "",
      reciters = [],
      speakers = [],
    } = body;

    if (!["draft", "published"].includes(status)) {
      return NextResponse.json(
        { error: "وضعیت نامعتبر. فقط draft یا published مجاز است" },
        { status: 400 }
      );
    }

    // اعتبارسنجی فرمت slug
    if (slug && !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "slug فقط می‌تواند شامل حروف کوچک، اعداد و خط تیره باشد" },
        { status: 400 }
      );
    }

    // اعتبارسنجی یکتایی slug
    if (slug) {
      const existingSlug = await db.get(
        "SELECT 1 FROM archives WHERE slug = ?",
        slug
      );

      if (existingSlug) {
        return NextResponse.json(
          { error: "این slug قبلا استفاده شده است" },
          { status: 409 }
        );
      }
    }

    // شروع تراکنش
    await db.run("BEGIN TRANSACTION");

    // ایجاد آرشیو جدید
    const result = await db.run(
      `INSERT INTO archives 
      (title, summary, description, event_date, location, status, cover_image_url, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      title,
      summary,
      description,
      event_date,
      location,
      status,
      cover_image_url,
      slug
    );

    const archiveId = result.lastID;

    // اتصال مداحان
    for (const personId of reciters) {
      await db.run(
        `INSERT INTO participants (archive_id, person_id) VALUES (?, ?)`,
        archiveId,
        personId
      );
    }

    // اتصال سخنرانان
    for (const personId of speakers) {
      await db.run(
        `INSERT INTO participants (archive_id, person_id) VALUES (?, ?)`,
        archiveId,
        personId
      );
    }
    // تایید تراکنش
    await db.run("COMMIT");

    // دریافت آرشیو ایجاد شده
    const newArchive = await db.get(
      "SELECT * FROM archives WHERE id = ?",
      archiveId
    );

    return NextResponse.json(newArchive, { status: 201 });
  } catch (error) {
    // در صورت خطا، تراکنش را بازگردانید
    await db.run("ROLLBACK");

    console.error("خطا در ایجاد آرشیو:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "فرمت JSON نامعتبر است" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "خطای سرور در ایجاد آرشیو جدید" },
      { status: 500 }
    );
  }
}
