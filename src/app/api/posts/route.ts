import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await dbPromise;
  const posts = await db.all("SELECT * FROM posts ORDER BY created_at DESC");
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const db = await dbPromise;
  const body = await request.json();
  const {
    title,
    summary,
    content,
    cover_image_url,
    published_date,
    author_name,
    status = "draft",
    slug,
  } = body;

  const result = await db.run(
    `INSERT INTO posts 
     (title, summary, content, cover_image_url, published_date, author_name, status, slug)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    title,
    summary,
    content,
    cover_image_url,
    published_date,
    author_name,
    status,
    slug
  );

  const newPost = await db.get(
    "SELECT * FROM posts WHERE id = ?",
    result.lastID
  );
  return NextResponse.json(newPost, { status: 201 });
}
