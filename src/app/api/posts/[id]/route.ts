import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const id = await params.id;
  const body = await request.json();

  const {
    title,
    description,
    event_date,
    cover_image_url,
    status,
    location,
    speakers,
  } = body;

  await db.run(
    `UPDATE posts SET
     title = ?,
     description = ?,
     event_date = ?,
     cover_image_url = ?,
     status = ?,
     location = ?,
     speakers = ?
     WHERE id = ?`,
    title,
    description,
    event_date,
    cover_image_url,
    status,
    location,
    speakers,
    id
  );

  const updatedPost = await db.get("SELECT * FROM posts WHERE id = ?", id);
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const id = params.id;

  await db.run("DELETE FROM posts WHERE id = ?", id);
  return NextResponse.json({ message: "پست با موفقیت حذف شد" });
}
