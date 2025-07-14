import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const archiveId = parseInt(params.id);

  if (isNaN(archiveId)) {
    return NextResponse.json(
      { error: "شناسه آرشیو معتبر نیست" },
      { status: 400 }
    );
  }

  try {
    const exists = await db.get(
      "SELECT 1 FROM archives WHERE id = ?",
      archiveId
    );
    if (!exists) {
      return NextResponse.json(
        { error: "آرشیو مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    await db.run("DELETE FROM archives WHERE id = ?", archiveId);
    return NextResponse.json({ message: "آرشیو با موفقیت حذف شد" });
  } catch (error) {
    console.error("خطا در حذف آرشیو:", error);
    return NextResponse.json(
      { error: "خطای سرور در حذف آرشیو" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const archiveId = parseInt(params.id);

  if (isNaN(archiveId)) {
    return NextResponse.json(
      { error: "شناسه آرشیو معتبر نیست" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      summary,
      description,
      event_date,
      location,
      status,
      cover_image_url,
      slug,
      speakers = [],
      reciters = [],
    } = body;

    await db.run("BEGIN TRANSACTION");

    // بررسی وجود آرشیو
    const exists = await db.get(
      "SELECT 1 FROM archives WHERE id = ?",
      archiveId
    );
    if (!exists) {
      await db.run("ROLLBACK");
      return NextResponse.json(
        { error: "آرشیو مورد نظر یافت نشد" },
        { status: 404 }
      );
    }

    // به‌روزرسانی اطلاعات اصلی
    await db.run(
      `UPDATE archives SET
       title = ?, summary = ?, description = ?, event_date = ?, location = ?,
       status = ?, cover_image_url = ?, slug = ?
       WHERE id = ?`,
      title,
      summary,
      description,
      event_date,
      location,
      status,
      cover_image_url,
      slug,
      archiveId
    );

    // به‌روزرسانی مشارکت‌کنندگان
    await db.run(`DELETE FROM participants WHERE archive_id = ?`, archiveId);

    const participants = [...speakers, ...reciters].map((person_id) => ({
      archive_id: archiveId,
      person_id,
    }));

    for (const { archive_id, person_id } of participants) {
      // بررسی وجود شخص
      const personExists = await db.get(
        "SELECT 1 FROM persons WHERE id = ?",
        person_id
      );
      if (!personExists) {
        await db.run("ROLLBACK");
        return NextResponse.json(
          { error: `شناسه شخص ${person_id} معتبر نیست` },
          { status: 400 }
        );
      }

      await db.run(
        `INSERT INTO participants (archive_id, person_id) VALUES (?, ?)`,
        archive_id,
        person_id
      );
    }

    await db.run("COMMIT");

    const updatedArchive = await db.get(
      "SELECT * FROM archives WHERE id = ?",
      archiveId
    );
    return NextResponse.json(updatedArchive);
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("خطا در به‌روزرسانی آرشیو:", error);
    return NextResponse.json(
      { error: "خطای سرور در به‌روزرسانی آرشیو" },
      { status: 500 }
    );
  }
}
