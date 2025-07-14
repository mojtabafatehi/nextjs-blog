import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const db = await dbPromise;
  const id = params.id;
  const body = await request.json();
  const {
    title,
    summary,
    content,
    cover_image_url,
    published_date,
    author_name,
    status,
    slug,
  } = body;

  await db.run(
    `UPDATE posts SET
      title = ?,
      summary = ?,
      content = ?,
      cover_image_url = ?,
      published_date = ?,
      author_name = ?,
      status = ?,
      slug = ?
      WHERE id = ?`,
    title,
    summary,
    content,
    cover_image_url,
    published_date,
    author_name,
    status,
    slug,
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
