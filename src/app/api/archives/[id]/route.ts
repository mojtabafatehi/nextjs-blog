import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const body = await request.json();
  const {
    title,
    summary,
    description,
    event_date,
    location,
    status,
    slug,
    cover_image_url,
  } = body;

  await db.run(
    `UPDATE archives SET
     title = ?, summary = ?, description = ?, event_date = ?, location = ?, status = ?, slug = ?, cover_image_url = ?
     WHERE id = ?`,
    title,
    summary,
    description,
    event_date,
    location,
    status,
    slug,
    cover_image_url,
    params.id
  );

  const updated = await db.get(
    "SELECT * FROM archives WHERE id = ?",
    params.id
  );
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  await db.run("DELETE FROM archives WHERE id = ?", params.id);
  return NextResponse.json({ message: "آرشیو حذف شد" });
}
