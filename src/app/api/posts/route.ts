import dbPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await dbPromise;
  const posts = await db.all("SELECT * FROM posts ORDER BY created_at DESC");
  return NextResponse.json(posts);
}

export async function POST(requset: Request) {
  const db = await dbPromise;
  const body = await requset.json();
  const { title, description, date } = body;

  const result = await db.run(
    "INSERT INTO posts (title, description, date) VALUES (?, ?, ?)",
    title,
    description,
    date
  );

  console.log("result:", result);

  const newPost = await db.get(
    "SELECT * FROM posts WHERE id = ?",
    result.lastID
  );

  console.log("newPost:", newPost);

  return NextResponse.json(
    {
      id: newPost?.id,
      title: newPost?.title,
      description: newPost?.description,
      date: newPost?.date,
      created_at: newPost?.created_at?.toString(),
    },
    { status: 201 }
  );
}
