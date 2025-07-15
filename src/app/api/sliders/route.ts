import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

// گرفتن همه اسلایدها
export async function GET() {
  const db = await dbPromise;
  const sliders = await db.all("SELECT * FROM sliders ORDER BY created_at DESC");
  return NextResponse.json(sliders);
}

// افزودن اسلاید جدید
export async function POST(request: Request) {
  const db = await dbPromise;
  const body = await request.json();
  const { image_url, link_url, alt } = body;

  if (!image_url) {
    return NextResponse.json({ error: "آدرس تصویر الزامی است." }, { status: 400 });
  }

  const result = await db.run(
    `INSERT INTO sliders (image_url, link_url, alt) VALUES (?, ?, ?)`,
    image_url,
    link_url,
    alt
  );

  const newSlider = await db.get("SELECT * FROM sliders WHERE id = ?", result.lastID);
  return NextResponse.json(newSlider, { status: 201 });
}
