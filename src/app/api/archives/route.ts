import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await dbPromise;
  const archives = await db.all(
    "SELECT * FROM archives ORDER BY created_at DESC"
  );
  return NextResponse.json(archives);
}

export async function POST(request: Request) {
  const db = await dbPromise;
  const body = await request.json();
  const {
    title,
    summary,
    description,
    event_date,
    location,
    status = "draft",
    slug,
    cover_image_url,
  } = body;

  const result = await db.run(
    `INSERT INTO archives 
     (title, summary, description, event_date, location, status, slug, cover_image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    title,
    summary,
    description,
    event_date,
    location,
    status,
    slug,
    cover_image_url
  );

  const newArchive = await db.get(
    "SELECT * FROM archives WHERE id = ?",
    result.lastID
  );
  return NextResponse.json(newArchive, { status: 201 });
}
