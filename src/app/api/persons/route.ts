import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

// POST → افزودن یک شخص (مداح یا سخنران)
export async function POST(request: Request) {
  const db = await dbPromise;
  const body = await request.json();
  const { full_name, role, avatar_url } = body;

  if (!["speaker", "reciter"].includes(role)) {
    return NextResponse.json({ error: "نقش نامعتبر است" }, { status: 400 });
  }

  const result = await db.run(
    `INSERT INTO persons (full_name, role, avatar_url) VALUES (?, ?, ?)`,
    full_name,
    role,
    avatar_url
  );

  const newPerson = await db.get("SELECT * FROM persons WHERE id = ?", result.lastID);
  return NextResponse.json(newPerson, { status: 201 });
}

// GET → نمایش لیست مداحان و سخنرانان
export async function GET() {
  const db = await dbPromise;
  const persons = await db.all(`SELECT * FROM persons ORDER BY created_at DESC`);
  return NextResponse.json(persons);
}
