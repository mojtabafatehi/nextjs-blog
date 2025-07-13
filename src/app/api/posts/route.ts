import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await dbPromise;
  const posts = await db.all(
    "SELECT * FROM posts ORDER BY created_at DESC"
    //--- "SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC"
  );
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const db = await dbPromise;
  const body = await request.json();
  const {
    title,
    status = "draft",
    event_date,
    cover_image_url,
    speakers,
    location,
    description,
  } = body;

  const result = await db.run(
    `INSERT INTO posts 
    (title, status, event_date, cover_image_url ,speakers, location, description) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    title,
    status,
    event_date,
    cover_image_url,
    speakers,
    location,
    description
  );

  const newPost = await db.get(
    "SELECT * FROM posts WHERE id = ?",
    result.lastID
  );

  return NextResponse.json(newPost, { status: 201 });
}
